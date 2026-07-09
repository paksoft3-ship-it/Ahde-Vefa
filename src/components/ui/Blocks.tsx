import { Check, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { LEGAL } from "@/lib/constants";
import { ButtonLink } from "./Button";

/** Trust badge row shown near donation CTAs. */
export function TrustBadges({ className }: { className?: string }) {
  const items = [
    { icon: ShieldCheck, label: "Şeffaf Bağış Süreci" },
    { icon: Check, label: "Saha Raporları" },
    { icon: Check, label: "Resmi Dernek Bilgileri" },
  ];
  return (
    <div className={cn("flex flex-wrap gap-x-6 gap-y-3", className)}>
      {items.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2 text-sm font-medium text-muted">
          <Icon className="h-5 w-5 text-brand-green" />
          {label}
        </div>
      ))}
    </div>
  );
}

/** Legal/registry placeholder card (cloude.md §15). */
export function LegalInfoCard({ className }: { className?: string }) {
  const rows = [
    { label: "Dernek Kütük No", value: LEGAL.kutukNo },
    { label: "Yardım Toplama İzin No", value: LEGAL.yardimToplamaIzinNo },
    { label: "İzin Başlangıç Tarihi", value: LEGAL.izinBaslangic },
    { label: "İzin Bitiş Tarihi", value: LEGAL.izinBitis },
    { label: "Yetkili Makam", value: LEGAL.yetkiliMakam },
  ];
  return (
    <div className={cn("card p-6", className)}>
      <div className="mb-4 flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-brand-green" />
        <h3 className="text-lg font-bold text-brand-green">Resmi Dernek Bilgileri</h3>
      </div>
      <dl className="divide-y divide-hairline">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 py-2.5">
            <dt className="text-sm text-muted">{row.label}</dt>
            <dd className="text-sm font-semibold text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs text-muted">
        Resmi bilgiler dernek tarafından tamamlandıkça bu alan güncellenecektir.
      </p>
    </div>
  );
}

/** Warm-cream call-to-action band. */
export function CTASection({
  title,
  description,
  primary,
  secondary,
  tone = "cream",
}: {
  title: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  tone?: "cream" | "green";
}) {
  return (
    <section
      className={cn(
        "py-14 md:py-20",
        tone === "cream" ? "bg-brand-cream" : "bg-brand-dark",
      )}
    >
      <div className="container-page text-center">
        <h2
          className={cn(
            "mx-auto max-w-2xl text-[26px] font-extrabold leading-tight md:text-[34px]",
            tone === "green" ? "text-white" : "text-brand-green",
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mx-auto mt-4 max-w-2xl text-lg",
              tone === "green" ? "text-white/80" : "text-muted",
            )}
          >
            {description}
          </p>
        )}
        {(primary || secondary) && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {primary && (
              <ButtonLink href={primary.href} variant="primary" size="lg">
                {primary.label}
              </ButtonLink>
            )}
            {secondary && (
              <ButtonLink
                href={secondary.href}
                variant={tone === "green" ? "ghost" : "secondary"}
                size="lg"
              >
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/** Vertical process/step timeline. */
export function StepTimeline({
  steps,
}: {
  steps: { title: string; description: string }[];
}) {
  return (
    <ol className="relative space-y-6 border-l-2 border-brand-mint pl-8">
      {steps.map((step, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-white ring-4 ring-white">
            {i + 1}
          </span>
          <h3 className="font-bold text-ink">{step.title}</h3>
          <p className="mt-1 text-sm text-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
