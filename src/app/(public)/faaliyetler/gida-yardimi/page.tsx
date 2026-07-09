import type { Metadata } from "next";
import { ShoppingBasket, Package, HandHeart, CalendarClock } from "lucide-react";
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
  title: "Gıda Yardımı ve Kumanya | AHDE VEFA İnsani Yardım Derneği",
  description:
    "Gıda yardımı ve kumanya çalışmalarımız. Temel gıda ihtiyacını karşılayan kumanya paketleriyle ihtiyaç sahibi ailelerin sofrasına ulaşıyoruz.",
};

const AID_TYPES = [
  {
    icon: ShoppingBasket,
    title: "Temel Kumanya",
    desc: "Bir ailenin temel gıda ihtiyacını belirli bir süre karşılamaya yönelik paket.",
  },
  {
    icon: Package,
    title: "Düzenli Gıda Desteği",
    desc: "İhtiyaç durumu süren ailelere dönemsel olarak ulaştırılan gıda desteği.",
  },
  {
    icon: HandHeart,
    title: "Özel Dönem Desteği",
    desc: "Ramazan ve zorlu dönemlerde artan ihtiyaca yönelik ek gıda çalışmaları.",
  },
  {
    icon: CalendarClock,
    title: "Acil Gıda Müdahalesi",
    desc: "Ani gelişen ihtiyaç durumlarında hızlı ulaştırılan temel gıda desteği.",
  },
];

const KUMANYA_CONTENT = [
  "Temel bakliyat ve tahıl grubu",
  "Yağ ve temel pişirme malzemeleri",
  "Kuru gıda ve uzun ömürlü ürünler",
  "Aileye ve mevsime göre uyarlanabilen içerik",
];

const PROCESS_STEPS = [
  {
    title: "İhtiyaç Tespiti",
    description:
      "İhtiyaç sahibi aileler, mahremiyet gözetilerek değerlendirilir.",
  },
  {
    title: "Kumanya Hazırlığı",
    description:
      "Paket içeriği; bölgenin, ailenin ve dönemin ihtiyaçlarına göre planlanır.",
  },
  {
    title: "Ulaştırma",
    description:
      "Kumanyalar, ailelerin onuru gözetilerek yerinde teslim edilir.",
  },
  {
    title: "Raporlama",
    description:
      "Süreç belgelenir; doğrulanan bilgiler rapor ve görsellerle paylaşılır.",
  },
];

const AMOUNT_GUIDE = [
  { label: "Bir kumanya paketi", value: PLACEHOLDER },
  { label: "Aylık aile desteği", value: PLACEHOLDER },
  { label: "Toplu bağış desteği", value: PLACEHOLDER },
];

export default function GidaYardimiPage() {
  const themeCampaigns = campaigns.filter((c) => c.category === "Gıda Yardımı");
  const themeReports = reports.filter((r) => /gıda|kumanya/i.test(r.title));
  const themeAlbums = galleryAlbums.filter((a) => /gıda|kumanya/i.test(a.title));

  return (
    <>
      <PageHero
        title="Gıda Yardımı ve Kumanya"
        description="Temel gıda ihtiyacını karşılayan kumanya paketleriyle ihtiyaç sahibi ailelerin sofrasına ulaşıyoruz. Sade, onurlu ve şeffaf bir yardım anlayışıyla."
        tone="mint"
        breadcrumb={[
          { label: "Ana Sayfa", href: routes.home },
          { label: "Faaliyetler", href: routes.faaliyetler },
          { label: "Gıda Yardımı" },
        ]}
      />

      {/* Intro + donation aside */}
      <section className="container-page grid gap-10 py-14 lg:grid-cols-[1.6fr_1fr] lg:py-20">
        <div>
          <MediaImage keyword="gida" className="h-56 w-full rounded-lg md:h-72" showLabel />
          <h2 className="mt-8 text-2xl font-bold text-brand-green">
            Bir sofraya bereket katmak
          </h2>
          <p className="mt-4 text-lg text-muted">
            Gıda; en temel ve en acil ihtiyaçların başında gelir. Kumanya çalışmalarımızla,
            ihtiyaç sahibi ailelerin temel gıda ihtiyacını karşılamayı ve zorlu dönemlerde
            yanlarında olmayı amaçlıyoruz.
          </p>
          <p className="mt-4 text-muted">
            Paket içerikleri; bölgeye, ailenin durumuna ve döneme göre uyarlanır. Fiyat ve
            tutar bilgileri yalnızca doğrulandığında yayınlanır; aksi hâlde{" "}
            <span className="font-semibold text-brand-green">{PLACEHOLDER}</span> ibaresini
            görürsünüz.
          </p>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <DonationQuickCard defaultType="Gıda Kumanyası" title="Kumanya Bağışı" />
        </aside>
      </section>

      {/* Aid types */}
      <section className="bg-brand-mint/50 py-14 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Yardım Türleri"
            title="Gıda desteği başlıkları"
            description="İhtiyacın niteliğine göre farklı destek biçimleri planlarız."
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

      {/* Kumanya content + amount guide */}
      <section className="container-page grid gap-10 py-14 md:py-20 lg:grid-cols-2">
        <div className="rounded-lg border border-hairline bg-white p-6 shadow-card lg:p-8">
          <h3 className="text-lg font-bold text-brand-green">Kumanya İçeriği</h3>
          <p className="mt-3 text-muted">
            Bir kumanya paketi, genellikle temel gıda gruplarından oluşur. İçerik, ailenin
            ihtiyacına ve mevsime göre değişebilir:
          </p>
          <ul className="mt-4 space-y-2">
            {KUMANYA_CONTENT.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-turquoise" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">
            Kesin içerik ve miktarlar bölgeye göre planlanır; sabit bir ürün listesi taahhüt
            edilmez.
          </p>
        </div>
        <div className="rounded-lg border border-hairline bg-brand-cream p-6 lg:p-8">
          <h3 className="text-lg font-bold text-brand-green">Katkı Rehberi</h3>
          <p className="mt-3 text-muted">
            Aşağıdaki değerler doğrulandıkça güncellenir. Formlarda görebileceğiniz tutarlar
            yalnızca örnek amaçlıdır, sabit bir fiyat değildir.
          </p>
          <div className="mt-5 space-y-3">
            {AMOUNT_GUIDE.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-md bg-white px-4 py-3 text-sm"
              >
                <span className="font-medium text-ink">{row.label}</span>
                <span className="font-bold text-brand-green">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaigns */}
      <section className="bg-brand-mint/50 py-14 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Kampanyalar"
            title="Gıda yardımı kampanyaları"
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
              description="Gıda yardımı kampanyaları hazırlandıkça burada yer alacaktır."
              action={
                <ButtonLink href={routes.bagis} variant="secondary" size="sm">
                  Tüm Kampanyalar
                </ButtonLink>
              }
            />
          )}
        </div>
      </section>

      {/* Process */}
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Süreç"
              title="Tespitten teslimata"
              description="Her adım kayıt altına alınır; ailelerin mahremiyeti korunur."
            />
            <StepTimeline steps={PROCESS_STEPS} />
          </div>
          <div className="flex items-center justify-center">
            <MediaImage keyword="gida" className="h-72 w-full rounded-lg" showLabel />
          </div>
        </div>
      </section>

      {/* Reports */}
      <section className="bg-brand-mint/50 py-14 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Raporlar"
            title="Gıda yardımı raporları"
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
              description="Gıda yardımı raporları hazırlandıkça burada paylaşılacaktır."
            />
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className="container-page py-14 md:py-20">
        <SectionHeading
          eyebrow="Galeri"
          title="Gıda yardımı çalışmaları"
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
        title="Bir sofraya siz de dokunun"
        description="Bir kumanya paketi, bir ailenin temel ihtiyacını karşılar. Emanetiniz güvenle sahibine ulaşsın."
        primary={{ label: "Kumanya Bağışı", href: routes.bagis }}
        secondary={{ label: "Bize Ulaşın", href: routes.iletisim }}
        tone="green"
      />
    </>
  );
}
