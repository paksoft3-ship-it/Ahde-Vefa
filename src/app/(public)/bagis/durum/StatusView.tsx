"use client";

import { useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  Clock,
  ReceiptText,
  RotateCw,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import { routes } from "@/lib/routes";
import { GENERAL_FAQ } from "@/lib/content";
import { BANK } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQAccordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";

type Durum = "basarisiz" | "beklemede" | "dekont";

interface Action {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "ghost";
}

const CONFIG: Record<
  Durum,
  {
    icon: LucideIcon;
    title: string;
    message: string;
    ring: string;
    iconColor: string;
    actions: Action[];
    showBank?: boolean;
  }
> = {
  basarisiz: {
    icon: AlertTriangle,
    title: "Ödeme Tamamlanamadı",
    message:
      "Bağış ödemeniz tamamlanamadı. Endişelenmeyin — herhangi bir tahsilat yapılmadı. Ödemeyi yeniden deneyebilir veya banka havalesi/EFT yöntemini tercih edebilirsiniz.",
    ring: "bg-red-50 text-red-600",
    iconColor: "text-red-600",
    actions: [
      { label: "Yeniden Dene", href: routes.odeme, variant: "primary" },
      { label: "Bağış Takip", href: routes.bagisTakip, variant: "secondary" },
    ],
  },
  beklemede: {
    icon: Clock,
    title: "Ödemeniz Beklemede",
    message:
      "Bağış ödemeniz işleme alındı ve onay bekliyor. Durum güncellendiğinde tarafınıza bilgilendirme yapılacaktır. Bağışınızı referans numaranızla takip edebilirsiniz.",
    ring: "bg-amber-50 text-amber-600",
    iconColor: "text-amber-600",
    actions: [
      { label: "Bağış Takip", href: routes.bagisTakip, variant: "primary" },
      { label: "Bağış Sayfasına Dön", href: routes.bagis, variant: "ghost" },
    ],
  },
  dekont: {
    icon: ReceiptText,
    title: "Dekont Bekleniyor",
    message:
      "Banka havalesi/EFT yöntemini seçtiniz. Bağışınızın onaylanabilmesi için ödemenizi yaptıktan sonra dekontunuzu bize iletmeniz gerekmektedir.",
    ring: "bg-cyan-50 text-cyan-600",
    iconColor: "text-cyan-600",
    actions: [
      { label: "Dekont Bildir", href: routes.dekontBildir, variant: "primary" },
      { label: "Bağış Takip", href: routes.bagisTakip, variant: "secondary" },
    ],
    showBank: true,
  },
};

export function StatusView() {
  const params = useSearchParams();
  const raw = params.get("durum");
  const durum: Durum = raw === "basarisiz" || raw === "dekont" ? raw : "beklemede";
  const config = CONFIG[durum];
  const Icon = config.icon;

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-hairline bg-white">
        <div className="container-page py-4">
          <Breadcrumb
            items={[
              { label: "Anasayfa", href: routes.home },
              { label: "Bağış Yap", href: routes.bagis },
              { label: "Bağış Durumu" },
            ]}
          />
        </div>
      </div>

      {/* Status hero */}
      <section className="bg-brand-mint">
        <div className="container-page py-14 text-center md:py-20">
          <div
            className={cn(
              "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-card",
            )}
          >
            <Icon className={cn("h-11 w-11", config.iconColor)} strokeWidth={1.5} />
          </div>
          <h1 className="text-[30px] font-extrabold leading-tight text-brand-green md:text-[40px]">
            {config.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">{config.message}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {config.actions.map((a) => (
              <ButtonLink key={a.label} href={a.href} variant={a.variant} size="lg">
                {a.label === "Yeniden Dene" && <RotateCw className="h-4 w-4" />}
                {a.label}
              </ButtonLink>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          {/* Bank info for dekont */}
          {config.showBank && (
            <div className="card p-6">
              <div className="mb-4 flex items-center gap-2">
                <Landmark className="h-5 w-5 text-brand-green" />
                <h2 className="text-lg font-bold text-brand-green">Banka Bilgileri</h2>
              </div>
              <dl className="divide-y divide-hairline rounded-lg border border-hairline bg-brand-mint/40 px-4">
                {[
                  { label: "Hesap Adı", value: BANK.accountName },
                  { label: "Banka", value: BANK.bankName },
                  { label: "IBAN", value: BANK.iban },
                  { label: "Şube", value: BANK.branch },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-sm text-muted">{row.label}</dt>
                    <dd className="text-sm font-semibold text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-muted">
                Banka bilgileri dernek tarafından tamamlandıkça güncellenecektir.
              </p>
            </div>
          )}

          {/* Support note */}
          <div className="rounded-xl bg-brand-cream p-6 text-center">
            <h2 className="text-lg font-bold text-brand-green">Yardıma mı ihtiyacınız var?</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              Ödeme veya bağış sürecinizle ilgili bir sorun yaşadıysanız bizimle iletişime
              geçebilirsiniz. Ekibimiz size yardımcı olmaktan memnuniyet duyar.
            </p>
            <ButtonLink href={routes.iletisim} variant="secondary" size="md" className="mt-5">
              İletişime Geç
            </ButtonLink>
          </div>

          {/* FAQ */}
          <div>
            <SectionHeading eyebrow="Sıkça Sorulan Sorular" title="Merak Edilenler" align="center" />
            <FAQAccordion items={GENERAL_FAQ.slice(0, 4)} />
          </div>
        </div>
      </section>
    </>
  );
}
