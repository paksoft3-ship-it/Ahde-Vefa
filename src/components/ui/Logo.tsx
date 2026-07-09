import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

/** AHDE VEFA logo lockup. Uses the real logo asset from /public/logo. */
export function Logo({
  href = "/",
  variant = "default",
  className,
}: {
  href?: string | null;
  variant?: "default" | "light" | "compact";
  className?: string;
}) {
  const content = (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image
        src={SITE.logo}
        alt="AHDE VEFA İnsani Yardım Derneği logosu"
        width={44}
        height={44}
        className="h-11 w-11 rounded-md object-contain bg-white p-0.5"
        priority
      />
      {variant !== "compact" && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "text-lg font-extrabold tracking-tight",
              variant === "light" ? "text-white" : "text-brand-green",
            )}
          >
            AHDE VEFA
          </span>
          <span
            className={cn(
              "text-[10px] font-semibold uppercase tracking-[0.14em]",
              variant === "light" ? "text-white/70" : "text-muted",
            )}
          >
            İnsani Yardım Derneği
          </span>
        </span>
      )}
    </span>
  );

  if (!href) return content;
  return (
    <Link href={href} aria-label="AHDE VEFA ana sayfa">
      {content}
    </Link>
  );
}
