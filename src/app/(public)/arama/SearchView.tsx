"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { campaigns, reports, news, galleryAlbums } from "@/lib/mock-data";
import { routes } from "@/lib/routes";
import { PageHero } from "@/components/ui/PageHero";
import { EmptyState } from "@/components/ui/States";
import {
  CampaignCard,
  ReportCard,
  NewsCard,
  AlbumCard,
} from "@/components/public/Cards";

const SUGGESTIONS = ["Su Kuyusu", "Kurban", "Gıda", "Ramazan", "Afrika", "Acil Yardım"];

function normalize(value: string) {
  return value.toLocaleLowerCase("tr-TR");
}

export function SearchView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [input, setInput] = useState(query);

  const q = normalize(query.trim());

  const results = useMemo(() => {
    if (!q) {
      return { campaigns: [], reports: [], news: [], albums: [] };
    }
    const match = (...fields: (string | undefined)[]) =>
      fields.some((f) => f && normalize(f).includes(q));

    return {
      campaigns: campaigns.filter((c) =>
        match(c.title, c.summary, c.region, c.category),
      ),
      reports: reports.filter((r) => match(r.title, r.summary, r.region)),
      news: news.filter((n) => match(n.title, n.summary, n.region)),
      albums: galleryAlbums.filter((a) => match(a.title, a.region)),
    };
  }, [q]);

  const total =
    results.campaigns.length +
    results.reports.length +
    results.news.length +
    results.albums.length;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    router.push(`${routes.arama}?q=${encodeURIComponent(trimmed)}`);
  }

  function applySuggestion(term: string) {
    setInput(term);
    router.push(`${routes.arama}?q=${encodeURIComponent(term)}`);
  }

  return (
    <>
      <PageHero
        title="Arama"
        description="Kampanyalar, raporlar, haberler ve galeri içinde arama yapın."
        breadcrumb={[
          { label: "Anasayfa", href: routes.home },
          { label: "Arama" },
        ]}
      >
        <form onSubmit={submit} className="max-w-2xl" role="search">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ne aramıştınız? (ör. su kuyusu, kurban, rapor)"
              aria-label="Site içinde ara"
              className="field-input pl-12 pr-28"
            />
            <button
              type="submit"
              className="btn btn-primary btn-sm absolute right-2 top-1/2 -translate-y-1/2"
            >
              Ara
            </button>
          </div>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted">Öneriler:</span>
          {SUGGESTIONS.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => applySuggestion(term)}
              className="rounded-full border border-hairline bg-white px-3 py-1 text-sm font-medium text-muted transition-colors hover:border-brand-green hover:text-brand-green"
            >
              {term}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="container-page py-14 md:py-20">
        {!q ? (
          <EmptyState
            icon={Search}
            title="Aramaya başlayın"
            description="Yukarıdaki arama kutusunu kullanarak kampanyalar, raporlar, haberler ve galeri içinde arama yapabilirsiniz."
          />
        ) : total === 0 ? (
          <EmptyState
            icon={Search}
            title={`"${query}" için sonuç bulunamadı`}
            description="Farklı bir anahtar kelime deneyebilir veya önerilen aramalardan birini seçebilirsiniz."
          />
        ) : (
          <div className="space-y-14">
            <p className="text-sm text-muted">
              <span className="font-semibold text-ink">“{query}”</span> için{" "}
              {total} sonuç bulundu.
            </p>

            {results.campaigns.length > 0 && (
              <div>
                <h2 className="mb-6 text-2xl font-extrabold text-brand-green">
                  Kampanyalar{" "}
                  <span className="text-base font-semibold text-muted">
                    ({results.campaigns.length})
                  </span>
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {results.campaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                  ))}
                </div>
              </div>
            )}

            {results.reports.length > 0 && (
              <div>
                <h2 className="mb-6 text-2xl font-extrabold text-brand-green">
                  Raporlar{" "}
                  <span className="text-base font-semibold text-muted">
                    ({results.reports.length})
                  </span>
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {results.reports.map((report) => (
                    <ReportCard key={report.id} report={report} />
                  ))}
                </div>
              </div>
            )}

            {results.news.length > 0 && (
              <div>
                <h2 className="mb-6 text-2xl font-extrabold text-brand-green">
                  Haberler{" "}
                  <span className="text-base font-semibold text-muted">
                    ({results.news.length})
                  </span>
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {results.news.map((item) => (
                    <NewsCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}

            {results.albums.length > 0 && (
              <div>
                <h2 className="mb-6 text-2xl font-extrabold text-brand-green">
                  Galeri{" "}
                  <span className="text-base font-semibold text-muted">
                    ({results.albums.length})
                  </span>
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {results.albums.map((album) => (
                    <AlbumCard key={album.id} album={album} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}
