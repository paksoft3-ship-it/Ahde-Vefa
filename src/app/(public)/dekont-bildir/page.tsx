"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Landmark, Upload, ShieldCheck } from "lucide-react";
import { receiptSchema } from "@/lib/validators";
import { routes } from "@/lib/routes";
import { GENERAL_FAQ, DONATION_STEPS } from "@/lib/content";
import { BANK } from "@/lib/constants";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepTimeline } from "@/components/ui/Blocks";
import { FAQAccordion } from "@/components/ui/Accordion";
import { Field, Input, Textarea } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";

export default function DekontBildirPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    reference: "",
    fullName: "",
    amount: "",
    transferDate: "",
    note: "",
  });
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const set = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = receiptSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors(
        Object.fromEntries(
          Object.entries(fieldErrors).map(([k, v]) => [k, v?.[0]]),
        ),
      );
      return;
    }
    setErrors({});
    router.push(routes.formBasarili);
  };

  return (
    <>
      <PageHero
        title="Dekont Bildir"
        description="Banka havalesi/EFT ile yaptığınız bağışın dekontunu ileterek bağışınızın onaylanmasını sağlayın."
        breadcrumb={[{ label: "Anasayfa", href: routes.home }, { label: "Dekont Bildir" }]}
      />

      <section className="container-page py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <form onSubmit={handleSubmit} className="card space-y-6 p-6">
            <h2 className="text-lg font-bold text-brand-green">Dekont Bilgileri</h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Referans Numarası" htmlFor="reference" required error={errors.reference}>
                <Input
                  id="reference"
                  value={form.reference}
                  onChange={(e) => set("reference", e.target.value)}
                  invalid={!!errors.reference}
                  placeholder="Örn. AV-2026-000128"
                />
              </Field>
              <Field label="Ad Soyad" htmlFor="fullName" required error={errors.fullName}>
                <Input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                  invalid={!!errors.fullName}
                  placeholder="Havaleyi yapan kişi"
                />
              </Field>
              <Field label="Tutar (₺)" htmlFor="amount" required error={errors.amount}>
                <Input
                  id="amount"
                  type="number"
                  min={1}
                  value={form.amount}
                  onChange={(e) => set("amount", e.target.value)}
                  invalid={!!errors.amount}
                  placeholder="Havale tutarı"
                />
              </Field>
              <Field label="Havale Tarihi" htmlFor="transferDate" required error={errors.transferDate}>
                <Input
                  id="transferDate"
                  type="date"
                  value={form.transferDate}
                  onChange={(e) => set("transferDate", e.target.value)}
                  invalid={!!errors.transferDate}
                />
              </Field>
              <Field label="Not" htmlFor="note" className="sm:col-span-2" error={errors.note}>
                <Textarea
                  id="note"
                  value={form.note}
                  onChange={(e) => set("note", e.target.value)}
                  placeholder="Eklemek istediğiniz bilgi (isteğe bağlı)"
                />
              </Field>
            </div>

            {/* File upload UI */}
            <div>
              <span className="field-label">Dekont Dosyası</span>
              <label
                htmlFor="receiptFile"
                className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-hairline bg-brand-mint/30 px-6 py-8 text-center transition-colors hover:border-brand-green"
              >
                <Upload className="h-7 w-7 text-brand-green" strokeWidth={1.5} />
                <span className="text-sm font-semibold text-ink">
                  {fileName || "Dosya seçmek için tıklayın"}
                </span>
                <span className="text-xs text-muted">PDF, JPG veya PNG</span>
                <input
                  id="receiptFile"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="sr-only"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                />
              </label>
              <p className="field-help">
                Dosya yükleme altyapısı henüz bağlanmamıştır; dosyanız bu demo akışında
                kaydedilmez.
              </p>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
              Dekontu Bildir
            </Button>
          </form>

          {/* Sidebar: bank + security */}
          <aside className="space-y-6">
            <div className="card p-6">
              <div className="mb-4 flex items-center gap-2">
                <Landmark className="h-5 w-5 text-brand-green" />
                <h2 className="text-lg font-bold text-brand-green">Banka Bilgileri</h2>
              </div>
              <dl className="divide-y divide-hairline rounded-lg border border-hairline bg-brand-mint/40 px-4">
                {[
                  { label: "Hesap Adı", value: BANK.accountName },
                  { label: "Banka", value: BANK.bankName },
                  { label: "IBAN", value: BANK.iban },
                  { label: "Şube", value: BANK.branch },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-sm text-muted">{row.label}</dt>
                    <dd className="text-sm font-semibold text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-muted">
                Banka bilgileri dernek tarafından tamamlandıkça güncellenecektir.
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-hairline bg-white p-4 shadow-card">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
              <p className="text-sm text-muted">
                Bildirdiğiniz bilgiler KVKK kapsamında korunur ve yalnızca bağışınızın
                doğrulanması amacıyla kullanılır.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Process timeline */}
      <section className="bg-brand-mint py-14 md:py-20">
        <div className="container-page max-w-2xl">
          <SectionHeading
            eyebrow="Süreç"
            title="Dekont Bildiriminden Sonra Ne Olur?"
            align="center"
          />
          <StepTimeline steps={DONATION_STEPS} />
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Sıkça Sorulan Sorular" title="Merak Edilenler" align="center" />
          <FAQAccordion items={GENERAL_FAQ.slice(0, 4)} />
        </div>
      </section>
    </>
  );
}
