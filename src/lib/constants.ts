import { routes } from "./routes";
import { PLACEHOLDER } from "./utils";

/** Association identity. No real legal/contact data is invented — placeholders only. */
export const SITE = {
  name: "AHDE VEFA",
  fullName: "AHDE VEFA İnsani Yardım Derneği",
  tagline: "Emanetlerinizi ihtiyaç sahiplerine ulaştırıyoruz",
  description:
    "Afrika, Afganistan ve Türkiye başta olmak üzere ihtiyaç sahiplerine şeffaf, izlenebilir ve güvenilir yardım ulaştıran insani yardım derneği.",
  logo: "/logo/favicon.png",
};

/** Legal / trust fields — always placeholders, never fabricated (cloude.md §15). */
export const LEGAL = {
  kutukNo: PLACEHOLDER,
  yardimToplamaIzinNo: PLACEHOLDER,
  izinBaslangic: PLACEHOLDER,
  izinBitis: PLACEHOLDER,
  yetkiliMakam: PLACEHOLDER,
};

/**
 * Contact info. Phone/WhatsApp provided by the project owner (verified against
 * the association's Facebook page). Email/address remain placeholders until a
 * verified value is supplied — never fabricated.
 */
export const CONTACT = {
  phone: "0533 191 35 66",
  whatsapp: "+90 533 191 35 66", // international form for wa.me links
  email: PLACEHOLDER,
  address: PLACEHOLDER,
  workingHours: PLACEHOLDER,
};

/** Bank transfer placeholders — never fabricated (cloude.md §5). */
export const BANK = {
  accountName: PLACEHOLDER,
  bankName: PLACEHOLDER,
  iban: PLACEHOLDER,
  branch: PLACEHOLDER,
};

/** Primary public navigation (cloude.md §10). */
export const PUBLIC_NAV = [
  { label: "Anasayfa", href: routes.home },
  { label: "Bağış Yap", href: routes.bagis },
  { label: "Kurban", href: routes.kurban },
  { label: "Ramazan", href: routes.ramazan },
  { label: "Faaliyetler", href: routes.faaliyetler },
  { label: "Raporlar", href: routes.raporlar },
  { label: "Hakkımızda", href: routes.hakkimizda },
  { label: "İletişim", href: routes.iletisim },
] as const;

export const FOOTER_LINKS = {
  kurumsal: [
    { label: "Hakkımızda", href: routes.hakkimizda },
    { label: "Faaliyetler", href: routes.faaliyetler },
    { label: "Şeffaflık ve Raporlar", href: routes.raporlar },
    { label: "Sahadan Haberler", href: routes.haberler },
    { label: "Galeri", href: routes.galeri },
  ],
  bagis: [
    { label: "Bağış Yap", href: routes.bagis },
    { label: "Kurban Bağışı", href: routes.kurban },
    { label: "Ramazan Yardımları", href: routes.ramazan },
    { label: "Bağış Takip", href: routes.bagisTakip },
    { label: "Dekont Bildir", href: routes.dekontBildir },
  ],
  faaliyet: [
    { label: "Afrika", href: routes.afrika },
    { label: "Afganistan", href: routes.afganistan },
    { label: "Türkiye", href: routes.turkiye },
    { label: "Pakistan Hazırlık", href: routes.pakistan },
    { label: "Gıda Yardımı", href: routes.gidaYardimi },
  ],
  destek: [
    { label: "Gönüllü Ol", href: routes.gonulluOl },
    { label: "Kurumsal Destek", href: routes.kurumsalDestek },
    { label: "İletişim", href: routes.iletisim },
    { label: "SSS", href: routes.sss },
    { label: "Yasal Metinler", href: routes.yasal },
  ],
};

/** Admin sidebar menu (cloude.md §11). */
export const ADMIN_NAV = [
  { label: "Genel Bakış", href: routes.admin.dashboard, icon: "LayoutDashboard" },
  { label: "Bağışlar", href: routes.admin.bagislar, icon: "HandCoins" },
  { label: "Kampanyalar", href: routes.admin.kampanyalar, icon: "Megaphone" },
  { label: "Kurban Takibi", href: routes.admin.kurbanTakibi, icon: "ClipboardList" },
  { label: "Ramazan Yardımları", href: routes.admin.ramazan, icon: "Moon" },
  { label: "Bağışçılar", href: routes.admin.bagiscilar, icon: "Users" },
  { label: "Gönüllüler", href: routes.admin.gonulluler, icon: "HeartHandshake" },
  { label: "Dekont Bildirimleri", href: routes.admin.dekontlar, icon: "ReceiptText" },
  { label: "Raporlar", href: routes.admin.raporlar, icon: "FileText" },
  { label: "Galeri / Medya", href: routes.admin.medya, icon: "Images" },
  { label: "Mesajlar", href: routes.admin.mesajlar, icon: "Mail" },
  { label: "Sayfa İçerikleri", href: routes.admin.icerikler, icon: "LayoutTemplate" },
  { label: "Ayarlar", href: routes.admin.ayarlar, icon: "Settings" },
  { label: "Kullanıcılar", href: routes.admin.kullanicilar, icon: "ShieldCheck" },
  { label: "İşlem Kayıtları", href: routes.admin.islemKayitlari, icon: "ScrollText" },
] as const;

/** Suggested donation amounts (illustrative UI values, not prices). */
export const QUICK_AMOUNTS = [250, 500, 1000, 2500];

export const DONATION_TYPES = [
  "Genel Bağış",
  "Kurban Bağışı",
  "Ramazan İftarı",
  "Gıda Kumanyası",
  "Su Kuyusu",
  "Acil Yardım",
  "Afrika Yardımları",
  "Afganistan Yardımları",
  "Pakistan Hazırlık Çalışmaları",
];
