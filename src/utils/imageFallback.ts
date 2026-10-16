import type { SyntheticEvent } from 'react';

/**
 * Inline SVG used when an image asset fails to load (missing file, blocked
 * request, offline). Keeping it as a data URI means the replacement never
 * triggers another network request and the element keeps its original size,
 * so the surrounding layout never shifts.
 */
const FALLBACK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" width="640" height="360" role="img" aria-label="Image unavailable">
  <rect width="640" height="360" fill="#0f172a" />
  <rect x="0.5" y="0.5" width="639" height="359" fill="none" stroke="#1e293b" stroke-width="1" />
  <text x="320" y="180" fill="#34d399" font-family="monospace" font-size="22" text-anchor="middle">Image unavailable</text>
  <text x="320" y="208" fill="#64748b" font-family="monospace" font-size="14" text-anchor="middle">asset could not be loaded</text>
</svg>`;

export const FALLBACK_IMAGE = `data:image/svg+xml,${encodeURIComponent(FALLBACK_SVG)}`;

/**
 * `onError` handler for `<img>` elements. Swaps the broken source for the
 * inline placeholder exactly once, preventing an infinite error loop.
 */
export function handleImageError(event: SyntheticEvent<HTMLImageElement>): void {
  const image = event.currentTarget;
  if (image.dataset.fallbackApplied === 'true') return;
  image.dataset.fallbackApplied = 'true';
  image.src = FALLBACK_IMAGE;
}
