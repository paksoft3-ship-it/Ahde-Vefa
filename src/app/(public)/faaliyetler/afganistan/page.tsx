import type { Metadata } from "next";
import { GraduationCap, HeartHandshake, Home, Wheat } from "lucide-react";
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
  title: "Afganistan Faaliyetleri | AHDE VEFA İnsani Yardım Derneği",
  description:
    "Afganistan'da eğitim, yetim desteği ve geçim kaynağı odaklı insani yardım çalışmalarımız. Emanetlerinizi şeffaf ve izlenebilir bir süreçle ulaştırıyoruz.",
};

const AID_AREAS = [
  {
    icon: GraduationCap,
    title: "Eğitim Desteği",
    desc: "Çocukların eğitime erişimini güçlendirmeye yönelik destek çalışmaları.",
  },
  {
    icon: HeartHandshake,
    title: "Yetim ve Çocuk",
    desc: "Yetim ve kırılgan durumdaki çocuklara yönelik dayanışma odaklı destekler.",
  },
  {
    icon: Wheat,
    title: "Geçim Kaynağı",
    desc: "Ailelerin kendi geçimini sağlayabilmesi için üretim ve geçim odaklı katkılar.",
  },
  {
    icon: Home,
    title: "Temel İhtiyaç",
    desc: "Gıda ve öncelikli yaşam ihtiyaçlarına yönelik temel yardım çalışmaları.",
  },
];

const FIELD_STEPS = [
  {
    title: "Öncelik Değerlendirmesi",
    description:
      "Eğitim ve geçim başta olmak üzere en acil ihtiyaçlar yerinde değerlendirilir.",
  },
  {
    title: "Planlama",
    description:
      "Çalışma kapsamı belirlenir; hedefler ve süreç şeffaf biçimde tanımlanır.",
  },
  {
    title: "Uygulama",
    description:
      "Destekler, mahremiyet ve onur ilkesi gözetilerek ihtiyaç sahiplerine ulaştırılır.",
  },
  {
    title: "Takip ve Raporlama",
    description:
      "Süreç belgelenir; doğrulanan bilgiler rapor ve görsellerle paylaşılır.",
  },
];

const IMPACT_TILES = [
  { label: "Desteklenen öğrenci", hint: "Doğrulandıkça güncellenecek" },
  { label: "Ulaşılan aile", hint: "Doğrulandıkça güncellenecek" },
  { label: "Eğitim çalışması", hint: "Doğrulandıkça güncellenecek" },
  { label: "Geçim desteği", hint: "Doğrulandıkça güncellenecek" },
];

export default function AfganistanPage() {
  const regionCampaigns = campaigns.filter((c) => c.region === "Afganistan");
  const regionReports = reports.filter((r) => r.region === "Afganistan");
  const regionAlbums = galleryAlbums.filter((a) => a.region === "Afganistan");

  return (
    <>
      <PageHero
        title="Afganistan Faaliyetleri"
        description="Eğitim, yetim desteği ve geçim kaynağı odağında Afganistan'da; çocukların geleceğine ve ailelerin dayanıklılığına katkı sunuyoruz. Uzun yıllara yayılan zorluklara, kalıcı çözüm arayışıyla yaklaşıyoruz."
        tone="mint"
        breadcrumb={[
          { label: "Ana Sayfa", href: routes.home },
          { label: "Faaliyetler", href: routes.faaliyetler },
          { label: "Afganistan" },
        ]}
      />

      {/* Intro + donation aside */}
      <section className="container-page grid gap-10 py-14 lg:grid-cols-[1.6fr_1fr] lg:py-20">
        <div>
          <MediaImage keyword="egitim" className="h-56 w-full rounded-lg md:h-72" showLabel />
          <h2 className="mt-8 text-2xl font-bold text-brand-green">
            Eğitimden geçime uzanan destek
          </h2>
          <p className="mt-4 text-lg text-muted">
            Afganistan'da çocukların okula devam edebilmesi, yetimlerin gözetilmesi ve
            ailelerin kendi geçimini üretebilmesi çalışmalarımızın merkezinde yer alır.
            Kısa vadeli yardımı, uzun vadeli dayanıklılıkla birlikte ele alıyoruz.
          </p>
          <p className="mt-4 text-muted">
            Sayısal veriler ve tutarlar yalnızca doğrulandığında yayınlanır. Henüz
            kesinleşmemiş bilgiler yerine{" "}
            <span className="font-semibold text-brand-green">{PLACEHOLDER}</span> ibaresini
            görebilirsiniz.
          </p>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <DonationQuickCard
            defaultType="Afganistan Yardımları"
            title="Afganistan'a Destek Ol"
          />
        </aside>
      </section>

      {/* Aid areas */}
      <section className="bg-brand-mint/50 py-14 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Yardım Alanları"
            title="Afganistan'da öncelikli çalışma başlıkları"
            description="Çalışmalarımızı, ailelerin ve çocukların önceliklerine göre planlarız."
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
          title="Afganistan bölgesindeki kampanyalar"
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
            description="Afganistan bölgesine yönelik yeni kampanyalar hazırlandıkça burada yer alacaktır."
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
              eyebrow="İhtiyaç ve Süreç"
              title="Değerlendirmeden raporlamaya"
              description="Her adım kayıt altına alınır; sürecin izlenebilirliği korunur."
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
          title="Çalışmaların etkisi"
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
            title="Afganistan'dan raporlar"
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
          title="Afganistan saha çalışmaları"
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
            description="Mahremiyet ve onur ilkesi gözetilerek hazırlanan görseller eklendikçe burada yer alacaktır."
          />
        )}
      </section>

      <CTASection
        title="Bir çocuğun eğitimine, bir ailenin geçimine ortak olun"
        description="Küçük bir dokunuş; bir öğrencinin okula devam etmesine, bir ailenin ayakta kalmasına vesile olabilir."
        primary={{ label: "Bağış Yap", href: routes.bagis }}
        secondary={{ label: "Bize Ulaşın", href: routes.iletisim }}
        tone="green"
      />
    </>
  );
}
