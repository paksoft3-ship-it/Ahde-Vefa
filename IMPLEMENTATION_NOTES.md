# AHDE VEFA İnsani Yardım Derneği — Implementation Notes

Production-oriented **Next.js 15 (App Router) + TypeScript + Tailwind CSS** implementation of
the AHDE VEFA public website and admin panel, built from the Stitch screens, `design.md`, and
`cloude.md` prompt pack.

Status: **`npm run build` passes, `tsc --noEmit` clean, `next lint` clean.** 71 routes prerender.

---

## 1. How to run

```bash
npm install
npm run dev        # http://localhost:3000
# or
npm run build && npm run start
```

Quality gates:
```bash
npm run lint       # eslint (next/core-web-vitals)
npm run typecheck  # tsc --noEmit
npm run build      # production build (also runs lint + type validation)
```

Key entry points:
- Public site: `/`
- Admin panel: `/admin/login` → `/admin/dashboard` (demo login, any valid-looking email/password)
- Maintenance page: `/bakim`

---

## 2. Tech stack

- **Next.js 15** App Router, React 19, TypeScript (strict)
- **Tailwind CSS 3** with the AHDE VEFA design tokens (`tailwind.config.ts`)
- **lucide-react** icons, **clsx** + **tailwind-merge** (`cn` helper)
- **zod** for form validation schemas
- Google **Manrope** font via `next/font`
- No heavy/unnecessary dependencies; no backend required to run.

---

## 3. Project structure

```
src/
├── app/
│   ├── (public)/            # public site route group (shared header/footer/announcement bar)
│   │   ├── page.tsx         # Anasayfa
│   │   ├── bagis/ ...       # donation flow (listing, [slug], odeme, basarili, durum)
│   │   ├── bagis-takip/, dekont-bildir/
│   │   ├── kurban/, ramazan/, kurumsal-destek/
│   │   ├── faaliyetler/ (+ afrika, afganistan, pakistan, turkiye, gida-yardimi, acil-yardim)
│   │   ├── raporlar/ (+[slug]), haberler/ (+[slug]), galeri/ (+[slug])
│   │   ├── hakkimizda/, gonullu-ol/, iletisim/, sss/, yasal/, arama/, form-basarili/
│   │   ├── loading.tsx, error.tsx
│   ├── admin/
│   │   ├── login/           # standalone (outside panel chrome)
│   │   └── (panel)/         # admin route group (AdminShell: sidebar + topbar)
│   │       ├── dashboard/, kampanyalar/ (+yeni, [id]/duzenle)
│   │       ├── bagislar/ (+[id]), bagiscilar/
│   │       ├── kurban-takibi/, ramazan-yardimlari/, gonulluler/, dekont-bildirimleri/
│   │       ├── raporlar/ (+yeni, [id]/duzenle), medya/, mesajlar/ (+[id])
│   │       ├── sayfa-icerikleri/, kullanicilar/, islem-kayitlari/, profil/
│   │       └── ayarlar/ (+bildirim-sablonlari, yedekleme)
│   ├── bakim/page.tsx       # maintenance mode
│   ├── not-found.tsx        # 404
│   ├── layout.tsx, globals.css
├── components/
│   ├── ui/        # Button, StatusBadge, SectionHeading, PageHero/Breadcrumb, Blocks
│   │              # (TrustBadges, LegalInfoCard, CTASection, StepTimeline), Accordion,
│   │              # States (Empty/Loading/Error), MediaImage, Logo
│   ├── layout/    # PublicHeader, PublicFooter, TopAnnouncementBar
│   ├── public/    # Cards (Campaign/Report/News/Album), PakistanNotice
│   ├── forms/     # Fields (Field/Input/Textarea/Select/Checkbox), AmountSelector, DonationQuickCard
│   └── admin/     # AdminShell, AdminUI (PageHeader/StatCard/SectionCard/PrivacyNotice),
│                  # DataTable, Toolbar (FilterBar), Modal/ConfirmModal, icons
├── lib/
│   ├── types.ts, routes.ts, constants.ts, content.ts
│   ├── mock-data.ts         # illustrative demo data (see §6)
│   ├── utils.ts, validators.ts (zod)
│   └── integrations/        # payment, email, sms, whatsapp, storage, analytics (stubs)
public/logo/ahde-vefa-logo.jpeg   # real logo asset (header, footer, admin, login, 404, favicon)
```

---

## 4. Routes implemented

**Public (31 pages):** Anasayfa · Bağış listeleme + kampanya detay ([slug]) + ödeme + başarılı +
durum (başarısız/beklemede/dekont) · Bağış takip · Dekont bildir · Kurban · Ramazan · Kurumsal
destek · Faaliyetler (genel + Afrika, Afganistan, **Pakistan (Hazırlık)**, Türkiye, Gıda Yardımı,
Acil Yardım) · Raporlar + detay · Haberler + detay · Galeri + albüm detay · Hakkımızda · Gönüllü ol
· İletişim · SSS · Yasal metinler · Arama · Form başarılı · 404 · Bakım.

**Admin (25 pages):** Login · Dashboard · Kampanyalar (liste/yeni/düzenle) · Bağışlar (liste/detay)
· Bağışçılar · Kurban takibi · Ramazan yardımları · Gönüllüler · Dekont bildirimleri · Raporlar
(liste/yeni/düzenle) · Galeri/Medya · Mesajlar (liste/detay) · Sayfa içerikleri · Ayarlar
(+bildirim şablonları, +yedekleme) · Kullanıcılar & yetkiler · İşlem kayıtları · Profil.

Every screen in the `cloude.md` §20 checklist and the Stitch screen inventory is covered.

---

## 5. Design system

Tokens in `tailwind.config.ts` (from `design.md`): `brand-green #2A6A48`, `brand-turquoise
#04B6CA`, `brand-dark #123D2B`, `brand-mint #EEF8F4`, `brand-cream #FFF8EF`, `brand-gold #F4B740`,
`ink`, `muted`, `hairline`. Radius 8/14/20/28, soft shadows, Manrope, `container-page` (max 1280px).
Reusable component classes (`btn`, `card`, `field-*`, `badge`) live in `globals.css`.

The **real logo** (`public/logo/ahde-vefa-logo.jpeg`) is used in the public header/footer, admin
sidebar, admin login, 404, maintenance page, and site metadata/favicon.

**Imagery:** Instead of stock/AI photos (which risk feeling exploitative), all image areas use
`MediaImage` — a brand-gradient + Lucide icon placeholder keyed by topic (`kurban`, `su`, `gida`,
`pakistan`, …). Drop in verified, dignity-preserving field photos later by swapping `MediaImage`
for `next/image` where a real URL exists.

---

## 6. Mock data layer

`src/lib/mock-data.ts` holds illustrative demo arrays (campaigns, donations, donors, volunteers,
receipts, reports, news, gallery albums, messages, admin users, audit logs, notification templates,
kurban & ramazan records). Replace this single module with a real DB/API later — the typed shapes
in `lib/types.ts` are the contract.

Data-integrity rules enforced (verified by grep in QA):
- **No invented legal numbers, IBAN, bank details, real donation totals, statistics, real dates of
  events, donor/staff names, phone/email/address.** These render as `[Eklenecek]` (via
  `PLACEHOLDER`, `LEGAL`, `CONTACT`, `BANK` in `constants.ts`). Public campaign monetary
  target/collected are `null` → shown as `[Eklenecek]`.
- **Pakistan** is always `Hazırlık Aşamasında`: the Pakistan campaign/report/album/news carry the
  prep status, the region page and all Pakistan surfaces render `<PakistanNotice />`, no donation
  completion CTA is shown, and admin kurban/ramazan tables force Pakistan rows to prep status.
- Illustrative monetary values inside the **admin** demo (donation/donor amounts) are clearly demo
  admin data; dashboard "Toplam/Bugünkü Bağış" totals are `[Eklenecek]` (not fabricated).

---

## 7. Forms & validation

Client forms use `zod` schemas (`lib/validators.ts`) with `safeParse` + inline field errors via the
shared `Field` components: donation quick card, checkout, dekont, tracking, volunteer, corporate,
contact, kurban, admin login, and admin create/edit forms. On success they route to
`/form-basarili` or the relevant success/status page. No real submission is wired up.

- **No card data is stored** — the checkout card block is a clearly-labelled disabled DEMO with a
  "Kart bilgileri saklanmaz" note. Bank/EFT path routes to the dekont-waiting status.
- File uploads (dekont, media) are **UI-only** with a note that storage isn't connected.

---

## 8. Accessibility, SEO, responsiveness

- Semantic landmarks, labelled inputs (`<label htmlFor>`), aria-labels on icon-only buttons,
  visible focus rings (global `:focus-visible`), keyboard-accessible modals/lightbox (Escape/arrows).
- Turkish `metadata` on all server pages; Open Graph + logo; `robots` noindex on `/bakim` & 404.
- Mobile-first: public nav → hamburger; admin sidebar → drawer; tables → stacked cards (`DataTable`);
  filters → horizontal chips; modals → bottom sheets on mobile.

---

## 9. Integration placeholders (connect real services later)

`src/lib/integrations/*` expose typed stubs with TODOs and the env var each needs. See
`.env.example`:
- `payment.ts` — `PAYMENT_PROVIDER_API_KEY` (e.g. iyzico/PayTR/Stripe). Card tokenization only; never store raw card data.
- `email.ts` — `EMAIL_PROVIDER_API_KEY` (Resend/SendGrid/SES)
- `sms.ts` — `SMS_PROVIDER_API_KEY` (Netgsm/Twilio)
- `whatsapp.ts` — `WHATSAPP_PROVIDER_TOKEN` (WhatsApp Cloud API) + `whatsappLink` helper
- `storage.ts` — `STORAGE_BUCKET` (S3/R2/Supabase) for dekont & media uploads
- `analytics.ts` — privacy-friendly analytics
- `DATABASE_URL` — replace `lib/mock-data.ts` reads with DB queries

**No secrets are committed.** Admin settings API-key inputs are empty with a
"gizli anahtarlar repoda saklanmaz" warning.

---

## 10. Known limitations / next steps

1. **No backend/auth** — admin login is a demo redirect; add real authentication + route protection
   (middleware) before production. Add role/permission enforcement (UI matrix already present).
2. **Mock data is in-memory** — CRUD actions (create/edit/delete/status change) update local UI
   state only; wire to a database + API routes (`src/app/api/…`).
3. **Payments/email/SMS/WhatsApp/storage** are stubs — connect providers via §9.
4. **Legal/registry/bank/contact values** are intentionally `[Eklenecek]`; the project owner must
   supply Dernek Kütük No, Yardım Toplama İzin No, izin tarihleri, yetkili makam, IBAN, and contact
   details. Fill via `lib/constants.ts` (or the admin Ayarlar/Sayfa İçerikleri screens once backed).
5. **Field photos** — replace `MediaImage` placeholders with verified, dignity-preserving imagery.
6. **Search** is client-side over mock data; back with a real index later.
7. **Pakistan** must stay `Hazırlık Aşamasında` until the project owner provides real verified field
   data — the `<PakistanNotice />` guard and prep statuses encode this rule.

---

## 11. Screens merged / interpreted

- Desktop + mobile Stitch variants of each screen are implemented as a **single responsive page**
  (mobile-first Tailwind), not two files.
- The multi-variant Stitch folders (`ba_lar_y_netimi_*_1/_2`, `t_rkiye_faaliyetleri_*_1/_2`) are
  consolidated into one page each.
- Payment status screens (Başarısız / Beklemede / Dekont Bekleniyor) are one route `/bagis/durum`
  driven by a `?durum=` query param.
- Stitch's generated HTML included invented figures (e.g. fake donation totals/percentages); these
  were intentionally **not** copied — the design was rebuilt as clean React with `[Eklenecek]`
  placeholders per the content rules.
