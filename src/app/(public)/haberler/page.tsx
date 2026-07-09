import type { Metadata } from "next";
import { Megaphone, Newspaper } from "lucide-react";
import { news } from "@/lib/mock-data";
import { routes } from "@/lib/routes";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/ui/Blocks";
import { NewsCard } from "@/components/public/Cards";
import { PakistanNotice } from "@/components/public/PakistanNotice";

export const metadata: Metadata = {
  title: "Sahadan Haberler ve Duyurular | AHDE VEFA",
  description:
    "AHDE VEFA İnsani Yardım Derneği'nin sahadan haberleri ve resmi duyuruları. Çalışmalarımızdan güncel bilgilendirmeleri buradan takip edebilirsiniz.",
};

const CATEGORY_CHIPS = [
  { label: "Tümü", icon: Newspaper },
  { label: "Haber", icon: Newspaper },
  { label: "Duyuru", icon: Megaphone },
];

export default function HaberlerPage() {
  const hasPakistan = news.some((n) => n.region === "Pakistan");

  return (
    <>
      <PageHero
        title="Sahadan Haberler ve Duyurular"
        description="Çalışma bölgelerimizden güncel saha notları ve derneğimize dair resmi duyuruları burada paylaşıyoruz."
        breadcrumb={[
          { label: "Anasayfa", href: routes.home },
          { label: "Sahadan Haberler" },
        ]}
      />

      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Güncel"
          title="Tüm Haberler ve Duyurular"
          description="Sahadan bilgilendirmeler ve resmi duyurular."
        />

        {/* Kategori etiketleri (görsel filtre) */}
        <div
          className="mb-8 flex flex-wrap gap-3"
          aria-label="Kategori etiketleri"
        >
          {CATEGORY_CHIPS.map(({ label, icon: Icon }, i) => (
            <span
              key={label}
              className={
                i === 0
                  ? "inline-flex items-center gap-1.5 rounded-full bg-brand-green px-4 py-1.5 text-sm font-semibold text-white"
                  : "inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white px-4 py-1.5 text-sm font-medium text-muted"
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </span>
          ))}
        </div>
        <p className="-mt-4 mb-8 text-xs text-muted">
          Etiketler içerik türlerini göstermektedir. Gelişmiş filtreleme{" "}
          <span className="font-semibold">[Eklenecek]</span>.
        </p>

        {news.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="card p-10 text-center text-muted">
            Henüz yayımlanmış haber veya duyuru bulunmuyor.
          </div>
        )}

        {hasPakistan && (
          <div className="mt-10">
            <PakistanNotice />
          </div>
        )}
      </section>

      <CTASection
        tone="green"
        title="Çalışmalarımızı yakından takip edin"
        description="Sahadan bilgilendirmeleri okuyun, raporlarımızı inceleyin ve iyiliğe ortak olun."
        primary={{ label: "Bağış Yap", href: routes.bagis }}
        secondary={{ label: "Şeffaflık ve Raporlar", href: routes.raporlar }}
      />
    </>
  );
}
