"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { MediaImage } from "@/components/ui/MediaImage";

type Photo = { src: string; caption: string };

export function Lightbox({ photos }: { photos: Photo[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () =>
      setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length],
  );
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? i : (i - 1 + photos.length) % photos.length,
      ),
    [photos.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, next, prev]);

  const active = openIndex !== null ? photos[openIndex] : null;

  return (
    <>
      {/* Fotoğraf ızgarası */}
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Fotoğrafı büyüt: ${photo.caption}`}
              className="group block w-full overflow-hidden rounded-lg border border-hairline text-left shadow-card transition-all hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2"
            >
              <MediaImage
                keyword={photo.src}
                className="h-40 w-full transition-transform group-hover:scale-105"
              />
              <span className="block p-3 text-xs text-muted">{photo.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Lightbox katmanı */}
      {isOpen && active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Fotoğraf görüntüleyici"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 p-4"
          onClick={close}
        >
          {/* Kapat */}
          <button
            type="button"
            onClick={close}
            aria-label="Kapat"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Önceki */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Önceki fotoğraf"
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
          )}

          {/* Sonraki */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Sonraki fotoğraf"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          )}

          {/* İçerik */}
          <figure
            className="flex max-h-full w-full max-w-3xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <MediaImage
              keyword={active.src}
              label={active.caption}
              className="h-[60vh] w-full max-w-3xl rounded-lg"
              iconClassName="h-24 w-24"
            />
            <figcaption className="mt-4 max-w-2xl text-center text-sm text-white/85">
              {active.caption}
              <span className="mt-1 block text-xs text-white/50">
                {(openIndex ?? 0) + 1} / {photos.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
