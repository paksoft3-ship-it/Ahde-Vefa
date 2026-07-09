"use client";

import { useMemo, useState } from "react";
import { Moon, Package, HandHeart, Soup } from "lucide-react";
import { ramazanRecords } from "@/lib/mock-data";
import type { RamazanRecord } from "@/lib/types";
import { routes } from "@/lib/routes";
import { AdminPageHeader, SectionCard, StatCard } from "@/components/admin/AdminUI";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { FilterBar } from "@/components/admin/Toolbar";
import { Modal } from "@/components/admin/Modal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { PakistanNotice } from "@/components/public/PakistanNotice";

const AID_TYPES = ["İftar", "Kumanya", "Fitre", "Fidye", "Zekat"];

const displayStatus = (r: RamazanRecord): string =>
  r.region === "Pakistan" ? "Hazırlık Aşamasında" : r.status;

export default function RamazanYardimlariPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [active, setActive] = useState<RamazanRecord | null>(null);

  const rows = useMemo(() => {
    const q = search.trim().toLocaleLowerCase("tr");
    return ramazanRecords.filter((r) => {
      const matchesQuery =
        !q ||
        r.reference.toLocaleLowerCase("tr").includes(q) ||
        r.donorName.toLocaleLowerCase("tr").includes(q);
      const matchesFilter = !filter || r.aidType === filter;
      return matchesQuery && matchesFilter;
    });
  }, [search, filter]);

  const columns: Column<RamazanRecord>[] = [
    {
      key: "reference",
      header: "Referans",
      cell: (r) => <span className="font-semibold text-ink">{r.reference}</span>,
    },
    { key: "donorName", header: "Bağışçı", cell: (r) => r.donorName },
    { key: "aidType", header: "Yardım Türü", cell: (r) => r.aidType },
    { key: "quantity", header: "Adet", cell: (r) => r.quantity, hideOnMobile: true },
    { key: "region", header: "Bölge", cell: (r) => r.region, hideOnMobile: true },
    {
      key: "status",
      header: "Durum",
      cell: (r) => <StatusBadge status={displayStatus(r)} />,
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Ramazan Yardımları Yönetimi"
        description="İftar, kumanya, fitre, fidye ve zekat kayıtlarını izleyin ve planlayın."
        breadcrumb={[
          { label: "Yönetim", href: routes.admin.dashboard },
          { label: "Ramazan Yardımları" },
        ]}
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Toplam Kayıt" value={String(ramazanRecords.length)} icon={Moon} tone="green" />
        <StatCard
          label="İftar"
          value={String(ramazanRecords.filter((r) => r.aidType === "İftar").length)}
          icon={Soup}
          tone="turquoise"
        />
        <StatCard
          label="Kumanya"
          value={String(ramazanRecords.filter((r) => r.aidType === "Kumanya").length)}
          icon={Package}
          tone="gold"
        />
        <StatCard
          label="Onaylanan"
          value={String(ramazanRecords.filter((r) => r.status === "Onaylandı").length)}
          icon={HandHeart}
          tone="blue"
        />
      </div>

      <PakistanNotice className="mb-6" />

      <SectionCard title="Ramazan Kayıtları" description="Referans veya bağışçıya göre arayın; yardım türüne göre süzün.">
        <FilterBar
          search={search}
          onSearch={setSearch}
          placeholder="Referans veya bağışçı ara..."
          filters={AID_TYPES}
          activeFilter={filter}
          onFilter={setFilter}
        />
        <DataTable
          columns={columns}
          rows={rows}
          onRowClick={(r) => setActive(r)}
          mobileTitle={(r) => r.reference}
          emptyLabel="Ramazan kaydı bulunamadı"
        />
      </SectionCard>

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title="Kayıt Detayı"
        footer={
          <Button variant="secondary" size="sm" onClick={() => setActive(null)}>
            Kapat
          </Button>
        }
      >
        {active && (
          <dl className="space-y-3 text-sm">
            <Row label="Referans" value={active.reference} />
            <Row label="Bağışçı" value={active.donorName} />
            <Row label="Yardım Türü" value={active.aidType} />
            <Row label="Adet" value={String(active.quantity)} />
            <Row label="Bölge" value={active.region} />
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted">Durum</dt>
              <dd>
                <StatusBadge status={displayStatus(active)} />
              </dd>
            </div>
            <p className="rounded-md bg-brand-mint px-3 py-2 text-xs text-muted">
              Dini hükümlere (fitre, fidye, zekat) ilişkin tutar ve açıklamalar yetkili
              mercilerce doğrulandıkça eklenecektir: [Eklenecek].
            </p>
          </dl>
        )}
      </Modal>
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
