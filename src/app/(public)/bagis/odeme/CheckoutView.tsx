"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Check,
  CreditCard,
  Landmark,
  Lock,
  ShieldCheck,
  User,
} from "lucide-react";
import { checkoutSchema } from "@/lib/validators";
import { routes } from "@/lib/routes";
import { BANK } from "@/lib/constants";
import { formatTRY, cn } from "@/lib/utils";
import { generateReference } from "@/lib/integrations/payment";
import { Breadcrumb } from "@/components/ui/PageHero";
import { Field, Input, Textarea, Checkbox } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";

type PaymentMethod = "Online Kart" | "Banka Havalesi / EFT";

const STEPS = ["Bağış Bilgileri", "Bağışçı Bilgileri", "Ödeme", "Tamamlandı"];

export function CheckoutView() {
  const router = useRouter();
  const params = useSearchParams();

  const tur = params.get("tur") || "Genel Bağış";
  const tutarRaw = params.get("tutar") || "";
  const bagisci = params.get("bagisci") || "Bireysel";
  const tutar = Number(tutarRaw) || 0;

  const [method, setMethod] = useState<PaymentMethod>("Online Kart");
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    note: "",
    kvkkConsent: false,
    infoConsent: false,
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkoutSchema.safeParse({ ...form, paymentMethod: method });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(
        Object.fromEntries(
          Object.entries(fieldErrors).map(([k, v]) => [k, v?.[0]]),
        ),
      );
      return;
    }
    setErrors({});
    setSubmitting(true);

    if (method === "Banka Havalesi / EFT") {
      router.push(`${routes.bagisDurum}?durum=dekont`);
      return;
    }

    const ref = generateReference();
    const query = new URLSearchParams({
      ref,
      tutar: String(tutar),
      tur,
    });
    router.push(`${routes.bagisBasarili}?${query.toString()}`);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-hairline bg-white">
        <div className="container-page py-4">
          <Breadcrumb
            items={[
              { label: "Anasayfa", href: routes.home },
              { label: "Bağış Yap", href: routes.bagis },
              { label: "Bağış Tamamlama" },
            ]}
          />
        </div>
      </div>

      {/* Step indicator */}
      <section className="bg-brand-mint">
        <div className="container-page py-8">
          <h1 className="mb-6 text-[26px] font-extrabold text-brand-green md:text-[34px]">
            Bağış Tamamlama
          </h1>
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-3">
            {STEPS.map((step, i) => {
              const active = i <= 2; // Bilgiler & Ödeme aşamasındayız
              const current = i === 2;
              return (
                <li key={step} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ring-4 ring-white",
                      current
                        ? "bg-brand-green text-white"
                        : active
                          ? "bg-brand-turquoise text-white"
                          : "bg-white text-muted",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      current ? "text-brand-green" : "text-muted",
                    )}
                  >
                    {step}
                  </span>
                  {i < STEPS.length - 1 && (
                    <span className="hidden h-px w-8 bg-hairline sm:block" aria-hidden />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="container-page py-12 md:py-16">
        <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Left: forms */}
          <div className="space-y-10">
            {/* Donor info */}
            <div className="card p-6">
              <div className="mb-5 flex items-center gap-2">
                <User className="h-5 w-5 text-brand-turquoise" />
                <h2 className="text-lg font-bold text-brand-green">Bağışçı Bilgileri</h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Ad Soyad" htmlFor="fullName" required error={errors.fullName}>
                  <Input
                    id="fullName"
                    value={form.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                    invalid={!!errors.fullName}
                    placeholder="Adınız ve soyadınız"
                  />
                </Field>
                <Field label="Telefon" htmlFor="phone" required error={errors.phone}>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    invalid={!!errors.phone}
                    placeholder="05xx xxx xx xx"
                  />
                </Field>
                <Field label="E-posta" htmlFor="email" required error={errors.email}>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    invalid={!!errors.email}
                    placeholder="ornek@eposta.com"
                  />
                </Field>
                <Field label="Şehir" htmlFor="city" error={errors.city}>
                  <Input
                    id="city"
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                    placeholder="İsteğe bağlı"
                  />
                </Field>
                <Field label="Not" htmlFor="note" className="sm:col-span-2" error={errors.note}>
                  <Textarea
                    id="note"
                    value={form.note}
                    onChange={(e) => set("note", e.target.value)}
                    placeholder="Eklemek istediğiniz bir not (isteğe bağlı)"
                  />
                </Field>
              </div>
            </div>

            {/* Payment method */}
            <div className="card p-6">
              <h2 className="mb-5 text-lg font-bold text-brand-green">Ödeme Yöntemi</h2>
              <div className="mb-6 grid gap-3 sm:grid-cols-2" role="tablist" aria-label="Ödeme yöntemi">
                {(
                  [
                    { id: "Online Kart", icon: CreditCard, label: "Online Kart" },
                    { id: "Banka Havalesi / EFT", icon: Landmark, label: "Banka Havalesi / EFT" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    role="tab"
                    aria-selected={method === opt.id}
                    onClick={() => setMethod(opt.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border-2 px-4 py-3 text-left text-sm font-semibold transition-all",
                      method === opt.id
                        ? "border-brand-green bg-brand-mint text-brand-green"
                        : "border-hairline text-muted hover:border-brand-green",
                    )}
                  >
                    <opt.icon className="h-5 w-5 shrink-0" />
                    {opt.label}
                  </button>
                ))}
              </div>

              {method === "Online Kart" ? (
                <div>
                  <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      <strong>DEMO alanı:</strong> Bu kart formu yalnızca gösterim amaçlıdır.
                      Ödeme sağlayıcı entegrasyonu tamamlanana kadar gerçek bir tahsilat
                      yapılmaz.
                    </span>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Kart Üzerindeki İsim" htmlFor="cardName" className="sm:col-span-2">
                      <Input id="cardName" placeholder="DEMO — kart sahibi" disabled />
                    </Field>
                    <Field label="Kart Numarası" htmlFor="cardNumber" className="sm:col-span-2">
                      <Input id="cardNumber" placeholder="DEMO — 0000 0000 0000 0000" disabled />
                    </Field>
                    <Field label="Son Kullanma" htmlFor="cardExp">
                      <Input id="cardExp" placeholder="AA/YY" disabled />
                    </Field>
                    <Field label="CVV" htmlFor="cardCvv">
                      <Input id="cardCvv" placeholder="DEMO" disabled />
                    </Field>
                  </div>
                  <p className="mt-4 flex items-center gap-2 text-xs font-medium text-muted">
                    <Lock className="h-4 w-4 text-brand-green" />
                    Kart bilgileri saklanmaz.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="mb-4 text-sm text-muted">
                    Aşağıdaki hesaba havale/EFT yaptıktan sonra dekontunuzu bize
                    iletebilirsiniz. Bağışınız dekont incelemesinin ardından onaylanır.
                  </p>
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
              )}
            </div>

            {/* Consents */}
            <div className="card space-y-4 p-6">
              <Checkbox
                label={
                  <>
                    Kişisel verilerimin{" "}
                    <a href={routes.yasal} className="font-semibold text-brand-green underline">
                      KVKK Aydınlatma Metni
                    </a>{" "}
                    kapsamında işlenmesini onaylıyorum.
                  </>
                }
                checked={form.kvkkConsent}
                onChange={(e) => set("kvkkConsent", e.target.checked)}
                error={errors.kvkkConsent}
              />
              <Checkbox
                label="Bağışım ve süreç hakkında tarafıma bilgilendirme yapılmasını onaylıyorum."
                checked={form.infoConsent}
                onChange={(e) => set("infoConsent", e.target.checked)}
                error={errors.infoConsent}
              />
            </div>
          </div>

          {/* Right: summary */}
          <aside>
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="rounded-xl border border-hairline bg-white p-6 shadow-donation">
                <h2 className="mb-4 text-lg font-bold text-brand-green">Bağış Özeti</h2>
                <dl className="space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted">Bağış Türü</dt>
                    <dd className="text-right font-semibold text-ink">{tur}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted">Bağışçı Türü</dt>
                    <dd className="font-semibold text-ink">{bagisci}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted">Ödeme Yöntemi</dt>
                    <dd className="font-semibold text-ink">{method}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-hairline pt-3">
                    <dt className="font-semibold text-ink">Tutar</dt>
                    <dd className="text-lg font-extrabold text-brand-green">
                      {tutar > 0 ? formatTRY(tutar) : "—"}
                    </dd>
                  </div>
                </dl>

                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="mt-6 w-full"
                  disabled={submitting}
                >
                  {method === "Banka Havalesi / EFT" ? "Havale Bildirimine Devam Et" : "Bağışı Tamamla"}
                </Button>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted">
                  <Check className="h-3.5 w-3.5 text-brand-green" />
                  Tutar illüstratiftir; gerçek tahsilat yapılmaz.
                </p>
              </div>
            </div>
          </aside>
        </form>
      </section>
    </>
  );
}
