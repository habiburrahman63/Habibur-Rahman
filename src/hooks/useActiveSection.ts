import { useEffect, useState } from 'react';

/**
 * Tracks which page section currently owns the viewport using a single
 * IntersectionObserver instead of reading `offsetTop`/`offsetHeight` for every
 * section on every scroll event (which forced a synchronous layout each time).
 *
 * @param sectionIds Stable list of section element ids to observe.
 * @param fallback   Section id used before the first intersection is reported.
 */
export function useActiveSection(sectionIds: readonly string[], fallback: string): string {
  const [activeSection, setActiveSection] = useState(fallback);
  const key = sectionIds.join('|');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisible?.target.id) {
          setActiveSection(mostVisible.target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [key]);

  return activeSection;
}
