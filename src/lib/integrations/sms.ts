/**
 * SMS integration adapter (PLACEHOLDER).
 * Wire up a provider (e.g. Netgsm, Twilio) later.
 * Required env: SMS_PROVIDER_API_KEY=...
 */

export interface SmsMessage {
  to: string;
  body: string;
}

export async function sendSms(_message: SmsMessage): Promise<void> {
  // TODO: integrate an SMS provider.
}
