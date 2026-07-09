"use client";

import { useState } from "react";
import { AlertTriangle, Landmark, Scale, Settings2, Wallet } from "lucide-react";
import { routes } from "@/lib/routes";
import { SITE, CONTACT, BANK, LEGAL } from "@/lib/constants";
import { AdminPageHeader, SectionCard, LinkRow } from "@/components/admin/AdminUI";
import { Field, Input, Select } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type TabKey = "genel" | "odeme" | "banka" | "yasal";

const TABS: { key: TabKey; label: string; icon: typeof Settings2 }[] = [
  { key: "genel", label: "Genel", icon: Settings2 },
  { key: "odeme", label: "Ödeme", icon: Wallet },
  { key: "banka", label: "Banka", icon: Landmark },
  { key: "yasal", label: "Yasal", icon: Scale },
];

export default function AyarlarPage() {
  const [tab, setTab] = useState<TabKey>("genel");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo only — no data is persisted.
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <AdminPageHeader
        title="Ayarlar"
        description="Dernek bilgileri, ödeme, banka ve yasal ayarlarını buradan yönetin."
      />

      {/* Tab navigation */}
      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map(({ key, label, icon: Icon }) => {
          const active = tab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={cn(
                "flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition-colors",
                active
                  ? "border-brand-green bg-brand-green text-white"
                  : "border-hairline bg-white text-muted hover:border-brand-green",
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {tab === "genel" && (
          <SectionCard
            title="Genel Bilgiler"
            description="Sitede görünen kurum kimliği ve iletişim bilgileri."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Site Adı" htmlFor="siteName">
                <Input id="siteName" defaultValue={SITE.name} readOnly className="bg-brand-mint/40" />
              </Field>
              <Field label="Kurum Tam Adı" htmlFor="fullName">
                <Input id="fullName" defaultValue={SITE.fullName} readOnly className="bg-brand-mint/40" />
              </Field>
              <Field label="İletişim Telefonu" htmlFor="phone">
                <Input id="phone" defaultValue={CONTACT.phone} placeholder={CONTACT.phone} />
              </Field>
              <Field label="WhatsApp" htmlFor="whatsapp">
                <Input id="whatsapp" defaultValue={CONTACT.whatsapp} placeholder={CONTACT.whatsapp} />
              </Field>
              <Field label="E-posta" htmlFor="email">
                <Input id="email" type="email" defaultValue={CONTACT.email} placeholder={CONTACT.email} />
              </Field>
              <Field label="Çalışma Saatleri" htmlFor="hours">
                <Input id="hours" defaultValue={CONTACT.workingHours} placeholder={CONTACT.workingHours} />
              </Field>
              <Field label="Adres" htmlFor="address" className="sm:col-span-2">
                <Input id="address" defaultValue={CONTACT.address} placeholder={CONTACT.address} />
              </Field>
            </div>
          </SectionCard>
        )}

        {tab === "odeme" && (
          <SectionCard
            title="Ödeme Ayarları"
            description="Online ödeme sağlayıcısı ve bağış varsayılanları."
          >
            <div className="mb-5 flex items-start gap-3 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
              <p>
                Güvenlik gereği gizli anahtarlar (API/secret key) repoda saklanmaz. Anahtarlar yalnızca
                sunucu ortam değişkenleri (ör. <code>PAYMENT_PROVIDER_API_KEY</code>) üzerinden tanımlanır.
                Aşağıdaki alanlar demo amaçlıdır; kart verisi hiçbir zaman kaydedilmez.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Ödeme Sağlayıcısı"
                htmlFor="provider"
                help="Sağlayıcı entegrasyonu @/lib/integrations/payment üzerinden bağlanacaktır."
              >
                <Select id="provider" defaultValue="">
                  <option value="" disabled>
                    Sağlayıcı seçin
                  </option>
                  <option value="iyzico">iyzico</option>
                  <option value="paytr">PayTR</option>
                  <option value="stripe">Stripe</option>
                </Select>
              </Field>
              <Field
                label="Varsayılan Para Birimi"
                htmlFor="currency"
              >
                <Select id="currency" defaultValue="TRY">
                  <option value="TRY">TRY (Türk Lirası)</option>
                </Select>
              </Field>
              <Field
                label="API Anahtarı"
                htmlFor="apiKey"
                help="Gizli anahtarlar repoda saklanmaz — bu alan boştur."
                className="sm:col-span-2"
              >
                <Input
                  id="apiKey"
                  type="password"
                  autoComplete="off"
                  placeholder="Gizli anahtar burada gösterilmez"
                  defaultValue=""
                />
              </Field>
            </div>
          </SectionCard>
        )}

        {tab === "banka" && (
          <SectionCard
            title="Banka / Havale Bilgileri"
            description="Havale ve EFT bağışları için görünen hesap bilgileri."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Hesap Adı (Ünvan)" htmlFor="accountName">
                <Input id="accountName" defaultValue={BANK.accountName} placeholder={BANK.accountName} />
              </Field>
              <Field label="Banka Adı" htmlFor="bankName">
                <Input id="bankName" defaultValue={BANK.bankName} placeholder={BANK.bankName} />
              </Field>
              <Field label="IBAN" htmlFor="iban" className="sm:col-span-2">
                <Input id="iban" defaultValue={BANK.iban} placeholder={BANK.iban} />
              </Field>
              <Field label="Şube" htmlFor="branch">
                <Input id="branch" defaultValue={BANK.branch} placeholder={BANK.branch} />
              </Field>
            </div>
          </SectionCard>
        )}

        {tab === "yasal" && (
          <SectionCard
            title="Yasal Bilgiler"
            description="Dernek kütük bilgileri ve yardım toplama izni. Bu alanlar resmi belgelerle doldurulmalıdır."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Dernek Kütük No" htmlFor="kutukNo">
                <Input id="kutukNo" defaultValue={LEGAL.kutukNo} placeholder={LEGAL.kutukNo} />
              </Field>
              <Field label="Yardım Toplama İzin No" htmlFor="izinNo">
                <Input id="izinNo" defaultValue={LEGAL.yardimToplamaIzinNo} placeholder={LEGAL.yardimToplamaIzinNo} />
              </Field>
              <Field label="İzin Başlangıç Tarihi" htmlFor="izinBaslangic">
                <Input id="izinBaslangic" defaultValue={LEGAL.izinBaslangic} placeholder={LEGAL.izinBaslangic} />
              </Field>
              <Field label="İzin Bitiş Tarihi" htmlFor="izinBitis">
                <Input id="izinBitis" defaultValue={LEGAL.izinBitis} placeholder={LEGAL.izinBitis} />
              </Field>
              <Field label="Yetkili Makam" htmlFor="yetkiliMakam" className="sm:col-span-2">
                <Input id="yetkiliMakam" defaultValue={LEGAL.yetkiliMakam} placeholder={LEGAL.yetkiliMakam} />
              </Field>
            </div>
          </SectionCard>
        )}

        <div className="flex items-center gap-3">
          <Button type="submit" variant="green">
            Kaydet
          </Button>
          {saved && (
            <span className="text-sm font-medium text-brand-green">
              Değişiklikler kaydedildi (demo).
            </span>
          )}
        </div>
      </form>

      <SectionCard title="İlgili Ayarlar" className="mt-6">
        <div className="space-y-1">
          <LinkRow href={routes.admin.bildirimSablonlari}>Bildirim Şablonları Yönetimi</LinkRow>
          <LinkRow href={routes.admin.yedekleme}>Yedekleme ve Dışa Aktarma Merkezi</LinkRow>
        </div>
      </SectionCard>
    </div>
  );
}
