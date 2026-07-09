"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AdminPageHeader, SectionCard } from "@/components/admin/AdminUI";
import { Field, Input, Select, Textarea } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";
import { PakistanNotice } from "@/components/public/PakistanNotice";
import { routes } from "@/lib/routes";
import { campaigns } from "@/lib/mock-data";
import { PLACEHOLDER } from "@/lib/utils";
import type {
  CampaignCategory,
  CampaignStatus,
  Region,
} from "@/lib/types";

const CATEGORIES: CampaignCategory[] = [
  "Kurban",
  "Ramazan",
  "Gıda Yardımı",
  "Acil Yardım",
  "Su Kuyusu",
  "Yetim",
  "Eğitim",
  "Genel",
];
const REGIONS: Region[] = [
  "Genel",
  "Afrika",
  "Afganistan",
  "Türkiye",
  "Pakistan",
  "Çoklu Bölge",
];
const STATUSES: CampaignStatus[] = [
  "Aktif",
  "Taslak",
  "Hazırlık Aşamasında",
  "Tamamlandı",
  "Arşiv",
];

export default function EditCampaignPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const campaign = useMemo(
    () => campaigns.find((c) => c.id === id) ?? campaigns[0],
    [id],
  );

  const [form, setForm] = useState({
    title: campaign.title,
    category: campaign.category,
    region: campaign.region,
    status: campaign.status,
    summary: campaign.summary,
    description: campaign.description,
    suggestedAmounts: campaign.suggestedAmounts.join(", "),
  });

  const isPakistan = form.region === "Pakistan";
  const effectiveStatus = useMemo<CampaignStatus>(
    () => (isPakistan ? "Hazırlık Aşamasında" : form.status),
    [isPakistan, form.status],
  );

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSave = () => {
    // Demo only: no persistence. Navigate back to the list.
    router.push(routes.admin.kampanyalar);
  };

  return (
    <div>
      <AdminPageHeader
        title="Kampanyayı Düzenle"
        description="Kampanya bilgilerini güncelleyin. Yasal alanlar Ayarlar'dan yönetilir."
        breadcrumb={[
          { label: "Kampanyalar", href: routes.admin.kampanyalar },
          { label: campaign.title },
        ]}
      />

      <div className="max-w-3xl space-y-6">
        <SectionCard title="Temel Bilgiler">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Kampanya Başlığı" htmlFor="title" required className="sm:col-span-2">
              <Input
                id="title"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
              />
            </Field>

            <Field label="Kategori" htmlFor="category">
              <Select
                id="category"
                value={form.category}
                onChange={(e) => set("category", e.target.value as CampaignCategory)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Bölge" htmlFor="region">
              <Select
                id="region"
                value={form.region}
                onChange={(e) => set("region", e.target.value as Region)}
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </Select>
            </Field>

            <Field
              label="Durum"
              htmlFor="status"
              help={
                isPakistan
                  ? "Pakistan kampanyaları otomatik olarak Hazırlık Aşamasında görünür."
                  : undefined
              }
            >
              <Select
                id="status"
                value={effectiveStatus}
                disabled={isPakistan}
                onChange={(e) => set("status", e.target.value as CampaignStatus)}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          {isPakistan && <PakistanNotice className="mt-4" />}
        </SectionCard>

        <SectionCard title="İçerik">
          <div className="space-y-4">
            <Field label="Özet" htmlFor="summary" help="Kart ve liste görünümlerinde kullanılır.">
              <Textarea
                id="summary"
                value={form.summary}
                onChange={(e) => set("summary", e.target.value)}
                className="min-h-[80px]"
              />
            </Field>
            <Field label="Detaylı Açıklama" htmlFor="description">
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </Field>
          </div>
        </SectionCard>

        <SectionCard title="Bağış Ayarları">
          <Field
            label="Önerilen Tutarlar"
            htmlFor="amounts"
            help="Virgülle ayırın (örn. 500, 1000, 2500). Bu değerler yalnızca öneri niteliğindedir, fiyat değildir."
          >
            <Input
              id="amounts"
              value={form.suggestedAmounts}
              onChange={(e) => set("suggestedAmounts", e.target.value)}
              inputMode="numeric"
            />
          </Field>
        </SectionCard>

        <SectionCard title="Yasal Bilgiler">
          <div className="rounded-md border border-hairline bg-brand-mint/40 p-4 text-sm text-muted">
            <p>
              Dernek Kütük No ve İzin/Yardım Toplama İzin No gibi yasal alanlar{" "}
              <span className="font-semibold text-ink">Ayarlar</span> ekranından yönetilir
              ve bu formda düzenlenemez.
            </p>
            <dl className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="flex justify-between gap-3">
                <dt>Dernek Kütük No</dt>
                <dd className="font-medium text-ink">{PLACEHOLDER}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>İzin No</dt>
                <dd className="font-medium text-ink">{PLACEHOLDER}</dd>
              </div>
            </dl>
          </div>
        </SectionCard>

        <div className="flex flex-wrap gap-3">
          <Button variant="green" onClick={handleSave}>
            Kaydet
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push(routes.admin.kampanyalar)}
          >
            Vazgeç
          </Button>
        </div>
      </div>
    </div>
  );
}
