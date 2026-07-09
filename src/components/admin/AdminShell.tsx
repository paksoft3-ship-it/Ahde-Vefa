"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, LogOut, Menu, Search, X } from "lucide-react";
import { ADMIN_NAV } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { ADMIN_ICONS } from "./icons";

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Yönetim menüsü">
      {ADMIN_NAV.map((item) => {
        const Icon = ADMIN_ICONS[item.icon];
        const active =
          pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-white/15 text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white",
            )}
          >
            {Icon && <Icon className="h-5 w-5 shrink-0" />}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => router.push(routes.admin.login);

  return (
    <div className="min-h-screen bg-brand-mint/50">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-brand-dark lg:flex">
        <div className="flex h-16 items-center border-b border-white/10 px-5">
          <Logo href={routes.admin.dashboard} variant="light" />
        </div>
        <SidebarNav />
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 border-t border-white/10 px-6 py-4 text-sm font-medium text-white/70 hover:text-white"
        >
          <LogOut className="h-5 w-5" /> Çıkış Yap
        </button>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-brand-dark">
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
              <Logo href={routes.admin.dashboard} variant="light" />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white/70"
                aria-label="Menüyü kapat"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <SidebarNav onNavigate={() => setMobileOpen(false)} />
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 border-t border-white/10 px-6 py-4 text-sm font-medium text-white/70"
            >
              <LogOut className="h-5 w-5" /> Çıkış Yap
            </button>
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-hairline bg-white px-4 md:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-brand-dark lg:hidden"
            aria-label="Menüyü aç"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Ara..."
              className="h-10 w-full rounded-md border border-hairline bg-brand-mint/40 pl-9 pr-3 text-sm outline-none focus:border-brand-green"
            />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-md text-muted hover:bg-brand-mint"
              aria-label="Bildirimler"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-turquoise" />
            </button>
            <Link
              href={routes.admin.profil}
              className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 hover:bg-brand-mint"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-white">
                AV
              </span>
              <span className="hidden text-sm font-semibold text-ink sm:block">
                Yönetici
              </span>
            </Link>
          </div>
        </header>

        <main className="px-4 py-6 md:px-6 md:py-8">{children}</main>
      </div>
    </div>
  );
}
