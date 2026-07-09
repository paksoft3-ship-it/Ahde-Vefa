"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminPageHeader, SectionCard } from "@/components/admin/AdminUI";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { FilterBar } from "@/components/admin/Toolbar";
import { ConfirmModal } from "@/components/admin/Modal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ButtonLink } from "@/components/ui/Button";
import { routes } from "@/lib/routes";
import { campaigns } from "@/lib/mock-data";
import type { Campaign, CampaignStatus } from "@/lib/types";

const STATUS_FILTERS: CampaignStatus[] = [
  "Aktif",
  "Taslak",
  "Hazırlık Aşamasında",
  "Tamamlandı",
  "Arşiv",
];

export default function AdminCampaignsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [confirmTarget, setConfirmTarget] = useState<Campaign | null>(null);

  const rows = useMemo(() => {
    const q = search.trim().toLocaleLowerCase("tr");
    return campaigns.filter((c) => {
      const matchesSearch =
        !q ||
        c.title.toLocaleLowerCase("tr").includes(q) ||
        c.category.toLocaleLowerCase("tr").includes(q) ||
        c.region.toLocaleLowerCase("tr").includes(q);
      const matchesFilter = !filter || c.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const columns: Column<Campaign>[] = [
    {
      key: "title",
      header: "Kampanya",
      cell: (c) => (
        <div>
          <p className="font-semibold text-ink">{c.title}</p>
          <p className="text-xs text-muted line-clamp-1">{c.summary}</p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Kategori",
      cell: (c) => <span className="text-muted">{c.category}</span>,
    },
    {
      key: "region",
      header: "Bölge",
      cell: (c) => <span className="text-muted">{c.region}</span>,
      hideOnMobile: true,
    },
    {
      key: "status",
      header: "Durum",
      cell: (c) => <StatusBadge status={c.status} />,
    },
    {
      key: "actions",
      header: "İşlemler",
      className: "text-right",
      cell: (c) => (
        <div className="flex justify-end gap-3">
          <Link
            href={routes.admin.kampanyaDuzenle(c.id)}
            className="text-sm font-semibold text-brand-turquoise hover:underline"
          >
            Düzenle
          </Link>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setConfirmTarget(c);
            }}
            className="text-sm font-semibold text-red-600 hover:underline"
          >
            Sil
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Kampanyalar"
        description="Kampanyaları oluşturun, düzenleyin ve yayın durumlarını yönetin."
        actions={
          <ButtonLink href={routes.admin.kampanyaYeni} variant="green" size="sm">
            <Plus className="h-4 w-4" /> Yeni Kampanya
          </ButtonLink>
        }
      />

      <SectionCard>
        <FilterBar
          search={search}
          onSearch={setSearch}
          placeholder="Kampanya adı, kategori veya bölge ara..."
          filters={STATUS_FILTERS}
          activeFilter={filter}
          onFilter={setFilter}
        />
        <DataTable
          columns={columns}
          rows={rows}
          mobileTitle={(c) => c.title}
          emptyLabel="Kampanya bulunamadı"
        />
      </SectionCard>

      <ConfirmModal
        open={confirmTarget !== null}
        onClose={() => setConfirmTarget(null)}
        onConfirm={() => setConfirmTarget(null)}
        title="Kampanyayı sil"
        description={
          confirmTarget
            ? `"${confirmTarget.title}" kampanyasını silmek istediğinize emin misiniz? Bu işlem demo amaçlıdır ve gerçek veriyi etkilemez.`
            : undefined
        }
        confirmLabel="Sil"
        danger
      />
    </div>
  );
}
