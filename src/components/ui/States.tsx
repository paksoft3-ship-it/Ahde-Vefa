import { Inbox, Loader2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  title = "Henüz kayıt yok",
  description = "Bu alanda gösterilecek içerik bulunmuyor.",
  icon: Icon = Inbox,
  action,
  className,
}: {
  title?: string;
  description?: string;
  icon?: React.ElementType;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed border-hairline bg-brand-mint/40 px-6 py-14 text-center",
        className,
      )}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-green shadow-card">
        <Icon className="h-7 w-7" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-bold text-ink">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function LoadingState({ label = "Yükleniyor..." }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-14 text-muted">
      <Loader2 className="h-6 w-6 animate-spin text-brand-turquoise" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

export function ErrorState({
  title = "Bir sorun oluştu",
  description = "İçerik yüklenirken bir hata meydana geldi. Lütfen tekrar deneyin.",
  action,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-red-100 bg-red-50/60 px-6 py-14 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-red-600 shadow-card">
        <AlertTriangle className="h-7 w-7" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-bold text-ink">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
