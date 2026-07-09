"use client";

import Link from "next/link";
import {
  HandCoins,
  CalendarClock,
  Megaphone,
  ReceiptText,
  Users,
} from "lucide-react";
import {
  AdminPageHeader,
  StatCard,
  SectionCard,
  LinkRow,
} from "@/components/admin/AdminUI";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PakistanNotice } from "@/components/public/PakistanNotice";
import { routes } from "@/lib/routes";
import { campaigns, donations, receipts, volunteers } from "@/lib/mock-data";
import { formatTRY, formatDate, PLACEHOLDER } from "@/lib/utils";
import type { Donation } from "@/lib/types";

export default function AdminDashboardPage() {
  const activeCampaigns = campaigns.filter((c) => c.status === "Aktif").length;
  const pendingReceipts = receipts.filter((r) => r.status === "Beklemede").length;
  const newVolunteers = volunteers.filter((v) => v.status === "Yeni Başvuru");

  const recentDonations = donations.slice(0, 5);

  const donationColumns: Column<Donation>[] = [
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
      key: "status",
      header: "Durum",
      cell: (d) => <StatusBadge status={d.status} />,
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Genel Bakış"
        description="Yönetim panelinin operasyonel özeti. Gerçek finansal veriler bağlandığında güncellenecektir."
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="Toplam Bağış"
          value={PLACEHOLDER}
          icon={HandCoins}
          hint="Gerçek veriler bağlandığında"
          tone="green"
        />
        <StatCard
          label="Bugünkü Bağış"
          value={PLACEHOLDER}
          icon={CalendarClock}
          hint="Gerçek veriler bağlandığında"
          tone="turquoise"
        />
        <StatCard
          label="Aktif Kampanya"
          value={String(activeCampaigns)}
          icon={Megaphone}
          hint="Yayında olan kampanyalar"
          tone="green"
        />
        <StatCard
          label="Bekleyen Havale"
          value={String(pendingReceipts)}
          icon={ReceiptText}
          hint="İncelenmeyi bekleyen dekontlar"
          tone="gold"
        />
        <StatCard
          label="Yeni Gönüllü"
          value={String(newVolunteers.length)}
          icon={Users}
          hint="Değerlendirilecek başvurular"
          tone="blue"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent donations */}
        <div className="lg:col-span-2">
          <SectionCard
            title="Son Bağışlar"
            description="En son kaydedilen bağış işlemleri"
            action={
              <Link
                href={routes.admin.bagislar}
                className="text-sm font-semibold text-brand-turquoise hover:underline"
              >
                Tümünü gör
              </Link>
            }
          >
            <DataTable
              columns={donationColumns}
              rows={recentDonations}
              mobileTitle={(d) => d.reference}
              emptyLabel="Henüz bağış kaydı yok"
            />
          </SectionCard>
        </div>

        {/* Pending tasks / new volunteers + quick actions */}
        <div className="space-y-6">
          <SectionCard
            title="Yeni Gönüllü Başvuruları"
            description="Değerlendirilmeyi bekleyen başvurular"
            action={
              <Link
                href={routes.admin.gonulluler}
                className="text-sm font-semibold text-brand-turquoise hover:underline"
              >
                Tümü
              </Link>
            }
          >
            {newVolunteers.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted">
                Bekleyen yeni başvuru bulunmuyor.
              </p>
            ) : (
              <ul className="divide-y divide-hairline">
                {newVolunteers.map((v) => (
                  <li
                    key={v.id}
                    className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-ink">{v.name}</p>
                      <p className="truncate text-xs text-muted">
                        {v.skill} • {v.city} • {formatDate(v.appliedAt)}
                      </p>
                    </div>
                    <StatusBadge status={v.status} />
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>

          <SectionCard title="Hızlı İşlemler">
            <div className="space-y-1">
              <LinkRow href={routes.admin.kampanyaYeni}>Yeni Kampanya Oluştur</LinkRow>
              <LinkRow href={routes.admin.raporYeni}>Yeni Rapor Ekle</LinkRow>
              <LinkRow href={routes.admin.dekontlar}>Dekont Bildirimleri</LinkRow>
            </div>
          </SectionCard>

          {/* Region overview note — Pakistan must stay Hazırlık Aşamasında */}
          <PakistanNotice />
        </div>
      </div>
    </div>
  );
}
