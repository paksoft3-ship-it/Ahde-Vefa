import type { Metadata } from "next";
import {
  BadgeCheck,
  HandCoins,
  HeartHandshake,
  ScrollText,
  Sprout,
  Users,
} from "lucide-react";
import { reports } from "@/lib/mock-data";
import { routes } from "@/lib/routes";
import { GENERAL_FAQ } from "@/lib/content";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LegalInfoCard, StepTimeline, CTASection } from "@/components/ui/Blocks";
import { FAQAccordion } from "@/components/ui/Accordion";
import { MediaImage } from "@/components/ui/MediaImage";
import { ReportCard } from "@/components/public/Cards";
import { DonationQuickCard } from "@/components/forms/DonationQuickCard";
import { KurbanForm } from "./KurbanForm";

export const metadata: Metadata = {
  title: "Kurban Bağışı | AHDE VEFA İnsani Yardım Derneği",
  description:
    "Vekaletle kurban bağışınızı şeffaf ve izlenebilir bir süreçle ihtiyaç sahiplerine ulaştırıyoruz. Kurban türleri, vekalet ve süreç bilgilendirmesi.",
};

const KURBAN_TYPES = [
  {
    title: "Vacip Kurban",
    desc: "Dinen kurban kesmekle yükümlü olanların yerine getirdiği kurbandır.",
    icon: BadgeCheck,
  },
  {
    title: "Adak Kurbanı",
    desc: "Bir dileğin gerçekleşmesi üzerine adanan ve yerine getirilen kurbandır.",
    icon: ScrollText,
  },
  {
    title: "Akika Kurbanı",
    desc: "Çocuğun dünyaya gelmesine şükür niyetiyle kesilen kurbandır.",
    icon: Sprout,
  },
  {
    title: "Şükür Kurbanı",
    desc: "Bir nimete kavuşma vesilesiyle şükür amacıyla kesilen kurbandır.",
    icon: HandCoins,
  },
  {
    title: "Nafile Kurban",
    desc: "Yükümlülük olmaksızın gönüllü olarak kesilen kurbandır.",
    icon: Users,
  },
];

const KURBAN_STEPS = [
  {
    title: "Vekalet",
    description:
      "Kurban türünüzü ve bölgeyi seçerek dernek adına vekalet verirsiniz.",
  },
  {
    title: "Ödeme",
    description:
      "Hisse bedeli dernek tarafından bildirilir; ödemenizi güvenle yaparsınız.",
  },
  {
    title: "Kesim",
    description:
      "Kurbanınız dini usullere uygun şekilde, belirlenen bölgede kesilir.",
  },
  {
    title: "Dağıtım",
    description:
      "Kurban etleri ihtiyaç sahiplerine adil ve onurlu bir şekilde ulaştırılır.",
  },
  {
    title: "Raporlama",
    description:
      "Sürece dair saha bilgilendirmeleri ve raporlar sizinle paylaşılır.",
  },
];

export default function KurbanPage() {
  const kurbanReports = reports.filter(
    (r) => r.category === "Saha Raporu" || r.region === "Afrika" || r.region === "Afganistan",
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-cream">
        <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="badge bg-white text-brand-green ring-1 ring-inset ring-brand-green/15">
              <HeartHandshake className="h-4 w-4" /> Kurban Bağışı
            </span>
            <h1 className="mt-5 text-[32px] font-extrabold leading-[1.1] text-brand-green md:text-[48px]">
              Kurbanınız vekaletle, emanetiniz güvende
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Kurban bağışınızı dini usullere uygun, şeffaf ve izlenebilir bir
              süreçle ihtiyaç sahiplerine ulaştırıyoruz. Hisse bedeli ve güncel
              bilgiler dernek tarafından paylaşılır.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#kurban-form" variant="primary" size="lg">
                Vekalet Ver
              </ButtonLink>
              <ButtonLink href={routes.bagisTakip} variant="secondary" size="lg">
                Bağışını Takip Et
              </ButtonLink>
            </div>
          </div>
          <div className="lg:pl-6">
            <DonationQuickCard defaultType="Kurban Bağışı" title="Kurban Bağışı" />
          </div>
        </div>
      </section>

      {/* Kurban türleri */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Kurban Türleri"
          title="Hangi kurbanı vekaletle kesebilirsiniz?"
          description="İhtiyacınıza uygun kurban türünü seçerek vekalet verebilirsiniz. Dini hüküm ve bilgiler için dernek ekibimizle iletişime geçebilirsiniz."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {KURBAN_TYPES.map(({ title, desc, icon: Icon }) => (
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

      {/* Vekalet section */}
      <section className="bg-brand-mint/50 py-16 md:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-hairline shadow-card">
            <MediaImage keyword="kurban" className="h-64 w-full lg:h-80" />
          </div>
          <div>
            <SectionHeading
              eyebrow="Vekalet"
              title="Vekalet nedir, nasıl işler?"
              description="Vekalet, kurbanınızın sizin adınıza kesilmesi için dernekle yaptığınız yetkilendirmedir."
            />
            <ul className="space-y-4">
              {[
                "Formu doldurarak dernek adına vekalet verirsiniz.",
                "Hisse bedeli ve ödeme yöntemi dernek tarafından iletilir.",
                "Kurbanınız dini usullere uygun şekilde belirlenen bölgede kesilir.",
                "Süreç boyunca bilgilendirilir, raporlarla süreci takip edersiniz.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                  <span className="text-sm text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Süreç timeline */}
      <section className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Süreç"
              title="Kurban Süreci"
              description="Vekaletten raporlamaya kadar şeffaf ve izlenebilir adımlar."
            />
            <StepTimeline steps={KURBAN_STEPS} />
          </div>
          <div className="flex flex-col gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-bold text-brand-green">
                Kesim ve Dağıtım Bilgilendirmesi
              </h3>
              <p className="mt-3 text-sm text-muted">
                Kurbanlar dini usullere uygun olarak, hijyen ve saha koşulları
                gözetilerek kesilir. Etler ihtiyaç sahiplerine adil, onurlu ve
                israftan uzak bir şekilde dağıtılır.
              </p>
              <p className="mt-3 text-sm text-muted">
                Kesim ve dağıtım takvimi, güncel hisse bedelleri ve dini hükümlere
                dair bilgiler dernek tarafından paylaşılır. Görsellerde onur ve
                mahremiyeti gözeten bir yaklaşım benimsenir.
              </p>
            </div>
            <LegalInfoCard />
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="kurban-form" className="bg-brand-cream py-16 md:py-20">
        <div className="container-page max-w-3xl">
          <SectionHeading
            eyebrow="Vekalet Formu"
            title="Kurban Vekaleti Verin"
            description="Bilgilerinizi iletin, dernek ekibimiz süreç boyunca sizinle iletişimde olsun."
            align="center"
          />
          <KurbanForm />
        </div>
      </section>

      {/* Saha / raporlama */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Şeffaflık"
          title="Saha ve Raporlama"
          description="Doğrulanan çalışmalara dair saha bilgilendirmeleri ve raporlar."
          action={{ label: "Tüm Raporlar", href: routes.raporlar }}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {kurbanReports.map((r) => (
            <ReportCard key={r.id} report={r} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-mint/50 py-16 md:py-20">
        <div className="container-page max-w-3xl">
          <SectionHeading
            eyebrow="Yardım"
            title="Sıkça Sorulan Sorular"
            align="center"
          />
          <FAQAccordion items={GENERAL_FAQ} />
        </div>
      </section>

      <CTASection
        tone="green"
        title="Kurbanınız bir umut, bir sofraya bereket olsun"
        description="Vekaletinizi iletin, emaneti ihtiyaç sahiplerine birlikte ulaştıralım."
        primary={{ label: "Vekalet Ver", href: "#kurban-form" }}
        secondary={{ label: "Bize Ulaşın", href: routes.iletisim }}
      />
    </>
  );
}
