---
name: Humanitarian Aid & Trust
colors:
  surface: '#f7f9ff'
  surface-dim: '#d1dbe8'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#edf4ff'
  surface-container: '#e4effd'
  surface-container-high: '#dfe9f7'
  surface-container-highest: '#d9e3f1'
  on-surface: '#121d26'
  on-surface-variant: '#404942'
  inverse-surface: '#27313c'
  inverse-on-surface: '#e8f2ff'
  outline: '#707971'
  outline-variant: '#bfc9c0'
  surface-tint: '#2a6a48'
  primary: '#0a5132'
  on-primary: '#ffffff'
  primary-container: '#2a6a48'
  on-primary-container: '#a5e7bd'
  inverse-primary: '#93d5ab'
  secondary: '#006874'
  on-secondary: '#ffffff'
  secondary-container: '#61e9fe'
  on-secondary-container: '#006773'
  tertiary: '#254f3c'
  on-tertiary: '#ffffff'
  tertiary-container: '#3d6752'
  on-tertiary-container: '#b6e3c9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#aef1c6'
  primary-fixed-dim: '#93d5ab'
  on-primary-fixed: '#002111'
  on-primary-fixed-variant: '#0a5132'
  secondary-fixed: '#9af0ff'
  secondary-fixed-dim: '#4cd8ec'
  on-secondary-fixed: '#001f24'
  on-secondary-fixed-variant: '#004f58'
  tertiary-fixed: '#bfedd3'
  tertiary-fixed-dim: '#a4d1b7'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#254f3b'
  background: '#f7f9ff'
  on-background: '#121d26'
  surface-variant: '#d9e3f1'
  soft-mint: '#EEF8F4'
  warm-cream: '#FFF8EF'
  donation-gold: '#F4B740'
  muted-text: '#667085'
  light-border: '#E5E7EB'
typography:
  hero-heading:
    fontFamily: Manrope
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.2'
  hero-heading-mobile:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
  page-heading:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.2'
  page-heading-mobile:
    fontFamily: Manrope
    fontSize: 34px
    fontWeight: '800'
    lineHeight: '1.2'
  section-heading:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.3'
  section-heading-mobile:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.3'
  card-title:
    fontFamily: Manrope
    fontSize: 22px
    fontWeight: '700'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.6'
  body:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
  button:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2.5rem
  2xl: 4rem
  3xl: 6rem
---

# AHDE VEFA İnsani Yardım Derneği — Website Design System

## 1. Project Overview

Design a modern, trustworthy, donation-focused website for **AHDE VEFA İnsani Yardım Derneği**, a Turkish humanitarian NGO working on aid campaigns such as Kurban, Ramazan aid, food packages, emergency help, and international field work in regions such as Africa, Afghanistan, and the planned Pakistan operation.

The website must feel:

- Trustworthy
- Transparent
- Humanitarian
- Islamic-sensitive without being visually heavy
- Clean and modern
- Mobile-first
- Easy for donors to understand and donate

The design should support both public visitors and internal admin users.

---

## 2. Brand Identity

The existing logo contains:

- A turquoise helping hand
- Green leaves representing growth, life, care, and hope
- Bold green typography
- White background
- Minimal black divider lines

The website should visually extend the logo identity. The brand should not feel like a generic charity template. It should feel like a real Turkish NGO with international humanitarian field work.

### Brand Keywords

- Emanet
- Vefa
- İyilik
- Yardım
- Güven
- Şeffaflık
- Merhamet
- Umut
- Bereket
- Saha çalışması

---

## 3. Color System

Use colors inspired by the logo.

### Primary Colors

| Token | Hex | Usage |
|---|---:|---|
| Primary Green | `#2A6A48` | Main brand color, headings, nav active states, trust blocks |
| Action Turquoise | `#04B6CA` | Donation CTAs, highlights, selected states, icons |
| Dark Green | `#123D2B` | Footer, strong headings, dark sections |
| Soft Mint | `#EEF8F4` | Light background sections, trust areas |
| Warm Cream | `#FFF8EF` | Emotional campaign sections, Ramazan/Kurban areas |
| Donation Gold | `#F4B740` | Urgent campaign highlights, progress accents, badges |
| Dark Text | `#1F2933` | Body text and main readable text |
| Muted Text | `#667085` | Descriptions, metadata, helper text |
| Light Border | `#E5E7EB` | Cards, forms, dividers |
| Pure White | `#FFFFFF` | Main page background and card backgrounds |

### Color Usage Rules

1. Use **Primary Green** for serious, trustworthy content.
2. Use **Action Turquoise** for buttons related to donations or important actions.
3. Use **Dark Green** for the footer, donation trust sections, and deep contrast areas.
4. Use **Warm Cream** for Kurban, Ramazan, and emotional campaign sections.
5. Use **Soft Mint** for calm informational blocks.
6. Use **Donation Gold** carefully, only for attention, urgency, or campaign highlights.
7. Avoid using too much bright turquoise in large backgrounds; keep it for actions and highlights.

### CSS Variables

```css
:root {
  --color-primary-green: #2A6A48;
  --color-action-turquoise: #04B6CA;
  --color-dark-green: #123D2B;
  --color-soft-mint: #EEF8F4;
  --color-warm-cream: #FFF8EF;
  --color-donation-gold: #F4B740;
  --color-text-dark: #1F2933;
  --color-text-muted: #667085;
  --color-border-light: #E5E7EB;
  --color-white: #FFFFFF;
}
```

---

## 4. Typography

Use a clean modern sans-serif suitable for Turkish text.

Recommended fonts:

- **Inter**
- **Manrope**
- **Nunito Sans**

If the design tool does not support custom fonts, use a clean default sans-serif.

### Typography Scale

| Style | Size | Weight | Usage |
|---|---:|---:|---|
| Hero Heading | 52–64 px desktop / 34–40 px mobile | 800 | Main homepage headline |
| Page Heading | 40–48 px desktop / 30–34 px mobile | 800 | Inner page titles |
| Section Heading | 30–36 px desktop / 26–30 px mobile | 700 | Section titles |
| Card Title | 20–24 px | 700 | Campaign and report cards |
| Body Large | 18 px | 400–500 | Hero subtext and intro text |
| Body | 16 px | 400 | Normal paragraphs |
| Small Text | 14 px | 400–500 | Metadata, labels, helper text |
| Button Text | 15–16 px | 700 | CTA buttons |

### Typography Tone

Use sincere Turkish copy. Avoid exaggerated sales language. The tone should feel respectful and reliable.

Example phrases:

- “Emanetlerinizi ihtiyaç sahiplerine ulaştırıyoruz.”
- “Bağışınız sahada gerçek bir iyiliğe dönüşür.”
- “Şeffaf, izlenebilir ve güvenilir yardım süreci.”
- “Bir sofraya bereket, bir aileye umut olun.”

---

## 5. Layout System

### Container

- Desktop max width: `1200px` or `1280px`
- Tablet: flexible width with 32 px side padding
- Mobile: 20 px side padding

### Spacing

Use generous whitespace. NGO websites need trust and clarity, not crowded visuals.

| Token | Value | Usage |
|---|---:|---|
| xs | 4 px | Small gaps |
| sm | 8 px | Icon/text spacing |
| md | 16 px | Form and card spacing |
| lg | 24 px | Section inner spacing |
| xl | 40 px | Card groups and large gaps |
| 2xl | 64 px | Section spacing |
| 3xl | 96 px | Major page sections |

### Grid

- Desktop: 12-column grid
- Tablet: 6-column grid
- Mobile: 1-column layout

### Border Radius

| Token | Value | Usage |
|---|---:|---|
| Small | 8 px | Form inputs, labels |
| Medium | 14 px | Buttons and compact cards |
| Large | 20 px | Campaign cards, donation boxes |
| Extra Large | 28 px | Hero cards and major panels |
| Full | 999 px | Pills, badges, rounded CTAs |

### Shadows

Keep shadows soft and realistic.

- Card shadow: subtle, low opacity
- Donation box shadow: slightly stronger
- Avoid heavy dark shadows

---

## 6. Header and Navigation

### Desktop Header

Header must be clean and sticky or semi-sticky.

Left:

- Logo

Center navigation:

- Anasayfa
- Bağış Yap
- Kurban
- Ramazan
- Faaliyetler
- Raporlar
- Hakkımızda
- İletişim

Right:

- WhatsApp button
- Primary “Bağış Yap” button

### Mobile Header

- Logo left
- Donation button visible if space allows
- Hamburger menu right
- Mobile menu should include the main navigation and quick donation CTA

### Header Style

- White background
- Bottom border `#E5E7EB`
- Active page in Primary Green
- Donation button in Action Turquoise

---

## 7. Button System

### Primary Donation Button

Use for strongest action.

- Background: `#04B6CA`
- Text: white
- Radius: 999 px or 14 px depending on context
- Hover: slightly darker turquoise
- Text: “Bağış Yap”, “Hemen Bağış Yap”, “Bağışı Tamamla”

### Secondary Button

Use for exploration.

- Background: white
- Border: `#2A6A48`
- Text: `#2A6A48`
- Text examples: “Faaliyetleri İncele”, “Raporları Gör”, “Detayları İncele”

### Dark Section Button

For footer or dark green sections.

- Background: white
- Text: `#123D2B`

### WhatsApp Button

- Background: Soft Mint or light green
- Text: Primary Green
- Icon: WhatsApp icon
- Text: “WhatsApp” or “Bilgi Al”

---

## 8. Card Components

### Campaign Card

Each campaign card should include:

- Image area
- Campaign category badge
- Title
- Short description
- Optional country/region
- Optional progress bar
- Target and collected amount if available
- Primary CTA: “Bağış Yap”
- Secondary link: “Detayları Gör”

Campaign card examples:

- Kurban Bağışı
- Ramazan İftar Sofrası
- Afrika Gıda Yardımı
- Afganistan Yardımları
- Pakistan Hazırlık Çalışmaları
- Genel Bağış

### Impact Stat Card

Use for measurable results.

Examples:

- “Ulaşılan Aile”
- “Dağıtılan İftar”
- “Kesilen Kurban”
- “Faaliyet Bölgesi”

Design:

- Large number
- Short label
- Small icon
- Soft Mint or white background

### Report Card

Each report card should include:

- Thumbnail image
- Date
- Country/region
- Category
- Title
- Button: “Raporu İncele”

### Trust Card

Use these to reduce donation hesitation.

Examples:

- “Resmi Dernek Bilgileri”
- “Saha Fotoğrafları”
- “Faaliyet Raporları”
- “Bağış Bilgilendirmesi”

---

## 9. Donation UI System

Donation flow must be extremely clear and mobile-friendly.

### Quick Donation Box

Fields:

1. Campaign selection
2. Amount selection
3. Custom amount
4. Donor type: Bireysel / Kurumsal
5. Continue button

Example campaign options:

- Genel Bağış
- Kurban Bağışı
- Ramazan İftarı
- Gıda Kumanyası
- Afrika Yardımları
- Afganistan Yardımları
- Pakistan Çalışmaları

Amount buttons:

- 250 TL
- 500 TL
- 1000 TL
- 2500 TL
- Diğer

### Donation Checkout Steps

Use step indicator:

1. Bağış Bilgileri
2. Bağışçı Bilgileri
3. Ödeme
4. Tamamlandı

### Donation Form Fields

- Campaign
- Amount
- Name surname
- Phone
- Email
- Country/city if needed
- Note/message
- KVKK consent
- Donation information consent

### Payment Methods

Support design for:

- Credit/debit card
- Bank transfer/EFT
- International transfer if needed later

### Donation Success Page

Should show:

- Thank you message
- Donation reference number
- Campaign name
- Amount
- Next steps
- WhatsApp contact
- Share button

Example text:

“Bağışınız için teşekkür ederiz. Emanetiniz ihtiyaç sahiplerine ulaştırılmak üzere kayıt altına alınmıştır.”

---

## 10. Kurban Donation Design Rules

Kurban page should be emotionally strong and also legally/religiously clear.

Possible options:

- Vacip Kurban
- Adak Kurbanı
- Akika Kurbanı
- Şükür Kurbanı
- Nafile Kurban

Fields:

- Kurban type
- Country/region
- Number of shares
- Name for vekalet
- Phone
- Email
- Notes
- Vekalet approval checkbox

Important sections:

- “Kurban bağışı nasıl yapılır?”
- “Vekalet süreci”
- “Kesim ve dağıtım bilgilendirmesi”
- “Saha görüntüleri ve raporlama”

Visual style:

- Warm Cream background
- Green headings
- Gold highlights
- Clear step-by-step explanation

---

## 11. Ramazan Campaign Design Rules

Ramazan pages should feel warm, peaceful, and generous.

Campaign types:

- İftar Bağışı
- Gıda Kumanyası
- Fitre/Fidye/Zekat only if approved by the organization

Sections:

- Hero with Ramazan atmosphere
- Donation amount examples
- “Bir sofraya bereket olun” message
- Countries/regions
- Field photos
- Report cards

Colors:

- Warm Cream
- Primary Green
- Donation Gold
- Soft Mint

---

## 12. Country / Region Pages

Create templates for:

- Afrika
- Afganistan
- Pakistan
- Türkiye

Each region page should include:

1. Hero with country/region image
2. Short explanation of needs
3. Active campaigns in that region
4. Field reports
5. Impact statistics
6. Photo gallery
7. Donation CTA

Pakistan page can be designed as “Yakında / Hazırlık Aşamasında” if the organization is not fully open there yet.

---

## 13. Transparency and Trust

The website must include trust-building areas because online donation requires confidence.

Design sections for:

- Dernek bilgileri
- Yardım toplama izin bilgisi placeholder
- Bank account information
- Campaign reports
- Field photos
- Donation process explanation
- Contact information
- Frequently asked questions

### Legal Placeholder Fields

Design must include spaces for:

- Dernek Kütük No
- Yardım Toplama İzin No
- İzin Başlangıç Tarihi
- İzin Bitiş Tarihi
- Yetkili Makam
- KVKK Aydınlatma Metni
- Bağış Bilgilendirme Metni

Do not hardcode these values. Use placeholders.

---

## 14. Forms

Forms should be simple and confidence-building.

### Input Style

- White background
- Light border
- 12–14 px radius
- Clear labels above inputs
- Error messages in accessible red
- Help text in muted gray

### Important Forms

- Donation form
- Volunteer form
- Contact form
- Bank transfer notification form
- Kurban vekalet form

### Volunteer Form Fields

- Name surname
- Phone
- Email
- City
- Profession/skill
- Available days
- Message
- KVKK checkbox

---

## 15. Admin Panel Design System

Admin panel should be clean, practical, and not overly decorative.

### Admin Layout

Left sidebar:

- Dashboard
- Kampanyalar
- Bağışlar
- Bağışçılar
- Kurban Takibi
- Havale/EFT Bildirimleri
- Gönüllüler
- Faaliyetler
- Raporlar
- Medya Galerisi
- Mesajlar
- Ayarlar
- Kullanıcılar

Top bar:

- Search
- Notifications
- Admin profile

### Admin Dashboard Cards

Cards:

- Toplam Bağış
- Bugünkü Bağış
- Aktif Kampanya
- Bekleyen Havale
- Yeni Gönüllü Başvurusu
- Son Bağışlar

### Admin Table Style

Tables should include:

- Search
- Filters
- Date range
- Status badge
- Action buttons
- Export button

### Status Badges

Donation status:

- Tamamlandı
- Beklemede
- Başarısız
- İade Edildi

Kurban status:

- Vekalet Alındı
- Ödeme Tamamlandı
- Kesim Bekliyor
- Kesildi
- Dağıtıldı
- Rapor Gönderildi

Volunteer status:

- Yeni Başvuru
- Görüşülecek
- Onaylandı
- Pasif

---

## 16. Imagery Direction

Use real humanitarian field photography where possible.

Image style:

- Real people, real field work
- Food distribution
- Kurban organization
- Ramazan iftar
- Children and families respectfully shown
- Avoid overly dramatic or exploitative poverty imagery
- Keep dignity and respect

Do not use images that feel fake, overly AI-generated, or manipulative.

Image treatment:

- Rounded corners
- Soft overlays for hero sections
- Green/turquoise gradient overlays if needed
- Good contrast for text

---

## 17. Icon Style

Icons should be simple line icons or filled minimal icons.

Icon themes:

- Hand/help
- Heart
- Leaf
- Globe
- Mosque/Ramazan crescent if used gently
- Food box
- Water drop if needed
- Document/report
- Shield/check for trust
- WhatsApp/contact

Icon color:

- Primary Green
- Action Turquoise
- White on dark backgrounds

---

## 18. Accessibility

The website must be accessible.

Rules:

- Strong color contrast
- Buttons must be large enough on mobile
- Do not rely on color alone for status
- All forms need labels
- Error messages should be clear
- Navigation should be keyboard-friendly
- Donation process must be understandable for older users too

Minimum mobile button height: 44 px.

---

## 19. Responsive Behavior

### Desktop

- Full header navigation
- Hero with two-column layout
- Donation box visible above the fold
- Campaigns in 3-column grid

### Tablet

- Header simplified
- Hero can remain two columns if space allows
- Campaigns in 2-column grid

### Mobile

- Donation CTA must remain visible early
- Hero becomes single column
- Quick donation box directly under hero text
- Campaigns single column
- Forms use full width
- Admin tables become card lists

---

## 20. Public Website Page List

Create designs for these public screens:

1. Homepage
2. Bağış Yap campaign listing
3. Donation detail page
4. Donation checkout page
5. Donation success/receipt page
6. Kurban donation page
7. Ramazan campaign page
8. Africa region page
9. Afghanistan region page
10. Pakistan coming soon / preparation page
11. Reports / transparency page
12. Report detail page
13. About page
14. Volunteer page
15. Contact page
16. FAQ page
17. KVKK / legal content page template

---

## 21. Admin Panel Page List

Create designs for these admin screens:

1. Admin login
2. Admin dashboard
3. Campaign list
4. Create/edit campaign
5. Donation records
6. Donation detail
7. Donor profile
8. Kurban tracking list
9. Kurban tracking detail
10. Bank transfer confirmations
11. Volunteer applications
12. Contact messages
13. Reports/news manager
14. Media gallery
15. Region/country manager
16. Website settings
17. Payment/bank settings
18. Admin users and roles
19. Audit logs

---

## 22. UX Priorities

The design must prioritize:

1. Trust before donation
2. Donation clarity before visual complexity
3. Mobile usability
4. Fast campaign discovery
5. Transparent reporting
6. Easy admin management
7. Clear legal/compliance placeholders
8. Turkish donor expectations

---

## 23. Content Language

Use Turkish UI text. Keep it natural and respectful.

Avoid:

- Aggressive donation pressure
- Overly commercial sales language
- Long paragraphs above the fold
- Unverified claims
- Fake statistics

Use placeholders when exact data is not available.

Example placeholder text:

- “Dernek Kütük No: [Eklenecek]”
- “Yardım Toplama İzin No: [Eklenecek]”
- “Toplanan Bağış: [Eklenecek]”
- “Hedef Tutar: [Eklenecek]”

---

## 24. Recommended Homepage Structure

1. Header
2. Hero + quick donation box
3. Active campaigns
4. Impact statistics
5. Trust/transparency section
6. Region work section
7. Kurban/Ramazan highlighted campaigns
8. Latest reports/news
9. Volunteer CTA
10. Footer

---

## 25. Design Quality Checklist

Before approving any screen, check:

- Is the donation CTA visible and clear?
- Does the page feel trustworthy?
- Are legal placeholders visible where needed?
- Is the design mobile-friendly?
- Does it match the logo colors?
- Is Turkish copy natural?
- Are campaign cards easy to understand?
- Is transparency/reporting visible?
- Is the admin screen practical for real use?
- Does the design avoid fake statistics or unsupported claims?

---

## 26. Stitch Usage Instruction

When generating screens in Stitch, always follow this design system. Use the AHDE VEFA logo style as visual reference: turquoise hand, green leaves, bold green identity, clean white background.

Every screen should use:

- Turkish UI content
- Green/turquoise NGO color system
- Donation-focused CTAs
- Transparent trust sections
- Mobile-first layout
- Clean, accessible components

Do not design the website as a generic corporate landing page. It must feel like a real humanitarian aid association website.