import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Standard notice enforcing the Pakistan rule (cloude.md §21):
 * Pakistan is always shown as "Hazırlık Aşamasında" — never as completed activity.
 */
export function PakistanNotice({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4",
        className,
      )}
    >
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
      <div>
        <p className="font-semibold text-amber-800">Hazırlık Aşamasında</p>
        <p className="mt-1 text-sm text-amber-700">
          Pakistan çalışmalarımız hazırlık sürecindedir. Bu bölgeye ait tamamlanmış
          faaliyet, dağıtım veya rapor verisi henüz paylaşılmamıştır. Gelişmeler
          doğrulandıkça duyurulacaktır.
        </p>
      </div>
    </div>
  );
}
