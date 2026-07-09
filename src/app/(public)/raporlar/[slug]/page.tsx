import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, CalendarRange, Download, MapPin, Tag } from "lucide-react";
import { findReport, reports } from "@/lib/mock-data";
import { routes } from "@/lib/routes";
import { formatDate } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/ui/Blocks";
import { Badge } from "@/components/ui/StatusBadge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { MediaImage } from "@/components/ui/MediaImage";
import { ReportCard } from "@/components/public/Cards";
import { PakistanNotice } from "@/components/public/PakistanNotice";

export function generateStaticParams() {
  return reports.map((report) => ({ slug: report.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const report = findReport(slug);
  if (!report) {
    return { title: "Rapor Bulunamadı | AHDE VEFA" };
  }
  return {
    title: `${report.title} | AHDE VEFA`,
    description: report.summary,
  };
}

export default async function RaporDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = findReport(slug);
  if (!report) notFound();

  const isPakistan = report.region === "Pakistan";
  const related = reports
    .filter((r) => r.region === report.region && r.slug !== report.slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-hairline bg-brand-mint">
        <div className="container-page py-8 md:py-12">
          <Breadcrumb
            items={[
              { label: "Anasayfa", href: routes.home },
              { label: "Şeffaflık ve Raporlar", href: routes.raporlar },
              { label: report.title },
            ]}
          />
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="turquoise">{report.region}</Badge>
                <Badge tone="green">{report.category}</Badge>
              </div>
              <h1 className="mt-4 text-[28px] font-extrabold leading-tight text-brand-green md:text-[40px]">
                {report.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted">{report.summary}</p>
            </div>
            <div className="overflow-hidden rounded-lg border border-hairline shadow-card">
              <MediaImage keyword={report.image} className="h-56 w-full md:h-72" />
            </div>
          </div>

          {/* Meta satırı */}
          <dl className="mt-8 grid gap-4 rounded-lg border border-hairline bg-white p-5 sm:grid-cols-2 lg:grid-cols-4">
            <MetaItem icon={MapPin} label="Bölge" value={report.region} />
            <MetaItem
              icon={Calendar}
              label="Yayın Tarihi"
              value={formatDate(report.publishedAt)}
            />
            <MetaItem icon={Tag} label="Kategori" value={report.category} />
            <MetaItem icon={CalendarRange} label="Dönem" value={report.period} />
          </dl>
        </div>
      </section>

      <section className="container-page py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Yapılandırılmış gövde */}
          <article className="max-w-none">
            {isPakistan && <PakistanNotice className="mb-8" />}

            <ArticleSection title="Özet">
              <p>
                Bu rapor, {report.region} bölgesindeki{" "}
                {report.category.toLowerCase()} kapsamında yürütülen çalışmalara dair
                genel bir bilgilendirme sunar. Amacımız, bağışçılarımızın desteğinin
                nasıl değerlendirildiğini şeffaf ve izlenebilir biçimde paylaşmaktır.
              </p>
              <p>
                Rapora konu döneme ait sayısal veriler ({" "}
                <span className="font-semibold text-ink">[Eklenecek]</span> ) saha
                ekiplerimizce doğrulandıkça bu bölümde güncellenecektir.
              </p>
            </ArticleSection>

            <ArticleSection title="Yapılan Çalışmalar">
              <p>
                İlgili dönemde ihtiyaç önceliğine göre planlanan çalışmalar saha
                ekiplerimiz aracılığıyla yürütülmüştür. Çalışmaların kapsamı, ulaşılan
                bölge sayısı ve faydalanıcı bilgileri gibi ayrıntılar ({" "}
                <span className="font-semibold text-ink">[Eklenecek]</span> ) doğrulama
                süreci tamamlandıkça paylaşılacaktır.
              </p>
              <ul>
                <li>İhtiyaç değerlendirmesi ve saha planlaması</li>
                <li>Kaynağın ilgili çalışmalara yönlendirilmesi</li>
                <li>Dağıtım ve uygulama süreçlerinin takibi</li>
                <li>Sonuçların derlenmesi ve doğrulanması</li>
              </ul>
            </ArticleSection>

            <ArticleSection title="Şeffaflık Notu">
              <p>
                AHDE VEFA olarak hiçbir veriyi doğrulanmadan tamamlanmış faaliyet olarak
                sunmuyoruz. Henüz doğrulanmamış bilgiler{" "}
                <span className="font-semibold text-ink">[Eklenecek]</span> olarak
                gösterilir. Resmi dernek bilgileri ve yardım toplama izin verileri, dernek
                tarafından tamamlandıkça yasal metinler bölümünde yayımlanacaktır.
              </p>
              {isPakistan && (
                <p>
                  Pakistan çalışmalarımız hazırlık aşamasındadır; bu bölgeye ait
                  tamamlanmış faaliyet, dağıtım veya sayısal veri paylaşılmamıştır.
                </p>
              )}
            </ArticleSection>

            <div className="mt-8 rounded-lg border border-hairline bg-brand-mint/40 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-bold text-brand-green">Raporu İndir</h3>
                  <p className="mt-1 text-sm text-muted">
                    Rapor dosyası (PDF):{" "}
                    <span className="font-semibold text-ink">[Eklenecek]</span>
                  </p>
                </div>
                <Button variant="secondary" size="md" disabled aria-disabled="true">
                  <Download className="h-4 w-4" /> Raporu İndir
                </Button>
              </div>
            </div>
          </article>

          {/* Yan sütun */}
          <aside className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-bold text-brand-green">Bu çalışmaya destek olun</h3>
              <p className="mt-2 text-sm text-muted">
                Sahadaki çalışmaların sürmesi için bağışınızla katkı sunabilirsiniz.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <ButtonLink
                  href={routes.bagis}
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  Bağış Yap
                </ButtonLink>
              </div>
              <p className="mt-3 text-xs text-muted">
                Bağış tutarları ve kampanya hedefleri{" "}
                <span className="font-semibold">[Eklenecek]</span> olarak gösterilir.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-bold text-brand-green">Rapor Bilgileri</h3>
              <dl className="mt-4 divide-y divide-hairline text-sm">
                <Row label="Bölge" value={report.region} />
                <Row label="Kategori" value={report.category} />
                <Row label="Dönem" value={report.period} />
                <Row label="Yayın Tarihi" value={formatDate(report.publishedAt)} />
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* İlgili raporlar */}
      {related.length > 0 && (
        <section className="bg-brand-mint/50 py-16 md:py-20">
          <div className="container-page">
            <SectionHeading
              eyebrow="Devamı"
              title={`${report.region} Bölgesinden Diğer Raporlar`}
              action={{ label: "Tüm Raporlar", href: routes.raporlar }}
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ReportCard key={r.id} report={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        tone="cream"
        title="Şeffaflık, güvenin temelidir"
        description="Çalışmalarımızı raporlarla takip edin, sorularınız için bize ulaşın."
        primary={{ label: "Bağış Yap", href: routes.bagis }}
        secondary={{ label: "Bize Ulaşın", href: routes.iletisim }}
      />
    </>
  );
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-mint text-brand-green">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <dt className="text-xs font-medium text-muted">{label}</dt>
        <dd className="text-sm font-semibold text-ink">{value}</dd>
      </div>
    </div>
  );
}

function ArticleSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8 last:mb-0">
      <h2 className="text-xl font-bold text-brand-green md:text-2xl">{title}</h2>
      <div className="mt-3 space-y-4 text-[15px] leading-relaxed text-ink/80 [&_li]:ml-1 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ul]:text-muted">
        {children}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <dt className="text-muted">{label}</dt>
      <dd className="font-semibold text-ink">{value}</dd>
    </div>
  );
}
