/**
 * WhatsApp integration adapter (PLACEHOLDER).
 * Wire up the WhatsApp Business / Cloud API later.
 * Required env: WHATSAPP_PROVIDER_TOKEN=...
 */

export interface WhatsAppMessage {
  to: string;
  body: string;
}

export async function sendWhatsApp(_message: WhatsAppMessage): Promise<void> {
  // TODO: integrate the WhatsApp Business API.
}

/** Build a click-to-chat link. Number must be supplied by the project owner. */
export function whatsappLink(phone: string, text?: string): string {
  const digits = phone.replace(/[^0-9]/g, "");
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return digits ? `https://wa.me/${digits}${query}` : "#";
}
