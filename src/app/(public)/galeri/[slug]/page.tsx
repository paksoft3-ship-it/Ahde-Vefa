import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Images, MapPin, ShieldCheck } from "lucide-react";
import { findAlbum, galleryAlbums, reports } from "@/lib/mock-data";
import { routes } from "@/lib/routes";
import { formatDate } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/ui/Blocks";
import { Badge } from "@/components/ui/StatusBadge";
import { AlbumCard, ReportCard } from "@/components/public/Cards";
import { PakistanNotice } from "@/components/public/PakistanNotice";
import { Lightbox } from "./Lightbox";

export function generateStaticParams() {
  return galleryAlbums.map((album) => ({ slug: album.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const album = findAlbum(slug);
  if (!album) {
    return { title: "Albüm Bulunamadı | AHDE VEFA" };
  }
  return {
    title: `${album.title} | Galeri | AHDE VEFA`,
    description: `${album.title} albümü — ${album.region} bölgesinden saha fotoğrafları. Fotoğraflar mahremiyet gözetilerek paylaşılır.`,
  };
}

export default async function GaleriAlbumDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const album = findAlbum(slug);
  if (!album) notFound();

  const isPakistan = album.region === "Pakistan";
  const relatedReports = reports
    .filter((r) => r.region === album.region)
    .slice(0, 2);
  const otherAlbums = galleryAlbums
    .filter((a) => a.slug !== album.slug)
    .slice(0, 3);

  return (
    <>
      {/* Albüm başlığı */}
      <section className="border-b border-hairline bg-brand-mint">
        <div className="container-page py-8 md:py-12">
          <Breadcrumb
            items={[
              { label: "Anasayfa", href: routes.home },
              { label: "Galeri", href: routes.galeri },
              { label: album.title },
            ]}
          />
          <div className="mt-6">
            <Badge tone="turquoise">{album.region}</Badge>
            <h1 className="mt-4 text-[28px] font-extrabold leading-tight text-brand-green md:text-[40px]">
              {album.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {album.region}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Images className="h-4 w-4" /> {album.photoCount} fotoğraf
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {formatDate(album.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mahremiyet notu */}
      <section className="container-page pt-10">
        <div className="flex items-start gap-3 rounded-lg border border-hairline bg-brand-mint/50 p-5">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
          <div>
            <p className="font-semibold text-brand-green">Mahremiyet Gözetilir</p>
            <p className="mt-1 text-sm text-muted">
              Bu albümdeki görseller, faydalanıcıların mahremiyeti ve insan onuru
              gözetilerek yalnızca bilgilendirme amacıyla paylaşılmıştır. Fotoğraf
              açıklamalarındaki ayrıntılar{" "}
              <span className="font-semibold text-ink">[Eklenecek]</span> olarak
              gösterilir.
            </p>
          </div>
        </div>
      </section>

      {/* Fotoğraf ızgarası + lightbox */}
      <section className="container-page py-14 md:py-16">
        {isPakistan && <PakistanNotice className="mb-8" />}

        {album.photos.length > 0 ? (
          <Lightbox photos={album.photos} />
        ) : (
          <div className="card p-10 text-center text-muted">
            Bu albümde henüz fotoğraf bulunmuyor.
          </div>
        )}
      </section>

      {/* İlgili raporlar / kampanya bağlantıları */}
      {relatedReports.length > 0 && (
        <section className="bg-brand-mint/50 py-16 md:py-20">
          <div className="container-page">
            <SectionHeading
              eyebrow="İlgili"
              title="Bu Bölgeden Raporlar"
              description="Albümdeki çalışmalarla ilgili saha ve faaliyet raporları."
              action={{ label: "Tüm Raporlar", href: routes.raporlar }}
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedReports.map((r) => (
                <ReportCard key={r.id} report={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Diğer albümler */}
      {otherAlbums.length > 0 && (
        <section className="container-page py-16 md:py-20">
          <SectionHeading
            eyebrow="Galeri"
            title="Diğer Albümler"
            action={{ label: "Tüm Albümler", href: routes.galeri }}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherAlbums.map((a) => (
              <AlbumCard key={a.id} album={a} />
            ))}
          </div>
        </section>
      )}

      <CTASection
        tone="green"
        title="Sahadaki iyiliğe ortak olun"
        description="Çalışmalarımızı görün, raporlarımızı inceleyin ve destek olun."
        primary={{ label: "Bağış Yap", href: routes.bagis }}
        secondary={{ label: "Şeffaflık ve Raporlar", href: routes.raporlar }}
      />
    </>
  );
}
