"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Info, Save } from "lucide-react";
import { reports } from "@/lib/mock-data";
import { routes } from "@/lib/routes";
import { AdminPageHeader, SectionCard } from "@/components/admin/AdminUI";
import { Field, Input, Select, Textarea } from "@/components/forms/Fields";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/States";
import { PakistanNotice } from "@/components/public/PakistanNotice";

const REGIONS = ["Genel", "Afrika", "Afganistan", "Türkiye", "Pakistan", "Çoklu Bölge"];

export default function RaporDuzenlePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const report = useMemo(() => reports.find((r) => r.id === params.id), [params.id]);

  const [form, setForm] = useState<{
    title: string;
    region: string;
    category: string;
    period: string;
    summary: string;
    body: string;
    status: string;
  }>({
    title: report?.title ?? "",
    region: report?.region ?? "Genel",
    category: report?.category ?? "",
    period: report?.period ?? "",
    summary: report?.summary ?? "",
    body: "",
    status: report?.status ?? "Taslak",
  });

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: değişiklikler kalıcı olarak kaydedilmez.
    router.push(routes.admin.raporlar);
  };

  if (!report) {
    return (
      <div>
        <AdminPageHeader
          title="Rapor Bulunamadı"
          breadcrumb={[
            { label: "Raporlar", href: routes.admin.raporlar },
            { label: "Düzenle" },
          ]}
        />
        <EmptyState
          title="Rapor bulunamadı"
          description="Aradığınız rapor kaldırılmış veya kimliği hatalı olabilir."
          action={
            <ButtonLink href={routes.admin.raporlar} variant="green" size="sm">
              Raporlara dön
            </ButtonLink>
          }
        />
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title="Raporu Düzenle"
        description="Rapor bilgilerini güncelleyin. Sayısal veriler doğrulanmadan yayına alınmaz."
        breadcrumb={[
          { label: "Raporlar", href: routes.admin.raporlar },
          { label: report.title },
          { label: "Düzenle" },
        ]}
      />

      <form onSubmit={onSubmit} className="space-y-6">
        <SectionCard title="Rapor Bilgileri">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Rapor Başlığı" htmlFor="title" required className="sm:col-span-2">
              <Input id="title" value={form.title} onChange={set("title")} required />
            </Field>

            <Field label="Bölge" htmlFor="region" required>
              <Select id="region" value={form.region} onChange={set("region")}>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Kategori" htmlFor="category" required>
              <Input id="category" value={form.category} onChange={set("category")} required />
            </Field>

            <Field
              label="Dönem"
              htmlFor="period"
              help="[Eklenecek] — doğrulanınca girilir"
              className="sm:col-span-2"
            >
              <Input
                id="period"
                value={form.period}
                onChange={set("period")}
                placeholder="[Eklenecek]"
              />
            </Field>
          </div>
        </SectionCard>

        <SectionCard title="İçerik">
          <div className="space-y-5">
            <Field label="Özet" htmlFor="summary" help="Raporun kısa tanıtımı.">
              <Textarea
                id="summary"
                value={form.summary}
                onChange={set("summary")}
                className="min-h-[90px]"
              />
            </Field>

            <Field
              label="Rapor Metni"
              htmlFor="body"
              help="Gerçek istatistik ve sayısal veriler doğrulanmadan bu alana girilmez. Doğrulanmamış rakamlar için [Eklenecek] kullanın."
            >
              <Textarea
                id="body"
                value={form.body}
                onChange={set("body")}
                placeholder="Rapor metni... (doğrulanmamış istatistik girmeyin)"
                className="min-h-[200px]"
              />
            </Field>

            <Field label="Yayın Durumu" htmlFor="status">
              <Select id="status" value={form.status} onChange={set("status")}>
                <option value="Taslak">Taslak</option>
                <option value="Yayında">Yayında</option>
              </Select>
            </Field>
          </div>
        </SectionCard>

        <div className="flex items-start gap-3 rounded-lg border border-hairline bg-brand-mint/40 p-4 text-sm text-brand-dark">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
          <p>
            Bölge olarak <strong>Pakistan</strong> seçilirse, rapor yalnızca{" "}
            <strong>Hazırlık Aşamasında</strong> olarak yayınlanabilir; tamamlanmış faaliyet,
            dağıtım veya sayısal sonuç içeremez.
          </p>
        </div>

        {form.region === "Pakistan" && <PakistanNotice />}

        <div className="flex flex-wrap justify-end gap-2">
          <ButtonLink href={routes.admin.raporlar} variant="secondary" size="sm">
            Vazgeç
          </ButtonLink>
          <Button type="submit" variant="green" size="sm">
            <Save className="h-4 w-4" /> Kaydet
          </Button>
        </div>
      </form>
    </div>
  );
}
