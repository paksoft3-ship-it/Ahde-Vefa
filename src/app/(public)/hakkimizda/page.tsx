import type { Metadata } from "next";
import {
  Compass,
  Eye,
  HandHeart,
  Heart,
  ShieldCheck,
  Sun,
  Handshake,
} from "lucide-react";
import { routes } from "@/lib/routes";
import { SITE } from "@/lib/constants";
import { PLACEHOLDER } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection, LegalInfoCard, TrustBadges } from "@/components/ui/Blocks";
import { MediaImage } from "@/components/ui/MediaImage";
import { PakistanNotice } from "@/components/public/PakistanNotice";

export const metadata: Metadata = {
  title: "Hakkımızda | AHDE VEFA İnsani Yardım Derneği",
  description:
    "AHDE VEFA İnsani Yardım Derneği'nin misyonu, vizyonu ve değerleri. Şeffaf, izlenebilir ve güvenilir insani yardım anlayışımızı keşfedin.",
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Emanet",
    description:
      "Bize ulaşan her bağışı bir emanet bilinciyle taşır, ihtiyaç sahibine eksiksiz ulaştırmayı sorumluluk sayarız.",
  },
  {
    icon: Handshake,
    title: "Vefa",
    description:
      "Verdiğimiz sözün arkasında dururuz. İhtiyaç sahiplerine ve bağışçılarımıza karşı sözümüze sadık kalırız.",
  },
  {
    icon: HandHeart,
    title: "İyilik",
    description:
      "İyiliği çoğaltmayı, ulaşabildiğimiz her insana umut ve destek götürmeyi esas alırız.",
  },
  {
    icon: Eye,
    title: "Şeffaflık",
    description:
      "Yürüttüğümüz çalışmaları izlenebilir kılar, doğrulanan faaliyetleri raporlarla paylaşırız.",
  },
  {
    icon: Heart,
    title: "Merhamet",
    description:
      "Din, dil, ırk ayrımı gözetmeden ihtiyaç sahibinin yanında olmayı, merhametle yaklaşmayı önemseriz.",
  },
  {
    icon: Sun,
    title: "Umut",
    description:
      "Zor koşullardaki insanlara sadece yardım değil, geleceğe dair umut taşımaya gayret ederiz.",
  },
];

const REGIONS = [
  {
    keyword: "genel" as const,
    title: "Afrika",
    href: routes.afrika,
    description:
      "Su, gıda ve temel ihtiyaç odaklı yardım çalışmaları yürütülen öncelikli bölgelerimizden biridir.",
  },
  {
    keyword: "acil" as const,
    title: "Afganistan",
    href: routes.afganistan,
    description:
      "İhtiyaç sahibi ailelere yönelik insani yardım çalışmalarının sürdürüldüğü faaliyet bölgemizdir.",
  },
  {
    keyword: "gida" as const,
    title: "Türkiye",
    href: routes.turkiye,
    description:
      "Yurt içinde ihtiyaç sahiplerine ulaşan gıda ve destek çalışmalarının yürütüldüğü bölgedir.",
  },
  {
    keyword: "pakistan" as const,
    title: "Pakistan",
    href: routes.pakistan,
    description:
      "Pakistan çalışmalarımız hazırlık aşamasındadır; doğrulanan gelişmeler zamanı geldikçe paylaşılacaktır.",
  },
];

export default function HakkimizdaPage() {
  return (
    <>
      <PageHero
        title="Hakkımızda"
        description={`${SITE.fullName} olarak emanetlerinizi şeffaf ve izlenebilir süreçlerle ihtiyaç sahiplerine ulaştırıyoruz.`}
        breadcrumb={[
          { label: "Anasayfa", href: routes.home },
          { label: "Hakkımızda" },
        ]}
      >
        <TrustBadges />
      </PageHero>

      {/* Mission / Vision */}
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card flex flex-col p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-mint text-brand-green">
              <Compass className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-brand-green">Misyonumuz</h2>
            <p className="mt-3 text-muted">
              İhtiyaç sahiplerine, din, dil ve ırk ayrımı gözetmeden; şeffaf,
              izlenebilir ve güvenilir bir anlayışla insani yardım ulaştırmak. Her
              emaneti sorumlulukla taşıyarak iyiliği en doğru şekilde ihtiyaç
              sahibine kavuşturmak.
            </p>
          </div>
          <div className="card flex flex-col p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-mint text-brand-green">
              <Eye className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-brand-green">Vizyonumuz</h2>
            <p className="mt-3 text-muted">
              Şeffaflığı ve hesap verebilirliği esas alan, ulaştığı her coğrafyada
              güven duyulan; iyiliği kalıcı ve sürdürülebilir kılan bir insani
              yardım kuruluşu olmak.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-mint py-14 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Değerlerimiz"
            title="Bizi Biz Yapan İlkeler"
            description="Çalışmalarımızın her aşamasında bize rehberlik eden temel değerler."
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm text-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-brand-cream py-14 md:py-20">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <MediaImage
              keyword="gonullu"
              className="h-72 w-full rounded-lg md:h-96"
            />
            <div>
              <SectionHeading
                eyebrow="Hikayemiz"
                title="Bir Emanet Bilinciyle Yola Çıktık"
              />
              <div className="space-y-4 text-muted">
                <p>
                  AHDE VEFA İnsani Yardım Derneği, ihtiyaç sahiplerine el uzatmak ve
                  iyiliği büyütmek isteyen gönüllülerin bir araya gelmesiyle
                  kurulmuştur. Yola çıkarken tek bir amacımız vardı: emanet edilen
                  her desteği, hak sahibine güvenle ulaştırmak.
                </p>
                <p>
                  Bugün Afrika, Afganistan ve Türkiye başta olmak üzere farklı
                  bölgelerde; su, gıda, acil yardım ve mevsimsel yardım çalışmaları
                  yürütüyoruz. Attığımız her adımda şeffaflığı ve izlenebilirliği
                  esas alıyoruz.
                </p>
                <p className="rounded-lg border border-hairline bg-white p-4 text-sm">
                  Derneğimizin kuruluş tarihi, kurucularımız ve çalışma
                  istatistiklerine ilişkin resmi bilgiler dernek tarafından
                  tamamlandıkça bu alanda yayımlanacaktır:{" "}
                  <span className="font-semibold text-brand-green">
                    {PLACEHOLDER}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activity areas */}
      <section className="container-page py-14 md:py-20">
        <SectionHeading
          eyebrow="Faaliyet Bölgeleri"
          title="Nerede Çalışıyoruz?"
          description="Yardım çalışmalarımızı sürdürdüğümüz öncelikli bölgeler."
          action={{ label: "Tüm Faaliyetler", href: routes.faaliyetler }}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REGIONS.map((region) => (
            <a
              key={region.title}
              href={region.href}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-white shadow-card transition-all hover:shadow-card-hover"
            >
              <MediaImage keyword={region.keyword} className="h-40 w-full" />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold text-brand-green">
                  {region.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{region.description}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-8">
          <PakistanNotice />
        </div>
      </section>

      {/* Transparency + Legal */}
      <section className="bg-brand-mint py-14 md:py-20">
        <div className="container-page">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Şeffaflık"
                title="Güveni Şeffaflıkla İnşa Ediyoruz"
              />
              <div className="space-y-4 text-muted">
                <p>
                  Çalışmalarımızı doğrulanabilir ve izlenebilir kılmayı önemsiyoruz.
                  Tamamlanan faaliyetler saha raporlarıyla, resmi bilgiler ise ilgili
                  yasal metinlerle paylaşılır.
                </p>
                <p>
                  Bağışlarınızın izlediği yol, referans numaranızla takip
                  edilebilir; doğrulanan çalışmalar düzenli olarak raporlanır.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a href={routes.raporlar} className="btn btn-secondary btn-md">
                    Raporları İncele
                  </a>
                  <a href={routes.yasal} className="btn btn-ghost btn-md">
                    Yasal Metinler
                  </a>
                </div>
              </div>
            </div>
            <LegalInfoCard />
          </div>
        </div>
      </section>

      <CTASection
        title="İyiliğe Ortak Olun"
        description="Emanetlerinizi ihtiyaç sahiplerine ulaştırmak için bir bağış yeterli."
        primary={{ label: "Bağış Yap", href: routes.bagis }}
        secondary={{ label: "Gönüllü Ol", href: routes.gonulluOl }}
        tone="green"
      />
    </>
  );
}
