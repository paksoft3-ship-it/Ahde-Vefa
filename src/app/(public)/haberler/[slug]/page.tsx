import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Tag } from "lucide-react";
import { findNews, news } from "@/lib/mock-data";
import { routes } from "@/lib/routes";
import { formatDate } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/ui/Blocks";
import { Badge } from "@/components/ui/StatusBadge";
import { ButtonLink } from "@/components/ui/Button";
import { MediaImage } from "@/components/ui/MediaImage";
import { NewsCard } from "@/components/public/Cards";
import { PakistanNotice } from "@/components/public/PakistanNotice";

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = findNews(slug);
  if (!item) {
    return { title: "İçerik Bulunamadı | AHDE VEFA" };
  }
  return {
    title: `${item.title} | AHDE VEFA`,
    description: item.summary,
  };
}

export default async function HaberDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = findNews(slug);
  if (!item) notFound();

  const isPakistan = item.region === "Pakistan";
  const related = news
    .filter((n) => n.slug !== item.slug)
    .filter((n) => n.region === item.region || n.category === item.category)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-hairline bg-brand-mint">
        <div className="container-page py-8 md:py-12">
          <Breadcrumb
            items={[
              { label: "Anasayfa", href: routes.home },
              { label: "Sahadan Haberler", href: routes.haberler },
              { label: item.title },
            ]}
          />
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={item.category === "Duyuru" ? "gold" : "turquoise"}>
                  {item.category}
                </Badge>
                <Badge tone="green">{item.region}</Badge>
              </div>
              <h1 className="mt-4 text-[28px] font-extrabold leading-tight text-brand-green md:text-[40px]">
                {item.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted">{item.summary}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Tag className="h-4 w-4" /> {item.category}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> {item.region}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" /> {formatDate(item.publishedAt)}
                </span>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-hairline shadow-card">
              <MediaImage keyword={item.image} className="h-56 w-full md:h-72" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Gövde */}
          <article className="max-w-none space-y-5 text-[15px] leading-relaxed text-ink/80">
            {isPakistan && <PakistanNotice className="mb-2" />}

            <p>
              {item.region} bölgesindeki çalışmalarımıza dair bu{" "}
              {item.category.toLowerCase()}, sahadaki gelişmeleri bağışçılarımız ve
              kamuoyuyla paylaşmak amacıyla hazırlanmıştır. Amacımız, desteğinizin nasıl
              değerlendirildiğini şeffaf biçimde aktarmaktır.
            </p>
            <p>
              Çalışmalar ihtiyaç önceliğine göre planlanmakta ve saha ekiplerimiz
              tarafından yürütülmektedir. Bu içeriğe konu sürecin tarih, sayı ve
              faydalanıcı bilgileri gibi ayrıntıları ({" "}
              <span className="font-semibold text-ink">[Eklenecek]</span> ) doğrulama
              tamamlandıkça güncellenecektir.
            </p>
            <p>
              Doğrulanan faaliyetler ayrıca saha ve faaliyet raporlarımızda ayrıntılı
              biçimde paylaşılır. Hiçbir bilgi doğrulanmadan tamamlanmış faaliyet olarak
              sunulmaz.
            </p>
            {isPakistan && (
              <p>
                Pakistan çalışmalarımız hazırlık aşamasındadır; bu bölgeye ait tamamlanmış
                faaliyet, dağıtım veya sayısal veri paylaşılmamıştır.
              </p>
            )}

            <div className="rounded-lg border border-hairline bg-brand-mint/40 p-5 text-sm text-muted">
              Kaynak ve iletişim bilgileri:{" "}
              <span className="font-semibold text-ink">[Eklenecek]</span>
            </div>
          </article>

          {/* Yan sütun */}
          <aside className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-bold text-brand-green">İyiliğe ortak olun</h3>
              <p className="mt-2 text-sm text-muted">
                Sahadaki çalışmaların sürmesi için bağışınızla destek olabilirsiniz.
              </p>
              <ButtonLink
                href={routes.bagis}
                variant="primary"
                size="md"
                className="mt-4 w-full"
              >
                Bağış Yap
              </ButtonLink>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-bold text-brand-green">Bilgi</h3>
              <dl className="mt-4 divide-y divide-hairline text-sm">
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-muted">Tür</dt>
                  <dd className="font-semibold text-ink">{item.category}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-muted">Bölge</dt>
                  <dd className="font-semibold text-ink">{item.region}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-muted">Tarih</dt>
                  <dd className="font-semibold text-ink">
                    {formatDate(item.publishedAt)}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* İlgili haberler */}
      {related.length > 0 && (
        <section className="bg-brand-mint/50 py-16 md:py-20">
          <div className="container-page">
            <SectionHeading
              eyebrow="Devamı"
              title="İlgili Haberler ve Duyurular"
              action={{ label: "Tüm Haberler", href: routes.haberler }}
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((n) => (
                <NewsCard key={n.id} item={n} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        tone="cream"
        title="Şeffaflık, güvenin temelidir"
        description="Sahadan bilgilendirmeleri takip edin, raporlarımızı inceleyin."
        primary={{ label: "Şeffaflık ve Raporlar", href: routes.raporlar }}
        secondary={{ label: "Bize Ulaşın", href: routes.iletisim }}
      />
    </>
  );
}
