import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { routes } from "@/lib/routes";
import { PageHero } from "@/components/ui/PageHero";
import { LegalInfoCard } from "@/components/ui/Blocks";

export const metadata: Metadata = {
  title: "Yasal Metinler ve KVKK | AHDE VEFA İnsani Yardım Derneği",
  description:
    "AHDE VEFA İnsani Yardım Derneği KVKK Aydınlatma Metni, Bağış Bilgilendirme Metni, Çerez Politikası ve Kullanım Koşulları. Resmi metinler dernek tarafından tamamlanacaktır.",
};

const PLACEHOLDER_NOTE = "[Dernek tarafından tamamlanacaktır]";

const SECTIONS = [
  {
    id: "kvkk",
    title: "KVKK Aydınlatma Metni",
    intro:
      "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında; hangi kişisel verilerinizin, hangi amaçlarla işlendiği, kimlerle paylaşılabileceği ve haklarınıza dair açıklamalar bu bölümde yer alacaktır. Verileriniz yalnızca ilgili işlemin gerektirdiği ölçüde ve mevzuata uygun şekilde işlenir.",
  },
  {
    id: "bagis-bilgilendirme",
    title: "Bağış Bilgilendirme Metni",
    intro:
      "Yaptığınız bağışların hangi süreçlerle toplandığı, işlendiği, ilgili çalışmalara nasıl yönlendirildiği ve raporlama esaslarına ilişkin bilgilendirme bu bölümde sunulacaktır. Kart bilgileriniz sistemimizde saklanmaz.",
  },
  {
    id: "cerez",
    title: "Çerez Politikası",
    intro:
      "Web sitemizde kullanılan çerezlerin türleri, kullanım amaçları ve çerez tercihlerinizi nasıl yönetebileceğinize dair açıklamalar bu bölümde yer alacaktır.",
  },
  {
    id: "kullanim-kosullari",
    title: "Kullanım Koşulları",
    intro:
      "Web sitesinin kullanımına ilişkin genel koşullar, kullanıcı sorumlulukları, fikri mülkiyet hakları ve sorumluluğun sınırlarına dair hükümler bu bölümde düzenlenecektir.",
  },
];

export default function YasalPage() {
  return (
    <>
      <PageHero
        title="Yasal Metinler ve KVKK"
        description="Kişisel verilerin korunması, bağış bilgilendirmesi ve kullanım koşullarına ilişkin metinler."
        breadcrumb={[
          { label: "Anasayfa", href: routes.home },
          { label: "Yasal Metinler" },
        ]}
      />

      <section className="container-page py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          {/* In-page navigation */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav aria-label="Yasal metin başlıkları" className="card p-5">
              <p className="mb-3 text-sm font-bold uppercase tracking-wider text-brand-turquoise">
                İçindekiler
              </p>
              <ul className="space-y-1">
                {SECTIONS.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block rounded-md px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-mint hover:text-brand-green"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#resmi-bilgiler"
                    className="block rounded-md px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-mint hover:text-brand-green"
                  >
                    Resmi Dernek Bilgileri
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Content */}
          <div className="space-y-8">
            {SECTIONS.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="card scroll-mt-24 p-6 md:p-8"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-mint text-brand-green">
                    <FileText className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-extrabold text-brand-green md:text-2xl">
                    {section.title}
                  </h2>
                </div>
                <p className="text-muted">{section.intro}</p>
                <div className="mt-5 rounded-lg border border-dashed border-brand-green/30 bg-brand-mint/50 p-4">
                  <p className="text-sm font-semibold text-brand-green">
                    {PLACEHOLDER_NOTE}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Bu bölümün nihai metni yürürlükteki mevzuata uygun olarak dernek
                    tarafından hazırlanıp yayımlanacaktır.
                  </p>
                </div>
              </article>
            ))}

            {/* Official info */}
            <div id="resmi-bilgiler" className="scroll-mt-24">
              <LegalInfoCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
