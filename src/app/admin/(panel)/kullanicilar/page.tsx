"use client";

import { useMemo, useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { adminUsers } from "@/lib/mock-data";
import type { AdminUser, UserRole } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { AdminPageHeader, SectionCard } from "@/components/admin/AdminUI";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Modal, ConfirmModal } from "@/components/admin/Modal";
import { Field, Input, Select } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";

const ROLES: UserRole[] = ["Yönetici", "Editör", "Operatör", "Görüntüleyici"];

const PERMISSIONS = [
  "Bağış görüntüleme",
  "Kampanya düzenleme",
  "Rapor yayınlama",
  "Kullanıcı yönetimi",
  "Dışa aktarma",
] as const;

/** Role → permissions matrix (demo policy). */
const MATRIX: Record<UserRole, Record<(typeof PERMISSIONS)[number], boolean>> = {
  Yönetici: {
    "Bağış görüntüleme": true,
    "Kampanya düzenleme": true,
    "Rapor yayınlama": true,
    "Kullanıcı yönetimi": true,
    "Dışa aktarma": true,
  },
  Editör: {
    "Bağış görüntüleme": true,
    "Kampanya düzenleme": true,
    "Rapor yayınlama": true,
    "Kullanıcı yönetimi": false,
    "Dışa aktarma": false,
  },
  Operatör: {
    "Bağış görüntüleme": true,
    "Kampanya düzenleme": false,
    "Rapor yayınlama": false,
    "Kullanıcı yönetimi": false,
    "Dışa aktarma": true,
  },
  Görüntüleyici: {
    "Bağış görüntüleme": true,
    "Kampanya düzenleme": false,
    "Rapor yayınlama": false,
    "Kullanıcı yönetimi": false,
    "Dışa aktarma": false,
  },
};

export default function KullanicilarPage() {
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState<{ name: string; email: string; role: UserRole }>({
    name: "",
    email: "",
    role: "Görüntüleyici",
  });
  const [toggling, setToggling] = useState<AdminUser | null>(null);

  const columns = useMemo<Column<AdminUser>[]>(
    () => [
      {
        key: "name",
        header: "Kullanıcı",
        cell: (u) => <span className="font-semibold text-ink">{u.name}</span>,
      },
      {
        key: "email",
        header: "E-posta",
        cell: (u) => <span className="text-muted">{u.email}</span>,
        hideOnMobile: true,
      },
      {
        key: "role",
        header: "Rol",
        cell: (u) => <StatusBadge status={u.role} />,
      },
      {
        key: "status",
        header: "Durum",
        cell: (u) => <StatusBadge status={u.status} />,
      },
      {
        key: "lastActiveAt",
        header: "Son Etkinlik",
        cell: (u) => <span className="text-muted">{formatDate(u.lastActiveAt)}</span>,
        hideOnMobile: true,
      },
      {
        key: "actions",
        header: "",
        className: "text-right",
        cell: (u) => (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setToggling(u)}
          >
            {u.status === "Aktif" ? "Pasifleştir" : "Aktifleştir"}
          </Button>
        ),
      },
    ],
    [],
  );

  return (
    <div>
      <AdminPageHeader
        title="Kullanıcılar ve Yetkiler"
        description="Panel kullanıcılarını, rollerini ve erişim yetkilerini yönetin."
        actions={
          <Button variant="green" onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4" /> Kullanıcı Ekle
          </Button>
        }
      />

      <SectionCard title="Panel Kullanıcıları">
        <DataTable
          columns={columns}
          rows={adminUsers}
          mobileTitle={(u) => u.name}
          emptyLabel="Kullanıcı bulunamadı"
        />
      </SectionCard>

      <SectionCard
        title="Roller ve Yetkiler"
        description="Her rolün erişebildiği işlemleri gösteren yetki matrisi."
        className="mt-6"
      >
        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-hairline text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3 font-semibold">Yetki</th>
                {ROLES.map((r) => (
                  <th key={r} className="px-4 py-3 text-center font-semibold">
                    {r}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {PERMISSIONS.map((perm) => (
                <tr key={perm}>
                  <td className="px-4 py-3 font-medium text-ink">{perm}</td>
                  {ROLES.map((role) => {
                    const allowed = MATRIX[role][perm];
                    return (
                      <td key={role} className="px-4 py-3 text-center">
                        {allowed ? (
                          <Check
                            className="mx-auto h-5 w-5 text-emerald-600"
                            aria-label="Yetkili"
                          />
                        ) : (
                          <X className="mx-auto h-5 w-5 text-slate-300" aria-label="Yetkisiz" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Add user modal */}
      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Kullanıcı Ekle"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setAddOpen(false)}>
              Vazgeç
            </Button>
            <Button variant="green" size="sm" onClick={() => setAddOpen(false)}>
              Davet Gönder
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Ad Soyad" htmlFor="u-name" required>
            <Input
              id="u-name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Örn. Yeni Kullanıcı"
            />
          </Field>
          <Field label="E-posta" htmlFor="u-email" required>
            <Input
              id="u-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="ornek@ahdevefa.org"
            />
          </Field>
          <Field label="Rol" htmlFor="u-role" required>
            <Select
              id="u-role"
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as UserRole }))}
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </Select>
          </Field>
          <p className="text-xs text-muted">
            Demo ekranı — kullanıcı oluşturulmaz. Kullanıcıya davet e-postası gönderilerek hesap
            aktifleştirilecektir.
          </p>
        </div>
      </Modal>

      {/* Activate/deactivate confirm */}
      <ConfirmModal
        open={!!toggling}
        onClose={() => setToggling(null)}
        onConfirm={() => {
          // Demo only — status is not persisted.
        }}
        title={toggling?.status === "Aktif" ? "Kullanıcıyı pasifleştir" : "Kullanıcıyı aktifleştir"}
        description={
          toggling
            ? toggling.status === "Aktif"
              ? `${toggling.name} pasifleştirilecek ve panele erişimi kapatılacaktır. Devam edilsin mi?`
              : `${toggling.name} yeniden aktifleştirilecek ve panele erişimi açılacaktır. Devam edilsin mi?`
            : undefined
        }
        confirmLabel={toggling?.status === "Aktif" ? "Pasifleştir" : "Aktifleştir"}
        danger={toggling?.status === "Aktif"}
      />
    </div>
  );
}
