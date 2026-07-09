import type { Metadata } from "next";
import { LifeBuoy, Zap, ShieldCheck, Globe2 } from "lucide-react";
import { campaigns, reports, galleryAlbums } from "@/lib/mock-data";
import { routes } from "@/lib/routes";
import { PLACEHOLDER } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection, StepTimeline } from "@/components/ui/Blocks";
import { MediaImage } from "@/components/ui/MediaImage";
import { EmptyState } from "@/components/ui/States";
import { DonationQuickCard } from "@/components/forms/DonationQuickCard";
import { CampaignCard, ReportCard, AlbumCard } from "@/components/public/Cards";

export const metadata: Metadata = {
  title: "Acil Yardım Fonu | AHDE VEFA İnsani Yardım Derneği",
  description:
    "Acil Yardım Fonu; afet ve ani gelişen kriz durumlarında hızlı ve kontrollü müdahale için oluşturulan esnek bir dayanışma fonudur.",
};

const AID_TYPES = [
  {
    icon: LifeBuoy,
    title: "Afet Müdahalesi",
    desc: "Ani gelişen afet durumlarında temel ihtiyaçlara yönelik hızlı destek.",
  },
  {
    icon: Zap,
    title: "Hızlı İlk Yardım",
    desc: "Kriz anında en öncelikli ihtiyaçları karşılamaya yönelik ilk müdahale.",
  },
  {
    icon: ShieldCheck,
    title: "Kontrollü Süreç",
    desc: "Hızın, şeffaflık ve doğrulama ilkesinden ödün verilmeden sağlanması.",
  },
  {
    icon: Globe2,
    title: "Esnek Yönlendirme",
    desc: "Fonun, ihtiyacın en yoğun olduğu bölgeye ve alana yönlendirilebilmesi.",
  },
];

const FLEX_POINTS = [
  "İhtiyaç ortaya çıktığında hızlı harekete geçebilme",
  "Kaynağın en acil ihtiyaca göre yönlendirilebilmesi",
  "Belirli bir kampanyaya bağlı kalmadan esnek kullanım",
  "Her aşamada şeffaflık ve doğrulama ilkesinin korunması",
];

const PROCESS_STEPS = [
  {
    title: "Durum Değerlendirmesi",
    description:
      "Acil ihtiyaç doğduğunda durum hızla ve dikkatle değerlendirilir.",
  },
  {
    title: "Öncelik Belirleme",
    description:
      "En kritik ihtiyaçlar önceliklendirilir; müdahale planı oluşturulur.",
  },
  {
    title: "Hızlı Müdahale",
    description:
      "Fon, doğrulama ilkesi korunarak en acil alana yönlendirilir.",
  },
  {
    title: "Şeffaf Raporlama",
    description:
      "Sürecin sonuçları doğrulandıkça rapor ve görsellerle paylaşılır.",
  },
];

const NEED_TILES = [
  { label: "Öncelikli ihtiyaç alanı", hint: "Duruma göre güncellenecek" },
  { label: "Müdahale kapsamı", hint: "Doğrulandıkça güncellenecek" },
  { label: "Yönlendirilen bölge", hint: "Duruma göre güncellenecek" },
];

export default function AcilYardimPage() {
  const themeCampaigns = campaigns.filter((c) => c.category === "Acil Yardım");
  const themeReports = reports.filter((r) => /acil/i.test(r.title));
  const themeAlbums = galleryAlbums.filter((a) => /acil/i.test(a.title));

  return (
    <>
      <PageHero
        title="Acil Yardım Fonu"
        description="Afet ve ani gelişen kriz durumlarında zaman en kıymetli kaynaktır. Acil Yardım Fonu; hızlı, esnek ve kontrollü müdahale için oluşturulan bir dayanışma havuzudur."
        tone="mint"
        breadcrumb={[
          { label: "Ana Sayfa", href: routes.home },
          { label: "Faaliyetler", href: routes.faaliyetler },
          { label: "Acil Yardım" },
        ]}
      />

      {/* Intro + donation aside */}
      <section className="container-page grid gap-10 py-14 lg:grid-cols-[1.6fr_1fr] lg:py-20">
        <div>
          <MediaImage keyword="acil" className="h-56 w-full rounded-lg md:h-72" showLabel />
          <h2 className="mt-8 text-2xl font-bold text-brand-green">
            Kriz anında hazır olmak
          </h2>
          <p className="mt-4 text-lg text-muted">
            Afetler ve ani gelişen krizler önceden haber vermez. Acil Yardım Fonu, tek bir
            kampanyaya bağlı kalmadan; ihtiyacın en yoğun olduğu yere hızla ulaşabilmemizi
            sağlayan esnek bir kaynaktır.
          </p>
          <p className="mt-4 text-muted">
            Hız, bizim için şeffaflıktan ödün vermek anlamına gelmez. Sonuçlar ve sayısal
            veriler yalnızca doğrulandığında paylaşılır; aksi hâlde{" "}
            <span className="font-semibold text-brand-green">{PLACEHOLDER}</span> ibaresini
            görürsünüz.
          </p>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <DonationQuickCard defaultType="Acil Yardım" title="Acil Yardım Fonu'na Destek" />
        </aside>
      </section>

      {/* Aid types */}
      <section className="bg-brand-mint/50 py-14 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Müdahale Alanları"
            title="Acil yardımın kapsamı"
            description="Fon, ihtiyacın niteliğine göre farklı müdahale biçimlerinde kullanılabilir."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AID_TYPES.map((type) => (
              <div key={type.title} className="card h-full p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                  <type.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink">{type.title}</h3>
                <p className="mt-2 text-sm text-muted">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flexible fund + process */}
      <section className="container-page grid gap-10 py-14 md:py-20 lg:grid-cols-2">
        <div className="rounded-lg border border-hairline bg-brand-cream p-6 lg:p-8">
          <h3 className="text-lg font-bold text-brand-green">Esnek Acil Fon Nedir?</h3>
          <p className="mt-3 text-muted">
            Acil Yardım Fonu, belirli bir kampanyaya sabitlenmeden toplanan ve ihtiyaç
            doğduğunda hızla harekete geçirilebilen bir dayanışma havuzudur. Bu esneklik,
            kriz anında en kıymetli avantajı sağlar: zaman.
          </p>
          <ul className="mt-5 space-y-2">
            {FLEX_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-ink">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-turquoise" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHeading
            eyebrow="Hızlı ve Kontrollü Süreç"
            title="Değerlendirmeden raporlamaya"
            description="Hız ile şeffaflığı bir arada tutan bir müdahale akışı."
          />
          <StepTimeline steps={PROCESS_STEPS} />
        </div>
      </section>

      {/* Campaigns */}
      <section className="bg-brand-mint/50 py-14 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Kampanyalar"
            title="Acil yardım kampanyaları"
            action={{ label: "Tüm Kampanyalar", href: routes.bagis }}
          />
          {themeCampaigns.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {themeCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Şu anda yayında kampanya bulunmuyor"
              description="Acil yardım kampanyaları hazırlandıkça burada yer alacaktır."
              action={
                <ButtonLink href={routes.bagis} variant="secondary" size="sm">
                  Tüm Kampanyalar
                </ButtonLink>
              }
            />
          )}
        </div>
      </section>

      {/* Current needs */}
      <section className="container-page py-14 md:py-20">
        <SectionHeading
          eyebrow="Güncel İhtiyaçlar"
          title="Öncelikli durum bilgileri"
          description="Aşağıdaki bilgiler, aktif bir durum oluştuğunda ve doğrulandığında güncellenir."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {NEED_TILES.map((tile) => (
            <div key={tile.label} className="card p-6 text-center">
              <div className="text-3xl font-extrabold text-brand-green">{PLACEHOLDER}</div>
              <div className="mt-2 font-semibold text-ink">{tile.label}</div>
              <div className="mt-1 text-xs text-muted">{tile.hint}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Reports */}
      <section className="bg-brand-mint/50 py-14 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Şeffaflık ve Raporlar"
            title="Acil yardım raporları"
            action={{ label: "Tüm Raporlar", href: routes.raporlar }}
          />
          {themeReports.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {themeReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Henüz rapor yayınlanmadı"
              description="Acil yardım süreçlerine dair raporlar hazırlandıkça burada paylaşılacaktır."
            />
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className="container-page py-14 md:py-20">
        <SectionHeading
          eyebrow="Galeri"
          title="Acil yardım çalışmaları"
          action={{ label: "Galeriye Git", href: routes.galeri }}
        />
        {themeAlbums.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {themeAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Albüm bulunmuyor"
            description="Onurlu yardım ilkemiz gözetilerek hazırlanan görseller eklendikçe burada yer alacaktır."
          />
        )}
      </section>

      <CTASection
        title="Kriz anında bir adım önde olalım"
        description="Acil Yardım Fonu'na katkınız, bir sonraki krizde hızlı hareket edebilmemizi sağlar."
        primary={{ label: "Bağış Yap", href: routes.bagis }}
        secondary={{ label: "Bize Ulaşın", href: routes.iletisim }}
        tone="green"
      />
    </>
  );
}
