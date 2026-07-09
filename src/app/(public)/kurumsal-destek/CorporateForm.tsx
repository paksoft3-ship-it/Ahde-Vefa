"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2 } from "lucide-react";
import { corporateSchema } from "@/lib/validators";
import { routes } from "@/lib/routes";
import { Field, Input, Select, Textarea, Checkbox } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";

const SUPPORT_TYPES = [
  "Sponsorluk",
  "Ayni Yardım",
  "Gönüllülük",
  "Etkinlik İş Birliği",
];

type Values = {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  supportType: string;
  message: string;
  kvkkConsent: boolean;
};

const initialValues: Values = {
  companyName: "",
  contactPerson: "",
  email: "",
  phone: "",
  supportType: SUPPORT_TYPES[0],
  message: "",
  kvkkConsent: false,
};

export function CorporateForm() {
  const router = useRouter();
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (key: keyof Values, value: string | boolean) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = corporateSchema.safeParse({
      companyName: values.companyName,
      contactPerson: values.contactPerson,
      email: values.email,
      phone: values.phone,
      supportType: values.supportType || undefined,
      message: values.message || undefined,
      kvkkConsent: values.kvkkConsent,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const mapped: Record<string, string> = {};
      for (const [key, list] of Object.entries(fieldErrors)) {
        if (list && list[0]) mapped[key] = list[0];
      }
      setErrors(mapped);
      return;
    }

    setErrors({});
    router.push(routes.formBasarili);
  };

  return (
    <div className="card p-6 md:p-8">
      <div className="mb-6 flex items-center gap-2">
        <Building2 className="h-5 w-5 text-brand-turquoise" />
        <h3 className="text-xl font-bold text-brand-green">
          Kurumsal İş Birliği Başvurusu
        </h3>
      </div>
      <p className="mb-6 text-sm text-muted">
        Kurumunuzla sürdürülebilir bir sosyal etki oluşturmak için bilgilerinizi
        iletin; ekibimiz en kısa sürede sizinle iletişime geçsin.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Kurum / Şirket Adı"
            htmlFor="companyName"
            required
            error={errors.companyName}
          >
            <Input
              id="companyName"
              value={values.companyName}
              onChange={(e) => update("companyName", e.target.value)}
              invalid={!!errors.companyName}
              placeholder="Kurum adı"
            />
          </Field>

          <Field
            label="Yetkili Ad Soyad"
            htmlFor="contactPerson"
            required
            error={errors.contactPerson}
          >
            <Input
              id="contactPerson"
              value={values.contactPerson}
              onChange={(e) => update("contactPerson", e.target.value)}
              invalid={!!errors.contactPerson}
              placeholder="Ad Soyad"
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="E-posta" htmlFor="email" required error={errors.email}>
            <Input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              invalid={!!errors.email}
              placeholder="ornek@kurum.com"
            />
          </Field>

          <Field label="Telefon" htmlFor="phone" required error={errors.phone}>
            <Input
              id="phone"
              type="tel"
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              invalid={!!errors.phone}
              placeholder="05xx xxx xx xx"
            />
          </Field>
        </div>

        <Field
          label="Destek Türü"
          htmlFor="supportType"
          error={errors.supportType}
        >
          <Select
            id="supportType"
            value={values.supportType}
            onChange={(e) => update("supportType", e.target.value)}
            invalid={!!errors.supportType}
          >
            {SUPPORT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </Field>

        <Field label="Mesajınız" htmlFor="message" error={errors.message}>
          <Textarea
            id="message"
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="İş birliği talebiniz ve detaylar"
          />
        </Field>

        <Checkbox
          checked={values.kvkkConsent}
          onChange={(e) => update("kvkkConsent", e.target.checked)}
          error={errors.kvkkConsent}
          label={
            <>
              Kişisel verilerimin KVKK kapsamında işlenmesini ve benimle iletişime
              geçilmesini kabul ediyorum.
            </>
          }
        />

        <Button type="submit" variant="primary" size="lg" className="w-full">
          Başvuruyu Gönder
        </Button>
      </form>
    </div>
  );
}
