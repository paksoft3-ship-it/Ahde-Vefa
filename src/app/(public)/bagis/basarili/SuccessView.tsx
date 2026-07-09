"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle2, Copy, Facebook, Twitter, MessageCircle, ShieldCheck } from "lucide-react";
import { campaigns } from "@/lib/mock-data";
import { routes } from "@/lib/routes";
import { GENERAL_FAQ } from "@/lib/content";
import { formatTRY, PLACEHOLDER } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepTimeline } from "@/components/ui/Blocks";
import { FAQAccordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { CampaignCard } from "@/components/public/Cards";

const NEXT_STEPS = [
  {
    title: "Bağışınız Kaydedildi",
    description: "Bağış talebiniz sistemimize kaydedildi ve referans numaranız oluşturuldu.",
  },
  {
    title: "Bilgilendirme",
    description: "Süreçle ilgili bilgilendirmeler, verdiğiniz iletişim bilgileri üzerinden iletilir.",
  },
  {
    title: "Saha Yönlendirmesi",
    description: "Bağışınız ihtiyaç önceliğine göre ilgili çalışmaya yönlendirilir.",
  },
  {
    title: "Takip ve Şeffaflık",
    description: "Referans numaranızla bağışınızın durumunu istediğiniz zaman sorgulayabilirsiniz.",
  },
];

export function SuccessView() {
  const params = useSearchParams();
  const ref = params.get("ref") || PLACEHOLDER;
  const tutarRaw = params.get("tutar") || "";
  const tur = params.get("tur") || "Genel Bağış";
  const tutar = Number(tutarRaw) || 0;

  const suggested = campaigns.filter((c) => c.status !== "Hazırlık Aşamasında").slice(0, 3);

  return (
    <>
      {/* Success hero */}
      <section className="bg-brand-mint">
        <div className="container-page py-14 text-center md:py-20">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-card">
            <CheckCircle2 className="h-11 w-11 text-brand-green" strokeWidth={1.5} />
          </div>
          <h1 className="text-[30px] font-extrabold leading-tight text-brand-green md:text-[40px]">
            Bağışınız İçin Teşekkür Ederiz
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Bağış talebiniz alındı. Aşağıdaki referans numarasını saklayın; bağışınızı
            bu numarayla takip edebilirsiniz.
          </p>

          <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-xl border border-hairline bg-white px-6 py-4 shadow-card">
            <span className="text-sm text-muted">Referans No</span>
            <span className="text-lg font-extrabold tracking-wide text-brand-green">{ref}</span>
            <Copy className="h-4 w-4 text-muted" aria-hidden />
          </div>
        </div>
      </section>

      <section className="container-page py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-14">
            {/* Summary */}
            <div className="card p-6">
              <h2 className="mb-5 text-lg font-bold text-brand-green">Bağış Özeti</h2>
              <dl className="grid gap-4 sm:grid-cols-3">
                <div>
                  <dt className="text-sm text-muted">Bağış Türü</dt>
                  <dd className="mt-1 font-semibold text-ink">{tur}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Tutar</dt>
                  <dd className="mt-1 font-semibold text-ink">
                    {tutar > 0 ? formatTRY(tutar) : PLACEHOLDER}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Referans No</dt>
                  <dd className="mt-1 font-semibold text-ink">{ref}</dd>
                </div>
              </dl>
              <p className="mt-5 text-xs text-muted">
                Makbuz ve resmi belge bilgileri, ilgili süreçler tamamlandıkça {PLACEHOLDER}
                {" "}olarak güncellenecektir.
              </p>
            </div>

            {/* Next steps */}
            <div>
              <SectionHeading title="Bundan Sonra Ne Olacak?" />
              <StepTimeline steps={NEXT_STEPS} />
            </div>

            {/* Share */}
            <div className="rounded-xl bg-brand-cream p-6">
              <h2 className="text-lg font-bold text-brand-green">İyiliği Paylaşın</h2>
              <p className="mt-2 text-sm text-muted">
                Daha fazla insana ulaşabilmemiz için bu çalışmayı çevrenizle paylaşabilirsiniz.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" className="btn btn-secondary btn-sm" aria-label="Facebook'ta paylaş">
                  <Facebook className="h-4 w-4" /> Facebook
                </button>
                <button type="button" className="btn btn-secondary btn-sm" aria-label="X'te paylaş">
                  <Twitter className="h-4 w-4" /> X
                </button>
                <button type="button" className="btn btn-secondary btn-sm" aria-label="WhatsApp'ta paylaş">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Tracking + trust sidebar */}
          <aside>
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="rounded-xl border border-hairline bg-white p-6 shadow-donation">
                <h2 className="text-lg font-bold text-brand-green">Bağışınızı Takip Edin</h2>
                <p className="mt-2 text-sm text-muted">
                  Referans numaranız ve iletişim bilginizle bağışınızın güncel durumunu
                  sorgulayabilirsiniz.
                </p>
                <ButtonLink href={routes.bagisTakip} variant="primary" size="lg" className="mt-5 w-full">
                  Bağış Takip
                </ButtonLink>
                <ButtonLink href={routes.bagis} variant="ghost" size="md" className="mt-3 w-full">
                  Yeni Bağış Yap
                </ButtonLink>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-hairline bg-brand-mint/40 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                <p className="text-sm text-muted">
                  Verileriniz KVKK kapsamında korunur. Kart bilgileriniz sistemimizde
                  saklanmaz.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related campaigns */}
      {suggested.length > 0 && (
        <section className="bg-brand-mint py-14 md:py-20">
          <div className="container-page">
            <SectionHeading
              eyebrow="Destek Olmaya Devam Edin"
              title="Diğer Kampanyalar"
              action={{ label: "Tümünü Gör", href: routes.bagis }}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {suggested.map((c) => (
                <CampaignCard key={c.id} campaign={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="container-page py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Sıkça Sorulan Sorular" title="Merak Edilenler" align="center" />
          <FAQAccordion items={GENERAL_FAQ.slice(0, 4)} />
        </div>
      </section>
    </>
  );
}
