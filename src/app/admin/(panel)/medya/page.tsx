"use client";

import { useState } from "react";
import { CloudUpload, Info, Plus, Trash2 } from "lucide-react";
import { galleryAlbums } from "@/lib/mock-data";
import type { GalleryAlbum } from "@/lib/types";
import { AdminPageHeader, SectionCard } from "@/components/admin/AdminUI";
import { Modal, ConfirmModal } from "@/components/admin/Modal";
import { Field, Input, Select } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MediaImage } from "@/components/ui/MediaImage";
import { PakistanNotice } from "@/components/public/PakistanNotice";

const REGIONS = ["Genel", "Afrika", "Afganistan", "Türkiye", "Pakistan", "Çoklu Bölge"];

export default function AdminMedyaPage() {
  const [albumModalOpen, setAlbumModalOpen] = useState(false);
  const [newAlbum, setNewAlbum] = useState({ title: "", region: "Genel" });
  const [toDelete, setToDelete] = useState<GalleryAlbum | null>(null);

  return (
    <div>
      <AdminPageHeader
        title="Galeri / Medya Yönetimi"
        description="Albümleri ve saha görsellerini yönetin. Görseller yalnızca onurlu ve doğrulanmış içerikten oluşmalıdır."
        actions={
          <Button variant="green" size="sm" onClick={() => setAlbumModalOpen(true)}>
            <Plus className="h-4 w-4" /> Albüm Ekle
          </Button>
        }
      />

      {/* Upload area — storage integration not connected */}
      <SectionCard title="Medya Yükleme" className="mb-6">
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-hairline bg-brand-mint/40 px-6 py-10 text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-green shadow-card">
            <CloudUpload className="h-7 w-7" strokeWidth={1.5} />
          </div>
          <h3 className="text-base font-bold text-ink">Görselleri buraya sürükleyin</h3>
          <p className="mt-1 max-w-md text-sm text-muted">
            Dosya yükleme özelliği için nesne depolama entegrasyonu (
            <code className="rounded bg-white px-1 py-0.5 text-xs">@/lib/integrations/storage</code>)
            henüz bağlanmadı. Bu alan yalnızca arayüz gösterimi amaçlıdır.
          </p>
          <Button variant="secondary" size="sm" className="mt-4" disabled>
            Dosya Seç (yakında)
          </Button>
        </div>
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p>
            Yüklenen görseller kişisel veri içerebilir. Yalnızca ilgili kişilerin açık rızası ve
            KVKK ilkelerine uygun şekilde paylaşın. Depolama servisi bağlanana kadar gerçek dosya
            yüklemesi yapılamaz.
          </p>
        </div>
      </SectionCard>

      {/* Album grid */}
      <SectionCard title="Albümler" description={`${galleryAlbums.length} albüm`}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryAlbums.map((album) => (
            <div
              key={album.id}
              className="group overflow-hidden rounded-lg border border-hairline bg-white"
            >
              <MediaImage keyword={album.cover} className="h-40 w-full" label={album.title} />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-brand-dark">{album.title}</h3>
                    <p className="mt-0.5 text-xs text-muted">{album.photoCount} görsel</p>
                  </div>
                  <StatusBadge status={album.region} />
                </div>
                {album.region === "Pakistan" && (
                  <p className="mt-2 text-xs font-medium text-amber-700">
                    Hazırlık Aşamasında — tamamlanmış faaliyet görseli içermez.
                  </p>
                )}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setToDelete(album)}
                    className="inline-flex items-center gap-1 rounded-md border border-hairline px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {galleryAlbums.some((a) => a.region === "Pakistan") && (
          <PakistanNotice className="mt-6" />
        )}
      </SectionCard>

      {/* Add album modal */}
      <Modal
        open={albumModalOpen}
        onClose={() => setAlbumModalOpen(false)}
        title="Yeni Albüm Ekle"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setAlbumModalOpen(false)}>
              Vazgeç
            </Button>
            <Button
              variant="green"
              size="sm"
              onClick={() => {
                // Demo: albüm kalıcı olarak eklenmez.
                setAlbumModalOpen(false);
                setNewAlbum({ title: "", region: "Genel" });
              }}
            >
              Oluştur
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Albüm Adı" htmlFor="album-title" required>
            <Input
              id="album-title"
              value={newAlbum.title}
              onChange={(e) => setNewAlbum((a) => ({ ...a, title: e.target.value }))}
              placeholder="Örn. Afrika Saha Çalışmaları"
            />
          </Field>
          <Field label="Bölge" htmlFor="album-region">
            <Select
              id="album-region"
              value={newAlbum.region}
              onChange={(e) => setNewAlbum((a) => ({ ...a, region: e.target.value }))}
            >
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </Select>
          </Field>
          {newAlbum.region === "Pakistan" && (
            <p className="text-xs text-amber-700">
              Pakistan albümleri yalnızca hazırlık sürecine dair içerik barındırabilir.
            </p>
          )}
        </div>
      </Modal>

      <ConfirmModal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={() => setToDelete(null)}
        title="Albümü sil"
        description={
          toDelete
            ? `"${toDelete.title}" albümünü ve içindeki ${toDelete.photoCount} görseli silmek istediğinize emin misiniz? Bu işlem demo amaçlıdır.`
            : undefined
        }
        confirmLabel="Sil"
        danger
      />
    </div>
  );
}
