import type { Metadata } from "next";
import {
  Award,
  Boxes,
  CalendarHeart,
  Eye,
  Handshake,
  HeartHandshake,
  LineChart,
  Users,
} from "lucide-react";
import { routes } from "@/lib/routes";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LegalInfoCard, StepTimeline, CTASection } from "@/components/ui/Blocks";
import { CorporateForm } from "./CorporateForm";

export const metadata: Metadata = {
  title: "Kurumsal Destek | AHDE VEFA İnsani Yardım Derneği",
  description:
    "Sponsorluk, ayni yardım, gönüllülük ve etkinlik iş birlikleriyle kurumunuzla sürdürülebilir sosyal etki oluşturun.",
};

const SUPPORT_TYPES = [
  {
    title: "Sponsorluk",
    desc: "Kampanya ve saha çalışmalarına kurumsal sponsorluk desteği sağlayın.",
    icon: Award,
  },
  {
    title: "Ayni Yardım",
    desc: "Ürün ve hizmet bağışlarıyla ihtiyaç sahiplerine katkıda bulunun.",
    icon: Boxes,
  },
  {
    title: "Gönüllülük",
    desc: "Çalışanlarınızla kurumsal gönüllülük programlarına katılın.",
    icon: Users,
  },
  {
    title: "Etkinlik İş Birliği",
    desc: "Farkındalık ve dayanışma etkinliklerinde iş birliği geliştirin.",
    icon: CalendarHeart,
  },
];

const ADVANTAGES = [
  {
    title: "Şeffaf İş Birliği",
    desc: "Süreçler izlenebilir; doğrulanan çalışmalar raporlarla paylaşılır.",
    icon: Eye,
  },
  {
    title: "Sürdürülebilir Etki",
    desc: "Kurumunuzun sosyal sorumluluk hedefleriyle uyumlu, kalıcı katkılar.",
    icon: LineChart,
  },
  {
    title: "Güçlü Dayanışma",
    desc: "Gönüllü ağı ve saha deneyimiyle güvenilir bir iş birliği.",
    icon: HeartHandshake,
  },
];

const PROCESS_STEPS = [
  {
    title: "Başvuru",
    description: "İş birliği formunu doldurarak talebinizi iletirsiniz.",
  },
  {
    title: "Görüşme",
    description: "Ekibimiz ihtiyaç ve beklentileri birlikte değerlendirir.",
  },
  {
    title: "Planlama",
    description: "Kuruma özel iş birliği modeli ve kapsam belirlenir.",
  },
  {
    title: "Uygulama",
    description: "İş birliği hayata geçirilir ve süreç birlikte yürütülür.",
  },
  {
    title: "Raporlama",
    description: "Doğrulanan çalışmalar şeffaf bir şekilde raporlanır.",
  },
];

export default function KurumsalDestekPage() {
  return (
    <>
      <PageHero
        tone="cream"
        title="Kurumsal Destek ve İş Birliği"
        description="Kurumunuzla sürdürülebilir sosyal etki oluşturun. Sponsorluktan gönüllülüğe kadar farklı iş birliği modelleriyle iyiliğe ortak olun."
        breadcrumb={[
          { label: "Anasayfa", href: routes.home },
          { label: "Kurumsal Destek" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#kurumsal-form" className="btn btn-primary btn-lg">
            İş Birliği Başvurusu
          </a>
          <a href={routes.iletisim} className="btn btn-secondary btn-lg">
            Bize Ulaşın
          </a>
        </div>
      </PageHero>

      {/* Destek türleri */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Destek Türleri"
          title="Nasıl İş Birliği Yapabilirsiniz?"
          description="Kurumunuza ve hedeflerinize en uygun destek modelini birlikte belirleyelim."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SUPPORT_TYPES.map(({ title, desc, icon: Icon }) => (
            <div key={title} className="card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-mint text-brand-green">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Avantajlar */}
      <section className="bg-brand-mint/50 py-16 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Neden Biz?"
            title="İş Birliğinin Avantajları"
            description="Güvenilir, şeffaf ve sürdürülebilir bir dayanışma ortağı."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {ADVANTAGES.map(({ title, desc, icon: Icon }) => (
              <div key={title} className="card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-brand-green ring-1 ring-brand-green/10">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Süreç */}
      <section className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Süreç"
              title="İş Birliği Süreci"
              description="Başvurudan raporlamaya kadar şeffaf adımlar."
            />
            <StepTimeline steps={PROCESS_STEPS} />
          </div>
          <div className="flex flex-col gap-6">
            <div className="card flex flex-col gap-3 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-mint text-brand-green">
                <Handshake className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold text-brand-green">
                Kuruma Özel Planlama
              </h3>
              <p className="text-sm text-muted">
                Her kurumun ihtiyaçları farklıdır. İş birliği kapsamını, sponsorluk
                ve gönüllülük detaylarını birlikte planlıyor; süreç boyunca şeffaf
                bir iletişim yürütüyoruz.
              </p>
            </div>
            <LegalInfoCard />
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="kurumsal-form" className="bg-brand-cream py-16 md:py-20">
        <div className="container-page max-w-3xl">
          <SectionHeading
            eyebrow="Başvuru"
            title="İş Birliği Başvurusu"
            description="Bilgilerinizi iletin, kurumsal iş birliği için birlikte çalışalım."
            align="center"
          />
          <CorporateForm />
        </div>
      </section>

      <CTASection
        tone="green"
        title="Kurumunuzla kalıcı bir sosyal etki oluşturun"
        description="Sürdürülebilir iş birlikleriyle iyiliği birlikte büyütelim."
        primary={{ label: "İş Birliği Başvurusu", href: "#kurumsal-form" }}
        secondary={{ label: "Bize Ulaşın", href: routes.iletisim }}
      />
    </>
  );
}
