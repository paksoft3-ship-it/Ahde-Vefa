import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Horizontal AHDE VEFA lockup (hand + leaves + wordmark) — the full logo image.
 * `onDark` uses the dark-background version (white wordmark) for use on the
 * dark green footer; the default uses the green-wordmark version for light areas.
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
  const content = (
    <Image
      src={
        onDark
          ? "/logo/ahde-vefa-horizontal-dark.png"
          : "/logo/ahde-vefa-horizontal.png"
      }
      alt="AHDE VEFA İnsani Yardım Derneği logosu"
      width={2508}
      height={627}
      priority={priority}
      className={cn(
        "w-auto object-contain",
        onDark ? "h-12 rounded-md" : "h-10 md:h-11",
        className,
      )}
    />
  );

  if (!href) return content;
  return (
    <Link href={href} aria-label="AHDE VEFA ana sayfa" className="inline-flex">
      {content}
    </Link>
  );
}
