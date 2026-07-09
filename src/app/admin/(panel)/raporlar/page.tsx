"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { reports } from "@/lib/mock-data";
import type { Report } from "@/lib/types";
import { routes } from "@/lib/routes";
import { formatDate } from "@/lib/utils";
import { AdminPageHeader, SectionCard } from "@/components/admin/AdminUI";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { FilterBar } from "@/components/admin/Toolbar";
import { ConfirmModal } from "@/components/admin/Modal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ButtonLink } from "@/components/ui/Button";
import { PakistanNotice } from "@/components/public/PakistanNotice";

const REGION_FILTERS = ["Afrika", "Afganistan", "Türkiye", "Pakistan", "Genel", "Çoklu Bölge"];
const STATUS_FILTERS = ["Yayında", "Taslak"];

export default function AdminRaporlarPage() {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [toDelete, setToDelete] = useState<Report | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLocaleLowerCase("tr");
    return reports.filter((r) => {
      const matchesSearch =
        !q ||
        r.title.toLocaleLowerCase("tr").includes(q) ||
        r.category.toLocaleLowerCase("tr").includes(q);
      const matchesRegion = !regionFilter || r.region === regionFilter;
      const matchesStatus = !statusFilter || r.status === statusFilter;
      return matchesSearch && matchesRegion && matchesStatus;
    });
  }, [search, regionFilter, statusFilter]);

  const columns: Column<Report>[] = [
    {
      key: "title",
      header: "Rapor Başlığı",
      cell: (r) => (
        <div>
          <p className="font-semibold text-ink">{r.title}</p>
          <p className="mt-0.5 text-xs text-muted">Dönem: {r.period}</p>
        </div>
      ),
    },
    { key: "region", header: "Bölge", cell: (r) => <span className="text-sm">{r.region}</span> },
    {
      key: "category",
      header: "Kategori",
      cell: (r) => <span className="text-sm text-muted">{r.category}</span>,
      hideOnMobile: true,
    },
    { key: "status", header: "Durum", cell: (r) => <StatusBadge status={r.status} /> },
    {
      key: "publishedAt",
      header: "Yayın Tarihi",
      cell: (r) => <span className="text-sm text-muted">{formatDate(r.publishedAt)}</span>,
      hideOnMobile: true,
    },
    {
      key: "actions",
      header: "İşlemler",
      className: "text-right",
      cell: (r) => (
        <div className="flex items-center justify-end gap-1.5">
          <Link
            href={routes.admin.raporDuzenle(r.id)}
            className="inline-flex items-center gap-1 rounded-md border border-hairline px-2.5 py-1.5 text-xs font-medium text-brand-green transition-colors hover:bg-brand-mint/60"
          >
            <Pencil className="h-3.5 w-3.5" /> Düzenle
          </Link>
          <button
            onClick={() => setToDelete(r)}
            className="inline-flex items-center gap-1 rounded-md border border-hairline px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <Trash2 className="h-3.5 w-3.5" /> Sil
          </button>
        </div>
      ),
    },
  ];

  const hasPakistan = filtered.some((r) => r.region === "Pakistan");

  return (
    <div>
      <AdminPageHeader
        title="Raporlar Yönetimi"
        description="Saha ve faaliyet raporlarını oluşturun, düzenleyin ve yayın durumlarını yönetin."
        actions={
          <ButtonLink href={routes.admin.raporYeni} variant="green" size="sm">
            <Plus className="h-4 w-4" /> Yeni Rapor
          </ButtonLink>
        }
      />

      {hasPakistan && <PakistanNotice className="mb-6" />}

      <SectionCard title="Raporlar" description={`${filtered.length} kayıt listeleniyor`}>
        <FilterBar
          search={search}
          onSearch={setSearch}
          placeholder="Rapor başlığı veya kategori ara..."
          filters={[...REGION_FILTERS, ...STATUS_FILTERS]}
          activeFilter={regionFilter || statusFilter}
          onFilter={(v) => {
            if (STATUS_FILTERS.includes(v)) {
              setStatusFilter(v);
              setRegionFilter("");
            } else {
              setRegionFilter(v);
              setStatusFilter("");
            }
          }}
        />
        <DataTable
          columns={columns}
          rows={filtered}
          emptyLabel="Rapor bulunamadı"
          mobileTitle={(r) => r.title}
        />
      </SectionCard>

      <ConfirmModal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={() => setToDelete(null)}
        title="Raporu sil"
        description={
          toDelete
            ? `"${toDelete.title}" raporunu silmek istediğinize emin misiniz? Bu işlem demo amaçlıdır ve kalıcı değildir.`
            : undefined
        }
        confirmLabel="Sil"
        danger
      />
    </div>
  );
}
