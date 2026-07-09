/**
 * File storage adapter (PLACEHOLDER).
 * Wire up object storage (e.g. S3, Cloudflare R2, Supabase Storage) later.
 * Required env: STORAGE_BUCKET=...
 *
 * Used for receipt/dekont uploads and gallery media. The demo build keeps
 * uploads in local component state only — no files are persisted.
 */

export interface StoredFile {
  url: string;
  name: string;
  size: number;
}

export async function uploadFile(_file: File): Promise<StoredFile> {
  // TODO: integrate object storage and return a durable URL.
  throw new Error(
    "Dosya yükleme entegrasyonu henüz bağlanmadı. Depolama sağlayıcısı yapılandırılmalıdır.",
  );
}
