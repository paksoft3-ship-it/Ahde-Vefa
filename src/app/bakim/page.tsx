import type { Metadata } from "next";
import { Wrench } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Site Bakımda",
  description: "AHDE VEFA web sitesi kısa süreli bakım çalışması nedeniyle geçici olarak hizmet dışıdır.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-mint/50 px-6 text-center">
      <Logo href={routes.home} />
      <div className="mt-10 flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-green shadow-card">
        <Wrench className="h-8 w-8" />
      </div>
      <h1 className="mt-6 text-2xl font-bold text-ink md:text-3xl">Sitemiz Bakımda</h1>
      <p className="mt-3 max-w-md text-muted">
        Daha iyi bir deneyim sunabilmek için kısa bir bakım çalışması yapıyoruz.
        Kısa süre içinde tekrar hizmetinizdeyiz. Anlayışınız için teşekkür ederiz.
      </p>
      <p className="mt-6 text-sm text-muted">
        Acil durumlar için: <span className="font-semibold text-ink">{CONTACT.phone}</span>
      </p>
    </div>
  );
}
