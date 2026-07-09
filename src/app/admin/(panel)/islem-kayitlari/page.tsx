"use client";

import { useMemo, useState } from "react";
import { Lock } from "lucide-react";
import { auditLogs } from "@/lib/mock-data";
import type { AuditLog } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { AdminPageHeader, SectionCard } from "@/components/admin/AdminUI";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { FilterBar } from "@/components/admin/Toolbar";

export default function IslemKayitlariPage() {
  const [search, setSearch] = useState("");

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return auditLogs;
    return auditLogs.filter((l) =>
      [l.actor, l.action, l.target].some((v) => v.toLowerCase().includes(q)),
    );
  }, [search]);

  const columns = useMemo<Column<AuditLog>[]>(
    () => [
      {
        key: "actor",
        header: "Kullanıcı",
        cell: (l) => <span className="font-semibold text-ink">{l.actor}</span>,
      },
      {
        key: "action",
        header: "İşlem",
        cell: (l) => <span className="text-ink">{l.action}</span>,
      },
      {
        key: "target",
        header: "Hedef",
        cell: (l) => <span className="text-muted">{l.target}</span>,
      },
      {
        key: "ip",
        header: "IP Adresi",
        cell: (l) => <span className="text-muted">{l.ip}</span>,
        hideOnMobile: true,
      },
      {
        key: "createdAt",
        header: "Tarih",
        cell: (l) => <span className="text-muted">{formatDate(l.createdAt)}</span>,
      },
    ],
    [],
  );

  return (
    <div>
      <AdminPageHeader
        title="İşlem Kayıtları"
        description="Panelde gerçekleştirilen işlemlerin denetim kayıtları."
      />

      <div className="mb-6 flex items-start gap-3 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
        <Lock className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
        <p>
          Bu kayıtlar salt okunurdur ve değiştirilemez. Denetim amacıyla otomatik olarak tutulur;
          silinemez veya düzenlenemez.
        </p>
      </div>

      <SectionCard title="Kayıtlar">
        <FilterBar
          search={search}
          onSearch={setSearch}
          placeholder="Kullanıcı, işlem veya hedef ara..."
        />
        <DataTable
          columns={columns}
          rows={rows}
          mobileTitle={(l) => l.action}
          emptyLabel="Kayıt bulunamadı"
        />
      </SectionCard>
    </div>
  );
}
