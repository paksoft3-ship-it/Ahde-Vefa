"use client";

import { useState } from "react";
import { Search, MapPin, Info } from "lucide-react";
import { donations } from "@/lib/mock-data";
import type { Donation } from "@/lib/types";
import { trackingSchema } from "@/lib/validators";
import { routes } from "@/lib/routes";
import { GENERAL_FAQ } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepTimeline } from "@/components/ui/Blocks";
import { FAQAccordion } from "@/components/ui/Accordion";
import { Field, Input } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PakistanNotice } from "@/components/public/PakistanNotice";

/** Illustrative donation lifecycle used for the status timeline. */
const LIFECYCLE = [
  { title: "Bağış Alındı", description: "Bağış talebiniz sistemimize kaydedildi." },
  { title: "Ödeme / Dekont Onayı", description: "Ödeme ya da dekont bilgileri doğrulanır." },
  { title: "Saha Yönlendirmesi", description: "Bağış, ihtiyaç önceliğine göre ilgili çalışmaya yönlendirilir." },
  { title: "Bilgilendirme", description: "Süreç sonunda tarafınıza bilgilendirme yapılır." },
];

type Result =
  | { kind: "found"; donation: Donation }
  | { kind: "demo" }
  | null;

export default function BagisTakipPage() {
  const [form, setForm] = useState({ reference: "", contact: "" });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [result, setResult] = useState<Result>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = trackingSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        reference: fieldErrors.reference?.[0],
        contact: fieldErrors.contact?.[0],
      });
      setResult(null);
      return;
    }
    setErrors({});
    const ref = form.reference.trim().toLocaleUpperCase("tr-TR");
    const match = donations.find(
      (d) => d.reference.toLocaleUpperCase("tr-TR") === ref,
    );
    setResult(match ? { kind: "found", donation: match } : { kind: "demo" });
  };

  return (
    <>
      <PageHero
        title="Bağış Takip"
        description="Referans numaranız ve iletişim bilginizle bağışınızın güncel durumunu sorgulayabilirsiniz."
        breadcrumb={[{ label: "Anasayfa", href: routes.home }, { label: "Bağış Takip" }]}
      />

      <section className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          {/* Tracking form */}
          <form onSubmit={handleSubmit} className="card p-6">
            <h2 className="mb-5 text-lg font-bold text-brand-green">Bağış Sorgula</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Referans Numarası" htmlFor="reference" required error={errors.reference}>
                <Input
                  id="reference"
                  value={form.reference}
                  onChange={(e) => setForm((f) => ({ ...f, reference: e.target.value }))}
                  invalid={!!errors.reference}
                  placeholder="Örn. AV-2026-000128"
                />
              </Field>
              <Field
                label="E-posta veya Telefon"
                htmlFor="contact"
                required
                error={errors.contact}
                help="Bağış sırasında verdiğiniz iletişim bilgisi"
              >
                <Input
                  id="contact"
                  value={form.contact}
                  onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
                  invalid={!!errors.contact}
                  placeholder="ornek@eposta.com"
                />
              </Field>
            </div>
            <Button type="submit" variant="primary" size="lg" className="mt-6 w-full sm:w-auto">
              <Search className="h-4 w-4" /> Sorgula
            </Button>
          </form>

          {/* Result */}
          {result?.kind === "found" && (
            <div className="card p-6">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-muted">Referans No</p>
                  <p className="text-lg font-extrabold text-brand-green">
                    {result.donation.reference}
                  </p>
                </div>
                <StatusBadge status={result.donation.status} />
              </div>
              <dl className="grid gap-4 border-y border-hairline py-5 sm:grid-cols-3">
                <div>
                  <dt className="text-sm text-muted">Kampanya</dt>
                  <dd className="mt-1 font-semibold text-ink">{result.donation.campaignTitle}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Bölge</dt>
                  <dd className="mt-1 inline-flex items-center gap-1 font-semibold text-ink">
                    <MapPin className="h-4 w-4 text-muted" /> {result.donation.region}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Tarih</dt>
                  <dd className="mt-1 font-semibold text-ink">
                    {formatDate(result.donation.createdAt)}
                  </dd>
                </div>
              </dl>

              <h3 className="mb-4 mt-6 font-bold text-ink">Bağış Süreci</h3>
              <StepTimeline steps={LIFECYCLE} />

              {result.donation.region === "Pakistan" && <PakistanNotice className="mt-6" />}
            </div>
          )}

          {result?.kind === "demo" && (
            <div className="card p-6">
              <div className="mb-4 flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50/60 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-800">Bağışınız İncelemede</p>
                  <p className="mt-1 text-sm text-blue-700">
                    Girdiğiniz referansa ait kayıt henüz eşleştirilemedi. Bağışınız
                    incelemede olabilir. Bu bir demo sorgulama akışıdır; gerçek sorgulama
                    altyapısı entegre edildiğinde sonuçlar burada gösterilecektir.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">Durum</span>
                <StatusBadge status="İncelemede" />
              </div>
              <h3 className="mb-4 mt-6 font-bold text-ink">Bağış Süreci</h3>
              <StepTimeline steps={LIFECYCLE} />
            </div>
          )}

          {/* FAQ */}
          <div>
            <SectionHeading eyebrow="Sıkça Sorulan Sorular" title="Merak Edilenler" align="center" />
            <FAQAccordion items={GENERAL_FAQ.slice(0, 4)} />
          </div>
        </div>
      </section>
    </>
  );
}
