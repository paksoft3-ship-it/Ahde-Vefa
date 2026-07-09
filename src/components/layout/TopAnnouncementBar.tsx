import Link from "next/link";
import { Sparkles } from "lucide-react";
import { routes } from "@/lib/routes";

export function TopAnnouncementBar() {
  return (
    <div className="bg-brand-green text-white">
      <div className="container-page flex h-10 items-center justify-center gap-2 text-center text-sm">
        <Sparkles className="h-4 w-4 shrink-0 text-brand-gold" />
        <span className="line-clamp-1">
          Emanetleriniz sahada gerçek bir iyiliğe dönüşür.{" "}
          <Link href={routes.bagis} className="font-bold underline underline-offset-2">
            Hemen bağış yapın
          </Link>
        </span>
      </div>
    </div>
  );
}
