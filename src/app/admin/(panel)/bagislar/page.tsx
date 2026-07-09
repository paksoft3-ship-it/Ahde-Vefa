"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminPageHeader, SectionCard, PrivacyNotice } from "@/components/admin/AdminUI";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { FilterBar } from "@/components/admin/Toolbar";
import { Modal } from "@/components/admin/Modal";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { routes } from "@/lib/routes";
import { donations } from "@/lib/mock-data";
import { formatTRY, formatDate } from "@/lib/utils";
import type { Donation, DonationStatus } from "@/lib/types";

const STATUS_FILTERS: DonationStatus[] = [
  "Onaylandı",
  "Beklemede",
  "Dekont Bekliyor",
  "İncelemede",
  "Başarısız",
  "İptal Edildi",
];

export default function AdminDonationsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [exportOpen, setExportOpen] = useState(false);

  const rows = useMemo(() => {
    const q = search.trim().toLocaleLowerCase("tr");
    return donations.filter((d) => {
      const matchesSearch =
        !q ||
        d.reference.toLocaleLowerCase("tr").includes(q) ||
        d.donorName.toLocaleLowerCase("tr").includes(q) ||
        d.campaignTitle.toLocaleLowerCase("tr").includes(q);
      const matchesFilter = !filter || d.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const columns: Column<Donation>[] = [
    {
      key: "reference",
      header: "Referans",
      cell: (d) => <span className="font-mono text-xs text-ink">{d.reference}</span>,
    },
    {
      key: "donorName",
      header: "Bağışçı",
      cell: (d) => <span className="text-ink">{d.donorName}</span>,
    },
    {
      key: "campaignTitle",
      header: "Kampanya",
      cell: (d) => <span className="text-muted">{d.campaignTitle}</span>,
      hideOnMobile: true,
    },
    {
      key: "amount",
      header: "Tutar",
      cell: (d) => <span className="font-semibold text-ink">{formatTRY(d.amount)}</span>,
    },
    {
      key: "method",
      header: "Yöntem",
      cell: (d) => <span className="text-muted">{d.method}</span>,
      hideOnMobile: true,
    },
    {
      key: "status",
      header: "Durum",
      cell: (d) => <StatusBadge status={d.status} />,
    },
    {
      key: "createdAt",
      header: "Tarih",
      cell: (d) => <span className="text-muted">{formatDate(d.createdAt)}</span>,
      hideOnMobile: true,
    },
  ];

  return (
    <div>
      <PrivacyNotice />
      <AdminPageHeader
        title="Bağışlar"
        description="Bağış kayıtlarını inceleyin ve durumlarını yönetin."
      />

      <SectionCard>
        <FilterBar
          search={search}
          onSearch={setSearch}
          placeholder="Referans, bağışçı veya kampanya ara..."
          filters={STATUS_FILTERS}
          activeFilter={filter}
          onFilter={setFilter}
          onExport={() => setExportOpen(true)}
        />
        <DataTable
          columns={columns}
          rows={rows}
          onRowClick={(d) => router.push(routes.admin.bagisDetay(d.id))}
          mobileTitle={(d) => d.reference}
          emptyLabel="Bağış bulunamadı"
        />
      </SectionCard>

      <Modal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        title="Dışa Aktar"
        size="sm"
        footer={
          <Button variant="secondary" size="sm" onClick={() => setExportOpen(false)}>
            Kapat
          </Button>
        }
      >
        <p className="text-sm text-muted">
          Dışa aktarma özelliği demo aşamasındadır. Gerçek ortamda bu işlem KVKK
          kapsamında kayıt altına alınır ve yalnızca yetkili kullanıcılar tarafından
          yürütülebilir.
        </p>
      </Modal>
    </div>
  );
}
