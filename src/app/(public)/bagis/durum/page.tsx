import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingState } from "@/components/ui/States";
import { StatusView } from "./StatusView";

export const metadata: Metadata = {
  title: "Bağış Durumu — AHDE VEFA",
  description:
    "Bağış ödemenizin durumu hakkında bilgi alın ve gerekli adımları tamamlayın.",
};

export default function DurumPage() {
  return (
    <Suspense fallback={<LoadingState label="Durum bilgisi yükleniyor..." />}>
      <StatusView />
    </Suspense>
  );
}
