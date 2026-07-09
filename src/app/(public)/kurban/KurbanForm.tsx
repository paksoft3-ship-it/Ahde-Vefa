"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeartHandshake } from "lucide-react";
import { kurbanSchema } from "@/lib/validators";
import { routes } from "@/lib/routes";
import { Field, Input, Select, Textarea, Checkbox } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";

const KURBAN_TYPES = [
  "Vacip Kurban",
  "Adak Kurbanı",
  "Akika Kurbanı",
  "Şükür Kurbanı",
  "Nafile Kurban",
];

const REGIONS = ["Afrika", "Afganistan", "Türkiye", "Çoklu Bölge"];

type Values = {
  kurbanType: string;
  region: string;
  shares: string;
  vekaletName: string;
  phone: string;
  email: string;
  note: string;
  vekaletConsent: boolean;
};

const initialValues: Values = {
  kurbanType: KURBAN_TYPES[0],
  region: REGIONS[0],
  shares: "1",
  vekaletName: "",
  phone: "",
  email: "",
  note: "",
  vekaletConsent: false,
};

export function KurbanForm() {
  const router = useRouter();
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (key: keyof Values, value: string | boolean) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = kurbanSchema.safeParse({
      kurbanType: values.kurbanType,
      region: values.region,
      shares: values.shares,
      vekaletName: values.vekaletName,
      phone: values.phone,
      email: values.email,
      note: values.note || undefined,
      vekaletConsent: values.vekaletConsent,
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
        <HeartHandshake className="h-5 w-5 text-brand-turquoise" />
        <h3 className="text-xl font-bold text-brand-green">Kurban Vekalet Formu</h3>
      </div>
      <p className="mb-6 text-sm text-muted">
        Kurban hisse bedeli ve güncel bilgiler dernek tarafından paylaşılır. Bu form
        yalnızca vekalet ve iletişim bilgilerinizi iletmek içindir.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Kurban Türü" htmlFor="kurbanType" required error={errors.kurbanType}>
            <Select
              id="kurbanType"
              value={values.kurbanType}
              onChange={(e) => update("kurbanType", e.target.value)}
              invalid={!!errors.kurbanType}
            >
              {KURBAN_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </Field>

          <Field label="Bölge" htmlFor="region" required error={errors.region}>
            <Select
              id="region"
              value={values.region}
              onChange={(e) => update("region", e.target.value)}
              invalid={!!errors.region}
            >
              {REGIONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </Select>
          </Field>
        </div>

        <Field
          label="Hisse Sayısı"
          htmlFor="shares"
          required
          error={errors.shares}
          help="Vekalet vereceğiniz hisse adedini girin."
        >
          <Input
            id="shares"
            type="number"
            min={1}
            value={values.shares}
            onChange={(e) => update("shares", e.target.value)}
            invalid={!!errors.shares}
          />
        </Field>

        <Field
          label="Vekalet Veren Ad Soyad"
          htmlFor="vekaletName"
          required
          error={errors.vekaletName}
        >
          <Input
            id="vekaletName"
            value={values.vekaletName}
            onChange={(e) => update("vekaletName", e.target.value)}
            invalid={!!errors.vekaletName}
            placeholder="Ad Soyad"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
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

          <Field label="E-posta" htmlFor="email" required error={errors.email}>
            <Input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              invalid={!!errors.email}
              placeholder="ornek@eposta.com"
            />
          </Field>
        </div>

        <Field label="Not (isteğe bağlı)" htmlFor="note" error={errors.note}>
          <Textarea
            id="note"
            value={values.note}
            onChange={(e) => update("note", e.target.value)}
            placeholder="İletmek istediğiniz ek bilgiler"
          />
        </Field>

        <Checkbox
          checked={values.vekaletConsent}
          onChange={(e) => update("vekaletConsent", e.target.checked)}
          error={errors.vekaletConsent}
          label={
            <>
              Kurbanımın vekalet yoluyla kesilmesi için dernek adına vekalet
              veriyorum ve kişisel verilerimin işlenmesini kabul ediyorum.
            </>
          }
        />

        <Button type="submit" variant="primary" size="lg" className="w-full">
          Vekaleti İlet
        </Button>
        <p className="text-center text-xs text-muted">
          Formu ilettiğinizde dernek ekibi hisse bedeli ve ödeme yöntemi hakkında
          sizinle iletişime geçer.
        </p>
      </form>
    </div>
  );
}
