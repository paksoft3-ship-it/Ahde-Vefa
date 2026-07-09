import type { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import { routes } from "@/lib/routes";
import { GENERAL_FAQ } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/ui/Blocks";
import { FAQAccordion, type FAQItem } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular | AHDE VEFA İnsani Yardım Derneği",
  description:
    "Bağış, kurban, ramazan ve gönüllülük hakkında sıkça sorulan sorular. AHDE VEFA süreçlerine dair merak ettikleriniz için yardım merkezi.",
};

const BAGIS_FAQ: FAQItem[] = [
  {
    question: "Hangi ödeme yöntemleriyle bağış yapabilirim?",
    answer:
      "Online kart ödemesi ile veya banka havalesi/EFT yöntemiyle bağış yapabilirsiniz. Havale/EFT ile yapılan bağışlarda dekontunuzu “Dekont Bildir” sayfasından iletebilirsiniz.",
  },
  {
    question: "Belirli bir kampanyaya yönlendirerek bağış yapabilir miyim?",
    answer:
      "Evet. Bağış sırasında desteklemek istediğiniz kampanyayı veya bağış türünü seçebilirsiniz. Bağışınız seçtiğiniz alana yönlendirilir.",
  },
  {
    question: "Bağış tutarında alt veya üst sınır var mı?",
    answer:
      "Dilediğiniz tutarda bağış yapabilirsiniz. Sayfalarda gösterilen önerilen tutarlar yalnızca kolaylık amaçlı örnek değerlerdir.",
  },
];

const KURBAN_FAQ: FAQItem[] = [
  {
    question: "Kurban bağışımı vekaletle verebilir miyim?",
    answer:
      "Evet. Kurban bağışınızı vekalet vererek gerçekleştirebilirsiniz. Vekalet bilgilerinizi kurban bağış adımlarında paylaşabilirsiniz.",
  },
  {
    question: "Kurban hisse ile bağış mümkün mü?",
    answer:
      "Kurban türüne göre hisse ile katılım sağlayabilirsiniz. Uygun seçenekler kurban sayfasındaki adımlarda sunulur.",
  },
  {
    question: "Ramazan döneminde hangi yardımlar yapılıyor?",
    answer:
      "Ramazan döneminde iftar ve gıda kumanyası odaklı yardım çalışmaları yürütülür. Detayları Ramazan sayfasından inceleyebilirsiniz.",
  },
];

const GONULLU_FAQ: FAQItem[] = [
  {
    question: "Gönüllü olmak için nasıl başvurabilirim?",
    answer:
      "“Gönüllü Ol” sayfasındaki başvuru formunu doldurarak başvurunuzu iletebilirsiniz. Ekibimiz değerlendirme sonrası sizinle iletişime geçer.",
  },
  {
    question: "Hangi alanlarda gönüllü katkı sağlayabilirim?",
    answer:
      "Saha çalışması, lojistik, iletişim, çeviri ve organizasyon gibi farklı alanlarda ilgi ve becerilerinize göre katkı sağlayabilirsiniz.",
  },
  {
    question: "Kurumsal destek veya iş birliği için nasıl iletişime geçebilirim?",
    answer:
      "Kurumsal destek talepleriniz için “Kurumsal Destek” sayfasını ziyaret edebilir veya İletişim formu üzerinden bize ulaşabilirsiniz.",
  },
];

const CATEGORIES = [
  { title: "Genel Sorular", items: GENERAL_FAQ },
  { title: "Bağış ve Ödeme", items: BAGIS_FAQ },
  { title: "Kurban ve Ramazan", items: KURBAN_FAQ },
  { title: "Gönüllülük ve İş Birliği", items: GONULLU_FAQ },
];

export default function SSSPage() {
  return (
    <>
      <PageHero
        title="Sıkça Sorulan Sorular"
        description="Bağış, kurban, ramazan ve gönüllülük süreçlerine dair merak ettiklerinizi bir araya getirdik."
        breadcrumb={[
          { label: "Anasayfa", href: routes.home },
          { label: "SSS" },
        ]}
      />

      <section className="container-page py-14 md:py-20">
        <div className="mx-auto max-w-3xl space-y-12">
          {CATEGORIES.map((category) => (
            <div key={category.title}>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-mint text-brand-green">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-extrabold text-brand-green md:text-2xl">
                  {category.title}
                </h2>
              </div>
              <FAQAccordion items={category.items} />
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Sorunuzun yanıtını bulamadınız mı?"
        description="Destek ekibimiz size yardımcı olmak için hazır. Bize ulaşın, en kısa sürede dönüş yapalım."
        primary={{ label: "İletişime Geç", href: routes.iletisim }}
        secondary={{ label: "Bağış Yap", href: routes.bagis }}
        tone="cream"
      />
    </>
  );
}
