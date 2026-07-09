"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { routes } from "@/lib/routes";
import { PLACEHOLDER } from "@/lib/utils";
import { AdminPageHeader, SectionCard } from "@/components/admin/AdminUI";
import { Field, Input, Checkbox } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";

export default function ProfilPage() {
  const router = useRouter();
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 2500);
  };

  const handleLogout = () => {
    // Demo only — no session is invalidated.
    router.push(routes.admin.login);
  };

  return (
    <div>
      <AdminPageHeader
        title="Profil ve Hesap Ayarları"
        description="Kişisel bilgilerinizi, şifrenizi ve güvenlik tercihlerinizi yönetin."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left column */}
        <div className="space-y-6">
          <SectionCard title="Profil Bilgileri">
            <form onSubmit={handleProfileSave} className="space-y-4">
              <Field label="Ad Soyad" htmlFor="p-name">
                <Input id="p-name" defaultValue="Sistem Yöneticisi" />
              </Field>
              <Field label="E-posta" htmlFor="p-email">
                <Input id="p-email" type="email" defaultValue={PLACEHOLDER} placeholder={PLACEHOLDER} />
              </Field>
              <Field label="Telefon" htmlFor="p-phone">
                <Input id="p-phone" defaultValue={PLACEHOLDER} placeholder={PLACEHOLDER} />
              </Field>
              <div className="flex items-center gap-3">
                <Button type="submit" variant="green">
                  Kaydet
                </Button>
                {profileSaved && (
                  <span className="text-sm font-medium text-brand-green">Kaydedildi (demo).</span>
                )}
              </div>
            </form>
          </SectionCard>

          <SectionCard
            title="Şifre Değiştir"
            description="Güvenliğiniz için düzenli olarak şifrenizi güncelleyin."
          >
            <form onSubmit={handlePasswordSave} className="space-y-4">
              <Field label="Mevcut Şifre" htmlFor="p-current">
                <Input id="p-current" type="password" autoComplete="current-password" placeholder="••••••••" />
              </Field>
              <Field label="Yeni Şifre" htmlFor="p-new">
                <Input id="p-new" type="password" autoComplete="new-password" placeholder="••••••••" />
              </Field>
              <Field label="Yeni Şifre (Tekrar)" htmlFor="p-repeat">
                <Input id="p-repeat" type="password" autoComplete="new-password" placeholder="••••••••" />
              </Field>
              <div className="flex items-center gap-3">
                <Button type="submit" variant="secondary">
                  Şifreyi Güncelle
                </Button>
                {passwordSaved && (
                  <span className="text-sm font-medium text-brand-green">
                    Şifre güncellendi (demo).
                  </span>
                )}
              </div>
            </form>
          </SectionCard>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <SectionCard
            title="Bildirim Tercihleri"
            description="Hangi durumlarda bilgilendirilmek istediğinizi seçin."
          >
            <div className="space-y-4">
              <Checkbox label="Yeni bağış bildirimleri" defaultChecked />
              <Checkbox label="Dekont bildirimleri" defaultChecked />
              <Checkbox label="Yeni gönüllü başvuruları" defaultChecked />
              <Checkbox label="Yeni iletişim mesajları" />
              <Checkbox label="Haftalık özet e-postası" />
            </div>
            <div className="mt-5">
              <Button variant="green">Tercihleri Kaydet</Button>
            </div>
          </SectionCard>

          <SectionCard title="Oturum ve Güvenlik">
            <dl className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted">Son giriş</dt>
                <dd className="font-medium text-ink">{PLACEHOLDER}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted">Son giriş IP</dt>
                <dd className="font-medium text-ink">{PLACEHOLDER}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted">Aktif oturumlar</dt>
                <dd className="font-medium text-ink">Bu cihaz</dd>
              </div>
            </dl>
            <div className="mt-5 border-t border-hairline pt-4">
              <Button
                variant="secondary"
                className="!border-red-200 !text-red-600 hover:!bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" /> Çıkış Yap
              </Button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
