"use client";

import { useState } from "react";
import {
  FileSpreadsheet,
  FileText,
  HandCoins,
  Megaphone,
  ScrollText,
  Users,
  type LucideIcon,
} from "lucide-react";
import { routes } from "@/lib/routes";
import { PLACEHOLDER } from "@/lib/utils";
import { AdminPageHeader, SectionCard, PrivacyNotice } from "@/components/admin/AdminUI";
import { Field, Select } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";
import { ConfirmModal } from "@/components/admin/Modal";

interface ExportSource {
  key: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

const SOURCES: ExportSource[] = [
  { key: "bagislar", label: "Bağışlar", description: "Bağış kayıtları ve referanslar.", icon: HandCoins },
  { key: "bagiscilar", label: "Bağışçılar", description: "Bağışçı listesi ve iletişim bilgileri.", icon: Users },
  { key: "kampanyalar", label: "Kampanyalar", description: "Kampanya tanımları ve durumları.", icon: Megaphone },
  { key: "islemKayitlari", label: "İşlem Kayıtları", description: "Yönetici işlem/denetim kayıtları.", icon: ScrollText },
];

export default function YedeklemePage() {
  const [pending, setPending] = useState<{ source: string; format: "CSV" | "Excel" } | null>(null);

  return (
    <div>
      <AdminPageHeader
        title="Yedekleme ve Dışa Aktarma"
        description="Verileri dışa aktarın ve otomatik yedekleme planını yönetin."
        breadcrumb={[
          { label: "Ayarlar", href: routes.admin.ayarlar },
          { label: "Yedekleme ve Dışa Aktarma" },
        ]}
      />

      <PrivacyNotice>
        Dışa aktarılan dosyalar kişisel veri içerebilir. Tüm dışa aktarma işlemleri KVKK gereği kayıt
        altına alınır ve İşlem Kayıtları ekranından izlenir. Dosyaları yalnızca yetkiniz dahilinde,
        güvenli ortamda saklayın ve paylaşın.
      </PrivacyNotice>

      <SectionCard
        title="Veri Dışa Aktarma"
        description="İstediğiniz veri kümesini CSV veya Excel biçiminde indirin."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {SOURCES.map(({ key, label, description, icon: Icon }) => (
            <div key={key} className="rounded-lg border border-hairline p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-mint text-brand-green">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-brand-dark">{label}</h3>
                  <p className="mt-0.5 text-sm text-muted">{description}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPending({ source: label, format: "CSV" })}
                >
                  <FileText className="h-4 w-4" /> CSV
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPending({ source: label, format: "Excel" })}
                >
                  <FileSpreadsheet className="h-4 w-4" /> Excel
                </Button>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">
          Not: Dışa aktarma biçimi ve alan seçimi entegrasyonu {PLACEHOLDER}. Bu ekran demo amaçlıdır;
          gerçek dosya üretilmez.
        </p>
      </SectionCard>

      <SectionCard
        title="Otomatik Yedekleme Planı"
        description="Verilerin belirli aralıklarla otomatik yedeklenmesini yapılandırın."
        className="mt-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Yedekleme Sıklığı" htmlFor="frequency">
            <Select id="frequency" defaultValue="">
              <option value="" disabled>
                {PLACEHOLDER}
              </option>
              <option value="gunluk">Günlük</option>
              <option value="haftalik">Haftalık</option>
              <option value="aylik">Aylık</option>
            </Select>
          </Field>
          <Field label="Son Yedekleme" htmlFor="lastBackup">
            <div
              id="lastBackup"
              className="field-input flex items-center bg-brand-mint/40 text-muted"
            >
              {PLACEHOLDER}
            </div>
          </Field>
        </div>
        <div className="mt-4">
          <Button variant="green">Planı Kaydet</Button>
        </div>
      </SectionCard>

      <ConfirmModal
        open={!!pending}
        onClose={() => setPending(null)}
        onConfirm={() => {
          // Demo only — no file is generated and the action is logged.
        }}
        title="Dışa aktarmayı onayla"
        description={
          pending
            ? `${pending.source} verisi ${pending.format} biçiminde dışa aktarılacak. Bu işlem KVKK gereği kayıt altına alınır. Devam edilsin mi? (Demo — dosya üretilmez.)`
            : undefined
        }
        confirmLabel="Dışa Aktar"
      />
    </div>
  );
}
