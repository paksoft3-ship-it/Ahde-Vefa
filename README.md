# Ahde-Vefa

**AHDE VEFA İnsani Yardım Derneği** — public website + admin panel.

A production-oriented **Next.js 15 (App Router) + TypeScript + Tailwind CSS** implementation of a
Turkish humanitarian NGO site: donation campaigns, transparency/reports, galleries, volunteer &
corporate flows, donation tracking, bank-transfer (dekont) submission, and a full admin panel.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

- Public site: `/`
- Admin panel: `/admin/login` → `/admin/dashboard` (demo login)

## Scripts

```bash
npm run dev        # development server
npm run build      # production build
npm run start      # run the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Tech stack

Next.js 15 · React 19 · TypeScript (strict) · Tailwind CSS 3 · zod · lucide-react · Manrope.

## Notes

- All UI text is Turkish. Imagery uses brand placeholders (`MediaImage`) — swap in verified photos later.
- Legal/registry/bank/contact values are intentionally `[Eklenecek]` placeholders — no data is fabricated.
- Pakistan content is always shown as **Hazırlık Aşamasında** until verified field data is provided.
- Data lives in `src/lib/mock-data.ts` (in-memory demo). Integration stubs are in `src/lib/integrations/`.

See **[IMPLEMENTATION_NOTES.md](./IMPLEMENTATION_NOTES.md)** for the full route inventory,
architecture, and the backend / payment / email / WhatsApp integration checklist.
