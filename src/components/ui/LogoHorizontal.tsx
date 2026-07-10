import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Horizontal AHDE VEFA lockup (hand + leaves + wordmark) — the full logo image.
 * The wordmark is green, so on dark backgrounds pass `onDark` to place it on a
 * white chip for legibility.
 */
export function LogoHorizontal({
  href = "/",
  onDark = false,
  className,
  priority = false,
}: {
  href?: string | null;
  onDark?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const img = (
    <Image
      src="/logo/ahde-vefa-horizontal.png"
      alt="AHDE VEFA İnsani Yardım Derneği logosu"
      width={2508}
      height={627}
      priority={priority}
      className={cn("w-auto object-contain", onDark ? "h-9" : "h-10 md:h-11", className)}
    />
  );

  const content = onDark ? (
    <span className="inline-flex items-center rounded-lg bg-white px-3 py-2 shadow-sm">
      {img}
    </span>
  ) : (
    img
  );

  if (!href) return content;
  return (
    <Link href={href} aria-label="AHDE VEFA ana sayfa" className="inline-flex">
      {content}
    </Link>
  );
}
