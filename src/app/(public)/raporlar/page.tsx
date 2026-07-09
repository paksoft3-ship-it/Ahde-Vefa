import type { Metadata } from "next";
import {
  ClipboardCheck,
  FileText,
  Landmark,
  ShieldCheck,
} from "lucide-react";
import { reports } from "@/lib/mock-data";
import { routes } from "@/lib/routes";
import { GENERAL_FAQ } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  CTASection,
  LegalInfoCard,
  StepTimeline,
  TrustBadges,
} from "@/components/ui/Blocks";
import { FAQAccordion } from "@/components/ui/Accordion";
import { ReportCard } from "@/components/public/Cards";
import { PakistanNotice } from "@/components/public/PakistanNotice";

export const metadata: Metadata = {
  title: "Şeffaflık ve Raporlar | AHDE VEFA",
  description:
    "AHDE VEFA İnsani Yardım Derneği'nin saha ve faaliyet raporları ile şeffaf bağış süreci bilgilendirmeleri. Doğrulanan çalışmalar raporlarla paylaşılır.",
};

const TRUST_TILES = [
  {
    icon: ShieldCheck,
    title: "Şeffaf Süreç",
    text: "Bağıştan dağıtıma kadar her aşama izlenebilir biçimde yürütülür.",
  },
  {
    icon: FileText,
    title: "Saha Raporları",
    text: "Doğrulanan faaliyetler dönemsel ve saha raporlarıyla paylaşılır.",
  },
  {
    icon: Landmark,
    title: "Resmi Bilgiler",
    text: "Dernek ve yardım toplama izin bilgileri kamuya açık tutulur.",
  },
  {
    icon: ClipboardCheck,
    title: "İzlenebilir Kayıt",
    text: "Her bağış referans numarasıyla kayıt altına alınır ve takip edilir.",
  },
];

const REPORTING_STEPS = [
  {
    title: "Bağışın Alınması",
    description:
      "Bağışınız referans numarasıyla kayıt altına alınır ve ilgili çalışma başlığına yönlendirilir.",
  },
  {
    title: "Sahada Kullanımı",
    description:
      "Kaynak, ihtiyaç önceliğine göre saha ekiplerimiz aracılığıyla ilgili faaliyette kullanılır.",
  },
  {
    title: "Doğrulama",
    description:
      "Yapılan çalışma saha ekipleri tarafından doğrulanır; belge ve bilgiler derlenir.",
  },
  {
    title: "Raporlama",
    description:
      "Doğrulanan faaliyetler dönem ve saha raporlarıyla kamuoyuyla paylaşılır.",
  },
];

export default function RaporlarPage() {
  const hasPakistanReport = reports.some((r) => r.region === "Pakistan");

  return (
    <>
      <PageHero
        title="Şeffaflık ve Raporlar"
        description="Emanetlerinizin nasıl kullanıldığını görebilmeniz için saha ve faaliyet raporlarımızı, resmi dernek bilgilerimizi ve şeffaf bağış sürecimizi burada paylaşıyoruz."
        breadcrumb={[
          { label: "Anasayfa", href: routes.home },
          { label: "Şeffaflık ve Raporlar" },
        ]}
      >
        <TrustBadges />
      </PageHero>

      {/* Güven / şeffaflık intro */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Güven"
          title="Neden Şeffaflık?"
          description="Bağışçılarımızın güvenini korumak için çalışmalarımızı açık, izlenebilir ve doğrulanabilir bir şekilde yürütmeye özen gösteriyoruz."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_TILES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-mint text-brand-green">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 font-bold text-ink">{title}</h3>
              <p className="mt-1 text-sm text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rapor listesi */}
      <section className="bg-brand-mint/50 py-16 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Raporlar"
            title="Saha ve Faaliyet Raporları"
            description="Bölge ve döneme göre yayımlanan raporlarımızı inceleyebilirsiniz. Sayısal veriler doğrulandıkça güncellenmektedir."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>

          {hasPakistanReport && (
            <div className="mt-8">
              <PakistanNotice />
            </div>
          )}
        </div>
      </section>

      {/* Bağış süreci nasıl raporlanır + resmi bilgiler */}
      <section className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Süreç"
              title="Bağış Süreci Nasıl Raporlanır?"
              description="Bağışınızın alınmasından raporlanmasına kadar izlediğimiz dört temel adım."
            />
            <StepTimeline steps={REPORTING_STEPS} />
            <p className="mt-6 text-sm text-muted">
              Raporlarda yer alan sayısal veriler, saha ekiplerimizce doğrulandıkça
              güncellenir. Henüz doğrulanmamış bilgiler{" "}
              <span className="font-semibold text-ink">[Eklenecek]</span> olarak
              gösterilir; hiçbir veri doğrulanmadan tamamlanmış faaliyet olarak sunulmaz.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <LegalInfoCard />
            <p className="text-sm text-muted">
              Resmi dernek bilgileri ve yardım toplama izin verileri, dernek tarafından
              tamamlandıkça bu alanda ve yasal metinler bölümünde yayımlanacaktır.
            </p>
          </div>
        </div>
      </section>

      {/* SSS */}
      <section className="bg-brand-mint/50 py-16 md:py-20">
        <div className="container-page max-w-3xl">
          <SectionHeading
            eyebrow="Yardım"
            title="Şeffaflık Hakkında Sık Sorulanlar"
            align="center"
          />
          <FAQAccordion items={GENERAL_FAQ} />
        </div>
      </section>

      <CTASection
        tone="green"
        title="Emanetiniz güvenilir ellerde"
        description="Şeffaf bağış süreciyle iyiliğe ortak olun; çalışmalarımızı raporlarla takip edin."
        primary={{ label: "Bağış Yap", href: routes.bagis }}
        secondary={{ label: "Sahadan Haberler", href: routes.haberler }}
      />
    </>
  );
}
