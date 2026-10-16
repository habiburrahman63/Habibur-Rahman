/**
 * Copies text to the clipboard.
 *
 * Uses the async Clipboard API when available and automatically falls back to
 * the legacy `document.execCommand('copy')` path for non-secure contexts
 * (plain HTTP) or browsers that deny clipboard permissions.
 *
 * Never throws — resolves to `false` when the copy could not be performed so
 * callers can keep the UI honest instead of showing a false success state.
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (!text || typeof document === 'undefined') return false;

  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Permission denied / insecure context — fall through to the legacy path.
    }
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-1000px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const succeeded = document.execCommand('copy');
    document.body.removeChild(textarea);
    return succeeded;
  } catch {
    return false;
  }
}
