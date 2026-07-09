import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Breadcrumb, type Crumb } from "@/components/ui/PageHero";

export function AdminPageHeader({
  title,
  description,
  breadcrumb,
  actions,
}: {
  title: string;
  description?: string;
  breadcrumb?: Crumb[];
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      {breadcrumb && (
        <div className="mb-3">
          <Breadcrumb items={breadcrumb} />
        </div>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-dark">{title}</h1>
          {description && <p className="mt-1 text-sm text-muted">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
    </div>
  );
}

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  tone = "green",
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  hint?: string;
  tone?: "green" | "turquoise" | "gold" | "blue";
}) {
  const toneClass = {
    green: "bg-emerald-50 text-emerald-600",
    turquoise: "bg-cyan-50 text-cyan-600",
    gold: "bg-amber-50 text-amber-600",
    blue: "bg-blue-50 text-blue-600",
  }[tone];
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted">{label}</p>
          <p className="mt-1 text-2xl font-extrabold text-brand-dark">{value}</p>
        </div>
        <span className={cn("flex h-11 w-11 items-center justify-center rounded-md", toneClass)}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      {hint && <p className="mt-3 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function SectionCard({
  title,
  description,
  action,
  children,
  className,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("card overflow-hidden", className)}>
      {(title || action) && (
        <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-4">
          <div>
            {title && <h2 className="font-bold text-brand-dark">{title}</h2>}
            {description && <p className="mt-0.5 text-sm text-muted">{description}</p>}
          </div>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

/** Privacy warning banner for donor/sensitive data screens (cloude.md §23). */
export function PrivacyNotice({ children }: { children?: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-start gap-3 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      <span className="mt-0.5 font-bold">KVKK</span>
      <p>
        {children ??
          "Bu ekran kişisel veri içerir. Verileri yalnızca yetkiniz dahilinde ve KVKK ilkelerine uygun şekilde işleyin. Dışa aktarma işlemleri kayıt altına alınır."}
      </p>
    </div>
  );
}

export function LinkRow({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-brand-mint/60"
    >
      <span>{children}</span>
      <ChevronRight className="h-4 w-4 text-muted" />
    </Link>
  );
}
