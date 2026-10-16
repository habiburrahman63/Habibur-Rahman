import { useEffect, useRef } from 'react';

/**
 * Tracks page scroll progress and writes it directly to the DOM through a ref.
 *
 * The previous implementation stored the progress in React state inside `App`,
 * which re-rendered every section of the page on every scroll event. Writing
 * the width imperatively keeps scrolling off the React render path entirely.
 *
 * Attach the returned ref to the progress bar element.
 */
export function useScrollProgressBar<T extends HTMLElement>() {
  const barRef = useRef<T>(null);

  useEffect(() => {
    let frame = 0;
    let scrollable = 0;

    const measure = () => {
      scrollable =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
    };

    const update = () => {
      frame = 0;
      const bar = barRef.current;
      if (!bar) return;

      // `scrollY` is the only value read per frame. Reading `scrollHeight`
      // every time would force a synchronous layout on each animation frame,
      // which is the expensive part during fast scrolling.
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    };

    // Throttle to one update per animation frame to avoid layout thrashing.
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    /**
     * The document height only changes when the layout changes (viewport
     * resize, lazy image decoding, a dialog opening), not while scrolling, so
     * it is measured separately from the per-frame width write.
     */
    const remeasureAndUpdate = () => {
      measure();
      scheduleUpdate();
    };

    measure();
    update();

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', remeasureAndUpdate);

    // Late-loading images and web fonts change the document height without
    // firing resize, so the cached total is refreshed once the page settles.
    let documentObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      documentObserver = new ResizeObserver(remeasureAndUpdate);
      documentObserver.observe(document.body);
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      documentObserver?.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', remeasureAndUpdate);
    };
  }, []);

  return barRef;
}
