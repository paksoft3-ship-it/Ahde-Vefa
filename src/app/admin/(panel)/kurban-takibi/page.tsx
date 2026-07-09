"use client";

import { useMemo, useState } from "react";
import { Beef, ClipboardCheck, PackageCheck, Truck } from "lucide-react";
import { kurbanRecords } from "@/lib/mock-data";
import type { KurbanRecord, KurbanStatus } from "@/lib/types";
import { routes } from "@/lib/routes";
import { AdminPageHeader, SectionCard, StatCard } from "@/components/admin/AdminUI";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { FilterBar } from "@/components/admin/Toolbar";
import { Modal } from "@/components/admin/Modal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Field, Select } from "@/components/forms/Fields";
import { PakistanNotice } from "@/components/public/PakistanNotice";

const STATUSES: KurbanStatus[] = [
  "Vekalet Alındı",
  "Ödeme Tamamlandı",
  "Kesim Bekliyor",
  "Kesildi",
  "Dağıtıldı",
  "Rapor Gönderildi",
];

/** Pakistan çalışmaları hazırlık aşamasındadır; kayıt durumu daima bu şekilde gösterilir. */
const displayStatus = (r: KurbanRecord): string =>
  r.region === "Pakistan" ? "Hazırlık Aşamasında" : r.status;

export default function KurbanTakibiPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [active, setActive] = useState<KurbanRecord | null>(null);
  const [nextStatus, setNextStatus] = useState<string>("");

  const rows = useMemo(() => {
    const q = search.trim().toLocaleLowerCase("tr");
    return kurbanRecords.filter((r) => {
      const matchesQuery =
        !q ||
        r.reference.toLocaleLowerCase("tr").includes(q) ||
        r.ownerName.toLocaleLowerCase("tr").includes(q) ||
        r.kurbanType.toLocaleLowerCase("tr").includes(q);
      const matchesFilter = !filter || displayStatus(r) === filter;
      return matchesQuery && matchesFilter;
    });
  }, [search, filter]);

  const openUpdate = (r: KurbanRecord) => {
    setActive(r);
    setNextStatus(r.status);
  };

  const columns: Column<KurbanRecord>[] = [
    {
      key: "reference",
      header: "Referans",
      cell: (r) => <span className="font-semibold text-ink">{r.reference}</span>,
    },
    { key: "ownerName", header: "Vekalet Sahibi", cell: (r) => r.ownerName },
    { key: "kurbanType", header: "Kurban Türü", cell: (r) => r.kurbanType },
    { key: "shares", header: "Hisse", cell: (r) => r.shares, hideOnMobile: true },
    { key: "region", header: "Bölge", cell: (r) => r.region, hideOnMobile: true },
    {
      key: "status",
      header: "Durum",
      cell: (r) => <StatusBadge status={displayStatus(r)} />,
    },
    {
      key: "actions",
      header: "İşlem",
      className: "text-right",
      cell: (r) => (
        <div className="flex justify-end">
          <Button
            variant="secondary"
            size="sm"
            disabled={r.region === "Pakistan"}
            onClick={(e) => {
              e.stopPropagation();
              openUpdate(r);
            }}
          >
            Durum Güncelle
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Kurban Takibi"
        description="Vekalet kayıtlarını izleyin, kesim ve dağıtım süreçlerini yönetin."
        breadcrumb={[
          { label: "Yönetim", href: routes.admin.dashboard },
          { label: "Kurban Takibi" },
        ]}
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Toplam Kayıt" value={String(kurbanRecords.length)} icon={Beef} tone="green" />
        <StatCard
          label="Vekalet Alındı"
          value={String(kurbanRecords.filter((r) => r.status === "Vekalet Alındı").length)}
          icon={ClipboardCheck}
          tone="turquoise"
        />
        <StatCard
          label="Kesim Bekliyor"
          value={String(kurbanRecords.filter((r) => r.status === "Kesim Bekliyor").length)}
          icon={PackageCheck}
          tone="gold"
        />
        <StatCard
          label="Dağıtıldı"
          value={String(kurbanRecords.filter((r) => r.status === "Dağıtıldı").length)}
          icon={Truck}
          tone="blue"
        />
      </div>

      <PakistanNotice className="mb-6" />

      <SectionCard title="Kurban Kayıtları" description="Referans, vekalet sahibi veya kurban türüne göre arayın.">
        <FilterBar
          search={search}
          onSearch={setSearch}
          placeholder="Referans, isim veya kurban türü ara..."
          filters={STATUSES}
          activeFilter={filter}
          onFilter={setFilter}
        />
        <DataTable
          columns={columns}
          rows={rows}
          mobileTitle={(r) => r.reference}
          emptyLabel="Kurban kaydı bulunamadı"
        />
      </SectionCard>

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title="Durum Güncelle"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setActive(null)}>
              Vazgeç
            </Button>
            <Button variant="green" size="sm" onClick={() => setActive(null)}>
              Kaydet
            </Button>
          </>
        }
      >
        {active && (
          <div className="space-y-4">
            <p className="text-sm text-muted">
              <span className="font-semibold text-ink">{active.reference}</span> —{" "}
              {active.ownerName} ({active.kurbanType})
            </p>
            <Field label="Yeni Durum" htmlFor="kurban-status">
              <Select
                id="kurban-status"
                value={nextStatus}
                onChange={(e) => setNextStatus(e.target.value)}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </Field>
            <p className="rounded-md bg-brand-mint px-3 py-2 text-xs text-muted">
              Bu bir demo ekrandır; durum değişikliği kalıcı olarak kaydedilmez. Bağışçı
              bildirimleri ve rapor bağlantısı ilerleyen aşamada eklenecektir.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
