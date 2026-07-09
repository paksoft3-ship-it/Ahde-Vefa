"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { AdminPageHeader, SectionCard, PrivacyNotice } from "@/components/admin/AdminUI";
import { StepTimeline } from "@/components/ui/Blocks";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PakistanNotice } from "@/components/public/PakistanNotice";
import { EmptyState } from "@/components/ui/States";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Field, Textarea } from "@/components/forms/Fields";
import { ConfirmModal } from "@/components/admin/Modal";
import { routes } from "@/lib/routes";
import { donations } from "@/lib/mock-data";
import { formatTRY, formatDate, PLACEHOLDER } from "@/lib/utils";

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-hairline py-2.5 last:border-0">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-right text-sm font-medium text-ink">{value}</dd>
    </div>
  );
}

export default function AdminDonationDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const donation = useMemo(() => donations.find((d) => d.id === id), [id]);

  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<string[]>([]);

  if (!donation) {
    return (
      <div>
        <AdminPageHeader
          title="Bağış Detayı"
          breadcrumb={[
            { label: "Bağışlar", href: routes.admin.bagislar },
            { label: "Bulunamadı" },
          ]}
        />
        <EmptyState
          title="Bağış kaydı bulunamadı"
          description="Aradığınız bağış kaydı mevcut değil."
          action={
            <ButtonLink href={routes.admin.bagislar} variant="green" size="sm">
              Bağışlara dön
            </ButtonLink>
          }
        />
      </div>
    );
  }

  const isPakistan = donation.region === "Pakistan";

  const timelineSteps = [
    { title: "Bağış Oluşturuldu", description: formatDate(donation.createdAt) },
    { title: "Ödeme / Dekont", description: `Yöntem: ${donation.method}` },
    { title: "Durum", description: `Güncel durum: ${donation.status}` },
    { title: "Bildirim", description: "Bağışçı bilgilendirmesi: [Eklenecek]" },
  ];

  const addNote = () => {
    const trimmed = note.trim();
    if (!trimmed) return;
    setNotes((n) => [trimmed, ...n]);
    setNote("");
  };

  return (
    <div>
      <PrivacyNotice />
      <AdminPageHeader
        title={`Bağış Detayı — ${donation.reference}`}
        breadcrumb={[
          { label: "Bağışlar", href: routes.admin.bagislar },
          { label: donation.reference },
        ]}
        actions={<StatusBadge status={donation.status} />}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {isPakistan && <PakistanNotice />}

          <SectionCard title="Bağış Bilgileri">
            <dl>
              <InfoRow label="Referans" value={<span className="font-mono">{donation.reference}</span>} />
              <InfoRow label="Tutar" value={formatTRY(donation.amount)} />
              <InfoRow label="Ödeme Yöntemi" value={donation.method} />
              <InfoRow label="Durum" value={<StatusBadge status={donation.status} />} />
              <InfoRow label="Kampanya" value={donation.campaignTitle} />
              <InfoRow label="Bölge" value={donation.region} />
              <InfoRow label="Tarih" value={formatDate(donation.createdAt)} />
            </dl>
          </SectionCard>

          <SectionCard title="Bağışçı Bilgileri">
            <dl>
              <InfoRow label="Ad Soyad" value={donation.donorName} />
              <InfoRow label="E-posta" value={PLACEHOLDER} />
              <InfoRow label="Telefon" value={PLACEHOLDER} />
            </dl>
            <p className="mt-3 text-xs text-muted">
              İletişim bilgileri KVKK kapsamında korunur ve gerçek veriler bağlandığında
              yalnızca yetkili kullanıcılara gösterilir.
            </p>
          </SectionCard>

          <SectionCard title="İşlem Geçmişi">
            <StepTimeline steps={timelineSteps} />
          </SectionCard>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <SectionCard title="İşlemler">
            <div className="space-y-2">
              <Button
                variant="green"
                className="w-full"
                onClick={() => setAction("approve")}
              >
                Onayla
              </Button>
              <Button
                variant="secondary"
                className="w-full !text-red-600"
                onClick={() => setAction("reject")}
              >
                Reddet
              </Button>
              <ButtonLink
                variant="ghost"
                className="w-full"
                href={routes.admin.bagislar}
              >
                Listeye Dön
              </ButtonLink>
            </div>
          </SectionCard>

          <SectionCard title="İç Notlar">
            <Field htmlFor="note" help="Notlar yalnızca yönetim panelinde görünür (demo).">
              <Textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-[90px]"
                placeholder="İşlemle ilgili bir not ekleyin..."
              />
            </Field>
            <div className="mt-2">
              <Button variant="secondary" size="sm" onClick={addNote}>
                Ekle
              </Button>
            </div>
            {notes.length > 0 && (
              <ul className="mt-4 space-y-2">
                {notes.map((n, i) => (
                  <li
                    key={i}
                    className="rounded-md border border-hairline bg-brand-mint/40 px-3 py-2 text-sm text-ink"
                  >
                    {n}
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>
        </div>
      </div>

      <ConfirmModal
        open={action !== null}
        onClose={() => setAction(null)}
        onConfirm={() => setAction(null)}
        title={action === "reject" ? "Bağışı reddet" : "Bağışı onayla"}
        description={
          action === "reject"
            ? `${donation.reference} referanslı bağışı reddetmek istediğinize emin misiniz? Bu işlem demo amaçlıdır.`
            : `${donation.reference} referanslı bağışı onaylamak istediğinize emin misiniz? Bu işlem demo amaçlıdır.`
        }
        confirmLabel={action === "reject" ? "Reddet" : "Onayla"}
        danger={action === "reject"}
      />
    </div>
  );
}
