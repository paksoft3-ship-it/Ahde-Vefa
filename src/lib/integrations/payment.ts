/**
 * Payment integration adapter (PLACEHOLDER).
 * ---------------------------------------------------------------------------
 * No real payment gateway is wired up. Card data is NEVER stored or logged.
 * To go live, implement a provider (e.g. iyzico, PayTR, Stripe) behind this
 * interface and supply credentials via environment variables:
 *   PAYMENT_PROVIDER_API_KEY=...
 *
 * The functions below simulate a payment intent for UI flows only.
 */

export interface PaymentRequest {
  amount: number;
  currency: "TRY";
  campaign: string;
  reference: string;
}

export interface PaymentResult {
  status: "success" | "pending" | "failed";
  reference: string;
  message: string;
}

/** Simulated payment. Replace with a real provider call. */
export async function createPayment(
  req: PaymentRequest,
): Promise<PaymentResult> {
  // TODO: integrate real payment provider here.
  // IMPORTANT: never persist raw card data; use provider tokenization.
  return {
    status: "pending",
    reference: req.reference,
    message:
      "Bu bir demo ödeme akışıdır. Gerçek ödeme sağlayıcısı entegrasyonu daha sonra bağlanacaktır.",
  };
}

/** Generate a human-readable donation reference (illustrative). */
export function generateReference(prefix = "AV"): string {
  const rand = Math.floor(100000 + Math.random() * 900000);
  const year = new Date().getFullYear();
  return `${prefix}-${year}-${rand}`;
}
