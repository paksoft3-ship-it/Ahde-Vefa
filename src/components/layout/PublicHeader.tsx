"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { CONTACT, PUBLIC_NAV } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/integrations/whatsapp";
import { LogoHorizontal } from "@/components/ui/LogoHorizontal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ButtonLink } from "@/components/ui/Button";

const WHATSAPP_HREF = whatsappLink(
  CONTACT.whatsapp,
  "Merhaba, AHDE VEFA hakkında bilgi almak istiyorum.",
);

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-white/95 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <LogoHorizontal priority />

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Ana menü">
          {PUBLIC_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-semibold transition-colors",
                isActive(item.href)
                  ? "text-brand-green"
                  : "text-muted hover:text-brand-green",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href={WHATSAPP_HREF}
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon className="h-4 w-4" /> Bilgi Al
          </ButtonLink>
          <ButtonLink href={routes.bagis} variant="primary" size="sm">
            Bağış Yap
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-brand-green lg:hidden"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-hairline bg-white lg:hidden">
          <nav className="container-page flex flex-col py-3" aria-label="Mobil menü">
            {PUBLIC_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-3 text-base font-semibold",
                  isActive(item.href)
                    ? "bg-brand-mint text-brand-green"
                    : "text-ink hover:bg-brand-mint/60",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 px-1 pb-2">
              <ButtonLink
                href={WHATSAPP_HREF}
                variant="secondary"
                size="sm"
                className="flex-1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                <WhatsAppIcon className="h-4 w-4" /> Bilgi Al
              </ButtonLink>
              <ButtonLink href={routes.bagis} variant="primary" size="sm" className="flex-1">
                Bağış Yap
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
