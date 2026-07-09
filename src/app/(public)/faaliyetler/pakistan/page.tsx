import type { Metadata } from "next";
import { ClipboardList, Info, ShieldCheck, MapPinned } from "lucide-react";
import { campaigns, reports } from "@/lib/mock-data";
import { routes } from "@/lib/routes";
import { PLACEHOLDER } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { StepTimeline } from "@/components/ui/Blocks";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MediaImage } from "@/components/ui/MediaImage";
import { EmptyState } from "@/components/ui/States";
import { PakistanNotice } from "@/components/public/PakistanNotice";
import { CampaignCard, ReportCard } from "@/components/public/Cards";

export const metadata: Metadata = {
  title: "Pakistan Çalışmaları (Hazırlık Aşamasında) | AHDE VEFA İnsani Yardım Derneği",
  description:
    "Pakistan çalışmalarımız hazırlık aşamasındadır. Bu sayfa, planlanan yardım alanları ve süreç hakkında bilgilendirme amaçlıdır; tamamlanmış faaliyet içermez.",
};

const PLANNED_AREAS = [
  {
    icon: ClipboardList,
    title: "İhtiyaç Analizi",
    desc: "Bölgedeki önceliklerin ve olası çalışma alanlarının değerlendirilmesi planlanmaktadır.",
  },
  {
    icon: ShieldCheck,
    title: "Güvenilir İş Birliği",
    desc: "Sürecin şeffaf ve güvenilir biçimde yürütülebilmesi için ön hazırlık çalışmaları sürmektedir.",
  },
  {
    icon: MapPinned,
    title: "Saha Fizibilitesi",
    desc: "Uygulanabilir ve onurlu bir yardım modeli için saha koşulları değerlendirilmektedir.",
  },
];

const PREP_STEPS = [
  {
    title: "Ön Değerlendirme",
    description:
      "Bölgeye yönelik ihtiyaç ve uygunluk değerlendirmeleri hazırlık kapsamında ele alınmaktadır.",
  },
  {
    title: "Planlama",
    description:
      "Olası çalışma başlıkları ve süreç kurgusu planlama aşamasındadır.",
  },
  {
    title: "Şeffaf Duyuru",
    description:
      "Somut ve doğrulanmış bir adım atıldığında bağışçılarımızla açıkça paylaşılacaktır.",
  },
];

export default function PakistanPage() {
  const prepCampaigns = campaigns.filter(
    (c) => c.region === "Pakistan" && c.status === "Hazırlık Aşamasında",
  );
  const prepReports = reports.filter((r) => r.region === "Pakistan");

  return (
    <>
      <PageHero
        title="Pakistan Çalışmaları"
        description="Pakistan'a yönelik çalışmalarımız şu anda hazırlık sürecindedir. Bu sayfa, planlanan alanlar ve süreç hakkında bilgilendirme amacı taşır."
        tone="mint"
        breadcrumb={[
          { label: "Ana Sayfa", href: routes.home },
          { label: "Faaliyetler", href: routes.faaliyetler },
          { label: "Pakistan" },
        ]}
      >
        <StatusBadge status="Hazırlık Aşamasında" />
      </PageHero>

      {/* Prominent Pakistan notice near top */}
      <section className="container-page pt-10">
        <PakistanNotice />
      </section>

      {/* Preparation explanation + info aside */}
      <section className="container-page grid gap-10 py-12 lg:grid-cols-[1.6fr_1fr] lg:py-16">
        <div>
          <MediaImage keyword="pakistan" className="h-56 w-full rounded-lg md:h-72" showLabel />
          <h2 className="mt-8 text-2xl font-bold text-brand-green">
            Neden hazırlık aşamasındayız?
          </h2>
          <p className="mt-4 text-lg text-muted">
            Bir bölgede çalışmaya başlamadan önce ihtiyaçların doğru anlaşılması, güvenilir
            iş birliklerinin kurulması ve onurlu bir yardım modelinin oluşturulması bizim
            için önceliklidir. Pakistan'a yönelik süreç bu titiz hazırlık aşamasındadır.
          </p>
          <p className="mt-4 text-muted">
            Bu sayfada tamamlanmış herhangi bir faaliyet, dağıtım ya da sayısal sonuç
            paylaşılmamaktadır. Doğrulanmamış bilgiler yerine{" "}
            <span className="font-semibold text-brand-green">{PLACEHOLDER}</span> ibaresi
            kullanılır. Gelişmeler kesinleştikçe şeffaf biçimde duyurulacaktır.
          </p>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <div className="flex items-center gap-2 text-brand-green">
              <Info className="h-5 w-5" />
              <h3 className="text-lg font-bold">Bilgi Almak İster misiniz?</h3>
            </div>
            <p className="mt-3 text-sm text-muted">
              Pakistan hazırlık süreciyle ilgili gelişmelerden haberdar olmak veya soru
              iletmek için bizimle iletişime geçebilirsiniz.
            </p>
            <ButtonLink
              href={routes.iletisim}
              variant="primary"
              size="md"
              className="mt-5 w-full"
            >
              Bilgi Al
            </ButtonLink>
            <p className="mt-4 text-xs text-muted">
              Bu bölge için henüz bağış tamamlama süreci açılmamıştır.
            </p>
          </div>
        </aside>
      </section>

      {/* Planned aid areas */}
      <section className="bg-brand-mint/50 py-14 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Planlanan Alanlar"
            title="Hazırlık kapsamında değerlendirilen başlıklar"
            description="Aşağıdaki başlıklar planlama sürecine yöneliktir; tamamlanmış çalışma anlamına gelmez."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PLANNED_AREAS.map((area) => (
              <div key={area.title} className="card h-full p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                  <area.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink">{area.title}</h3>
                <p className="mt-2 text-sm text-muted">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation timeline */}
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Hazırlık Süreci"
              title="Adım adım hazırlık"
              description="Süreç, somut bir adım atıldığında güncellenecek şekilde şeffaf tutulur."
            />
            <StepTimeline steps={PREP_STEPS} />
          </div>
          <div className="rounded-lg border border-hairline bg-brand-cream p-6 lg:p-8">
            <h3 className="text-lg font-bold text-brand-green">Şeffaflık Notu</h3>
            <p className="mt-3 text-muted">
              AHDE VEFA olarak, doğrulanmamış hiçbir sayısal veriyi, tamamlanmış faaliyeti
              veya dağıtım bilgisini yayınlamayız. Pakistan çalışmaları hazırlık
              aşamasında olduğu sürece bu sayfada yalnızca süreç bilgilendirmesi yer alır.
            </p>
            <p className="mt-3 text-muted">
              Etki göstergeleri ve sonuç verileri, ancak doğrulanmış çalışmalar
              gerçekleştiğinde paylaşılacaktır.
            </p>
          </div>
        </div>
      </section>

      {/* Preparation-stage campaign (if any) */}
      {prepCampaigns.length > 0 && (
        <section className="bg-brand-mint/50 py-14 md:py-20">
          <div className="container-page">
            <SectionHeading
              eyebrow="Hazırlık Çalışması"
              title="Pakistan hazırlık kaydı"
              description="Aşağıdaki kayıt hazırlık aşamasındadır ve tamamlanmış bir faaliyet değildir."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {prepCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Preparation status notes (reports) */}
      <section className="container-page py-14 md:py-20">
        <SectionHeading
          eyebrow="Hazırlık Durum Notları"
          title="Süreç bilgilendirmeleri"
          action={{ label: "Tüm Raporlar", href: routes.raporlar }}
        />
        {prepReports.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {prepReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Henüz durum notu yayınlanmadı"
            description="Hazırlık sürecine dair bilgilendirmeler hazırlandıkça burada paylaşılacaktır."
          />
        )}
      </section>

      {/* Info CTA (no donation completion) */}
      <section className="bg-brand-dark py-14 md:py-20">
        <div className="container-page text-center">
          <h2 className="mx-auto max-w-2xl text-[26px] font-extrabold leading-tight text-white md:text-[34px]">
            Gelişmelerden haberdar olun
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Pakistan hazırlık süreciyle ilgili doğrulanmış gelişmeler açıklandığında sizinle
            paylaşacağız. Sorularınız için bize ulaşabilirsiniz.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonLink href={routes.iletisim} variant="primary" size="lg">
              Bilgi Al
            </ButtonLink>
            <ButtonLink href={routes.faaliyetler} variant="ghost" size="lg">
              Diğer Faaliyetler
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
