import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Droplets, GraduationCap, ShieldAlert, Utensils } from "lucide-react";
import { campaigns, reports } from "@/lib/mock-data";
import { routes } from "@/lib/routes";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/ui/Blocks";
import { MediaImage } from "@/components/ui/MediaImage";
import { CampaignCard, ReportCard } from "@/components/public/Cards";
import { PakistanNotice } from "@/components/public/PakistanNotice";

export const metadata: Metadata = {
  title: "Faaliyetler | AHDE VEFA İnsani Yardım Derneği",
  description:
    "Afrika, Afganistan, Türkiye ve hazırlık aşamasındaki Pakistan çalışmalarımız; gıda, acil yardım, su kuyusu ve eğitim temalı faaliyetlerimiz.",
};

const REGIONS = [
  {
    label: "Afrika",
    href: routes.afrika,
    keyword: "su",
    desc: "Su, gıda ve kalkınma odaklı saha çalışmaları.",
  },
  {
    label: "Afganistan",
    href: routes.afganistan,
    keyword: "egitim",
    desc: "Eğitim ve temel ihtiyaç desteği çalışmaları.",
  },
  {
    label: "Türkiye",
    href: routes.turkiye,
    keyword: "gida",
    desc: "Yerel yardımlar ve kumanya dağıtımları.",
  },
  {
    label: "Pakistan",
    href: routes.pakistan,
    keyword: "pakistan",
    desc: "Hazırlık Aşamasında",
    prep: true,
  },
];

const THEMES = [
  {
    label: "Gıda Yardımı",
    href: routes.gidaYardimi,
    keyword: "gida",
    icon: Utensils,
    desc: "Kumanya ve temel gıda destekleriyle ailelerin yanında.",
  },
  {
    label: "Acil Yardım",
    href: routes.acilYardim,
    keyword: "acil",
    icon: ShieldAlert,
    desc: "Afet ve kriz durumlarında hızlı ve kontrollü müdahale.",
  },
  {
    label: "Su Kuyusu",
    href: routes.afrika,
    keyword: "su",
    icon: Droplets,
    desc: "Temiz suya erişim için su kuyusu çalışmaları.",
  },
  {
    label: "Eğitim",
    href: routes.afganistan,
    keyword: "egitim",
    icon: GraduationCap,
    desc: "Çocukların ve gençlerin eğitimine destek.",
  },
];

export default function FaaliyetlerPage() {
  const featured = campaigns.slice(0, 6);

  return (
    <>
      <PageHero
        tone="mint"
        title="Faaliyetlerimiz"
        description="Afrika'dan Afganistan'a, Türkiye'den hazırlık aşamasındaki Pakistan çalışmalarına kadar; emanetleri şeffaf ve izlenebilir bir süreçle ihtiyaç sahiplerine ulaştırıyoruz."
        breadcrumb={[
          { label: "Anasayfa", href: routes.home },
          { label: "Faaliyetler" },
        ]}
      />

      {/* Bölge kartları */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Bölgeler"
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
              <MediaImage
                keyword={r.keyword}
                className="h-44 w-full transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              {r.prep && (
                <span className="absolute right-3 top-3 rounded-full bg-brand-gold px-3 py-1 text-xs font-bold text-brand-dark">
                  Hazırlık Aşamasında
                </span>
              )}
              <div className="absolute bottom-0 p-5 text-white">
                <h3 className="text-lg font-bold">{r.label}</h3>
                <p
                  className={
                    r.prep
                      ? "text-sm font-semibold text-brand-gold"
                      : "text-sm text-white/80"
                  }
                >
                  {r.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <PakistanNotice />
        </div>
      </section>

      {/* Faaliyet temaları */}
      <section className="bg-brand-mint/50 py-16 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Temalar"
            title="Faaliyet Alanlarımız"
            description="Farklı ihtiyaç alanlarında yürüttüğümüz temalı çalışmalar."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {THEMES.map(({ label, href, keyword, icon: Icon, desc }) => (
              <Link
                key={label}
                href={href}
                className="group card flex flex-col p-0 transition-all hover:shadow-card-hover"
              >
                <MediaImage keyword={keyword} className="h-36 w-full rounded-t-lg" />
                <div className="flex flex-1 flex-col p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-mint text-brand-green">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-ink">{label}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-green group-hover:gap-2">
                    İncele <ArrowRight className="h-4 w-4 transition-all" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Kampanyalar */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Kampanyalar"
          title="Öne Çıkan Çalışmalar"
          description="Desteğinize en çok ihtiyaç duyan kampanyalarımız."
          action={{ label: "Tüm Kampanyalar", href: routes.bagis }}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <CampaignCard key={c.id} campaign={c} />
          ))}
        </div>
      </section>

      {/* Raporlar preview */}
      <section className="bg-brand-mint/50 py-16 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Şeffaflık"
            title="Sahadan Raporlar"
            description="Doğrulanan çalışmalara dair saha bilgilendirmeleri ve raporlar."
            action={{ label: "Tüm Raporlar", href: routes.raporlar }}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {reports.slice(0, 4).map((r) => (
              <ReportCard key={r.id} report={r} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        tone="green"
        title="İyiliğe ortak olun, faaliyetlerimize destek verin"
        description="Bağış yapabilir ya da gönüllü olarak saha çalışmalarımıza katkı sunabilirsiniz."
        primary={{ label: "Bağış Yap", href: routes.bagis }}
        secondary={{ label: "Gönüllü Ol", href: routes.gonulluOl }}
      />
    </>
  );
}
