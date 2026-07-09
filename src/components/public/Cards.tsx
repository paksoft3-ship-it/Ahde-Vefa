import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import type { Campaign, GalleryAlbum, NewsItem, Report } from "@/lib/types";
import { routes } from "@/lib/routes";
import { formatDate, PLACEHOLDER } from "@/lib/utils";
import { MediaImage } from "@/components/ui/MediaImage";
import { Badge, StatusBadge } from "@/components/ui/StatusBadge";
import { ButtonLink } from "@/components/ui/Button";

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  const isPrep = campaign.status === "Hazırlık Aşamasında";
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-white shadow-card transition-all hover:shadow-card-hover">
      <div className="relative h-48">
        <MediaImage keyword={campaign.image} className="h-full w-full" />
        <div className="absolute left-4 top-4">
          <Badge tone="green" className="bg-white/95 text-brand-green shadow-sm ring-0">
            {campaign.category}
          </Badge>
        </div>
        {isPrep && (
          <div className="absolute right-4 top-4">
            <StatusBadge status="Hazırlık Aşamasında" className="bg-white/95 shadow-sm" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-1 text-xs font-medium text-muted">
          <MapPin className="h-3.5 w-3.5" /> {campaign.region}
        </div>
        <h3 className="text-lg font-bold text-ink">{campaign.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{campaign.summary}</p>

        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
            <span className="text-brand-green">Toplanan: {PLACEHOLDER}</span>
            <span className="text-muted">Hedef: {PLACEHOLDER}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-brand-mint">
            <div
              className="h-full rounded-full bg-brand-gold/40"
              style={{ width: "8%" }}
              aria-hidden
            />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3 pt-1">
          {isPrep ? (
            <ButtonLink
              href={routes.bagisDetay(campaign.slug)}
              variant="secondary"
              size="sm"
              className="flex-1"
            >
              Detayları Gör
            </ButtonLink>
          ) : (
            <>
              <ButtonLink
                href={routes.bagisDetay(campaign.slug)}
                variant="primary"
                size="sm"
                className="flex-1"
              >
                Bağış Yap
              </ButtonLink>
              <Link
                href={routes.bagisDetay(campaign.slug)}
                className="text-sm font-semibold text-brand-green hover:underline"
              >
                Detay
              </Link>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export function ReportCard({ report }: { report: Report }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-white shadow-card transition-all hover:shadow-card-hover">
      <div className="relative h-40">
        <MediaImage keyword={report.image} className="h-full w-full" />
        <div className="absolute left-4 top-4">
          <Badge tone="turquoise" className="bg-white/95 ring-0">{report.region}</Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-3 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" /> {formatDate(report.publishedAt)}
          </span>
          <span className="font-semibold text-brand-green">{report.category}</span>
        </div>
        <h3 className="text-lg font-bold text-ink">{report.title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">{report.summary}</p>
        <Link
          href={routes.raporDetay(report.slug)}
          className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-green hover:gap-2"
        >
          Raporu İncele <ArrowRight className="h-4 w-4 transition-all" />
        </Link>
      </div>
    </article>
  );
}

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-white shadow-card transition-all hover:shadow-card-hover">
      <div className="relative h-40">
        <MediaImage keyword={item.image} className="h-full w-full" />
        <div className="absolute left-4 top-4">
          <Badge tone={item.category === "Duyuru" ? "gold" : "turquoise"} className="bg-white/95 ring-0">
            {item.category}
          </Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-1 text-xs text-muted">
          <Calendar className="h-3.5 w-3.5" /> {formatDate(item.publishedAt)} · {item.region}
        </div>
        <h3 className="text-lg font-bold text-ink">{item.title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">{item.summary}</p>
        <Link
          href={routes.haberDetay(item.slug)}
          className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-green hover:gap-2"
        >
          Devamını Oku <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export function AlbumCard({ album }: { album: GalleryAlbum }) {
  return (
    <Link
      href={routes.galeriDetay(album.slug)}
      className="group relative block overflow-hidden rounded-lg border border-hairline shadow-card transition-all hover:shadow-card-hover"
    >
      <MediaImage keyword={album.cover} className="h-56 w-full transition-transform group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <div className="mb-1 text-xs font-medium text-white/80">
          {album.region} · {album.photoCount} fotoğraf
        </div>
        <h3 className="text-lg font-bold">{album.title}</h3>
      </div>
    </Link>
  );
}
