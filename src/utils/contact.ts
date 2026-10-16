import { PERSONAL_INFO } from '../data/portfolioData';

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  serviceType: string;
  message: string;
}

export type ContactDeliveryStatus = 'sent' | 'mailto' | 'error';

export interface ContactResult {
  status: ContactDeliveryStatus;
  /** Visitor friendly message, only set when `status` is `'error'`. */
  error?: string;
}

/** How long to wait for the endpoint before reporting a timeout. */
const REQUEST_TIMEOUT_MS = 12000;

/**
 * Optional serverless/form endpoint (Formspree, Web3Forms, Vercel function,
 * Render API, ...). Configured through `VITE_CONTACT_ENDPOINT` at build time.
 */
export const CONTACT_ENDPOINT: string = (import.meta.env.VITE_CONTACT_ENDPOINT ?? '').trim();

export const isContactEndpointConfigured: boolean = CONTACT_ENDPOINT.length > 0;

/** Builds a pre-filled `mailto:` link so the inquiry is never lost. */
export function buildMailtoLink(payload: ContactPayload): string {
  const subject = encodeURIComponent(
    payload.subject.trim() || `Project inquiry from ${payload.name.trim()}`,
  );
  const body = encodeURIComponent(
    [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Project scope: ${payload.serviceType}`,
      '',
      payload.message,
    ].join('\n'),
  );

  return `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
}

/**
 * Delivers a contact inquiry.
 *
 * - When `VITE_CONTACT_ENDPOINT` is configured the payload is POSTed as JSON and
 *   network/server failures are reported back to the caller.
 * - When it is not configured the visitor's mail client is used instead, so the
 *   form never silently discards a message.
 */
export async function sendContactMessage(payload: ContactPayload): Promise<ContactResult> {
  if (!isContactEndpointConfigured) {
    return { status: 'mailto' };
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return {
        status: 'error',
        error: `The server could not accept the message (status ${response.status}).`,
      };
    }

    return { status: 'sent' };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return { status: 'error', error: 'The request timed out. Please try again.' };
    }

    return {
      status: 'error',
      error: 'Network error — the message could not be delivered.',
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
}
