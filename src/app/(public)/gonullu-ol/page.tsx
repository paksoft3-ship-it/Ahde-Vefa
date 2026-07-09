import type { Metadata } from "next";
import { HandHeart, HeartHandshake, MapPin, Sparkles, Users } from "lucide-react";
import { routes } from "@/lib/routes";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepTimeline } from "@/components/ui/Blocks";
import { FAQAccordion, type FAQItem } from "@/components/ui/Accordion";
import { VolunteerForm } from "./VolunteerForm";

export const metadata: Metadata = {
  title: "Gönüllü Ol | AHDE VEFA İnsani Yardım Derneği",
  description:
    "AHDE VEFA gönüllüsü olun. Saha çalışmalarından iletişime, iyiliği büyüten ekibimizde yer alın. Gönüllü başvuru formunu doldurun.",
};

const REASONS = [
  {
    icon: HeartHandshake,
    title: "İyiliğe Doğrudan Dokunun",
    description:
      "Yürütülen çalışmalarda aktif rol alarak ihtiyaç sahiplerine ulaşan iyiliğin bir parçası olun.",
  },
  {
    icon: Users,
    title: "Güçlü Bir Topluluk",
    description:
      "Aynı değerleri paylaşan gönüllülerle tanışın, birlikte üretmenin gücünü deneyimleyin.",
  },
  {
    icon: Sparkles,
    title: "Deneyim ve Gelişim",
    description:
      "Saha, lojistik, iletişim ve organizasyon alanlarında yeni beceriler kazanın.",
  },
  {
    icon: MapPin,
    title: "Esnek Katılım",
    description:
      "Uygunluğunuza göre hafta içi, hafta sonu veya kampanya dönemlerinde destek verin.",
  },
];

const AREAS = [
  "Saha Çalışması ve Dağıtım",
  "Lojistik ve Organizasyon",
  "İletişim ve Sosyal Medya",
  "Bağış Danışmanlığı",
  "Çeviri Desteği",
  "Etkinlik ve Tanıtım",
];

const PROCESS = [
  {
    title: "Başvuru Formu",
    description: "Aşağıdaki formu doldurarak gönüllü başvurunuzu iletin.",
  },
  {
    title: "Ön Görüşme",
    description:
      "Ekibimiz başvurunuzu değerlendirir ve sizinle iletişime geçerek tanışır.",
  },
  {
    title: "Yönlendirme",
    description:
      "İlgi alanınıza ve uygunluğunuza en uygun çalışma alanına yönlendirilirsiniz.",
  },
  {
    title: "Katılım",
    description:
      "Gönüllü ekibimize katılır, çalışmalarda aktif olarak yer almaya başlarsınız.",
  },
];

const FAQ: FAQItem[] = [
  {
    question: "Gönüllü olmak için özel bir deneyim gerekli mi?",
    answer:
      "Hayır. Farklı ilgi ve becerilere sahip herkes gönüllü olabilir. Başvurunuzun ardından size en uygun çalışma alanına yönlendirilirsiniz.",
  },
  {
    question: "Ne kadar zaman ayırmam gerekiyor?",
    answer:
      "Gönüllülük katkınız esnektir. Uygunluğunuza göre hafta içi, hafta sonu veya yalnızca kampanya dönemlerinde destek verebilirsiniz.",
  },
  {
    question: "Başvurumun sonucunu nasıl öğrenirim?",
    answer:
      "Başvurunuz ekibimiz tarafından değerlendirilir ve formda paylaştığınız iletişim bilgileri üzerinden sizinle iletişime geçilir.",
  },
  {
    question: "Farklı şehirlerden gönüllü olabilir miyim?",
    answer:
      "Evet. Saha dışı iletişim, çeviri ve organizasyon gibi alanlarda bulunduğunuz şehirden bağımsız olarak katkı sağlayabilirsiniz.",
  },
];

export default function GonulluOlPage() {
  return (
    <>
      <PageHero
        title="Gönüllü Ol"
        description="İyiliği büyüten ekibimizin bir parçası olun. Bilginizi, zamanınızı ve gönlünüzü ihtiyaç sahipleriyle buluşturun."
        breadcrumb={[
          { label: "Anasayfa", href: routes.home },
          { label: "Gönüllü Ol" },
        ]}
      />

      {/* Why volunteer */}
      <section className="container-page py-14 md:py-20">
        <SectionHeading
          eyebrow="Neden Gönüllü Olmalı?"
          title="Birlikte Daha Fazlasını Başarıyoruz"
          description="Gönüllülerimiz, çalışmalarımızın kalbinde yer alır."
          align="center"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="card p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-mint text-brand-green">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm text-muted">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Areas */}
      <section className="bg-brand-mint py-14 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Gönüllülük Alanları"
            title="Katkı Sağlayabileceğiniz Alanlar"
            description="İlgi ve becerilerinize göre farklı çalışmalarda yer alabilirsiniz."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((area) => (
              <div
                key={area}
                className="flex items-center gap-3 rounded-lg border border-hairline bg-white p-4"
              >
                <HandHeart className="h-5 w-5 shrink-0 text-brand-turquoise" />
                <span className="font-semibold text-ink">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process + Form */}
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[380px_1fr]">
          <div>
            <SectionHeading
              eyebrow="Nasıl İşliyor?"
              title="Gönüllülük Süreci"
            />
            <StepTimeline steps={PROCESS} />
          </div>
          <div>
            <VolunteerForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-cream py-14 md:py-20">
        <div className="container-page max-w-3xl">
          <SectionHeading
            eyebrow="Sıkça Sorulan Sorular"
            title="Gönüllülük Hakkında Merak Edilenler"
            align="center"
          />
          <FAQAccordion items={FAQ} />
        </div>
      </section>
    </>
  );
}
