import { cn } from "@/lib/utils";

type Tone = "green" | "gold" | "turquoise" | "red" | "gray" | "blue" | "purple";

const TONE: Record<Tone, string> = {
  green: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
  gold: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
  turquoise: "bg-cyan-50 text-cyan-700 ring-1 ring-inset ring-cyan-600/20",
  red: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20",
  gray: "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/20",
  blue: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20",
  purple: "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20",
};

/** Maps every known status label to a colour tone. */
const STATUS_TONE: Record<string, Tone> = {
  // Campaign
  Aktif: "green",
  Taslak: "gray",
  "Hazırlık Aşamasında": "gold",
  "Hazırlık Süreci": "gold",
  Tamamlandı: "blue",
  Arşiv: "gray",
  // Donation
  Onaylandı: "green",
  Beklemede: "gold",
  "Dekont Bekliyor": "turquoise",
  İncelemede: "blue",
  Başarısız: "red",
  "İptal Edildi": "gray",
  "İade Edildi": "gray",
  // Receipt
  Reddedildi: "red",
  // Volunteer
  "Yeni Başvuru": "turquoise",
  Görüşülecek: "gold",
  Pasif: "gray",
  // Kurban
  "Vekalet Alındı": "turquoise",
  "Ödeme Tamamlandı": "green",
  "Kesim Bekliyor": "gold",
  Kesildi: "blue",
  Dağıtıldı: "green",
  "Rapor Gönderildi": "purple",
  // Message
  Yeni: "turquoise",
  Yanıtlandı: "green",
  Kapalı: "gray",
  // Publish
  Yayında: "green",
  // User
  Yönetici: "purple",
  Editör: "blue",
  Operatör: "turquoise",
  Görüntüleyici: "gray",
};

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const tone = STATUS_TONE[status] ?? "gray";
  return (
    <span className={cn("badge", TONE[tone], className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}

export function Badge({
  children,
  tone = "green",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return <span className={cn("badge", TONE[tone], className)}>{children}</span>;
}
