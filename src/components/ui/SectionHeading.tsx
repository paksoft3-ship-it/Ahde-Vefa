import { cn } from "@/lib/utils";
import { ButtonLink } from "./Button";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <p className="mb-2 text-sm font-bold uppercase tracking-wider text-brand-turquoise">
            {eyebrow}
          </p>
        )}
        <h2 className="text-[26px] font-extrabold leading-tight text-brand-green md:text-[34px]">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-lg text-muted">{description}</p>
        )}
      </div>
      {action && (
        <ButtonLink href={action.href} variant="secondary" size="sm" className="shrink-0">
          {action.label}
        </ButtonLink>
      )}
    </div>
  );
}
