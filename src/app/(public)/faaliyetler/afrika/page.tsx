import type { Metadata } from "next";
import { Droplets, Sprout, ShoppingBasket, Stethoscope } from "lucide-react";
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
  title: "Afrika Faaliyetleri | AHDE VEFA İnsani Yardım Derneği",
  description:
    "Afrika'daki su kuyusu, gıda ve kalkınma odaklı insani yardım çalışmalarımız. Şeffaf ve izlenebilir bir süreçle emanetlerinizi ihtiyaç sahiplerine ulaştırıyoruz.",
};

const AID_AREAS = [
  {
    icon: Droplets,
    title: "Temiz Su ve Su Kuyusu",
    desc: "Güvenli içme suyuna erişimi olmayan bölgelerde su kuyusu ve su hattı çalışmaları.",
  },
  {
    icon: ShoppingBasket,
    title: "Gıda ve Kumanya",
    desc: "Temel gıda ihtiyaçlarını karşılamaya yönelik kumanya ve düzenli gıda desteği.",
  },
  {
    icon: Sprout,
    title: "Kalkınma ve Geçim",
    desc: "Toplulukların kendi ayakları üzerinde durabilmesi için geçim kaynağı odaklı destekler.",
  },
  {
    icon: Stethoscope,
    title: "Temel Sağlık ve İhtiyaç",
    desc: "Öncelikli sağlık ve temel yaşam ihtiyaçlarına yönelik dayanışma çalışmaları.",
  },
];

const FIELD_STEPS = [
  {
    title: "İhtiyaç Tespiti",
    description:
      "Bölgedeki öncelikli ihtiyaçlar saha ekipleri ve yerel iş birlikleriyle değerlendirilir.",
  },
  {
    title: "Planlama ve Şeffaf Duyuru",
    description:
      "Çalışmanın kapsamı belirlenir ve bağışçılarımızla açık şekilde paylaşılır.",
  },
  {
    title: "Sahada Uygulama",
    description:
      "Emanetler, onurlu yardım ilkesi gözetilerek ihtiyaç sahiplerine ulaştırılır.",
  },
  {
    title: "Raporlama ve Geri Bildirim",
    description:
      "Süreç saha raporları ve görsellerle belgelenir; doğrulanan veriler paylaşılır.",
  },
];

const IMPACT_TILES = [
  { label: "Ulaşılan bölge", hint: "Doğrulandıkça güncellenecek" },
  { label: "Su çalışması", hint: "Doğrulandıkça güncellenecek" },
  { label: "Gıda desteği", hint: "Doğrulandıkça güncellenecek" },
  { label: "Fayda sağlanan kişi", hint: "Doğrulandıkça güncellenecek" },
];

export default function AfrikaPage() {
  const regionCampaigns = campaigns.filter((c) => c.region === "Afrika");
  const regionReports = reports.filter((r) => r.region === "Afrika");
  const regionAlbums = galleryAlbums.filter((a) => a.region === "Afrika");

  return (
    <>
      <PageHero
        title="Afrika Faaliyetleri"
        description="Su kuyusu, gıda ve kalkınma çalışmalarıyla Afrika'da; kalıcı çözümlere ve onurlu yardıma öncelik veriyoruz. Kuraklığın ve temel ihtiyaç yoksunluğunun en çok hissedildiği bölgelerde yanınızdayız."
        tone="mint"
        breadcrumb={[
          { label: "Ana Sayfa", href: routes.home },
          { label: "Faaliyetler", href: routes.faaliyetler },
          { label: "Afrika" },
        ]}
      />

      {/* Intro + donation aside */}
      <section className="container-page grid gap-10 py-14 lg:grid-cols-[1.6fr_1fr] lg:py-20">
        <div>
          <MediaImage keyword="su" className="h-56 w-full rounded-lg md:h-72" showLabel />
          <h2 className="mt-8 text-2xl font-bold text-brand-green">
            Suyun ve kalkınmanın peşinde
          </h2>
          <p className="mt-4 text-lg text-muted">
            Afrika'nın pek çok bölgesinde temiz suya erişim, gıda güvenliği ve geçim
            kaynağı hâlâ temel bir mücadele alanı. Çalışmalarımızı; acil ihtiyaçları
            karşılarken toplulukların uzun vadeli dayanıklılığını da güçlendirecek
            şekilde kurguluyoruz.
          </p>
          <p className="mt-4 text-muted">
            Sunulan tutar ve sayısal bilgiler, doğrulanmış saha verileriyle
            desteklenmeden yayınlanmaz. Bu nedenle bazı alanlarda
            {" "}
            <span className="font-semibold text-brand-green">{PLACEHOLDER}</span> ibaresini
            görebilirsiniz; bu, şeffaflık ilkemizin bir gereğidir.
          </p>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <DonationQuickCard defaultType="Afrika Yardımları" title="Afrika'ya Destek Ol" />
        </aside>
      </section>

      {/* Aid areas */}
      <section className="bg-brand-mint/50 py-14 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Yardım Alanları"
            title="Afrika'da öncelikli çalışma başlıkları"
            description="İhtiyaçlar bölgeden bölgeye değişir; çalışmalarımızı yerel gerçeklere göre planlarız."
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
          title="Afrika bölgesindeki kampanyalar"
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
            description="Afrika bölgesine yönelik yeni kampanyalar hazırlandıkça burada yer alacaktır."
            action={
              <ButtonLink href={routes.bagis} variant="secondary" size="sm">
                Tüm Kampanyalar
              </ButtonLink>
            }
          />
        )}
      </section>

      {/* Field process */}
      <section className="bg-brand-cream py-14 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Saha Süreci"
              title="İhtiyaçtan raporlamaya kadar izlenebilir bir yol"
              description="Her aşama belgelenir; emanetin nereye ulaştığı takip edilebilir kalır."
            />
            <StepTimeline steps={FIELD_STEPS} />
          </div>
          <div className="flex items-center justify-center">
            <MediaImage keyword="genel" className="h-72 w-full rounded-lg" showLabel />
          </div>
        </div>
      </section>

      {/* Impact statistics */}
      <section className="container-page py-14 md:py-20">
        <SectionHeading
          eyebrow="Etki Göstergeleri"
          title="Sahadaki etki"
          description="Sayısal göstergeler yalnızca doğrulanmış saha verileriyle yayınlanır."
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
            title="Afrika'dan raporlar"
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
          title="Afrika saha çalışmaları"
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
        title="Afrika'daki bir hayata dokunun"
        description="Bir damla su, bir öğün ekmek ya da bir geçim kaynağı; emanetiniz güvenle ihtiyaç sahibine ulaşsın."
        primary={{ label: "Bağış Yap", href: routes.bagis }}
        secondary={{ label: "Bize Ulaşın", href: routes.iletisim }}
        tone="green"
      />
    </>
  );
}
