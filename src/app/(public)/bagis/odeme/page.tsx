import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingState } from "@/components/ui/States";
import { CheckoutView } from "./CheckoutView";

export const metadata: Metadata = {
  title: "Bağış Tamamlama — AHDE VEFA",
  description:
    "Bağış bilgilerinizi girin, ödeme yöntemini seçin ve bağışınızı güvenli şekilde tamamlayın.",
};

export default function OdemePage() {
  return (
    <Suspense fallback={<LoadingState label="Bağış adımı yükleniyor..." />}>
      <CheckoutView />
    </Suspense>
  );
}
