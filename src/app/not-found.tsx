import Link from "next/link";
import { Home, Search } from "lucide-react";
import { routes } from "@/lib/routes";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-mint/50 px-6 text-center">
      <Logo href={routes.home} />
      <p className="mt-10 text-7xl font-extrabold text-brand-green">404</p>
      <h1 className="mt-4 text-2xl font-bold text-ink">Sayfa Bulunamadı</h1>
      <p className="mt-2 max-w-md text-muted">
        Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Ana sayfaya dönebilir
        ya da arama yapabilirsiniz.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href={routes.home} variant="primary">
          <Home className="h-4 w-4" /> Ana Sayfa
        </ButtonLink>
        <ButtonLink href={routes.arama} variant="secondary">
          <Search className="h-4 w-4" /> Arama Yap
        </ButtonLink>
      </div>
    </div>
  );
}
