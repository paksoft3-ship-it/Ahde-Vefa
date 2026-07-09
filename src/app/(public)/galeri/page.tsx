import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { galleryAlbums } from "@/lib/mock-data";
import { routes } from "@/lib/routes";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/ui/Blocks";
import { AlbumCard } from "@/components/public/Cards";
import { PakistanNotice } from "@/components/public/PakistanNotice";

export const metadata: Metadata = {
  title: "Galeri ve Saha Fotoğrafları | AHDE VEFA",
  description:
    "AHDE VEFA İnsani Yardım Derneği'nin saha çalışmalarından albümler. Fotoğraflar, mahremiyet ve insan onurunu gözeterek paylaşılır.",
};

export default function GaleriPage() {
  const hasPakistan = galleryAlbums.some((a) => a.region === "Pakistan");

  return (
    <>
      <PageHero
        title="Galeri ve Saha Fotoğrafları"
        description="Çalışma bölgelerimizden derlediğimiz albümler. Fotoğraflarımızı, faydalanıcıların mahremiyetini ve insan onurunu gözeterek paylaşıyoruz."
        breadcrumb={[
          { label: "Anasayfa", href: routes.home },
          { label: "Galeri" },
        ]}
      />

      {/* Mahremiyet notu */}
      <section className="container-page pt-10">
        <div className="flex items-start gap-3 rounded-lg border border-hairline bg-brand-mint/50 p-5">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
          <div>
            <p className="font-semibold text-brand-green">Mahremiyet ve İnsan Onuru</p>
            <p className="mt-1 text-sm text-muted">
              Yardım çalışmalarımızda faydalanıcıların mahremiyeti gözetilir. Rencide edici
              veya kişiyi teşhir eden görsellerden kaçınırız; gerekli durumlarda kimlik
              bilgileri gizlenir. Görseller yalnızca bilgilendirme amacıyla paylaşılır.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-14 md:py-16">
        <SectionHeading
          eyebrow="Albümler"
          title="Saha Albümleri"
          description="Bölgelerimizden derlenen fotoğraf albümlerini inceleyebilirsiniz."
        />

        {galleryAlbums.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        ) : (
          <div className="card p-10 text-center text-muted">
            Henüz yayımlanmış albüm bulunmuyor.
          </div>
        )}

        {hasPakistan && (
          <div className="mt-10">
            <PakistanNotice />
          </div>
        )}
      </section>

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
