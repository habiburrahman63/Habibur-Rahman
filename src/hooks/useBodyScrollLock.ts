import { useEffect } from 'react';

/** How many overlays currently hold the page scroll lock. */
let activeLocks = 0;

/**
 * Locks background scrolling while a modal/dialog is open and compensates for
 * the removed scrollbar so the page does not visibly jump.
 *
 * @param active        Whether the dialog is currently mounted/open.
 * @param bodyClassName Optional extra class added to `<body>` while open, used
 *                      by the print stylesheet (e.g. `print-isolation`).
 */
export function useBodyScrollLock(active: boolean, bodyClassName?: string): void {
  useEffect(() => {
    if (!active || typeof document === 'undefined') return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    if (bodyClassName) {
      body.classList.add(bodyClassName);
    }

    // Several overlays can be open at once (a modal opened from the command
    // palette, the mobile drawer behind a dialog). Each one restores only its
    // own snapshot on unmount, which would unlock the page while another
    // overlay is still showing. A shared counter keeps the page locked until
    // the last overlay closes.
    activeLocks += 1;

    return () => {
      activeLocks -= 1;
      if (activeLocks > 0) return;

      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      if (bodyClassName) {
        body.classList.remove(bodyClassName);
      }
    };
  }, [active, bodyClassName]);
}
