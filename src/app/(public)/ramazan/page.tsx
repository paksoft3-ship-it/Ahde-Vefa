import type { Metadata } from "next";
import {
  HandCoins,
  Info,
  Moon,
  ShoppingBasket,
  Utensils,
  Wallet,
} from "lucide-react";
import { reports } from "@/lib/mock-data";
import { routes } from "@/lib/routes";
import { GENERAL_FAQ } from "@/lib/content";
import { PLACEHOLDER } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepTimeline, CTASection } from "@/components/ui/Blocks";
import { FAQAccordion } from "@/components/ui/Accordion";
import { MediaImage } from "@/components/ui/MediaImage";
import { ReportCard } from "@/components/public/Cards";
import { DonationQuickCard } from "@/components/forms/DonationQuickCard";

export const metadata: Metadata = {
  title: "Ramazan Yardımları | AHDE VEFA İnsani Yardım Derneği",
  description:
    "Ramazan ayında iftar, kumanya, fitre, fidye ve zekat bağışlarınızla bir sofraya bereket olun. Fiyat ve hüküm bilgileri dernek tarafından paylaşılır.",
};

const CAMPAIGN_TYPES = [
  {
    title: "İftar",
    desc: "İhtiyaç sahiplerinin iftar sofrasına ortak olun.",
    icon: Utensils,
    keyword: "ramazan",
  },
  {
    title: "Kumanya",
    desc: "Temel gıda kolileriyle ailelerin Ramazan'ına destek olun.",
    icon: ShoppingBasket,
    keyword: "gida",
  },
  {
    title: "Fitre",
    desc: "Fitrenizi güvenilir bir süreçle ihtiyaç sahiplerine ulaştırın.",
    icon: HandCoins,
    keyword: "genel",
  },
  {
    title: "Fidye",
    desc: "Fidyenizi dini usullere uygun şekilde yerine ulaştırıyoruz.",
    icon: Wallet,
    keyword: "genel",
  },
  {
    title: "Zekat",
    desc: "Zekatınızı şeffaf ve izlenebilir bir şekilde emanet edin.",
    icon: Moon,
    keyword: "acil",
  },
];

const RAMAZAN_STEPS = [
  {
    title: "Bağış",
    description: "Destek türünü seçerek Ramazan bağışınızı iletirsiniz.",
  },
  {
    title: "Planlama",
    description: "Bağışlar bölge ve ihtiyaç önceliğine göre planlanır.",
  },
  {
    title: "Ulaştırma",
    description:
      "İftar, kumanya ve nakdi yardımlar ihtiyaç sahiplerine ulaştırılır.",
  },
  {
    title: "Raporlama",
    description: "Sürece dair saha bilgilendirmeleri ve raporlar paylaşılır.",
  },
];

const REGIONS = [
  { label: "Afrika", href: routes.afrika, keyword: "su", desc: "Su, gıda ve iftar destekleri" },
  { label: "Afganistan", href: routes.afganistan, keyword: "egitim", desc: "Kumanya ve temel ihtiyaç desteği" },
  { label: "Türkiye", href: routes.turkiye, keyword: "gida", desc: "Yerel iftar ve kumanya çalışmaları" },
];

export default function RamazanPage() {
  const ramazanReports = reports.filter(
    (r) => r.category === "Faaliyet Raporu" || r.region === "Türkiye" || r.region === "Afrika",
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-cream">
        <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="badge bg-white text-brand-green ring-1 ring-inset ring-brand-green/15">
              <Moon className="h-4 w-4" /> Ramazan Yardımları
            </span>
            <h1 className="mt-5 text-[32px] font-extrabold leading-[1.1] text-brand-green md:text-[48px]">
              Bir sofraya bereket olun
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Ramazan ayında iftar, kumanya ve nakdi yardımlarınızla ihtiyaç
              sahiplerinin yanında olun. Emanetlerinizi şeffaf ve izlenebilir bir
              süreçle ulaştırıyoruz.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={routes.bagis} variant="primary" size="lg">
                Ramazan Bağışı Yap
              </ButtonLink>
              <ButtonLink href={routes.raporlar} variant="secondary" size="lg">
                Raporları İncele
              </ButtonLink>
            </div>
          </div>
          <div className="lg:pl-6">
            <DonationQuickCard defaultType="Ramazan İftarı" title="Ramazan Bağışı" />
          </div>
        </div>
      </section>

      {/* Kampanya türleri */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Kampanya Türleri"
          title="Ramazan'da Destek Alanları"
          description="İhtiyacınıza uygun destek türünü seçebilirsiniz. Bedeller ve dini hükümlere dair bilgiler dernek tarafından paylaşılır."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CAMPAIGN_TYPES.map(({ title, desc, icon: Icon }) => (
            <div key={title} className="card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-mint text-brand-green">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm text-muted">{desc}</p>
              <p className="mt-4 text-sm font-semibold text-brand-green">
                Bedel: {PLACEHOLDER}
              </p>
            </div>
          ))}
        </div>

        {/* Fiyat / hüküm notu */}
        <div className="mt-8 flex items-start gap-3 rounded-lg border border-brand-gold/40 bg-brand-gold/10 p-5">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
          <p className="text-sm text-ink">
            İftar, kumanya, fitre, fidye ve zekat gibi kalemlere ait güncel fiyat
            ve dini hüküm bilgileri dernek tarafından paylaşılır. Sitemizde yer
            alan tutarlar yalnızca örnek amaçlıdır ve bağlayıcı fiyat ya da dini
            hüküm niteliği taşımaz.
          </p>
        </div>
      </section>

      {/* Süreç */}
      <section className="bg-brand-mint/50 py-16 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Süreç"
              title="Ramazan Yardım Süreci"
              description="Bağıştan raporlamaya kadar şeffaf adımlar."
            />
            <StepTimeline steps={RAMAZAN_STEPS} />
          </div>
          <div className="overflow-hidden rounded-xl border border-hairline shadow-card">
            <MediaImage keyword="ramazan" className="h-full min-h-64 w-full" />
          </div>
        </div>
      </section>

      {/* Bölgeler */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Bölgeler"
          title="Ramazan Çalışma Bölgeleri"
          description="Nerede bir ihtiyaç varsa, Ramazan'da da orada olmaya gayret ediyoruz."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REGIONS.map((r) => (
            <a
              key={r.label}
              href={r.href}
              className="group relative overflow-hidden rounded-lg border border-hairline shadow-card transition-all hover:shadow-card-hover"
            >
              <MediaImage
                keyword={r.keyword}
                className="h-44 w-full transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-5 text-white">
                <h3 className="text-lg font-bold">{r.label}</h3>
                <p className="text-sm text-white/80">{r.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Raporlar preview */}
      <section className="bg-brand-mint/50 py-16 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Şeffaflık"
            title="Sahadan Raporlar"
            description="Doğrulanan çalışmalara dair saha bilgilendirmeleri."
            action={{ label: "Tüm Raporlar", href: routes.raporlar }}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ramazanReports.map((r) => (
              <ReportCard key={r.id} report={r} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
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
        title="Ramazan'da bir aileye umut, bir sofraya bereket olun"
        description="Bağışınızı iletin, emaneti ihtiyaç sahiplerine birlikte ulaştıralım."
        primary={{ label: "Bağış Yap", href: routes.bagis }}
        secondary={{ label: "Bize Ulaşın", href: routes.iletisim }}
      />
    </>
  );
}
