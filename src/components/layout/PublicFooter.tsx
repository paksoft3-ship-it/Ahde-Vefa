import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, FOOTER_LINKS, LEGAL, SITE } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { LogoHorizontal } from "@/components/ui/LogoHorizontal";
import { DevCredit } from "@/components/layout/DevCredit";

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/60">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-white/80 hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PublicFooter() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <LogoHorizontal href={routes.home} onDark />
            <p className="mt-4 max-w-sm text-sm text-white/70">{SITE.description}</p>
            <div className="mt-6 space-y-2.5 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" /> {CONTACT.phone}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" /> {CONTACT.email}
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {CONTACT.address}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            <LinkColumn title="Kurumsal" links={FOOTER_LINKS.kurumsal} />
            <LinkColumn title="Bağış" links={FOOTER_LINKS.bagis} />
            <LinkColumn title="Faaliyet Bölgeleri" links={FOOTER_LINKS.faaliyet} />
            <LinkColumn title="Destek" links={FOOTER_LINKS.destek} />
          </div>
        </div>

        <div className="mt-12 grid gap-4 rounded-lg border border-white/10 bg-white/5 p-5 sm:grid-cols-2 lg:grid-cols-4">
          <FooterLegal label="Dernek Kütük No" value={LEGAL.kutukNo} />
          <FooterLegal label="Yardım Toplama İzin No" value={LEGAL.yardimToplamaIzinNo} />
          <FooterLegal label="İzin Tarihleri" value={LEGAL.izinBaslangic} />
          <FooterLegal label="Yetkili Makam" value={LEGAL.yetkiliMakam} />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-5 text-sm text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.fullName}. Tüm hakları saklıdır.</p>
          <DevCredit />
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href={routes.yasal} className="hover:text-white">KVKK</Link>
            <Link href={routes.yasal} className="hover:text-white">Bağış Bilgilendirme</Link>
            <Link href={routes.yasal} className="hover:text-white">Yasal Metinler</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLegal({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-white/50">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-white/90">{value}</p>
    </div>
  );
}
