import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingState } from "@/components/ui/States";
import { SearchView } from "./SearchView";

export const metadata: Metadata = {
  title: "Arama | AHDE VEFA İnsani Yardım Derneği",
  description:
    "AHDE VEFA sitesinde kampanyalar, raporlar, haberler ve galeri içinde arama yapın.",
};

export default function AramaPage() {
  return (
    <Suspense fallback={<LoadingState label="Arama yükleniyor..." />}>
      <SearchView />
    </Suspense>
  );
}
