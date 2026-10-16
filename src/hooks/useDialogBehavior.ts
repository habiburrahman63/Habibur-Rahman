import { useEffect, useRef } from 'react';
import { useBodyScrollLock } from './useBodyScrollLock';

/**
 * Identifiers of every currently open dialog, oldest first.
 *
 * Two dialogs can legitimately be open at the same time (the command palette
 * opens the resume viewer, the project grid opens the case study). Each of them
 * registers its own `keydown` listener, so without this stack a single Escape
 * press closed all of them at once — the user had to press Escape repeatedly
 * to get back to the page.
 */
const openDialogs: symbol[] = [];

/** Selector for elements that can receive keyboard focus inside a dialog. */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Focusable descendants of `container`, in DOM order.
 *
 * Uses layout boxes rather than `offsetParent` because the dialogs themselves
 * are `position: fixed`, which makes `offsetParent` unreliable as a visibility
 * test. `getClientRects()` is empty exactly when the element is not rendered.
 */
function getFocusableElements(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];

  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => element.getClientRects().length > 0 || element === document.activeElement,
  );
}

/**
 * Shared behaviour for every modal/dialog in the app.
 *
 * Handles the parts that were previously duplicated (and inconsistently
 * implemented) across the individual modals:
 *
 * - closing on Escape, but only for the top-most dialog;
 * - moving focus into the dialog on open and restoring it to the trigger on close;
 * - trapping Tab / Shift+Tab inside the dialog so keyboard users cannot tab
 *   into the page content hidden behind the overlay;
 * - locking background scrolling (and the optional print-isolation class).
 *
 * @param isOpen        Whether the dialog is currently mounted.
 * @param onClose       Called on Escape.
 * @param bodyClassName Optional extra class added to `<body>` while open
 *                      (used by the print stylesheet, e.g. `resume-print`).
 * @returns             Ref to attach to the dialog panel element.
 */
export function useDialogBehavior<T extends HTMLElement>(
  isOpen: boolean,
  onClose: () => void,
  bodyClassName?: string,
) {
  const dialogRef = useRef<T>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useBodyScrollLock(isOpen, bodyClassName);

  useEffect(() => {
    if (!isOpen) return;

    const id = Symbol('dialog');
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    openDialogs.push(id);

    // Move focus inside once the dialog has been laid out.
    const focusFrame = window.requestAnimationFrame(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = getFocusableElements(dialog);
      (focusable[0] ?? dialog).focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      // Registered in the capture phase, so this handler runs before every
      // bubble-phase listener on `window`. Dialogs underneath are ignored and
      // `stopImmediatePropagation` keeps them from reacting to the same press.
      if (openDialogs[openDialogs.length - 1] !== id) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopImmediatePropagation();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab') return;

      const dialog = dialogRef.current;
      const focusable = getFocusableElements(dialog);
      if (focusable.length === 0) {
        event.preventDefault();
        dialog?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', handleKeyDown, true);

      const index = openDialogs.indexOf(id);
      if (index !== -1) openDialogs.splice(index, 1);

      // Hand focus back to whatever opened the dialog (button, link, card...).
      if (trigger && trigger.isConnected) trigger.focus();
    };
  }, [isOpen]);

  return dialogRef;
}
