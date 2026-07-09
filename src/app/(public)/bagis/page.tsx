"use client";

import { useMemo, useState } from "react";
import { Search, HandHeart, Landmark } from "lucide-react";
import { campaigns } from "@/lib/mock-data";
import { routes } from "@/lib/routes";
import { GENERAL_FAQ, DONATION_STEPS } from "@/lib/content";
import { BANK } from "@/lib/constants";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LegalInfoCard, StepTimeline, TrustBadges } from "@/components/ui/Blocks";
import { FAQAccordion } from "@/components/ui/Accordion";
import { EmptyState } from "@/components/ui/States";
import { CampaignCard } from "@/components/public/Cards";
import { DonationQuickCard } from "@/components/forms/DonationQuickCard";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Tümü", ...Array.from(new Set(campaigns.map((c) => c.category)))];

export default function BagisPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tümü");

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr-TR");
    return campaigns.filter((c) => {
      const matchesCategory = category === "Tümü" || c.category === category;
      const matchesQuery =
        q === "" ||
        c.title.toLocaleLowerCase("tr-TR").includes(q) ||
        c.summary.toLocaleLowerCase("tr-TR").includes(q) ||
        c.region.toLocaleLowerCase("tr-TR").includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <>
      <PageHero
        title="Bağış Yap"
        description="Şeffaf ve izlenebilir bağış süreçleriyle emanetlerinizi ihtiyaç sahiplerine ulaştırıyoruz. Desteklemek istediğiniz kampanyayı seçin."
        breadcrumb={[{ label: "Anasayfa", href: routes.home }, { label: "Bağış Yap" }]}
      >
        <TrustBadges />
      </PageHero>

      <section className="container-page py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Campaign listing */}
          <div>
            {/* Search */}
            <div className="relative mb-5">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Kampanya ara (ör. su, kurban, gıda)"
                aria-label="Kampanya ara"
                className="field-input pl-12"
              />
            </div>

            {/* Category tabs */}
            <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Kampanya kategorileri">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={category === cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                    category === cat
                      ? "border-brand-green bg-brand-green text-white"
                      : "border-hairline bg-white text-muted hover:border-brand-green hover:text-brand-green",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <>
                <p className="mb-5 text-sm text-muted">
                  {filtered.length} kampanya listeleniyor
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  {filtered.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                  ))}
                </div>
              </>
            ) : (
              <EmptyState
                title="Sonuç bulunamadı"
                description="Arama kriterlerinize uygun kampanya bulunamadı. Farklı bir anahtar kelime ya da kategori deneyin."
              />
            )}
          </div>

          {/* Sticky quick donation card */}
          <aside>
            <div className="lg:sticky lg:top-24 space-y-6">
              <DonationQuickCard title="Hızlı Bağış" />
              <p className="text-center text-xs text-muted">
                Kampanya toplamları ve tutar bilgileri, doğrulandıkça yayımlanacaktır.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Donation guidance */}
      <section className="bg-brand-mint py-14 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Nasıl Çalışır?"
            title="Bağış Süreci Nasıl İşliyor?"
            description="Bağışınızın ihtiyaç sahibine ulaşana kadar izlediği şeffaf adımlar."
            align="center"
          />
          <div className="mx-auto max-w-2xl">
            <StepTimeline steps={DONATION_STEPS} />
          </div>
        </div>
      </section>

      {/* Bank transfer + legal */}
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Bank transfer placeholder */}
          <div className="card p-6">
            <div className="mb-4 flex items-center gap-2">
              <Landmark className="h-5 w-5 text-brand-green" />
              <h3 className="text-lg font-bold text-brand-green">Banka Havalesi / EFT ile Bağış</h3>
            </div>
            <p className="mb-4 text-sm text-muted">
              Havale veya EFT ile bağış yapmak isterseniz aşağıdaki hesap bilgilerini
              kullanabilir, ardından dekontunuzu bize iletebilirsiniz.
            </p>
            <dl className="divide-y divide-hairline rounded-lg border border-hairline bg-brand-mint/40 px-4">
              {[
                { label: "Hesap Adı", value: BANK.accountName },
                { label: "Banka", value: BANK.bankName },
                { label: "IBAN", value: BANK.iban },
                { label: "Şube", value: BANK.branch },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-sm text-muted">{row.label}</dt>
                  <dd className="text-sm font-semibold text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted">
              <HandHeart className="h-4 w-4 text-brand-turquoise" />
              Hesap bilgileri dernek tarafından tamamlandıkça güncellenecektir.
            </p>
            <a
              href={routes.dekontBildir}
              className="btn btn-secondary btn-md mt-5 w-full"
            >
              Dekont Bildir
            </a>
          </div>

          {/* Legal info */}
          <LegalInfoCard />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-cream py-14 md:py-20">
        <div className="container-page max-w-3xl">
          <SectionHeading
            eyebrow="Sıkça Sorulan Sorular"
            title="Bağış Hakkında Merak Edilenler"
            align="center"
          />
          <FAQAccordion items={GENERAL_FAQ} />
        </div>
      </section>
    </>
  );
}
