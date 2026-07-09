import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-green">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-ink">{item.label}</span>
            )}
            {i < items.length - 1 && (
              <ChevronRight className="h-4 w-4 opacity-50" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Standard inner-page hero with breadcrumb, title and optional description. */
export function PageHero({
  title,
  description,
  breadcrumb,
  tone = "mint",
  children,
}: {
  title: string;
  description?: string;
  breadcrumb?: Crumb[];
  tone?: "mint" | "cream" | "green";
  children?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "border-b border-hairline",
        tone === "mint" && "bg-brand-mint",
        tone === "cream" && "bg-brand-cream",
        tone === "green" && "bg-brand-dark text-white",
      )}
    >
      <div className="container-page py-10 md:py-14">
        {breadcrumb && (
          <div className="mb-4">
            <Breadcrumb items={breadcrumb} />
          </div>
        )}
        <h1
          className={cn(
            "text-[30px] font-extrabold leading-tight md:text-[44px]",
            tone === "green" ? "text-white" : "text-brand-green",
          )}
        >
          {title}
        </h1>
        {description && (
          <p
            className={cn(
              "mt-4 max-w-3xl text-lg",
              tone === "green" ? "text-white/80" : "text-muted",
            )}
          >
            {description}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
