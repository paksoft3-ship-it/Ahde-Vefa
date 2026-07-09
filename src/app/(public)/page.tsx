import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Globe2,
  HeartHandshake,
  Sprout,
  Building2,
} from "lucide-react";
import { campaigns, news, reports } from "@/lib/mock-data";
import { routes } from "@/lib/routes";
import { GENERAL_FAQ, DONATION_STEPS } from "@/lib/content";
import { SITE } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrustBadges, LegalInfoCard, CTASection, StepTimeline } from "@/components/ui/Blocks";
import { FAQAccordion } from "@/components/ui/Accordion";
import { MediaImage } from "@/components/ui/MediaImage";
import { DonationQuickCard } from "@/components/forms/DonationQuickCard";
import { CampaignCard, NewsCard, ReportCard } from "@/components/public/Cards";
import { PakistanNotice } from "@/components/public/PakistanNotice";

const REGIONS = [
  { label: "Afrika", href: routes.afrika, image: "su", desc: "Su, gıda ve kalkınma çalışmaları" },
  { label: "Afganistan", href: routes.afganistan, image: "egitim", desc: "Eğitim ve geçim kaynağı desteği" },
  { label: "Türkiye", href: routes.turkiye, image: "gida", desc: "Yerel yardımlar ve kumanya" },
  { label: "Pakistan", href: routes.pakistan, image: "pakistan", desc: "Hazırlık Aşamasında", prep: true },
];

export default function HomePage() {
  const featured = campaigns.filter((c) => c.featured).slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-mint/60">
        <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="badge bg-white text-brand-green ring-1 ring-inset ring-brand-green/15">
              <Sprout className="h-4 w-4" /> Emanet · Vefa · İyilik
            </span>
            <h1 className="mt-5 text-[34px] font-extrabold leading-[1.1] text-brand-green md:text-[54px]">
              {SITE.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Afrika’dan Afganistan’a, Türkiye’den hazırlık aşamasındaki Pakistan
              çalışmalarına kadar; emanetlerinizi şeffaf, izlenebilir ve güvenilir
              bir süreçle ihtiyaç sahiplerine ulaştırıyoruz.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={routes.bagis} variant="primary" size="lg">
                Hemen Bağış Yap
              </ButtonLink>
              <ButtonLink href={routes.faaliyetler} variant="secondary" size="lg">
                Faaliyetleri İncele
              </ButtonLink>
            </div>
            <TrustBadges className="mt-8 border-t border-hairline pt-6" />
          </div>

          <div className="lg:pl-6">
            <DonationQuickCard title="Hızlı Bağış" />
          </div>
        </div>
      </section>

      {/* Featured campaigns */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Kampanyalar"
          title="Aktif Kampanyalar"
          description="Desteğinize en çok ihtiyaç duyan çalışmalarımız"
          action={{ label: "Tümünü Gör", href: routes.bagis }}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <CampaignCard key={c.id} campaign={c} />
          ))}
        </div>
      </section>

      {/* Regions */}
      <section className="bg-brand-mint/50 py-16 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Saha Çalışmaları"
            title="Faaliyet Bölgelerimiz"
            description="Nerede bir ihtiyaç varsa, orada olmaya gayret ediyoruz."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REGIONS.map((r) => (
              <Link
                key={r.label}
                href={r.href}
                className="group relative overflow-hidden rounded-lg border border-hairline shadow-card transition-all hover:shadow-card-hover"
              >
                <MediaImage keyword={r.image} className="h-44 w-full transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 p-5 text-white">
                  <h3 className="text-lg font-bold">{r.label}</h3>
                  <p className={r.prep ? "text-sm font-semibold text-brand-gold" : "text-sm text-white/80"}>
                    {r.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <PakistanNotice />
          </div>
        </div>
      </section>

      {/* How donation works */}
      <section className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Süreç"
              title="Bağış Nasıl İşliyor?"
              description="Dört adımda şeffaf ve izlenebilir bağış süreci."
            />
            <StepTimeline steps={DONATION_STEPS} />
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <TrustTile icon={Globe2} title="Saha Odaklı" text="Çalışmalar sahada, ihtiyaç önceliğine göre planlanır." />
              <TrustTile icon={FileText} title="Şeffaf Raporlama" text="Doğrulanan faaliyetler raporlarla paylaşılır." />
              <TrustTile icon={HeartHandshake} title="Gönüllülük" text="Gönüllülerimizle güçlü bir dayanışma ağı." />
              <TrustTile icon={Building2} title="Kurumsal Destek" text="Kurumlarla sürdürülebilir iş birlikleri." />
            </div>
            <LegalInfoCard />
          </div>
        </div>
      </section>

      {/* Reports + News */}
      <section className="bg-brand-mint/50 py-16 md:py-20">
        <div className="container-page space-y-14">
          <div>
            <SectionHeading
              eyebrow="Şeffaflık"
              title="Şeffaflık ve Raporlar"
              description="Sahadan bilgilendirmeler ve faaliyet raporları"
              action={{ label: "Tüm Raporlar", href: routes.raporlar }}
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {reports.slice(0, 4).map((r) => (
                <ReportCard key={r.id} report={r} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Duyurular"
              title="Sahadan Haberler"
              action={{ label: "Tüm Haberler", href: routes.haberler }}
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {news.slice(0, 4).map((n) => (
                <NewsCard key={n.id} item={n} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer + corporate CTA */}
      <section className="container-page py-16 md:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <CTATile
            image="gonullu"
            title="Gönüllü Ol"
            text="Zamanınızı ve yeteneklerinizi iyiliğe dönüştürün."
            href={routes.gonulluOl}
            label="Başvuru Yap"
          />
          <CTATile
            image="genel"
            title="Kurumsal Destek"
            text="Kurumunuzla sürdürülebilir sosyal etki oluşturun."
            href={routes.kurumsalDestek}
            label="İş Birliği Kur"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-mint/50 py-16 md:py-20">
        <div className="container-page max-w-3xl">
          <SectionHeading eyebrow="Yardım" title="Sıkça Sorulan Sorular" align="center" />
          <FAQAccordion items={GENERAL_FAQ} />
        </div>
      </section>

      <CTASection
        tone="green"
        title="Bir sofraya bereket, bir aileye umut olun"
        description="Küçük bir iyilik, büyük bir değişimin başlangıcı olabilir."
        primary={{ label: "Bağış Yap", href: routes.bagis }}
        secondary={{ label: "Bize Ulaşın", href: routes.iletisim }}
      />
    </>
  );
}

function TrustTile({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="card p-5">
      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-mint text-brand-green">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-3 font-bold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-muted">{text}</p>
    </div>
  );
}

function CTATile({
  image,
  title,
  text,
  href,
  label,
}: {
  image: string;
  title: string;
  text: string;
  href: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-4 overflow-hidden rounded-xl border border-hairline bg-white shadow-card sm:flex-row">
      <MediaImage keyword={image} className="h-40 w-full sm:h-auto sm:w-44" />
      <div className="flex flex-1 flex-col justify-center p-6">
        <h3 className="text-xl font-bold text-brand-green">{title}</h3>
        <p className="mt-2 text-sm text-muted">{text}</p>
        <Link href={href} className="mt-4 inline-flex items-center gap-1 font-bold text-brand-green hover:gap-2">
          {label} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
