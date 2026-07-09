"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { messages } from "@/lib/mock-data";
import { routes } from "@/lib/routes";
import { formatDate, PLACEHOLDER } from "@/lib/utils";
import {
  AdminPageHeader,
  SectionCard,
  PrivacyNotice,
} from "@/components/admin/AdminUI";
import { EmptyState } from "@/components/ui/States";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Field, Textarea } from "@/components/forms/Fields";

export default function MesajDetayPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const message = useMemo(() => messages.find((m) => m.id === id), [id]);

  const [reply, setReply] = useState("");
  const [note, setNote] = useState("");

  if (!message) {
    return (
      <div>
        <AdminPageHeader
          title="Mesaj Detayı"
          breadcrumb={[
            { label: "Yönetim", href: routes.admin.dashboard },
            { label: "Mesajlar", href: routes.admin.mesajlar },
            { label: "Detay" },
          ]}
        />
        <EmptyState
          title="Mesaj bulunamadı"
          description="Aradığınız mesaj kaydı mevcut değil."
        />
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title="Mesaj Detayı"
        description={message.subject}
        breadcrumb={[
          { label: "Yönetim", href: routes.admin.dashboard },
          { label: "Mesajlar", href: routes.admin.mesajlar },
          { label: message.subject },
        ]}
      />

      <PrivacyNotice />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: thread + reply */}
        <div className="space-y-6 lg:col-span-2">
          <SectionCard title="Mesaj İçeriği">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3 border-b border-hairline pb-4">
              <div>
                <p className="font-bold text-brand-dark">{message.name}</p>
                <p className="text-sm text-muted">
                  {message.email === PLACEHOLDER ? "E-posta: [Eklenecek]" : message.email}
                </p>
              </div>
              <div className="text-right">
                <StatusBadge status={message.status} />
                <p className="mt-1 text-xs text-muted">{formatDate(message.receivedAt)}</p>
              </div>
            </div>
            <p className="mb-2 font-semibold text-ink">{message.subject}</p>
            <p className="whitespace-pre-line text-sm leading-relaxed text-ink">{message.body}</p>
          </SectionCard>

          <SectionCard title="Yanıtla" description="Yanıt gönderimi bu demo ekranda kaydedilmez.">
            <div className="space-y-4">
              <Field label="Yanıt Metni" htmlFor="reply">
                <Textarea
                  id="reply"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Yanıtınızı yazın..."
                />
              </Field>
              <div className="flex justify-end">
                <Button
                  variant="green"
                  size="md"
                  disabled={!reply.trim()}
                  onClick={() => setReply("")}
                >
                  Yanıtla
                </Button>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Right: status controls + internal notes */}
        <div className="space-y-6">
          <SectionCard title="Durum">
            <p className="mb-3 text-sm text-muted">
              Mevcut durum: <StatusBadge status={message.status} className="ml-1" />
            </p>
            <div className="flex flex-col gap-2">
              <Button variant="green" size="sm">
                Yanıtlandı olarak işaretle
              </Button>
              <Button variant="secondary" size="sm">
                Kapalı olarak işaretle
              </Button>
            </div>
            <p className="mt-3 rounded-md bg-brand-mint px-3 py-2 text-xs text-muted">
              Bu bir demo ekrandır; durum değişiklikleri kalıcı olarak kaydedilmez.
            </p>
          </SectionCard>

          <SectionCard title="İç Notlar" description="Yalnızca ekip içi görünürdür.">
            <Field htmlFor="internal-note" help="Notlar bu demo ekranda saklanmaz.">
              <Textarea
                id="internal-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Bu mesajla ilgili iç not ekleyin..."
              />
            </Field>
            <div className="mt-3 flex justify-end">
              <Button variant="secondary" size="sm" disabled={!note.trim()} onClick={() => setNote("")}>
                Not Ekle
              </Button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
