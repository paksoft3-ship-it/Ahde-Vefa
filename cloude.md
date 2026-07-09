# Claude Code Master Prompt — AHDE VEFA İnsani Yardım Derneği Website + Admin Panel

You are Claude Code working as a senior full-stack product engineer, UI implementation specialist, and production-focused frontend architect. Your task is to complete the whole **AHDE VEFA İnsani Yardım Derneği** website and admin panel project based on the Stitch-generated screens, the design system, the logo assets, and the complete prompt pack already present in the project root.

This is not a quick prototype. Build a clean, maintainable, production-ready Next.js project that follows the provided visual design, page structure, Turkish UI copy, donation flows, admin workflows, and humanitarian NGO trust requirements.

---

## 1. Project Context

The project is for **AHDE VEFA İnsani Yardım Derneği**, a Turkish humanitarian aid association. The website must support public donation campaigns, transparent activity reporting, galleries, news/announcements, volunteer applications, corporate support, donation tracking, bank transfer receipt submission, and a full admin panel for managing campaigns, donations, donors, volunteers, reports, media, messages, settings, users, logs, notifications, exports, and profile settings.

The NGO’s known activity themes:

- Afrika yardımları
- Afganistan yardımları
- Türkiye yerel yardımlar
- Ramazan yardımları
- Kurban bağışı
- Gıda yardımı / kumanya
- Acil yardım fonu
- Gönüllülük
- Kurumsal destek
- Pakistan hazırlık çalışmaları

Important Pakistan rule:

**Pakistan must always be shown as “Hazırlık Aşamasında” or “Hazırlık Süreci”. Never show Pakistan as a completed field activity, completed distribution, completed report, or completed aid delivery unless real verified field data is later provided by the project owner.**

Important legal/data rule:

**Do not invent legal numbers, association registry numbers, help collection permit numbers, bank details, IBAN, real donation totals, statistics, donor names, dates, staff names, beneficiary stories, or completed activity data. Use `[Eklenecek]`, placeholder data, mock records, or clearly labeled demo content only.**

---

## 2. Files and Folders You Must Inspect First

The project root contains these important assets:

```txt
/
├── stitch_markdown_design_system/
│   ├── ...many Stitch-generated screen folders...
│   │   ├── screen.png
│   │   └── code.html / colde.html / similar generated HTML file
│   └── ...
├── logo/
│   └── ...AHDE VEFA logo assets...
├── design.md
├── ahde_vefa_all_stitch_prompts.md
└── cloude.md   ← this file
```

Before coding, do this:

1. Inspect `design.md` carefully.
2. Inspect `ahde_vefa_all_stitch_prompts.md` carefully.
3. Inspect the full `stitch_markdown_design_system/` directory.
4. For each Stitch screen folder:
   - open `screen.png` and use it as the **visual source of truth**;
   - open `code.html`, `colde.html`, or any generated HTML file as a **layout/reference source**, not as final production code;
   - identify the intended page/screen name;
   - map it to a Next.js route and component structure.
5. Inspect the `logo/` folder and use the real logo assets instead of recreating the logo.

Create or update a developer note file such as:

```txt
IMPLEMENTATION_NOTES.md
```

In that file, record:

- discovered Stitch screens;
- route mapping;
- assumptions;
- missing data placeholders;
- any screens that appear duplicated or need merging;
- any parts intentionally implemented with mock data.

Do not skip this discovery step.

---

## 3. Expected Tech Stack

Use this stack unless the existing project already uses a clearly different modern stack:

- **Next.js App Router**
- **TypeScript**
- **Tailwind CSS**
- **React server/client components where appropriate**
- **Lucide React** for icons, if available or installable
- **Radix UI / shadcn-style primitives** only if they fit the existing project setup
- **Zod + React Hook Form** for important forms if practical
- **No unnecessary heavy dependencies**

If the project is not initialized yet, initialize a clean Next.js app in the current root without destroying existing assets.

Recommended commands only if needed:

```bash
npm install
npm install lucide-react clsx tailwind-merge
npm install react-hook-form zod @hookform/resolvers
```

Use the package manager already present in the repo if `package-lock.json`, `pnpm-lock.yaml`, or `yarn.lock` exists.

---

## 4. Core Visual Identity

Use the visual identity from `design.md`. The expected color system is:

```txt
Primary Green:    #2A6A48
Action Turquoise: #04B6CA / #05B7CA
Dark Green:       #123D2B
Soft Mint:        #EEF8F4
Warm Cream:       #FFF8EF
Donation Gold:    #F4B740
Dark Text:        #1F2933
Muted Text:       #667085
Light Border:     #E5E7EB
White:            #FFFFFF
```

Style requirements:

- modern Turkish NGO identity;
- trustworthy, calm, humanitarian, transparent;
- soft rounded cards;
- clean sections;
- generous whitespace;
- responsive mobile-first layout;
- respectful humanitarian imagery;
- no poverty-exploitation visuals;
- no aggressive disaster imagery;
- no fake legal/statistical content;
- no overly corporate cold design;
- no black/yellow emergency-style look.

Use the actual logo from the `logo/` folder in header, footer, admin login, admin sidebar, maintenance page, and favicon/app metadata if suitable.

---

## 5. Language and Content Rules

All user-facing UI text must be **Turkish**.

Use concise, natural Turkish. Avoid awkward machine-like wording.

Use placeholders where information is missing:

```txt
[Eklenecek]
[Otomatik oluşturulacak]
[Dernek tarafından tamamlanacaktır]
```

Never invent:

- Dernek Kütük No
- Yardım Toplama İzin No
- İzin tarihleri
- Yetkili makam
- IBAN
- bank name
- payment references
- real donor records
- real campaign totals
- real number of families reached
- real reports
- real dates
- real staff names
- real beneficiary stories
- completed Pakistan activity

Pakistan content must use labels such as:

```txt
Hazırlık Aşamasında
Hazırlık Süreci
Pakistan Hazırlık Çalışmaları
```

---

## 6. Main Build Goal

Build a complete website and admin panel that matches all Stitch screens and prompt requirements.

The final project should include:

- public website routes;
- donation flow routes;
- activity/campaign/report/news/gallery routes;
- form flows and success states;
- static/legal/FAQ/search/error/maintenance pages;
- admin authentication screen;
- full admin dashboard routes;
- CRUD-style admin screens using mock data and clean UI;
- reusable component system;
- mock data layer that can later be replaced with a database/API;
- clean responsive behavior;
- lint/type/build passing.

If backend credentials, payment gateway keys, database URLs, SMS/WhatsApp integrations, or email provider credentials are not available, implement clean mock/adaptor layers and document where real integrations should be connected later.

---

## 7. Recommended Project Structure

Adapt to the existing project if it already has a structure. Otherwise create something close to this:

```txt
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── bagis/
│   │   ├── kampanyalar/
│   │   ├── faaliyetler/
│   │   ├── raporlar/
│   │   ├── haberler/
│   │   ├── galeri/
│   │   ├── hakkimizda/
│   │   ├── gonullu-ol/
│   │   ├── kurumsal-destek/
│   │   ├── iletisim/
│   │   ├── sss/
│   │   ├── yasal/
│   │   ├── arama/
│   │   ├── bagis-takip/
│   │   ├── dekont-bildir/
│   │   └── ...
│   ├── admin/
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── bagislar/
│   │   ├── kampanyalar/
│   │   ├── kurban-takibi/
│   │   ├── ramazan-yardimlari/
│   │   ├── bagiscilar/
│   │   ├── gonulluler/
│   │   ├── dekont-bildirimleri/
│   │   ├── raporlar/
│   │   ├── medya/
│   │   ├── mesajlar/
│   │   ├── sayfa-icerikleri/
│   │   ├── ayarlar/
│   │   ├── kullanicilar/
│   │   ├── islem-kayitlari/
│   │   └── profil/
│   ├── api/
│   │   └── ...mock API handlers if needed...
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── maintenance/page.tsx
├── components/
│   ├── public/
│   ├── admin/
│   ├── forms/
│   ├── ui/
│   └── layout/
├── lib/
│   ├── constants.ts
│   ├── routes.ts
│   ├── mock-data.ts
│   ├── types.ts
│   ├── utils.ts
│   ├── validators.ts
│   └── integrations/
├── styles/
└── assets/ or public/
```

Use `public/` for images copied from the `logo/` folder and safe static assets.

---

## 8. Public Website Routes to Implement

Implement routes based on the screens and prompts. Use route names in Turkish slugs.

### Core Public Pages

```txt
/                                      Anasayfa
/bagis                                 Bağış Yap / Kampanya Listesi
/bagis/[slug]                          Kampanya Detay / Bağış Detay
/bagis/odeme                           Bağış Ödeme / Checkout
/bagis/basarili                        Bağış Başarılı
/bagis/durum                           Ödeme Başarısız / Beklemede / Dekont Bekleniyor
/bagis-takip                           Bağış Takip
/dekont-bildir                         Dekont Bildir
```

### Campaign / Activity Pages

```txt
/kurban                                Kurban Bağışı
/ramazan                               Ramazan Yardımları
/faaliyetler                           Faaliyetler / Projeler Genel
/faaliyetler/afrika                    Afrika Faaliyetleri
/faaliyetler/afganistan                Afganistan Faaliyetleri
/faaliyetler/pakistan                  Pakistan Hazırlık Çalışmaları
/faaliyetler/turkiye                   Türkiye Faaliyetleri / Yerel Yardımlar
/faaliyetler/gida-yardimi              Gıda Yardımı / Kumanya Bağışı
/faaliyetler/acil-yardim               Acil Yardım Fonu
/kurumsal-destek                       Kurumsal Destek / İş Birliği
```

### Reports / News / Gallery

```txt
/raporlar                              Şeffaflık ve Raporlar
/raporlar/[slug]                       Rapor Detay
/haberler                              Sahadan Haberler / Duyurular
/haberler/[slug]                       Haber Detay / Duyuru Detay
/galeri                                Galeri / Saha Fotoğrafları
/galeri/[slug]                         Galeri Albüm Detay
```

### Information / Support Pages

```txt
/hakkimizda                            Hakkımızda
/gonullu-ol                            Gönüllü Ol
/iletisim                              İletişim
/sss                                   SSS / Yardım Merkezi
/yasal                                 Yasal Metinler / KVKK ve Bağış Bilgilendirme
/arama                                 Arama Sonuçları
/form-basarili                         Form Submission Success / Başvuru Alındı
```

### Error / System Pages

```txt
/not-found or app/not-found.tsx        404 / Sayfa Bulunamadı
/bakim                                 Bakım Modu / Site Bakımda
```

Use `app/not-found.tsx` for the real Next.js not-found page.

---

## 9. Admin Panel Routes to Implement

Use consistent admin layout with dark green sidebar, topbar, cards, tables, filters, modals/drawers, and status badges.

```txt
/admin/login                           Admin Login
/admin/dashboard                       Admin Dashboard
/admin/kampanyalar                     Campaign Management
/admin/kampanyalar/yeni                Campaign Create
/admin/kampanyalar/[id]/duzenle        Campaign Edit
/admin/bagislar                        Donations Management
/admin/bagislar/[id]                   Donation Detail
/admin/bagiscilar                      Donor Management
/admin/kurban-takibi                   Kurban Tracking
/admin/ramazan-yardimlari              Ramazan Aid Management
/admin/gonulluler                      Volunteer Applications
/admin/dekont-bildirimleri             Receipt Verification
/admin/raporlar                        Reports Management
/admin/raporlar/yeni                   Report Create
/admin/raporlar/[id]/duzenle           Report Edit
/admin/medya                           Gallery / Media Management
/admin/mesajlar                        Messages Management
/admin/mesajlar/[id]                   Message Detail / Support Ticket Detail
/admin/sayfa-icerikleri                Page Content Management
/admin/ayarlar                         Admin Settings / Payment, Bank, Legal Settings
/admin/ayarlar/bildirim-sablonlari     Notification Templates
/admin/ayarlar/yedekleme               Backup / Export Center
/admin/kullanicilar                    Users / Roles & Permissions
/admin/islem-kayitlari                 Audit Logs
/admin/profil                          Profile / Account Settings
```

If the existing folder conventions differ, keep the same logical route coverage.

---

## 10. Reusable Public Components

Create reusable components instead of duplicating markup.

Recommended public components:

```txt
PublicHeader
PublicFooter
TopAnnouncementBar
HeroSection
PageHero
Breadcrumb
TrustBadge
SectionHeading
DonationQuickCard
CampaignCard
ActivityCard
RegionCard
ReportCard
NewsCard
GalleryCard
AlbumCard
FAQAccordion
CTASection
LegalInfoCard
TransparencyCard
StepTimeline
AmountSelector
StatusBadge
SearchFilters
EmptyState
LoadingState
ContactSupportCard
```

The public header must include:

```txt
Anasayfa
Bağış Yap
Kurban
Ramazan
Faaliyetler
Raporlar
Hakkımızda
İletişim
```

Right side buttons:

```txt
Bilgi Al
Bağış Yap
```

Public footer must include:

- logo;
- short association description;
- quick links;
- donation links;
- activity links;
- contact placeholders;
- legal placeholders;
- Dernek Kütük No: `[Eklenecek]`;
- Yardım Toplama İzin No: `[Eklenecek]`;
- KVKK / Bağış Bilgilendirme / Yasal links.

---

## 11. Reusable Admin Components

Recommended admin components:

```txt
AdminLayout
AdminSidebar
AdminTopbar
AdminPageHeader
AdminBreadcrumb
AdminStatCard
AdminDataTable
AdminFilterBar
AdminStatusBadge
AdminActionMenu
AdminDrawer
AdminModal
AdminFormCard
AdminSectionCard
AdminTimeline
AdminNotesPanel
AdminFileList
AdminPreviewPanel
AdminValidationChecklist
AdminEmptyState
AdminErrorState
AdminConfirmModal
```

Admin sidebar menu:

```txt
Genel Bakış
Bağışlar
Kampanyalar
Kurban Takibi
Ramazan Yardımları
Bağışçılar
Gönüllüler
Dekont Bildirimleri
Raporlar
Galeri / Medya
Mesajlar
Sayfa İçerikleri
Ayarlar
Kullanıcılar
İşlem Kayıtları
Çıkış Yap
```

Admin visual style:

- dark green sidebar;
- white cards;
- soft mint admin background;
- turquoise action buttons;
- clean tables;
- compact filters;
- clear badges;
- modals/drawers for actions;
- mobile stacked cards.

---

## 12. Mock Data Layer

Create a strong mock data layer now so pages work without backend.

Recommended file:

```txt
src/lib/mock-data.ts
```

Recommended TypeScript types:

```ts
type CampaignStatus = 'Aktif' | 'Taslak' | 'Hazırlık Aşamasında' | 'Tamamlandı' | 'Arşiv';
type Region = 'Genel' | 'Afrika' | 'Afganistan' | 'Türkiye' | 'Pakistan' | 'Çoklu Bölge';
type DonationStatus = 'Onaylandı' | 'Beklemede' | 'Dekont Bekliyor' | 'İncelemede' | 'Başarısız' | 'İptal Edildi';
type PaymentMethod = 'Online Kart' | 'Banka Havalesi / EFT' | 'Manuel Kayıt';
```

Create mock arrays for:

- campaigns;
- donations;
- donors;
- volunteers;
- receipts/dekonts;
- reports;
- news;
- gallery albums;
- messages;
- users;
- audit logs;
- notification templates.

Important mock-data rule:

Mock data may be illustrative but must not pretend to be real. Prefer placeholder values and labels such as `[Eklenecek]`. For any Pakistan record, status must be `Hazırlık Aşamasında` or `Hazırlık Süreci`.

---

## 13. Forms and Validation

Implement form UI and validation for:

- donation form;
- checkout form;
- bank transfer receipt/dekont submission;
- donation tracking form;
- volunteer application;
- corporate support form;
- contact form;
- newsletter signup;
- admin campaign create/edit;
- admin report create/edit;
- admin message reply;
- admin notification template editor;
- admin profile settings.

Forms do not need real backend submission unless already configured. Use clean client-side state, validation, and redirect to `/form-basarili` or relevant success page.

For file uploads, create UI only or mock upload states unless storage backend exists.

Do not store real sensitive data in local mock files.

---

## 14. Donation Flow Requirements

Donation flow must include:

1. campaign selection;
2. donation type;
3. amount selector;
4. donor details;
5. payment method selection;
6. bank transfer/dekont option;
7. donation summary;
8. success page;
9. failed/pending/dekont waiting status page;
10. donation tracking page.

No real payment gateway should be implemented unless credentials/instructions exist.

Create a clean payment adapter placeholder:

```txt
src/lib/integrations/payment.ts
```

It should expose mock functions or TODO comments for future payment provider integration.

Card information must never be stored.

---

## 15. Legal and Trust Requirements

Throughout the site, include placeholders for:

```txt
Dernek Kütük No: [Eklenecek]
Yardım Toplama İzin No: [Eklenecek]
İzin Tarihleri: [Eklenecek]
Yetkili Makam: [Eklenecek]
```

Use these in:

- footer;
- donation pages;
- transparency/report pages;
- legal page;
- admin settings;
- campaign create/edit;
- report create/edit.

Do not fabricate legal content. Legal pages should use structured placeholder text and sections, not final legal claims.

---

## 16. Accessibility Requirements

Implement:

- semantic HTML;
- correct heading order;
- alt text for images/logo;
- visible focus states;
- keyboard-friendly buttons/links;
- aria labels for icon-only buttons;
- sufficient color contrast;
- form labels tied to inputs;
- responsive layouts;
- modals/drawers that can be closed and are keyboard accessible where practical.

---

## 17. SEO and Metadata

Add metadata for important pages.

Use Turkish titles/descriptions.

Example:

```txt
AHDE VEFA İnsani Yardım Derneği | Bağış ve Yardım Kampanyaları
```

Add open graph metadata using real logo or placeholder image if available.

Do not add unverified claims in metadata.

---

## 18. Responsive Requirements

Every page must work well on:

- mobile 360px+
- tablet
- desktop
- wide desktop

Mobile rules:

- public nav becomes hamburger or mobile menu;
- admin sidebar collapses or becomes drawer;
- tables become card lists;
- filters become horizontal chips or drawers;
- sticky main CTA for donation pages where appropriate;
- modals become full-screen drawers on small screens;
- text remains readable and not crowded.

---

## 19. Implementation Process You Should Follow

Follow this exact process:

### Phase 1 — Discovery

- Inspect `design.md`.
- Inspect `ahde_vefa_all_stitch_prompts.md`.
- Inspect `stitch_markdown_design_system/`.
- Inspect `logo/`.
- Create/update `IMPLEMENTATION_NOTES.md` with screen inventory and route mapping.

### Phase 2 — Project Setup

- Check existing package setup.
- Install missing dependencies only if needed.
- Configure Tailwind theme tokens using the design system colors.
- Copy/use logo assets in `public/` if needed.
- Create route constants and type definitions.

### Phase 3 — Component System

- Build core UI components.
- Build public layout components.
- Build admin layout components.
- Build status badges, cards, tables, forms, timeline, modals, drawers.

### Phase 4 — Public Pages

- Implement public pages route by route.
- Match Stitch visual direction using `screen.png` as source of truth.
- Use `code.html` as helpful reference, but rewrite as clean React/TypeScript components.
- Use mock data.
- Ensure Pakistan content is preparation-only.

### Phase 5 — Admin Pages

- Implement admin layout.
- Implement admin login.
- Implement admin dashboard and data-management screens.
- Implement create/edit forms.
- Implement detail pages.
- Implement modals/drawers and action states.
- Use mock data and local UI state.

### Phase 6 — QA and Polish

- Run lint/typecheck/build.
- Fix all errors.
- Verify responsiveness.
- Verify no hardcoded fake legal numbers or fake statistics.
- Verify Pakistan is never shown as completed.
- Verify logo and colors are consistent.
- Verify forms have labels and validation.
- Verify no console errors.

### Phase 7 — Final Notes

Update `IMPLEMENTATION_NOTES.md` with:

- completed routes;
- known limitations;
- future integration points;
- how to run the project;
- what remains to connect to backend/payment/email/WhatsApp.

---

## 20. Detailed Page Checklist

Use this checklist to make sure all requested screens are covered.

### Public Website

- [ ] Anasayfa
- [ ] Bağış Yap / campaign listing
- [ ] Campaign detail / donation detail
- [ ] Donation checkout
- [ ] Donation success
- [ ] Donation failed/pending/dekont waiting
- [ ] Donation tracking
- [ ] Dekont bildir
- [ ] Kurban bağışı
- [ ] Ramazan yardımları
- [ ] Afrika faaliyetleri
- [ ] Afganistan faaliyetleri
- [ ] Pakistan hazırlık faaliyetleri
- [ ] Türkiye faaliyetleri / yerel yardımlar
- [ ] Gıda yardımı / kumanya
- [ ] Acil yardım fonu
- [ ] Kurumsal destek / iş birliği
- [ ] Faaliyetler / projeler genel
- [ ] Şeffaflık ve raporlar
- [ ] Rapor detay
- [ ] Sahadan haberler / duyurular
- [ ] Haber detay / duyuru detay
- [ ] Galeri
- [ ] Galeri albüm detay
- [ ] Hakkımızda
- [ ] Gönüllü ol
- [ ] İletişim
- [ ] SSS / yardım merkezi
- [ ] Yasal metinler / KVKK / bağış bilgilendirme
- [ ] Arama sonuçları
- [ ] Form success / başvuru alındı
- [ ] 404 / not found
- [ ] Bakım modu

### Admin Panel

- [ ] Admin login
- [ ] Admin dashboard
- [ ] Campaign management
- [ ] Campaign create/edit
- [ ] Donations management
- [ ] Donation detail
- [ ] Donor management
- [ ] Kurban tracking
- [ ] Ramazan aid management
- [ ] Volunteer applications
- [ ] Receipt/dekont verification
- [ ] Reports management
- [ ] Report create/edit
- [ ] Gallery/media management
- [ ] Messages management
- [ ] Message/support ticket detail
- [ ] Page content management
- [ ] Settings / payment-bank-legal
- [ ] Users / roles & permissions
- [ ] Audit logs
- [ ] Notification templates
- [ ] Backup/export center
- [ ] Admin profile/account settings

---

## 21. Page-Specific Implementation Notes

### Homepage

Must feel donation-focused, trustworthy, and humanitarian. Include:

- hero with donation CTA;
- active campaigns;
- regions;
- quick donation card;
- transparency/report CTA;
- gallery/news highlights;
- volunteer/corporate support; 
- legal placeholders.

### Donation Listing

Include filters, campaign cards, quick amount options, region/type filtering, and clear CTA.

### Campaign Detail

Include hero, donation card, campaign details, progress placeholder, reports, gallery, FAQ, legal info placeholders.

### Donation Checkout

Include donor information, donation summary, payment method, bank transfer/dekont path, KVKK checkbox, and secure UI. Do not implement real payment storage.

### Kurban

Include vekalet and kurban sahibi fields, hisse logic UI, process steps, reporting, and dignity-sensitive visuals. Do not show graphic animal imagery.

### Ramazan

Include iftar/kumanya/fitre/fidye/zekat UI placeholders, but do not invent religious rulings or fixed prices.

### Pakistan

Every Pakistan page/card/report/news/gallery/template/admin record must clearly show `Hazırlık Aşamasında` or `Hazırlık Süreci`.

### Gallery

Respect privacy. No exploitative visuals. Lightbox with captions and related campaign/report links.

### Legal

Use structured sections and placeholders. Do not write final legal text.

### Admin

Admin pages must prioritize operational clarity, status management, filters, tables, actions, internal notes, timeline, audit logs, and secure data handling.

---

## 22. Integration Placeholders to Prepare

Create clean integration stubs or TODOs for future work:

```txt
src/lib/integrations/payment.ts
src/lib/integrations/email.ts
src/lib/integrations/sms.ts
src/lib/integrations/whatsapp.ts
src/lib/integrations/storage.ts
src/lib/integrations/analytics.ts
```

Each should explain what credentials are needed later.

Do not connect random third-party services without explicit project owner instruction.

---

## 23. Security and Privacy Notes

Admin panel should visually and structurally respect sensitive data.

Include:

- privacy warnings for donor data;
- KVKK notes;
- confirmation modals for sensitive actions;
- audit log UI;
- role/permission UI;
- export security warnings;
- no real credential exposure;
- no hardcoded secret keys.

Use `.env.example` if environment variables are needed:

```txt
NEXT_PUBLIC_SITE_URL=
PAYMENT_PROVIDER_API_KEY=
EMAIL_PROVIDER_API_KEY=
SMS_PROVIDER_API_KEY=
WHATSAPP_PROVIDER_TOKEN=
DATABASE_URL=
STORAGE_BUCKET=
```

Never place real secrets in the repo.

---

## 24. Quality Bar

The completed app should:

- look visually consistent with the Stitch screens;
- use the AHDE VEFA design system;
- use real logo assets;
- be fully Turkish;
- be responsive;
- pass TypeScript checks;
- pass build;
- avoid duplicated messy code;
- use reusable components;
- have clean mock data;
- avoid fake official information;
- keep Pakistan as preparation-stage;
- include all major public and admin routes;
- be ready for backend/payment integration later.

---

## 25. Commands to Run Before Finishing

Run the appropriate commands based on the repo package manager:

```bash
npm run lint
npm run typecheck
npm run build
```

If `typecheck` script does not exist, run:

```bash
npx tsc --noEmit
```

If lint/build fails, fix the errors. Do not leave the project broken.

---

## 26. Final Deliverables

When finished, provide a concise summary in `IMPLEMENTATION_NOTES.md` and in your final response containing:

- routes implemented;
- components created;
- mock data layer details;
- integration placeholders;
- known limitations;
- how to run locally;
- any screens that were merged or interpreted;
- next steps for real backend/payment/email/WhatsApp integration.

---

## 27. Non-Negotiable Rules

1. Use Turkish UI text only.
2. Use the provided design files and Stitch screens.
3. Use the real logo assets from the `logo/` folder.
4. Do not invent legal numbers.
5. Do not invent IBAN or bank details.
6. Do not invent real donation totals or statistics.
7. Do not invent real reports or dates.
8. Do not invent staff names or beneficiary stories.
9. Do not show Pakistan as completed activity.
10. Do not use exploitative poverty imagery.
11. Do not store real payment card data.
12. Do not hardcode secrets.
13. Keep code clean, typed, reusable, and production-oriented.
14. Run build checks before finishing.
15. Document assumptions and future integration steps.

---

## 28. Start Now

Begin by inspecting:

```bash
ls
find stitch_markdown_design_system -maxdepth 3 -type f | head -100
ls logo
cat design.md
cat ahde_vefa_all_stitch_prompts.md
```

Then create `IMPLEMENTATION_NOTES.md`, map screens to routes, and start implementation phase by phase.

