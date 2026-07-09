"use client";

import { useMemo, useState } from "react";
import { FileText, Clock, CheckCircle2, XCircle } from "lucide-react";
import { receipts } from "@/lib/mock-data";
import type { Receipt, ReceiptStatus } from "@/lib/types";
import { routes } from "@/lib/routes";
import { formatTRY, formatDate } from "@/lib/utils";
import { AdminPageHeader, SectionCard, StatCard } from "@/components/admin/AdminUI";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { FilterBar } from "@/components/admin/Toolbar";
import { Modal, ConfirmModal } from "@/components/admin/Modal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";

const STATUSES: ReceiptStatus[] = ["Beklemede", "İncelemede", "Onaylandı", "Reddedildi"];

export default function DekontBildirimleriPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [preview, setPreview] = useState<Receipt | null>(null);
  const [approve, setApprove] = useState<Receipt | null>(null);
  const [reject, setReject] = useState<Receipt | null>(null);

  const rows = useMemo(() => {
    const q = search.trim().toLocaleLowerCase("tr");
    return receipts.filter((r) => {
      const matchesQuery =
        !q ||
        r.reference.toLocaleLowerCase("tr").includes(q) ||
        r.donorName.toLocaleLowerCase("tr").includes(q) ||
        r.campaignTitle.toLocaleLowerCase("tr").includes(q);
      const matchesFilter = !filter || r.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [search, filter]);

  const columns: Column<Receipt>[] = [
    {
      key: "reference",
      header: "Referans",
      cell: (r) => <span className="font-semibold text-ink">{r.reference}</span>,
    },
    { key: "donorName", header: "Bağışçı", cell: (r) => r.donorName },
    { key: "amount", header: "Tutar", cell: (r) => formatTRY(r.amount) },
    { key: "campaignTitle", header: "Kampanya", cell: (r) => r.campaignTitle, hideOnMobile: true },
    { key: "fileName", header: "Dosya", cell: (r) => r.fileName, hideOnMobile: true },
    { key: "status", header: "Durum", cell: (r) => <StatusBadge status={r.status} /> },
    {
      key: "actions",
      header: "İşlem",
      className: "text-right",
      cell: (r) => (
        <div className="flex flex-wrap justify-end gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setPreview(r);
            }}
          >
            Önizle
          </Button>
          <Button
            variant="green"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setApprove(r);
            }}
          >
            Onayla
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setReject(r);
            }}
          >
            Reddet
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Dekont Bildirimleri Yönetimi"
        description="Havale/EFT dekont bildirimlerini inceleyin, onaylayın veya reddedin."
        breadcrumb={[
          { label: "Yönetim", href: routes.admin.dashboard },
          { label: "Dekont Bildirimleri" },
        ]}
      />

      <div className="mb-6 flex items-start gap-3 rounded-md border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-800">
        <FileText className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Dekontlar mali belge niteliği taşır. İnceleme ve onay işlemleri kayıt altına alınır.
          Dosya depolama entegrasyonu henüz bağlı değildir; önizlemeler örnek amaçlıdır.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Toplam Bildirim" value={String(receipts.length)} icon={FileText} tone="green" />
        <StatCard
          label="Beklemede"
          value={String(receipts.filter((r) => r.status === "Beklemede").length)}
          icon={Clock}
          tone="gold"
        />
        <StatCard
          label="Onaylanan"
          value={String(receipts.filter((r) => r.status === "Onaylandı").length)}
          icon={CheckCircle2}
          tone="turquoise"
        />
        <StatCard
          label="Reddedilen"
          value={String(receipts.filter((r) => r.status === "Reddedildi").length)}
          icon={XCircle}
          tone="blue"
        />
      </div>

      <SectionCard title="Dekont Kayıtları" description="Referans, bağışçı veya kampanyaya göre arayın.">
        <FilterBar
          search={search}
          onSearch={setSearch}
          placeholder="Referans, bağışçı veya kampanya ara..."
          filters={STATUSES}
          activeFilter={filter}
          onFilter={setFilter}
        />
        <DataTable
          columns={columns}
          rows={rows}
          mobileTitle={(r) => r.reference}
          emptyLabel="Dekont bildirimi bulunamadı"
        />
      </SectionCard>

      {/* Preview */}
      <Modal
        open={!!preview}
        onClose={() => setPreview(null)}
        title="Dekont Önizleme"
        size="lg"
        footer={
          <Button variant="secondary" size="sm" onClick={() => setPreview(null)}>
            Kapat
          </Button>
        }
      >
        {preview && (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-hairline bg-brand-mint/50 px-6 py-10 text-center">
              <FileText className="h-12 w-12 text-brand-green" />
              <p className="mt-3 font-semibold text-brand-dark">{preview.fileName}</p>
              <p className="mt-1 text-sm text-muted">
                Dosya önizlemesi henüz bağlı değildir. Depolama entegrasyonu eklenecektir: [Eklenecek]
              </p>
            </div>
            <dl className="space-y-3 text-sm">
              <Row label="Referans" value={preview.reference} />
              <Row label="Bağışçı" value={preview.donorName} />
              <Row label="Tutar" value={formatTRY(preview.amount)} />
              <Row label="Kampanya" value={preview.campaignTitle} />
              <Row label="Gönderim Tarihi" value={formatDate(preview.submittedAt)} />
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">Durum</dt>
                <dd>
                  <StatusBadge status={preview.status} />
                </dd>
              </div>
            </dl>
          </div>
        )}
      </Modal>

      <ConfirmModal
        open={!!approve}
        onClose={() => setApprove(null)}
        onConfirm={() => setApprove(null)}
        title="Dekontu Onayla"
        description={
          approve
            ? `${approve.reference} referanslı dekont onaylansın mı? Bu işlem kayıt altına alınır.`
            : undefined
        }
        confirmLabel="Onayla"
      />

      <ConfirmModal
        open={!!reject}
        onClose={() => setReject(null)}
        onConfirm={() => setReject(null)}
        title="Dekontu Reddet"
        description={
          reject
            ? `${reject.reference} referanslı dekont reddedilsin mi? Bağışçı bilgilendirilebilir.`
            : undefined
        }
        confirmLabel="Reddet"
        danger
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium text-ink">{value}</dd>
    </div>
  );
}
