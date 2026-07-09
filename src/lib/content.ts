import type { FAQItem } from "@/components/ui/Accordion";

/** General FAQ used on homepage, donation pages and the SSS page. */
export const GENERAL_FAQ: FAQItem[] = [
  {
    question: "Bağışım ihtiyaç sahiplerine nasıl ulaşıyor?",
    answer:
      "Bağışlarınız ihtiyaç önceliğine göre saha ekiplerimiz aracılığıyla ilgili çalışmalara yönlendirilir. Süreç şeffaflık ilkesiyle yürütülür ve doğrulanan faaliyetler raporlarla paylaşılır.",
  },
  {
    question: "Bağış makbuzu / dekont alabilir miyim?",
    answer:
      "Evet. Online bağışlarda referans numaranız oluşturulur. Banka havalesi/EFT ile yaptığınız bağışlarda dekontunuzu “Dekont Bildir” sayfası üzerinden iletebilirsiniz.",
  },
  {
    question: "Bağışımı nasıl takip edebilirim?",
    answer:
      "“Bağış Takip” sayfasından referans numaranız ve iletişim bilginizle bağışınızın durumunu sorgulayabilirsiniz.",
  },
  {
    question: "Kredi kartı bilgilerim güvende mi?",
    answer:
      "Kart bilgileriniz sistemimizde saklanmaz. Ödeme sağlayıcı entegrasyonu tamamlandığında ödemeler güvenli altyapı üzerinden alınır.",
  },
  {
    question: "Pakistan çalışmaları hakkında bilgi var mı?",
    answer:
      "Pakistan çalışmalarımız hazırlık aşamasındadır. Bu bölgeye ait tamamlanmış faaliyet verisi henüz paylaşılmamıştır; gelişmeler doğrulandıkça duyurulacaktır.",
  },
  {
    question: "Dernek resmi bilgileri nerede yer alıyor?",
    answer:
      "Dernek Kütük No ve Yardım Toplama İzin No gibi resmi bilgiler, dernek tarafından tamamlandıkça sitenin alt bilgi (footer) ve yasal metinler bölümünde yayımlanacaktır.",
  },
];

export const DONATION_STEPS = [
  {
    title: "Bağış Türünü Seçin",
    description: "Desteklemek istediğiniz kampanyayı ve bağış türünü belirleyin.",
  },
  {
    title: "Tutar ve Bilgiler",
    description: "Bağış tutarını girin ve iletişim bilgilerinizi ekleyin.",
  },
  {
    title: "Ödeme Yöntemi",
    description: "Online kart veya banka havalesi/EFT yöntemini seçin.",
  },
  {
    title: "Onay ve Takip",
    description: "Referans numaranızla bağışınızı takip edin, bilgilendirme alın.",
  },
];
