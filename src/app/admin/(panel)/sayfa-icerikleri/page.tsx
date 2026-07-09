"use client";

import { useState } from "react";
import { Pencil, ScrollText, ShieldAlert } from "lucide-react";
import { AdminPageHeader, SectionCard } from "@/components/admin/AdminUI";
import { Modal } from "@/components/admin/Modal";
import { Field, Textarea } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";

interface SiteSection {
  id: string;
  title: string;
  description: string;
  sample: string;
  legal?: boolean;
}

const SECTIONS: SiteSection[] = [
  {
    id: "hero",
    title: "Anasayfa Hero",
    description: "Ana sayfa üst bölümündeki başlık ve tanıtım metni.",
    sample:
      "AHDE VEFA İnsani Yardım Derneği olarak ihtiyaç sahiplerine şeffaf ve onurlu yardım ulaştırıyoruz.",
  },
  {
    id: "hakkimizda",
    title: "Hakkımızda",
    description: "Derneğin misyon, vizyon ve tanıtım metni.",
    sample:
      "Derneğimiz, yardımların doğru adrese ulaşması ilkesiyle çalışır. Ayrıntılı kurumsal bilgiler [Eklenecek].",
  },
  {
    id: "iletisim",
    title: "İletişim Bilgileri",
    description: "Adres, telefon ve e-posta gibi iletişim alanları.",
    sample: "Adres: [Eklenecek] · Telefon: [Eklenecek] · E-posta: [Eklenecek]",
  },
  {
    id: "yasal-metinler",
    title: "Yasal Metinler",
    description: "KVKK aydınlatma, gizlilik ve kullanım koşulları metinleri.",
    sample:
      "Yasal metinlerin resmi içeriği hukuki onay sonrası eklenecektir. Kütük No / İzin No: [Eklenecek].",
    legal: true,
  },
  {
    id: "footer-yasal",
    title: "Footer Yasal Bilgiler",
    description: "Sayfa altında görünen dernek kütük ve izin bilgileri.",
    sample: "Dernek Kütük No: [Eklenecek] · İzin No: [Eklenecek] · Vergi No: [Eklenecek]",
    legal: true,
  },
];

export default function SayfaIcerikleriPage() {
  const [editing, setEditing] = useState<SiteSection | null>(null);
  const [draft, setDraft] = useState("");

  const openEdit = (section: SiteSection) => {
    setEditing(section);
    setDraft(section.sample);
  };

  return (
    <div>
      <AdminPageHeader
        title="Sayfa İçerikleri Yönetimi"
        description="Site bölümlerinin metinlerini düzenleyin. Değişiklikler bu demoda kalıcı olarak kaydedilmez."
      />

      {/* Legal placeholder warning */}
      <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <div>
          <p className="font-semibold">Yasal alanlar hakkında</p>
          <p className="mt-1">
            Dernek Kütük No, İzin No ve benzeri resmi yasal bilgiler, yetkili merci tarafından
            resmi olarak sağlanana kadar <strong>[Eklenecek]</strong> olarak kalır. Bu alanlara
            doğrulanmamış bilgi girilmemelidir.
          </p>
        </div>
      </div>

      <SectionCard
        title="Düzenlenebilir Site Bölümleri"
        description="Her bölümü düzenlemek için ilgili satırdaki Düzenle düğmesini kullanın."
      >
        <ul className="divide-y divide-hairline">
          {SECTIONS.map((section) => (
            <li
              key={section.id}
              className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-mint text-brand-green">
                  <ScrollText className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-ink">{section.title}</h3>
                    {section.legal && (
                      <span className="badge bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20">
                        Yasal — [Eklenecek]
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted">{section.description}</p>
                </div>
              </div>
              <div className="shrink-0 pl-12 sm:pl-0">
                <Button variant="secondary" size="sm" onClick={() => openEdit(section)}>
                  <Pencil className="h-4 w-4" /> Düzenle
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing ? `${editing.title} — Düzenle` : "Düzenle"}
        size="lg"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setEditing(null)}>
              Vazgeç
            </Button>
            <Button
              variant="green"
              size="sm"
              onClick={() => {
                // Demo: içerik kalıcı olarak kaydedilmez.
                setEditing(null);
              }}
            >
              Kaydet
            </Button>
          </>
        }
      >
        {editing && (
          <div className="space-y-4">
            <Field
              label="Bölüm İçeriği"
              htmlFor="section-content"
              help={
                editing.legal
                  ? "Yasal alanlar resmi olarak sağlanana kadar [Eklenecek] olarak bırakılmalıdır."
                  : "Bu alan demo amaçlıdır; kaydedilen içerik kalıcı değildir."
              }
            >
              <Textarea
                id="section-content"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="min-h-[160px]"
              />
            </Field>
            {editing.legal && (
              <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <p>
                  Kütük No / İzin No gibi resmi bilgiler doğrulanmadan girilemez; şu an{" "}
                  <strong>[Eklenecek]</strong> olarak tutulmaktadır.
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
