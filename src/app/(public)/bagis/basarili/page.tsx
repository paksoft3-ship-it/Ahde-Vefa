import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingState } from "@/components/ui/States";
import { SuccessView } from "./SuccessView";

export const metadata: Metadata = {
  title: "Bağışınız Alındı — AHDE VEFA",
  description:
    "Bağışınız için teşekkür ederiz. Referans numaranızla bağışınızı takip edebilirsiniz.",
};

export default function BasariliPage() {
  return (
    <Suspense fallback={<LoadingState label="Bağış sonucu yükleniyor..." />}>
      <SuccessView />
    </Suspense>
  );
}
