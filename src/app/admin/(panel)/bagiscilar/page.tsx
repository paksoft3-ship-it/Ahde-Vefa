"use client";

import { useMemo, useState } from "react";
import { AdminPageHeader, SectionCard, PrivacyNotice } from "@/components/admin/AdminUI";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { FilterBar } from "@/components/admin/Toolbar";
import { Modal } from "@/components/admin/Modal";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { donors } from "@/lib/mock-data";
import { formatTRY, formatDate, PLACEHOLDER } from "@/lib/utils";
import type { Donor } from "@/lib/types";

const TYPE_FILTERS = ["Bireysel", "Kurumsal"];

export default function AdminDonorsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState<Donor | null>(null);

  const rows = useMemo(() => {
    const q = search.trim().toLocaleLowerCase("tr");
    return donors.filter((d) => {
      const matchesSearch =
        !q ||
        d.name.toLocaleLowerCase("tr").includes(q) ||
        d.city.toLocaleLowerCase("tr").includes(q);
      const matchesFilter = !filter || d.type === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const columns: Column<Donor>[] = [
    {
      key: "name",
      header: "Bağışçı",
      cell: (d) => <span className="font-semibold text-ink">{d.name}</span>,
    },
    {
      key: "type",
      header: "Tür",
      cell: (d) => <StatusBadge status={d.type} />,
    },
    {
      key: "city",
      header: "Şehir",
      cell: (d) => <span className="text-muted">{d.city}</span>,
      hideOnMobile: true,
    },
    {
      key: "donationCount",
      header: "Bağış Sayısı",
      cell: (d) => <span className="text-ink">{d.donationCount}</span>,
    },
    {
      key: "totalDonations",
      header: "Toplam Bağış",
      cell: (d) => (
        <span className="font-semibold text-ink">{formatTRY(d.totalDonations)}</span>
      ),
    },
    {
      key: "contact",
      header: "İletişim",
      cell: () => <span className="text-muted">{PLACEHOLDER}</span>,
      hideOnMobile: true,
    },
  ];

  return (
    <div>
      <PrivacyNotice>
        Bu ekran bağışçılara ait kişisel verileri içerir. E-posta, telefon ve adres gibi
        iletişim bilgileri KVKK kapsamında korunur; yalnızca açık rıza ve yetki dahilinde
        işlenebilir. İletişim izni olmayan bağışçılara pazarlama amaçlı ileti gönderilemez.
      </PrivacyNotice>

      <AdminPageHeader
        title="Bağışçılar"
        description="Bağışçı kayıtlarını görüntüleyin ve iletişim izinlerini gözden geçirin."
      />

      <SectionCard>
        <FilterBar
          search={search}
          onSearch={setSearch}
          placeholder="Bağışçı adı veya şehir ara..."
          filters={TYPE_FILTERS}
          activeFilter={filter}
          onFilter={setFilter}
        />
        <DataTable
          columns={columns}
          rows={rows}
          onRowClick={(d) => setSelected(d)}
          mobileTitle={(d) => d.name}
          emptyLabel="Bağışçı bulunamadı"
        />
      </SectionCard>

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected ? selected.name : "Bağışçı Detayı"}
        footer={
          <Button variant="secondary" size="sm" onClick={() => setSelected(null)}>
            Kapat
          </Button>
        }
      >
        {selected && (
          <div className="space-y-4">
            <dl className="divide-y divide-hairline">
              <div className="flex items-center justify-between gap-4 py-2.5">
                <dt className="text-sm text-muted">Tür</dt>
                <dd><StatusBadge status={selected.type} /></dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-2.5">
                <dt className="text-sm text-muted">Şehir</dt>
                <dd className="text-sm font-medium text-ink">{selected.city}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-2.5">
                <dt className="text-sm text-muted">E-posta</dt>
                <dd className="text-sm font-medium text-ink">{PLACEHOLDER}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-2.5">
                <dt className="text-sm text-muted">Telefon</dt>
                <dd className="text-sm font-medium text-ink">{PLACEHOLDER}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-2.5">
                <dt className="text-sm text-muted">Bağış Sayısı</dt>
                <dd className="text-sm font-medium text-ink">{selected.donationCount}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-2.5">
                <dt className="text-sm text-muted">Toplam Bağış</dt>
                <dd className="text-sm font-medium text-ink">
                  {formatTRY(selected.totalDonations)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-2.5">
                <dt className="text-sm text-muted">İlk Bağış</dt>
                <dd className="text-sm font-medium text-ink">
                  {formatDate(selected.firstDonationAt)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-2.5">
                <dt className="text-sm text-muted">İletişim İzni (KVKK)</dt>
                <dd>
                  <StatusBadge status={selected.kvkkConsent ? "Onaylandı" : "Beklemede"} />
                </dd>
              </div>
            </dl>

            <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
              <span className="font-bold">KVKK: </span>
              {selected.kvkkConsent
                ? "Bağışçı iletişim izni vermiştir. Yine de veriler yalnızca amacına uygun ve yetki dahilinde işlenmelidir."
                : "Bağışçının iletişim izni bulunmamaktadır. Pazarlama/bilgilendirme amaçlı ileti gönderilemez."}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
