"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Info, Save } from "lucide-react";
import { routes } from "@/lib/routes";
import { AdminPageHeader, SectionCard } from "@/components/admin/AdminUI";
import { Field, Input, Select, Textarea } from "@/components/forms/Fields";
import { Button, ButtonLink } from "@/components/ui/Button";
import { PakistanNotice } from "@/components/public/PakistanNotice";

const REGIONS = ["Genel", "Afrika", "Afganistan", "Türkiye", "Pakistan", "Çoklu Bölge"];

export default function YeniRaporPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    region: "Genel",
    category: "",
    period: "",
    summary: "",
    body: "",
    status: "Taslak",
  });

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: değişiklikler kalıcı olarak kaydedilmez. Doğrulanmış içerik yayına alınır.
    router.push(routes.admin.raporlar);
  };

  return (
    <div>
      <AdminPageHeader
        title="Yeni Rapor Oluştur"
        description="Saha veya faaliyet raporu oluşturun. Sayısal veriler doğrulanmadan yayına alınmaz."
        breadcrumb={[
          { label: "Raporlar", href: routes.admin.raporlar },
          { label: "Yeni Rapor" },
        ]}
      />

      <form onSubmit={onSubmit} className="space-y-6">
        <SectionCard title="Rapor Bilgileri">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Rapor Başlığı" htmlFor="title" required className="sm:col-span-2">
              <Input
                id="title"
                value={form.title}
                onChange={set("title")}
                placeholder="Örn. Afrika Su Kuyusu Saha Raporu"
                required
              />
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
              <Input
                id="category"
                value={form.category}
                onChange={set("category")}
                placeholder="Örn. Saha Raporu"
                required
              />
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
                placeholder="Rapor içeriğine dair kısa bir özet..."
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
