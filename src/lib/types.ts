/**
 * Shared domain types for AHDE VEFA.
 * These types describe the shape of the mock data layer that will later be
 * replaced by a real database/API.
 */

export type CampaignStatus =
  | "Aktif"
  | "Taslak"
  | "Hazırlık Aşamasında"
  | "Tamamlandı"
  | "Arşiv";

export type Region =
  | "Genel"
  | "Afrika"
  | "Afganistan"
  | "Türkiye"
  | "Pakistan"
  | "Çoklu Bölge";

export type DonationStatus =
  | "Onaylandı"
  | "Beklemede"
  | "Dekont Bekliyor"
  | "İncelemede"
  | "Başarısız"
  | "İptal Edildi";

export type PaymentMethod =
  | "Online Kart"
  | "Banka Havalesi / EFT"
  | "Manuel Kayıt";

export type CampaignCategory =
  | "Kurban"
  | "Ramazan"
  | "Gıda Yardımı"
  | "Acil Yardım"
  | "Su Kuyusu"
  | "Yetim"
  | "Eğitim"
  | "Genel";

export interface Campaign {
  id: string;
  slug: string;
  title: string;
  category: CampaignCategory;
  region: Region;
  status: CampaignStatus;
  summary: string;
  description: string;
  image: string;
  /** Illustrative only — real totals are not published yet. */
  targetAmount: number | null;
  collectedAmount: number | null;
  suggestedAmounts: number[];
  featured: boolean;
  createdAt: string;
}

export interface Donation {
  id: string;
  reference: string;
  campaignTitle: string;
  donorName: string;
  amount: number;
  method: PaymentMethod;
  status: DonationStatus;
  region: Region;
  createdAt: string;
}

export interface Donor {
  id: string;
  name: string;
  type: "Bireysel" | "Kurumsal";
  email: string;
  phone: string;
  city: string;
  totalDonations: number;
  donationCount: number;
  firstDonationAt: string;
  kvkkConsent: boolean;
}

export type VolunteerStatus =
  | "Yeni Başvuru"
  | "Görüşülecek"
  | "Onaylandı"
  | "Pasif";

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  skill: string;
  availability: string;
  status: VolunteerStatus;
  message: string;
  appliedAt: string;
}

export type ReceiptStatus =
  | "Beklemede"
  | "İncelemede"
  | "Onaylandı"
  | "Reddedildi";

export interface Receipt {
  id: string;
  reference: string;
  donorName: string;
  amount: number;
  campaignTitle: string;
  status: ReceiptStatus;
  fileName: string;
  submittedAt: string;
}

export interface Report {
  id: string;
  slug: string;
  title: string;
  region: Region;
  category: string;
  summary: string;
  image: string;
  period: string;
  publishedAt: string;
  status: "Yayında" | "Taslak";
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  region: Region;
  category: "Haber" | "Duyuru";
  summary: string;
  image: string;
  publishedAt: string;
  status: "Yayında" | "Taslak";
}

export interface GalleryAlbum {
  id: string;
  slug: string;
  title: string;
  region: Region;
  cover: string;
  photoCount: number;
  photos: { src: string; caption: string }[];
  createdAt: string;
}

export type MessageStatus = "Yeni" | "Yanıtlandı" | "Kapalı";

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  preview: string;
  body: string;
  status: MessageStatus;
  receivedAt: string;
}

export type UserRole = "Yönetici" | "Editör" | "Operatör" | "Görüntüleyici";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "Aktif" | "Pasif";
  lastActiveAt: string;
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  target: string;
  ip: string;
  createdAt: string;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  channel: "E-posta" | "SMS" | "WhatsApp";
  subject: string;
  body: string;
  updatedAt: string;
}

export type KurbanStatus =
  | "Vekalet Alındı"
  | "Ödeme Tamamlandı"
  | "Kesim Bekliyor"
  | "Kesildi"
  | "Dağıtıldı"
  | "Rapor Gönderildi";

export interface KurbanRecord {
  id: string;
  reference: string;
  ownerName: string;
  kurbanType: string;
  shares: number;
  region: Region;
  status: KurbanStatus;
  createdAt: string;
}

export interface RamazanRecord {
  id: string;
  reference: string;
  donorName: string;
  aidType: "İftar" | "Kumanya" | "Fitre" | "Fidye" | "Zekat";
  quantity: number;
  region: Region;
  status: DonationStatus;
  createdAt: string;
}
