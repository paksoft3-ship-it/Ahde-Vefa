"use client";

import { useMemo, useState } from "react";
import { Users, UserCheck, UserCog, UserMinus } from "lucide-react";
import { volunteers } from "@/lib/mock-data";
import type { Volunteer, VolunteerStatus } from "@/lib/types";
import { routes } from "@/lib/routes";
import { formatDate } from "@/lib/utils";
import {
  AdminPageHeader,
  SectionCard,
  StatCard,
  PrivacyNotice,
} from "@/components/admin/AdminUI";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { FilterBar } from "@/components/admin/Toolbar";
import { Modal } from "@/components/admin/Modal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Field, Textarea } from "@/components/forms/Fields";

const STATUSES: VolunteerStatus[] = [
  "Yeni Başvuru",
  "Görüşülecek",
  "Onaylandı",
  "Pasif",
];

export default function GonullulerPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [active, setActive] = useState<Volunteer | null>(null);

  const rows = useMemo(() => {
    const q = search.trim().toLocaleLowerCase("tr");
    return volunteers.filter((v) => {
      const matchesQuery =
        !q ||
        v.name.toLocaleLowerCase("tr").includes(q) ||
        v.city.toLocaleLowerCase("tr").includes(q) ||
        v.skill.toLocaleLowerCase("tr").includes(q);
      const matchesFilter = !filter || v.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [search, filter]);

  const columns: Column<Volunteer>[] = [
    {
      key: "name",
      header: "Ad",
      cell: (v) => <span className="font-semibold text-ink">{v.name}</span>,
    },
    { key: "city", header: "Şehir", cell: (v) => v.city },
    { key: "skill", header: "Yetkinlik", cell: (v) => v.skill },
    { key: "availability", header: "Uygunluk", cell: (v) => v.availability, hideOnMobile: true },
    { key: "status", header: "Durum", cell: (v) => <StatusBadge status={v.status} /> },
    {
      key: "appliedAt",
      header: "Başvuru",
      cell: (v) => formatDate(v.appliedAt),
      hideOnMobile: true,
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Gönüllüler Yönetimi"
        description="Gönüllü başvurularını değerlendirin ve süreçlerini yönetin."
        breadcrumb={[
          { label: "Yönetim", href: routes.admin.dashboard },
          { label: "Gönüllüler" },
        ]}
      />

      <PrivacyNotice />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Toplam Başvuru" value={String(volunteers.length)} icon={Users} tone="green" />
        <StatCard
          label="Yeni Başvuru"
          value={String(volunteers.filter((v) => v.status === "Yeni Başvuru").length)}
          icon={UserCog}
          tone="turquoise"
        />
        <StatCard
          label="Onaylanan"
          value={String(volunteers.filter((v) => v.status === "Onaylandı").length)}
          icon={UserCheck}
          tone="blue"
        />
        <StatCard
          label="Pasif"
          value={String(volunteers.filter((v) => v.status === "Pasif").length)}
          icon={UserMinus}
          tone="gold"
        />
      </div>

      <SectionCard title="Gönüllü Başvuruları" description="Bir satıra tıklayarak detay ve durum işlemlerini açın.">
        <FilterBar
          search={search}
          onSearch={setSearch}
          placeholder="İsim, şehir veya yetkinlik ara..."
          filters={STATUSES}
          activeFilter={filter}
          onFilter={setFilter}
        />
        <DataTable
          columns={columns}
          rows={rows}
          onRowClick={(v) => setActive(v)}
          mobileTitle={(v) => v.name}
          emptyLabel="Gönüllü başvurusu bulunamadı"
        />
      </SectionCard>

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title="Gönüllü Detayı"
        size="lg"
        footer={
          <Button variant="secondary" size="sm" onClick={() => setActive(null)}>
            Kapat
          </Button>
        }
      >
        {active && (
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-bold text-brand-dark">{active.name}</p>
                <p className="text-sm text-muted">
                  {active.city} · Başvuru: {formatDate(active.appliedAt)}
                </p>
              </div>
              <StatusBadge status={active.status} />
            </div>

            <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <Row label="E-posta" value={active.email} />
              <Row label="Telefon" value={active.phone} />
              <Row label="Yetkinlik" value={active.skill} />
              <Row label="Uygunluk" value={active.availability} />
            </dl>

            <Field label="Başvuru Mesajı">
              <p className="rounded-md border border-hairline bg-brand-mint/50 px-3 py-2.5 text-sm text-ink">
                {active.message}
              </p>
            </Field>

            <Field label="İç Not (demo)" htmlFor="volunteer-note" help="Notlar bu demo ekranda kaydedilmez.">
              <Textarea id="volunteer-note" placeholder="Görüşme notu ekleyin..." />
            </Field>

            <div>
              <p className="field-label mb-2">Durum Değiştir</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm" onClick={() => setActive(null)}>
                  Görüşülecek
                </Button>
                <Button variant="green" size="sm" onClick={() => setActive(null)}>
                  Onaylandı
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setActive(null)}>
                  Pasif
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-brand-mint/40 px-3 py-2">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium text-ink">{value}</dd>
    </div>
  );
}
