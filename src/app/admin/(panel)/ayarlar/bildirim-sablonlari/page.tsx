"use client";

import { useMemo, useState } from "react";
import { notificationTemplates } from "@/lib/mock-data";
import type { NotificationTemplate } from "@/lib/types";
import { routes } from "@/lib/routes";
import { formatDate } from "@/lib/utils";
import { AdminPageHeader, SectionCard } from "@/components/admin/AdminUI";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/StatusBadge";
import { Modal } from "@/components/admin/Modal";
import { Field, Input, Textarea } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";

const CHANNEL_TONE: Record<NotificationTemplate["channel"], "blue" | "turquoise" | "green"> = {
  "E-posta": "blue",
  SMS: "turquoise",
  WhatsApp: "green",
};

export default function BildirimSablonlariPage() {
  const [editing, setEditing] = useState<NotificationTemplate | null>(null);
  const [draft, setDraft] = useState({ subject: "", body: "" });

  const openEditor = (t: NotificationTemplate) => {
    setEditing(t);
    setDraft({ subject: t.subject, body: t.body });
  };

  const columns = useMemo<Column<NotificationTemplate>[]>(
    () => [
      {
        key: "name",
        header: "Şablon",
        cell: (t) => <span className="font-semibold text-ink">{t.name}</span>,
      },
      {
        key: "channel",
        header: "Kanal",
        cell: (t) => <Badge tone={CHANNEL_TONE[t.channel]}>{t.channel}</Badge>,
      },
      {
        key: "subject",
        header: "Konu",
        cell: (t) => <span className="text-muted">{t.subject}</span>,
        hideOnMobile: true,
      },
      {
        key: "updatedAt",
        header: "Güncellenme",
        cell: (t) => <span className="text-muted">{formatDate(t.updatedAt)}</span>,
      },
      {
        key: "actions",
        header: "",
        className: "text-right",
        cell: (t) => (
          <Button variant="secondary" size="sm" onClick={() => openEditor(t)}>
            Düzenle
          </Button>
        ),
      },
    ],
    [],
  );

  return (
    <div>
      <AdminPageHeader
        title="Bildirim Şablonları"
        description="Bağışçılara ve gönüllülere gönderilen otomatik bildirim metinlerini yönetin."
        breadcrumb={[
          { label: "Ayarlar", href: routes.admin.ayarlar },
          { label: "Bildirim Şablonları" },
        ]}
      />

      <SectionCard
        title="Şablonlar"
        description="Her şablon; e-posta, SMS veya WhatsApp kanalından gönderilir."
      >
        <DataTable
          columns={columns}
          rows={notificationTemplates}
          mobileTitle={(t) => t.name}
          emptyLabel="Henüz şablon eklenmedi"
        />
      </SectionCard>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing ? `Şablonu Düzenle — ${editing.name}` : "Şablonu Düzenle"}
        size="lg"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setEditing(null)}>
              Vazgeç
            </Button>
            <Button variant="green" size="sm" onClick={() => setEditing(null)}>
              Kaydet
            </Button>
          </>
        }
      >
        {editing && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted">
              <span>Kanal:</span>
              <Badge tone={CHANNEL_TONE[editing.channel]}>{editing.channel}</Badge>
            </div>
            <Field label="Konu" htmlFor="tpl-subject">
              <Input
                id="tpl-subject"
                value={draft.subject}
                onChange={(e) => setDraft((d) => ({ ...d, subject: e.target.value }))}
              />
            </Field>
            <Field
              label="İçerik"
              htmlFor="tpl-body"
              help="Dinamik değişkenler süslü parantez ile kullanılır: {{referans}}, {{ad}}, {{tutar}}."
            >
              <Textarea
                id="tpl-body"
                className="min-h-[160px]"
                value={draft.body}
                onChange={(e) => setDraft((d) => ({ ...d, body: e.target.value }))}
              />
            </Field>
            <div className="rounded-md border border-hairline bg-brand-mint/40 px-4 py-3 text-xs text-muted">
              Bu bir demo düzenleyicidir; değişiklikler kaydedilmez. KVKK kapsamında kişisel veri
              içeren bildirimler yalnızca ilgili kişilere gönderilmelidir.
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
