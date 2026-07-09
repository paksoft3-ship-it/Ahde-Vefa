import { z } from "zod";

/** Reusable field messages in Turkish. */
const required = "Bu alan zorunludur.";
const invalidEmail = "Geçerli bir e-posta adresi girin.";
const invalidPhone = "Geçerli bir telefon numarası girin.";
const kvkkRequired = "Devam etmek için onay vermeniz gerekmektedir.";

const phone = z
  .string()
  .min(1, required)
  .regex(/^[0-9+()\s-]{7,}$/, invalidPhone);

export const donationSchema = z.object({
  campaign: z.string().min(1, required),
  amount: z.coerce.number().positive("Lütfen geçerli bir tutar girin."),
  donorType: z.enum(["Bireysel", "Kurumsal"]),
});
export type DonationInput = z.infer<typeof donationSchema>;

export const checkoutSchema = z.object({
  fullName: z.string().min(2, required),
  phone,
  email: z.string().min(1, required).email(invalidEmail),
  city: z.string().optional(),
  note: z.string().max(500).optional(),
  paymentMethod: z.enum(["Online Kart", "Banka Havalesi / EFT"]),
  kvkkConsent: z.literal(true, { errorMap: () => ({ message: kvkkRequired }) }),
  infoConsent: z.literal(true, { errorMap: () => ({ message: kvkkRequired }) }),
});
export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const receiptSchema = z.object({
  reference: z.string().min(1, required),
  fullName: z.string().min(2, required),
  amount: z.coerce.number().positive("Lütfen geçerli bir tutar girin."),
  transferDate: z.string().min(1, required),
  note: z.string().max(500).optional(),
});
export type ReceiptInput = z.infer<typeof receiptSchema>;

export const trackingSchema = z.object({
  reference: z.string().min(3, required),
  contact: z.string().min(3, required),
});
export type TrackingInput = z.infer<typeof trackingSchema>;

export const volunteerSchema = z.object({
  fullName: z.string().min(2, required),
  phone,
  email: z.string().min(1, required).email(invalidEmail),
  city: z.string().min(1, required),
  skill: z.string().optional(),
  availability: z.string().optional(),
  message: z.string().max(600).optional(),
  kvkkConsent: z.literal(true, { errorMap: () => ({ message: kvkkRequired }) }),
});
export type VolunteerInput = z.infer<typeof volunteerSchema>;

export const contactSchema = z.object({
  fullName: z.string().min(2, required),
  email: z.string().min(1, required).email(invalidEmail),
  subject: z.string().min(2, required),
  message: z.string().min(5, required),
  kvkkConsent: z.literal(true, { errorMap: () => ({ message: kvkkRequired }) }),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const corporateSchema = z.object({
  companyName: z.string().min(2, required),
  contactPerson: z.string().min(2, required),
  email: z.string().min(1, required).email(invalidEmail),
  phone,
  supportType: z.string().optional(),
  message: z.string().max(600).optional(),
  kvkkConsent: z.literal(true, { errorMap: () => ({ message: kvkkRequired }) }),
});
export type CorporateInput = z.infer<typeof corporateSchema>;

export const kurbanSchema = z.object({
  kurbanType: z.string().min(1, required),
  region: z.string().min(1, required),
  shares: z.coerce.number().int().positive("Hisse sayısı en az 1 olmalıdır."),
  vekaletName: z.string().min(2, required),
  phone,
  email: z.string().min(1, required).email(invalidEmail),
  note: z.string().max(500).optional(),
  vekaletConsent: z.literal(true, {
    errorMap: () => ({ message: kvkkRequired }),
  }),
});
export type KurbanInput = z.infer<typeof kurbanSchema>;

export const newsletterSchema = z.object({
  email: z.string().min(1, required).email(invalidEmail),
});

export const loginSchema = z.object({
  email: z.string().min(1, required).email(invalidEmail),
  password: z.string().min(1, required),
});
export type LoginInput = z.infer<typeof loginSchema>;
