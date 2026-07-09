import type {
  AdminUser,
  AuditLog,
  Campaign,
  Donation,
  Donor,
  GalleryAlbum,
  KurbanRecord,
  Message,
  NewsItem,
  NotificationTemplate,
  RamazanRecord,
  Receipt,
  Report,
  Volunteer,
} from "./types";

/**
 * MOCK DATA LAYER
 * --------------------------------------------------------------------------
 * All records here are illustrative demo content, NOT real data.
 * Rules honored (cloude.md §12):
 *  - No real legal numbers, IBANs, statistics, donor/staff names, or reports.
 *  - Public campaign monetary totals are left `null` and rendered as "[Eklenecek]".
 *  - Every Pakistan record MUST use the "Hazırlık Aşamasında" status.
 * Replace this module with a real database/API layer when available.
 */

export const campaigns: Campaign[] = [
  {
    id: "c1",
    slug: "hisse-kurban-bagisi",
    title: "Hisse Kurban Bağışı",
    category: "Kurban",
    region: "Çoklu Bölge",
    status: "Aktif",
    summary:
      "Vacip ve hayır kurbanlarınızı ihtiyaç sahiplerine vekaletle ulaştırıyoruz.",
    description:
      "Kurban ibadetinizi güvenilir bir vekalet süreciyle yerine getiriyor, kesim ve dağıtım aşamalarını saha ekiplerimizle takip ediyoruz. Süreç sonunda bilgilendirme yapılır.",
    image: "kurban",
    targetAmount: null,
    collectedAmount: null,
    suggestedAmounts: [1750, 3500, 7000],
    featured: true,
    createdAt: "2026-05-12",
  },
  {
    id: "c2",
    slug: "su-kuyusu-projeleri",
    title: "Su Kuyusu Projeleri",
    category: "Su Kuyusu",
    region: "Afrika",
    status: "Aktif",
    summary:
      "Susuzlukla mücadele eden bölgelerde temiz suya kalıcı erişim sağlıyoruz.",
    description:
      "Temiz su kaynağına erişimi olmayan bölgelerde su kuyusu çalışmaları yürütülmektedir. Saha koşullarına göre planlama yapılır; tamamlanan çalışmalar raporlarla paylaşılır.",
    image: "su",
    targetAmount: null,
    collectedAmount: null,
    suggestedAmounts: [500, 1000, 2500],
    featured: true,
    createdAt: "2026-04-28",
  },
  {
    id: "c3",
    slug: "afganistan-egitim-ve-kalkinma",
    title: "Afganistan Eğitim ve Kalkınma",
    category: "Eğitim",
    region: "Afganistan",
    status: "Aktif",
    summary:
      "Yetimlerin eğitimi ve ailelerin kendi ayakları üzerinde durması için destek.",
    description:
      "Afganistan'da eğitim ve geçim kaynağı odaklı çalışmalar planlanmaktadır. Faaliyet detayları ve sonuçları doğrulandıkça raporlanır.",
    image: "egitim",
    targetAmount: null,
    collectedAmount: null,
    suggestedAmounts: [250, 500, 1000],
    featured: true,
    createdAt: "2026-04-15",
  },
  {
    id: "c4",
    slug: "ramazan-iftar-sofrasi",
    title: "Ramazan İftar Sofrası",
    category: "Ramazan",
    region: "Çoklu Bölge",
    status: "Aktif",
    summary: "Bir sofraya bereket, bir aileye umut olun.",
    description:
      "Ramazan ayında iftar ve kumanya çalışmaları yürütülür. Program bölgelere göre planlanır ve süreç bilgilendirmeleri paylaşılır.",
    image: "ramazan",
    targetAmount: null,
    collectedAmount: null,
    suggestedAmounts: [300, 600, 1200],
    featured: true,
    createdAt: "2026-03-30",
  },
  {
    id: "c5",
    slug: "gida-kumanyasi",
    title: "Gıda Kumanyası",
    category: "Gıda Yardımı",
    region: "Türkiye",
    status: "Aktif",
    summary: "İhtiyaç sahibi ailelere temel gıda kolisi ulaştırıyoruz.",
    description:
      "Temel gıda malzemelerinden oluşan kumanya paketleri ihtiyaç sahibi ailelere ulaştırılır. Dağıtım listeleri gizlilik esasına göre yönetilir.",
    image: "gida",
    targetAmount: null,
    collectedAmount: null,
    suggestedAmounts: [400, 800, 1600],
    featured: false,
    createdAt: "2026-03-18",
  },
  {
    id: "c6",
    slug: "acil-yardim-fonu",
    title: "Acil Yardım Fonu",
    category: "Acil Yardım",
    region: "Genel",
    status: "Aktif",
    summary:
      "Afet ve acil durumlarda hızlı müdahale için esnek yardım fonu.",
    description:
      "Acil durumlarda hızlı hareket edebilmek için genel amaçlı bir fon oluşturulur. Kaynak, ihtiyaç önceliğine göre şeffaf biçimde yönlendirilir.",
    image: "acil",
    targetAmount: null,
    collectedAmount: null,
    suggestedAmounts: [500, 1000, 2000],
    featured: false,
    createdAt: "2026-02-20",
  },
  {
    id: "c7",
    slug: "pakistan-hazirlik-calismalari",
    title: "Pakistan Hazırlık Çalışmaları",
    category: "Genel",
    region: "Pakistan",
    status: "Hazırlık Aşamasında",
    summary:
      "Pakistan'daki çalışmalarımız hazırlık aşamasındadır. Detaylar netleştikçe paylaşılacaktır.",
    description:
      "Pakistan bölgesindeki çalışmalar hazırlık sürecindedir. Saha değerlendirmeleri tamamlanmadan tamamlanmış faaliyet olarak sunulmaz. Gelişmeler doğrulandıkça duyurulacaktır.",
    image: "pakistan",
    targetAmount: null,
    collectedAmount: null,
    suggestedAmounts: [],
    featured: true,
    createdAt: "2026-06-01",
  },
  {
    id: "c8",
    slug: "genel-bagis",
    title: "Genel Bağış",
    category: "Genel",
    region: "Genel",
    status: "Aktif",
    summary:
      "Bağışınızı en çok ihtiyaç duyulan alanlara yönlendirmemize izin verin.",
    description:
      "Genel bağışlar, ihtiyaç önceliğine göre uygun çalışmalara yönlendirilir. Süreç şeffaflık ilkesiyle yürütülür.",
    image: "genel",
    targetAmount: null,
    collectedAmount: null,
    suggestedAmounts: [250, 500, 1000, 2500],
    featured: false,
    createdAt: "2026-01-10",
  },
];

export const donations: Donation[] = [
  { id: "d1", reference: "AV-2026-000128", campaignTitle: "Hisse Kurban Bağışı", donorName: "A. Yılmaz", amount: 3500, method: "Online Kart", status: "Onaylandı", region: "Çoklu Bölge", createdAt: "2026-07-08T10:24:00" },
  { id: "d2", reference: "AV-2026-000127", campaignTitle: "Su Kuyusu Projeleri", donorName: "Kurumsal Bağışçı", amount: 10000, method: "Banka Havalesi / EFT", status: "Dekont Bekliyor", region: "Afrika", createdAt: "2026-07-08T09:02:00" },
  { id: "d3", reference: "AV-2026-000126", campaignTitle: "Gıda Kumanyası", donorName: "M. Demir", amount: 800, method: "Online Kart", status: "Onaylandı", region: "Türkiye", createdAt: "2026-07-07T18:40:00" },
  { id: "d4", reference: "AV-2026-000125", campaignTitle: "Ramazan İftar Sofrası", donorName: "S. Kaya", amount: 600, method: "Online Kart", status: "Beklemede", region: "Çoklu Bölge", createdAt: "2026-07-07T14:15:00" },
  { id: "d5", reference: "AV-2026-000124", campaignTitle: "Acil Yardım Fonu", donorName: "Anonim", amount: 2000, method: "Banka Havalesi / EFT", status: "İncelemede", region: "Genel", createdAt: "2026-07-06T20:05:00" },
  { id: "d6", reference: "AV-2026-000123", campaignTitle: "Afganistan Eğitim ve Kalkınma", donorName: "F. Şahin", amount: 500, method: "Online Kart", status: "Başarısız", region: "Afganistan", createdAt: "2026-07-06T11:30:00" },
  { id: "d7", reference: "AV-2026-000122", campaignTitle: "Genel Bağış", donorName: "H. Aydın", amount: 1000, method: "Manuel Kayıt", status: "Onaylandı", region: "Genel", createdAt: "2026-07-05T16:48:00" },
  { id: "d8", reference: "AV-2026-000121", campaignTitle: "Su Kuyusu Projeleri", donorName: "Z. Çelik", amount: 2500, method: "Online Kart", status: "Onaylandı", region: "Afrika", createdAt: "2026-07-05T08:12:00" },
];

export const donors: Donor[] = [
  { id: "u1", name: "A. Yılmaz", type: "Bireysel", email: "[Eklenecek]", phone: "[Eklenecek]", city: "İstanbul", totalDonations: 12500, donationCount: 6, firstDonationAt: "2025-11-02", kvkkConsent: true },
  { id: "u2", name: "Kurumsal Bağışçı", type: "Kurumsal", email: "[Eklenecek]", phone: "[Eklenecek]", city: "Ankara", totalDonations: 45000, donationCount: 4, firstDonationAt: "2025-09-14", kvkkConsent: true },
  { id: "u3", name: "M. Demir", type: "Bireysel", email: "[Eklenecek]", phone: "[Eklenecek]", city: "İzmir", totalDonations: 3200, donationCount: 5, firstDonationAt: "2026-01-20", kvkkConsent: true },
  { id: "u4", name: "S. Kaya", type: "Bireysel", email: "[Eklenecek]", phone: "[Eklenecek]", city: "Bursa", totalDonations: 1800, donationCount: 3, firstDonationAt: "2026-03-11", kvkkConsent: false },
  { id: "u5", name: "H. Aydın", type: "Bireysel", email: "[Eklenecek]", phone: "[Eklenecek]", city: "Konya", totalDonations: 4000, donationCount: 4, firstDonationAt: "2025-12-01", kvkkConsent: true },
];

export const volunteers: Volunteer[] = [
  { id: "v1", name: "E. Arslan", email: "[Eklenecek]", phone: "[Eklenecek]", city: "İstanbul", skill: "Saha koordinasyonu", availability: "Hafta sonu", status: "Yeni Başvuru", message: "Saha çalışmalarında görev almak istiyorum.", appliedAt: "2026-07-08" },
  { id: "v2", name: "B. Koç", email: "[Eklenecek]", phone: "[Eklenecek]", city: "Ankara", skill: "Grafik tasarım", availability: "Uzaktan", status: "Görüşülecek", message: "Tasarım desteği verebilirim.", appliedAt: "2026-07-06" },
  { id: "v3", name: "N. Yıldız", email: "[Eklenecek]", phone: "[Eklenecek]", city: "İzmir", skill: "Çeviri", availability: "Esnek", status: "Onaylandı", message: "İngilizce ve Arapça çeviri yapabilirim.", appliedAt: "2026-06-29" },
  { id: "v4", name: "O. Şen", email: "[Eklenecek]", phone: "[Eklenecek]", city: "Antalya", skill: "Lojistik", availability: "Tam zamanlı", status: "Pasif", message: "Depo ve lojistik deneyimim var.", appliedAt: "2026-06-15" },
];

export const receipts: Receipt[] = [
  { id: "r1", reference: "AV-2026-000127", donorName: "Kurumsal Bağışçı", amount: 10000, campaignTitle: "Su Kuyusu Projeleri", status: "Beklemede", fileName: "dekont-127.pdf", submittedAt: "2026-07-08T09:10:00" },
  { id: "r2", reference: "AV-2026-000124", donorName: "Anonim", amount: 2000, campaignTitle: "Acil Yardım Fonu", status: "İncelemede", fileName: "dekont-124.jpg", submittedAt: "2026-07-06T20:20:00" },
  { id: "r3", reference: "AV-2026-000118", donorName: "K. Öztürk", amount: 1500, campaignTitle: "Genel Bağış", status: "Onaylandı", fileName: "dekont-118.pdf", submittedAt: "2026-07-04T13:00:00" },
  { id: "r4", reference: "AV-2026-000110", donorName: "T. Polat", amount: 750, campaignTitle: "Gıda Kumanyası", status: "Reddedildi", fileName: "dekont-110.png", submittedAt: "2026-07-01T10:45:00" },
];

export const reports: Report[] = [
  { id: "rp1", slug: "afrika-su-kuyusu-saha-raporu", title: "Afrika Su Kuyusu Saha Raporu", region: "Afrika", category: "Saha Raporu", summary: "Su kuyusu çalışmalarına dair saha bilgilendirmesi. Sayısal veriler doğrulandıkça güncellenecektir.", image: "su", period: "[Eklenecek]", publishedAt: "2026-06-20", status: "Yayında" },
  { id: "rp2", slug: "gida-yardimi-donem-raporu", title: "Gıda Yardımı Dönem Raporu", region: "Türkiye", category: "Faaliyet Raporu", summary: "Gıda kumanyası dağıtım sürecine dair genel değerlendirme.", image: "gida", period: "[Eklenecek]", publishedAt: "2026-06-05", status: "Yayında" },
  { id: "rp3", slug: "afganistan-egitim-degerlendirmesi", title: "Afganistan Eğitim Değerlendirmesi", region: "Afganistan", category: "Değerlendirme", summary: "Eğitim odaklı çalışmalara yönelik ön değerlendirme raporu.", image: "egitim", period: "[Eklenecek]", publishedAt: "2026-05-22", status: "Yayında" },
  { id: "rp4", slug: "pakistan-hazirlik-durum-notu", title: "Pakistan Hazırlık Durum Notu", region: "Pakistan", category: "Hazırlık Süreci", summary: "Pakistan çalışmaları hazırlık aşamasındadır. Bu not, süreç bilgilendirmesidir; tamamlanmış faaliyet içermez.", image: "pakistan", period: "Hazırlık Aşamasında", publishedAt: "2026-06-25", status: "Yayında" },
];

export const news: NewsItem[] = [
  { id: "n1", slug: "yeni-donem-yardim-planlamasi", title: "Yeni Dönem Yardım Planlaması Duyurusu", region: "Genel", category: "Duyuru", summary: "Önümüzdeki dönem çalışma takvimimize dair genel bilgilendirme.", image: "genel", publishedAt: "2026-07-02", status: "Yayında" },
  { id: "n2", slug: "sahadan-su-kuyusu-notlari", title: "Sahadan: Su Kuyusu Çalışma Notları", region: "Afrika", category: "Haber", summary: "Afrika'daki su çalışmalarından güncel saha notları.", image: "su", publishedAt: "2026-06-18", status: "Yayında" },
  { id: "n3", slug: "gonullu-bulusmasi", title: "Gönüllü Buluşması Duyurusu", region: "Türkiye", category: "Duyuru", summary: "Gönüllülerimizle bir araya geleceğimiz buluşma hakkında bilgilendirme.", image: "gonullu", publishedAt: "2026-06-10", status: "Yayında" },
  { id: "n4", slug: "pakistan-hazirlik-bilgilendirmesi", title: "Pakistan Hazırlık Süreci Bilgilendirmesi", region: "Pakistan", category: "Duyuru", summary: "Pakistan çalışmaları hazırlık aşamasındadır. Gelişmeler doğrulandıkça paylaşılacaktır.", image: "pakistan", publishedAt: "2026-06-28", status: "Yayında" },
];

export const galleryAlbums: GalleryAlbum[] = [
  { id: "g1", slug: "afrika-saha-calismalari", title: "Afrika Saha Çalışmaları", region: "Afrika", cover: "su", photoCount: 6, createdAt: "2026-06-19", photos: [
    { src: "su", caption: "Su çalışmaları — [Eklenecek]" },
    { src: "gida", caption: "Gıda dağıtımı — [Eklenecek]" },
    { src: "genel", caption: "Saha ekibi — [Eklenecek]" },
    { src: "egitim", caption: "Eğitim desteği — [Eklenecek]" },
    { src: "acil", caption: "İhtiyaç değerlendirmesi — [Eklenecek]" },
    { src: "kurban", caption: "Dağıtım hazırlığı — [Eklenecek]" },
  ] },
  { id: "g2", slug: "turkiye-gida-yardimlari", title: "Türkiye Gıda Yardımları", region: "Türkiye", cover: "gida", photoCount: 4, createdAt: "2026-06-02", photos: [
    { src: "gida", caption: "Kumanya paketleme — [Eklenecek]" },
    { src: "genel", caption: "Gönüllü çalışması — [Eklenecek]" },
    { src: "acil", caption: "Dağıtım noktası — [Eklenecek]" },
    { src: "ramazan", caption: "Aile ziyareti — [Eklenecek]" },
  ] },
  { id: "g3", slug: "pakistan-hazirlik", title: "Pakistan Hazırlık", region: "Pakistan", cover: "pakistan", photoCount: 2, createdAt: "2026-06-27", photos: [
    { src: "pakistan", caption: "Hazırlık süreci — [Eklenecek]" },
    { src: "genel", caption: "Planlama çalışması — [Eklenecek]" },
  ] },
];

export const messages: Message[] = [
  { id: "m1", name: "Ziyaretçi", email: "[Eklenecek]", subject: "Bağış makbuzu hakkında", preview: "Yaptığım bağışın makbuzunu nasıl temin edebilirim?", body: "Merhaba, yaptığım bağışın makbuzunu nasıl temin edebilirim? Bilgilendirebilir misiniz?", status: "Yeni", receivedAt: "2026-07-08T12:00:00" },
  { id: "m2", name: "Kurumsal İletişim", email: "[Eklenecek]", subject: "İş birliği talebi", preview: "Kurumsal destek konusunda görüşmek istiyoruz.", body: "Şirketimiz adına kurumsal destek konusunda görüşmek istiyoruz. Uygun bir zaman planlayabilir miyiz?", status: "Yanıtlandı", receivedAt: "2026-07-06T09:30:00" },
  { id: "m3", name: "Gönüllü Adayı", email: "[Eklenecek]", subject: "Gönüllülük süreci", preview: "Gönüllü başvurumun durumunu öğrenebilir miyim?", body: "Geçen hafta gönüllü başvurusu yaptım, sürecin durumunu öğrenebilir miyim?", status: "Kapalı", receivedAt: "2026-07-03T15:10:00" },
];

export const adminUsers: AdminUser[] = [
  { id: "au1", name: "Sistem Yöneticisi", email: "[Eklenecek]", role: "Yönetici", status: "Aktif", lastActiveAt: "2026-07-09T22:00:00" },
  { id: "au2", name: "İçerik Editörü", email: "[Eklenecek]", role: "Editör", status: "Aktif", lastActiveAt: "2026-07-09T18:20:00" },
  { id: "au3", name: "Operasyon Sorumlusu", email: "[Eklenecek]", role: "Operatör", status: "Aktif", lastActiveAt: "2026-07-08T11:05:00" },
  { id: "au4", name: "Denetim Kullanıcısı", email: "[Eklenecek]", role: "Görüntüleyici", status: "Pasif", lastActiveAt: "2026-06-30T09:00:00" },
];

export const auditLogs: AuditLog[] = [
  { id: "l1", actor: "Sistem Yöneticisi", action: "Dekont onayladı", target: "AV-2026-000118", ip: "[Eklenecek]", createdAt: "2026-07-09T21:44:00" },
  { id: "l2", actor: "İçerik Editörü", action: "Rapor yayınladı", target: "Afrika Su Kuyusu Saha Raporu", ip: "[Eklenecek]", createdAt: "2026-07-09T17:12:00" },
  { id: "l3", actor: "Operasyon Sorumlusu", action: "Kampanya güncelledi", target: "Su Kuyusu Projeleri", ip: "[Eklenecek]", createdAt: "2026-07-08T10:30:00" },
  { id: "l4", actor: "Sistem Yöneticisi", action: "Kullanıcı rolü değiştirdi", target: "Denetim Kullanıcısı", ip: "[Eklenecek]", createdAt: "2026-07-07T14:00:00" },
];

export const notificationTemplates: NotificationTemplate[] = [
  { id: "t1", name: "Bağış Alındı Bildirimi", channel: "E-posta", subject: "Bağışınız alındı", body: "Sayın bağışçımız, bağışınız kayıt altına alınmıştır. Referans: {{referans}}. Teşekkür ederiz.", updatedAt: "2026-06-30" },
  { id: "t2", name: "Dekont Onayı", channel: "SMS", subject: "Dekont onaylandı", body: "Havale/EFT bildiriminiz onaylanmıştır. Referans: {{referans}}.", updatedAt: "2026-06-28" },
  { id: "t3", name: "Gönüllü Başvuru Yanıtı", channel: "WhatsApp", subject: "Başvurunuz alındı", body: "Gönüllü başvurunuz alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.", updatedAt: "2026-06-20" },
];

export const kurbanRecords: KurbanRecord[] = [
  { id: "k1", reference: "KRB-2026-0042", ownerName: "A. Yılmaz", kurbanType: "Vacip Kurban", shares: 1, region: "Çoklu Bölge", status: "Vekalet Alındı", createdAt: "2026-07-08" },
  { id: "k2", reference: "KRB-2026-0041", ownerName: "M. Demir", kurbanType: "Adak Kurbanı", shares: 1, region: "Afrika", status: "Ödeme Tamamlandı", createdAt: "2026-07-07" },
  { id: "k3", reference: "KRB-2026-0040", ownerName: "S. Kaya", kurbanType: "Şükür Kurbanı", shares: 2, region: "Türkiye", status: "Kesim Bekliyor", createdAt: "2026-07-06" },
  { id: "k4", reference: "KRB-2026-0039", ownerName: "H. Aydın", kurbanType: "Akika Kurbanı", shares: 1, region: "Afganistan", status: "Dağıtıldı", createdAt: "2026-07-02" },
];

export const ramazanRecords: RamazanRecord[] = [
  { id: "rz1", reference: "RMZ-2026-0210", donorName: "A. Yılmaz", aidType: "İftar", quantity: 20, region: "Türkiye", status: "Onaylandı", createdAt: "2026-07-08" },
  { id: "rz2", reference: "RMZ-2026-0209", donorName: "Kurumsal Bağışçı", aidType: "Kumanya", quantity: 50, region: "Afrika", status: "Beklemede", createdAt: "2026-07-07" },
  { id: "rz3", reference: "RMZ-2026-0208", donorName: "N. Yıldız", aidType: "Fitre", quantity: 4, region: "Genel", status: "Onaylandı", createdAt: "2026-07-06" },
];

/** Lookups used by dynamic routes. */
export const findCampaign = (slug: string) =>
  campaigns.find((c) => c.slug === slug);
export const findReport = (slug: string) => reports.find((r) => r.slug === slug);
export const findNews = (slug: string) => news.find((n) => n.slug === slug);
export const findAlbum = (slug: string) =>
  galleryAlbums.find((a) => a.slug === slug);
