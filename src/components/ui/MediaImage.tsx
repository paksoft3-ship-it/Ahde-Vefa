import {
  Droplets,
  GraduationCap,
  HandHeart,
  Heart,
  Leaf,
  LifeBuoy,
  Moon,
  ShoppingBasket,
  Sprout,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Brand-styled media placeholder.
 * The project intentionally avoids stock/exploitative photography (cloude.md §4).
 * Real field photos can be dropped in later by replacing this component with an
 * <img>/next Image where a verified, dignity-preserving photo URL is available.
 */

type Tone = "green" | "turquoise" | "gold" | "cream" | "mint";

const MAP: Record<string, { icon: LucideIcon; tone: Tone; label: string }> = {
  kurban: { icon: HandHeart, tone: "green", label: "Kurban" },
  su: { icon: Droplets, tone: "turquoise", label: "Su Kuyusu" },
  egitim: { icon: GraduationCap, tone: "green", label: "Eğitim" },
  ramazan: { icon: Moon, tone: "gold", label: "Ramazan" },
  gida: { icon: ShoppingBasket, tone: "green", label: "Gıda Yardımı" },
  acil: { icon: LifeBuoy, tone: "turquoise", label: "Acil Yardım" },
  pakistan: { icon: Sprout, tone: "mint", label: "Pakistan Hazırlık" },
  genel: { icon: Heart, tone: "green", label: "Genel" },
  gonullu: { icon: Users, tone: "turquoise", label: "Gönüllülük" },
  leaf: { icon: Leaf, tone: "green", label: "AHDE VEFA" },
};

const TONE_CLASS: Record<Tone, string> = {
  green: "from-brand-green to-brand-dark text-white",
  turquoise: "from-brand-turquoise to-brand-green text-white",
  gold: "from-brand-gold to-[#e09a1f] text-brand-dark",
  cream: "from-brand-cream to-brand-mint text-brand-green",
  mint: "from-brand-mint to-[#d5efe4] text-brand-green",
};

export function MediaImage({
  keyword = "leaf",
  className,
  iconClassName,
  label,
  showLabel = false,
}: {
  keyword?: string;
  className?: string;
  iconClassName?: string;
  label?: string;
  showLabel?: boolean;
}) {
  const entry = MAP[keyword] ?? MAP.leaf;
  const Icon = entry.icon;
  return (
    <div
      role="img"
      aria-label={label ?? entry.label}
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        TONE_CLASS[entry.tone],
        className,
      )}
    >
      {/* subtle decorative rings */}
      <span className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
      <span className="pointer-events-none absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-black/5" />
      <Icon className={cn("h-12 w-12 opacity-90", iconClassName)} strokeWidth={1.5} />
      {showLabel && (
        <span className="absolute bottom-3 left-3 rounded-full bg-black/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
          {label ?? entry.label}
        </span>
      )}
    </div>
  );
}
