import { lazy, type ComponentType } from 'react';

export interface Preloadable<T extends ComponentType<any>> {
  /** The lazily loaded component. Render it inside a `<Suspense>`. */
  Component: T;
  /** Starts the download immediately. Safe to call repeatedly. */
  preload: () => void;
}

/**
 * Splits a component out of the initial bundle and, at the same time,
 * schedules its download for the browser's idle time.
 *
 * Why both halves matter:
 *
 * - `lazy()` on its own puts a network round-trip between the user pressing
 *   "Resume" / `Cmd+K` and the dialog appearing.
 * - Eagerly importing it keeps the code in the critical path and delays first
 *   interaction.
 *
 * Warming the chunk during idle time lets the split genuinely shrink the
 * initial payload while the overlay still opens with no perceptible wait.
 * `preload()` additionally fires the moment the user commits to opening the
 * dialog, so the module is already in flight before React asks for it.
 *
 * The factory runs at most once no matter how often `preload` is called, and a
 * failed speculative fetch is swallowed here because `lazy()` still reports the
 * failure through its Suspense boundary when the component actually renders —
 * an extra unhandled rejection would only add a console error.
 */
export function lazyWithIdlePreload<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
): Preloadable<T> {
  let pending: Promise<{ default: T }> | null = null;

  const load = (): Promise<{ default: T }> => {
    if (!pending) {
      pending = factory().catch((error: unknown) => {
        // Allow a later attempt to retry instead of caching the failure.
        pending = null;
        throw error;
      });
    }
    return pending;
  };

  const preload = () => {
    void load().catch(() => undefined);
  };

  if (typeof window !== 'undefined') {
    // `requestIdleCallback` is not present in every browser, so it is read off
    // the window object rather than assumed by the DOM typings.
    const requestIdle = (
      window as unknown as {
        requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      }
    ).requestIdleCallback;

    if (typeof requestIdle === 'function') {
      requestIdle(preload, { timeout: 3000 });
    } else {
      window.setTimeout(preload, 1200);
    }
  }

  return { Component: lazy(load) as unknown as T, preload };
}