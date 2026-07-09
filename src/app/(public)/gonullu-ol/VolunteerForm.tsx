"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { volunteerSchema } from "@/lib/validators";
import { routes } from "@/lib/routes";
import { Field, Input, Textarea, Select, Checkbox } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";

type Values = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  skill: string;
  availability: string;
  message: string;
  kvkkConsent: boolean;
};

const INITIAL: Values = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  skill: "",
  availability: "",
  message: "",
  kvkkConsent: false,
};

const SKILLS = [
  "Saha Çalışması",
  "Lojistik ve Dağıtım",
  "İletişim ve Sosyal Medya",
  "Bağış Danışmanlığı",
  "Çeviri",
  "Sağlık",
  "Eğitim",
  "Diğer",
];

const AVAILABILITY = [
  "Hafta İçi",
  "Hafta Sonu",
  "Esnek / Fark Etmez",
  "Sadece Kampanya Dönemleri",
];

export function VolunteerForm() {
  const router = useRouter();
  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = volunteerSchema.safeParse(values);
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
      <h2 className="text-xl font-extrabold text-brand-green">
        Gönüllü Başvuru Formu
      </h2>
      <p className="mt-1 text-sm text-muted">
        Bilgilerinizi paylaşın, ekibimiz uygun çalışmalar için sizinle iletişime
        geçsin.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field
          label="Ad Soyad"
          htmlFor="fullName"
          required
          error={errors.fullName?.[0]}
          className="sm:col-span-2"
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

        <Field label="Telefon" htmlFor="phone" required error={errors.phone?.[0]}>
          <Input
            id="phone"
            type="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            invalid={!!errors.phone}
            placeholder="05__ ___ __ __"
            autoComplete="tel"
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

        <Field label="Şehir" htmlFor="city" required error={errors.city?.[0]}>
          <Input
            id="city"
            value={values.city}
            onChange={(e) => update("city", e.target.value)}
            invalid={!!errors.city}
            placeholder="Bulunduğunuz şehir"
            autoComplete="address-level2"
          />
        </Field>

        <Field
          label="Katkı Sağlamak İstediğiniz Alan"
          htmlFor="skill"
          error={errors.skill?.[0]}
        >
          <Select
            id="skill"
            value={values.skill}
            onChange={(e) => update("skill", e.target.value)}
            invalid={!!errors.skill}
          >
            <option value="">Seçiniz</option>
            {SKILLS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="Uygunluk Durumu"
          htmlFor="availability"
          error={errors.availability?.[0]}
          className="sm:col-span-2"
        >
          <Select
            id="availability"
            value={values.availability}
            onChange={(e) => update("availability", e.target.value)}
            invalid={!!errors.availability}
          >
            <option value="">Seçiniz</option>
            {AVAILABILITY.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="Eklemek İstedikleriniz"
          htmlFor="message"
          help="Deneyiminiz veya bize iletmek istedikleriniz (isteğe bağlı)."
          error={errors.message?.[0]}
          className="sm:col-span-2"
        >
          <Textarea
            id="message"
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            invalid={!!errors.message}
            placeholder="Kısaca kendinizden bahsedebilirsiniz..."
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
        {submitting ? "Gönderiliyor..." : "Başvuruyu Gönder"}
      </Button>
    </form>
  );
}
