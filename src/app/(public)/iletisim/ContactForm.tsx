"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { contactSchema } from "@/lib/validators";
import { routes } from "@/lib/routes";
import { Field, Input, Textarea, Select, Checkbox } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";

type Values = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  kvkkConsent: boolean;
};

const INITIAL: Values = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
  kvkkConsent: false,
};

const SUBJECTS = [
  "Genel Bilgi Talebi",
  "Bağış ve Kampanyalar",
  "Kurban / Ramazan",
  "Gönüllülük",
  "Kurumsal Destek / İş Birliği",
  "Basın ve İletişim",
  "Diğer",
];

export function ContactForm() {
  const router = useRouter();
  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    // Placeholder submission — no backend wired yet.
    router.push(routes.formBasarili);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-6 md:p-8">
      <h2 className="text-xl font-extrabold text-brand-green">Bize Yazın</h2>
      <p className="mt-1 text-sm text-muted">
        Sorularınız ve talepleriniz için formu doldurun; en kısa sürede size dönüş
        yapalım.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field
          label="Ad Soyad"
          htmlFor="fullName"
          required
          error={errors.fullName?.[0]}
        >
          <Input
            id="fullName"
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            invalid={!!errors.fullName}
            placeholder="Adınız ve soyadınız"
            autoComplete="name"
          />
        </Field>

        <Field label="E-posta" htmlFor="email" required error={errors.email?.[0]}>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            invalid={!!errors.email}
            placeholder="ornek@eposta.com"
            autoComplete="email"
          />
        </Field>

        <Field
          label="Konu"
          htmlFor="subject"
          required
          error={errors.subject?.[0]}
          className="sm:col-span-2"
        >
          <Select
            id="subject"
            value={values.subject}
            onChange={(e) => update("subject", e.target.value)}
            invalid={!!errors.subject}
          >
            <option value="">Konu seçiniz</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="Mesajınız"
          htmlFor="message"
          required
          error={errors.message?.[0]}
          className="sm:col-span-2"
        >
          <Textarea
            id="message"
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            invalid={!!errors.message}
            placeholder="Mesajınızı buraya yazabilirsiniz..."
          />
        </Field>
      </div>

      <div className="mt-6">
        <Checkbox
          label={
            <>
              <Link href={routes.yasal} className="font-semibold text-brand-green hover:underline">
                KVKK Aydınlatma Metni
              </Link>{" "}
              kapsamında kişisel verilerimin işlenmesini kabul ediyorum.
            </>
          }
          checked={values.kvkkConsent}
          onChange={(e) => update("kvkkConsent", e.target.checked)}
          error={errors.kvkkConsent?.[0]}
        />
      </div>

      <Button type="submit" variant="primary" size="lg" className="mt-6 w-full" disabled={submitting}>
        {submitting ? "Gönderiliyor..." : "Mesajı Gönder"}
      </Button>
    </form>
  );
}
