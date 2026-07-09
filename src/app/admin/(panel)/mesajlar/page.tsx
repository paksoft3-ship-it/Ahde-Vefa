"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Inbox, MailCheck, Archive } from "lucide-react";
import { messages } from "@/lib/mock-data";
import type { Message, MessageStatus } from "@/lib/types";
import { routes } from "@/lib/routes";
import { formatDate, cn } from "@/lib/utils";
import {
  AdminPageHeader,
  SectionCard,
  StatCard,
  PrivacyNotice,
} from "@/components/admin/AdminUI";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { FilterBar } from "@/components/admin/Toolbar";
import { StatusBadge } from "@/components/ui/StatusBadge";

const STATUSES: MessageStatus[] = ["Yeni", "Yanıtlandı", "Kapalı"];

const truncate = (s: string, n = 60) => (s.length > n ? `${s.slice(0, n).trimEnd()}…` : s);

export default function MesajlarPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const rows = useMemo(() => {
    const q = search.trim().toLocaleLowerCase("tr");
    return messages.filter((m) => {
      const matchesQuery =
        !q ||
        m.name.toLocaleLowerCase("tr").includes(q) ||
        m.subject.toLocaleLowerCase("tr").includes(q) ||
        m.preview.toLocaleLowerCase("tr").includes(q);
      const matchesFilter = !filter || m.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [search, filter]);

  const columns: Column<Message>[] = [
    {
      key: "name",
      header: "Gönderen",
      cell: (m) => <span className="font-semibold text-ink">{m.name}</span>,
    },
    { key: "subject", header: "Konu", cell: (m) => m.subject },
    {
      key: "preview",
      header: "Önizleme",
      cell: (m) => <span className="text-muted">{truncate(m.preview)}</span>,
      hideOnMobile: true,
    },
    { key: "status", header: "Durum", cell: (m) => <StatusBadge status={m.status} /> },
    {
      key: "receivedAt",
      header: "Tarih",
      cell: (m) => formatDate(m.receivedAt),
      hideOnMobile: true,
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Mesajlar Yönetimi"
        description="İletişim formundan gelen mesajları görüntüleyin ve yanıtlayın."
        breadcrumb={[
          { label: "Yönetim", href: routes.admin.dashboard },
          { label: "Mesajlar" },
        ]}
      />

      <PrivacyNotice />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Toplam Mesaj" value={String(messages.length)} icon={Mail} tone="green" />
        <StatCard
          label="Yeni"
          value={String(messages.filter((m) => m.status === "Yeni").length)}
          icon={Inbox}
          tone="turquoise"
        />
        <StatCard
          label="Yanıtlandı"
          value={String(messages.filter((m) => m.status === "Yanıtlandı").length)}
          icon={MailCheck}
          tone="blue"
        />
        <StatCard
          label="Kapalı"
          value={String(messages.filter((m) => m.status === "Kapalı").length)}
          icon={Archive}
          tone="gold"
        />
      </div>

      <SectionCard title="Gelen Mesajlar" description="Detayları görmek için bir satıra tıklayın.">
        <FilterBar
          search={search}
          onSearch={setSearch}
          placeholder="Gönderen, konu veya içerik ara..."
          filters={STATUSES}
          activeFilter={filter}
          onFilter={setFilter}
        />
        <DataTable
          columns={columns}
          rows={rows}
          onRowClick={(m) => router.push(routes.admin.mesajDetay(m.id))}
          mobileTitle={(m) => (
            <span className={cn("flex items-center gap-2")}>{m.subject}</span>
          )}
          emptyLabel="Mesaj bulunamadı"
        />
      </SectionCard>
    </div>
  );
}
