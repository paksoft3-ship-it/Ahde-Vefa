import type { Metadata } from "next";
import { ShoppingBasket, HandHeart, Snowflake, Users } from "lucide-react";
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
  title: "Türkiye Faaliyetleri | AHDE VEFA İnsani Yardım Derneği",
  description:
    "Türkiye'de yerel yardımlar, kumanya ve dayanışma çalışmalarımız. İhtiyaç sahibi ailelere şeffaf ve onurlu bir süreçle destek oluyoruz.",
};

const AID_AREAS = [
  {
    icon: ShoppingBasket,
    title: "Gıda ve Kumanya",
    desc: "İhtiyaç sahibi ailelere temel gıda ihtiyaçlarını karşılayan kumanya desteği.",
  },
  {
    icon: HandHeart,
    title: "Aile Dayanışması",
    desc: "Kırılgan durumdaki ailelere yönelik temel yaşam ve dayanışma destekleri.",
  },
  {
    icon: Snowflake,
    title: "Mevsimsel Yardım",
    desc: "Kış ve zorlu dönemlerde artan ihtiyaçlara yönelik mevsimsel destek çalışmaları.",
  },
  {
    icon: Users,
    title: "Gönüllü Katılımı",
    desc: "Yerel gönüllülerimizle birlikte yürütülen saha ve dayanışma çalışmaları.",
  },
];

const FIELD_STEPS = [
  {
    title: "İhtiyaç Başvurusu ve Tespit",
    description:
      "İhtiyaç sahibi aileler, mahremiyet gözetilerek değerlendirilir.",
  },
  {
    title: "Planlama",
    description:
      "Destek türü ve kapsamı belirlenir; süreç şeffaf biçimde kurgulanır.",
  },
  {
    title: "Ulaştırma",
    description:
      "Kumanya ve destekler, ailelerin onuru gözetilerek yerinde ulaştırılır.",
  },
  {
    title: "Raporlama",
    description:
      "Çalışmalar belgelenir; doğrulanan bilgiler rapor ve görsellerle paylaşılır.",
  },
];

const IMPACT_TILES = [
  { label: "Ulaşılan aile", hint: "Doğrulandıkça güncellenecek" },
  { label: "Dağıtılan kumanya", hint: "Doğrulandıkça güncellenecek" },
  { label: "Çalışma yürütülen il", hint: "Doğrulandıkça güncellenecek" },
  { label: "Katkı veren gönüllü", hint: "Doğrulandıkça güncellenecek" },
];

export default function TurkiyePage() {
  const regionCampaigns = campaigns.filter((c) => c.region === "Türkiye");
  const regionReports = reports.filter((r) => r.region === "Türkiye");
  const regionAlbums = galleryAlbums.filter((a) => a.region === "Türkiye");

  return (
    <>
      <PageHero
        title="Türkiye Faaliyetleri"
        description="Yerel yardımlar ve kumanya çalışmalarıyla Türkiye genelinde ihtiyaç sahibi ailelerin yanındayız. Komşuluk ve dayanışma kültürünü onurlu bir yardım anlayışıyla buluşturuyoruz."
        tone="mint"
        breadcrumb={[
          { label: "Ana Sayfa", href: routes.home },
          { label: "Faaliyetler", href: routes.faaliyetler },
          { label: "Türkiye" },
        ]}
      />

      {/* Intro + donation aside */}
      <section className="container-page grid gap-10 py-14 lg:grid-cols-[1.6fr_1fr] lg:py-20">
        <div>
          <MediaImage keyword="gida" className="h-56 w-full rounded-lg md:h-72" showLabel />
          <h2 className="mt-8 text-2xl font-bold text-brand-green">
            Yakınımızdaki ihtiyaç sahibinin yanında
          </h2>
          <p className="mt-4 text-lg text-muted">
            Türkiye'de dayanışma; bir komşunun kapısını çalmaktan, zorlu bir dönemde bir
            aileye omuz vermekten geçer. Yerel yardım ve kumanya çalışmalarımızı,
            ailelerin onurunu koruyan sade ve şeffaf bir yaklaşımla yürütüyoruz.
          </p>
          <p className="mt-4 text-muted">
            Tutarlar ve sayısal göstergeler yalnızca doğrulandığında yayınlanır; aksi
            hâlde{" "}
            <span className="font-semibold text-brand-green">{PLACEHOLDER}</span> ibaresini
            görürsünüz.
          </p>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <DonationQuickCard defaultType="Gıda Kumanyası" title="Türkiye'ye Destek Ol" />
        </aside>
      </section>

      {/* Aid areas */}
      <section className="bg-brand-mint/50 py-14 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Yardım Alanları"
            title="Türkiye'de öncelikli çalışma başlıkları"
            description="Çalışmalarımızı yerel ihtiyaçlara ve mevsimsel koşullara göre planlarız."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AID_AREAS.map((area) => (
              <div key={area.title} className="card h-full p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                  <area.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink">{area.title}</h3>
                <p className="mt-2 text-sm text-muted">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaigns */}
      <section className="container-page py-14 md:py-20">
        <SectionHeading
          eyebrow="Aktif Kampanyalar"
          title="Türkiye bölgesindeki kampanyalar"
          action={{ label: "Tüm Kampanyalar", href: routes.bagis }}
        />
        {regionCampaigns.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regionCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Şu anda yayında kampanya bulunmuyor"
            description="Türkiye bölgesine yönelik yeni kampanyalar hazırlandıkça burada yer alacaktır."
            action={
              <ButtonLink href={routes.bagis} variant="secondary" size="sm">
                Tüm Kampanyalar
              </ButtonLink>
            }
          />
        )}
      </section>

      {/* Volunteer + process */}
      <section className="bg-brand-cream py-14 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Saha Süreci"
              title="Başvurudan raporlamaya"
              description="Her adım kayıt altına alınır; ailelerin mahremiyeti korunur."
            />
            <StepTimeline steps={FIELD_STEPS} />
          </div>
          <div className="rounded-lg border border-hairline bg-white p-6 shadow-card lg:p-8">
            <h3 className="text-lg font-bold text-brand-green">Gönüllü Ol</h3>
            <p className="mt-3 text-muted">
              Türkiye'deki yerel çalışmalarımız, gönüllülerimizin katkısıyla güç kazanır.
              Siz de saha, lojistik veya iletişim gibi alanlarda destek olabilirsiniz.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={routes.gonulluOl} variant="green" size="md">
                Gönüllü Başvurusu
              </ButtonLink>
              <ButtonLink href={routes.iletisim} variant="secondary" size="md">
                Bilgi Al
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Impact statistics */}
      <section className="container-page py-14 md:py-20">
        <SectionHeading
          eyebrow="Etki Göstergeleri"
          title="Yerel çalışmaların etkisi"
          description="Göstergeler yalnızca doğrulanmış saha verileriyle güncellenir."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT_TILES.map((tile) => (
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
            eyebrow="Saha Raporları"
            title="Türkiye'den raporlar"
            action={{ label: "Tüm Raporlar", href: routes.raporlar }}
          />
          {regionReports.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {regionReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Henüz rapor yayınlanmadı"
              description="Bu bölgeye ait raporlar hazırlandıkça burada paylaşılacaktır."
            />
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className="container-page py-14 md:py-20">
        <SectionHeading
          eyebrow="Saha Galerisi"
          title="Türkiye saha çalışmaları"
          action={{ label: "Galeriye Git", href: routes.galeri }}
        />
        {regionAlbums.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {regionAlbums.map((album) => (
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
        title="Komşunuzun elini bırakmayın"
        description="Bir kumanya, bir aileye umut olur. Türkiye'deki dayanışmaya siz de katkı sağlayın."
        primary={{ label: "Bağış Yap", href: routes.bagis }}
        secondary={{ label: "Gönüllü Ol", href: routes.gonulluOl }}
        tone="green"
      />
    </>
  );
}
