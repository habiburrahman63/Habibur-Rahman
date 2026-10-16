import { useEffect, useRef } from 'react';

/**
 * Invokes `handler` when the user presses Escape while `active` is true.
 *
 * The handler is stored in a ref so passing an inline arrow function does not
 * re-subscribe the listener on every render (the previous implementation in
 * each modal re-bound the global listener on each parent re-render).
 */
export function useEscapeKey(handler: () => void, active = true): void {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handlerRef.current();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [active]);
}
