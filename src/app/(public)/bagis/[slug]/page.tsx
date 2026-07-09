import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Info } from "lucide-react";
import { campaigns, findCampaign, reports } from "@/lib/mock-data";
import { routes } from "@/lib/routes";
import { GENERAL_FAQ, DONATION_STEPS } from "@/lib/content";
import { PLACEHOLDER } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepTimeline } from "@/components/ui/Blocks";
import { FAQAccordion } from "@/components/ui/Accordion";
import { EmptyState } from "@/components/ui/States";
import { MediaImage } from "@/components/ui/MediaImage";
import { StatusBadge, Badge } from "@/components/ui/StatusBadge";
import { ButtonLink } from "@/components/ui/Button";
import { CampaignCard, ReportCard } from "@/components/public/Cards";
import { PakistanNotice } from "@/components/public/PakistanNotice";
import { DonationQuickCard } from "@/components/forms/DonationQuickCard";

export function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const campaign = findCampaign(slug);
  if (!campaign) {
    return { title: "Kampanya Bulunamadı — AHDE VEFA" };
  }
  return {
    title: `${campaign.title} — AHDE VEFA`,
    description: campaign.summary,
  };
}

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const campaign = findCampaign(slug);
  if (!campaign) notFound();

  const isPrep = campaign.status === "Hazırlık Aşamasında";

  const relatedReports = reports
    .filter((r) => r.region === campaign.region)
    .slice(0, 3);

  const relatedCampaigns = campaigns
    .filter(
      (c) =>
        c.id !== campaign.id &&
        (c.region === campaign.region || c.category === campaign.category),
    )
    .slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-hairline bg-white">
        <div className="container-page py-4">
          <Breadcrumb
            items={[
              { label: "Anasayfa", href: routes.home },
              { label: "Bağış Yap", href: routes.bagis },
              { label: campaign.title },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-brand-mint">
        <div className="container-page py-10 md:py-14">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="relative overflow-hidden rounded-xl">
              <MediaImage keyword={campaign.image} className="h-64 w-full md:h-80" showLabel />
            </div>
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge tone="green">{campaign.category}</Badge>
                <StatusBadge status={campaign.status} />
                <span className="inline-flex items-center gap-1 text-sm font-medium text-muted">
                  <MapPin className="h-4 w-4" /> {campaign.region}
                </span>
              </div>
              <h1 className="text-[30px] font-extrabold leading-tight text-brand-green md:text-[40px]">
                {campaign.title}
              </h1>
              <p className="mt-4 text-lg text-muted">{campaign.summary}</p>
              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm font-semibold">
                <span className="text-brand-green">Toplanan: {PLACEHOLDER}</span>
                <span className="text-muted">Hedef: {PLACEHOLDER}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Main content */}
          <div className="space-y-14">
            {/* Overview */}
            <div>
              <SectionHeading title="Kampanya Hakkında" />
              <div className="space-y-4 text-base leading-relaxed text-muted">
                <p>{campaign.description}</p>
                <p>
                  Bağışlarınız ihtiyaç önceliğine göre değerlendirilir; doğrulanan
                  faaliyetler saha raporlarıyla paylaşılır. Tutar ve toplam bilgileri,
                  doğrulandıkça {PLACEHOLDER} alanları güncellenerek yayımlanacaktır.
                </p>
              </div>
            </div>

            {/* Process timeline */}
            <div>
              <SectionHeading title="Süreç Nasıl İşliyor?" />
              <StepTimeline steps={DONATION_STEPS} />
            </div>

            {/* Suggested amounts */}
            <div>
              <SectionHeading
                title="Örnek Bağış Tutarları"
                description="Aşağıdaki tutarlar yalnızca örnektir; fiyat ya da zorunlu bir değer değildir."
              />
              {campaign.suggestedAmounts.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {campaign.suggestedAmounts.map((amt) => (
                    <span
                      key={amt}
                      className="rounded-lg border-2 border-hairline bg-white px-5 py-3 text-base font-bold text-brand-green"
                    >
                      {amt.toLocaleString("tr-TR")} ₺
                    </span>
                  ))}
                  <span className="rounded-lg border-2 border-dashed border-hairline bg-white px-5 py-3 text-base font-bold text-muted">
                    Diğer
                  </span>
                </div>
              ) : (
                <p className="rounded-lg border border-dashed border-hairline bg-brand-mint/40 px-5 py-4 text-sm font-semibold text-muted">
                  {PLACEHOLDER}
                </p>
              )}
              <p className="mt-3 flex items-center gap-2 text-xs text-muted">
                <Info className="h-4 w-4" />
                Tutarlar illüstratiftir; gerçek bağış tutarını ödeme adımında siz belirlersiniz.
              </p>
            </div>

            {/* Related reports */}
            <div>
              <SectionHeading
                title="İlgili Raporlar"
                action={{ label: "Tüm Raporlar", href: routes.raporlar }}
              />
              {relatedReports.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  {relatedReports.map((report) => (
                    <ReportCard key={report.id} report={report} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="Henüz rapor yok"
                  description="Bu bölgeye ait yayımlanmış rapor bulunmuyor. Doğrulanan faaliyetler eklendikçe burada listelenecektir."
                />
              )}
            </div>
          </div>

          {/* Donation sidebar */}
          <aside>
            <div className="lg:sticky lg:top-24 space-y-6">
              {isPrep ? (
                <div className="rounded-xl border border-hairline bg-white p-6 shadow-donation">
                  <h2 className="mb-4 text-lg font-bold text-brand-green">Destek Ol</h2>
                  <PakistanNotice />
                  <p className="mt-4 text-sm text-muted">
                    Bu çalışma hazırlık aşamasında olduğundan bağış toplama süreci henüz
                    başlatılmamıştır. Gelişmelerden haberdar olmak için bizimle iletişime
                    geçebilirsiniz.
                  </p>
                  <ButtonLink href={routes.iletisim} variant="primary" size="lg" className="mt-5 w-full">
                    Bilgi Al
                  </ButtonLink>
                </div>
              ) : (
                <DonationQuickCard
                  defaultType={campaign.title}
                  title="Bu Kampanyaya Bağış Yap"
                />
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* Related campaigns */}
      {relatedCampaigns.length > 0 && (
        <section className="bg-brand-mint py-14 md:py-20">
          <div className="container-page">
            <SectionHeading
              eyebrow="Diğer Kampanyalar"
              title="Benzer Kampanyalar"
              action={{ label: "Tümünü Gör", href: routes.bagis }}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCampaigns.map((c) => (
                <CampaignCard key={c.id} campaign={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="container-page py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Sıkça Sorulan Sorular"
            title="Merak Edilenler"
            align="center"
          />
          <FAQAccordion items={GENERAL_FAQ} />
        </div>
      </section>
    </>
  );
}
