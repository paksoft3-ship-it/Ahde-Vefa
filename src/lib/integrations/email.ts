/**
 * Email integration adapter (PLACEHOLDER).
 * Wire up a provider (e.g. Resend, SendGrid, Amazon SES) later.
 * Required env: EMAIL_PROVIDER_API_KEY=...
 */

export interface EmailMessage {
  to: string;
  subject: string;
  body: string;
}

export async function sendEmail(_message: EmailMessage): Promise<void> {
  // TODO: integrate a transactional email provider.
  // Intentionally a no-op in the demo build.
}
