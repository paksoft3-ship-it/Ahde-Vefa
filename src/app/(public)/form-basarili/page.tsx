import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Home, Mail, ShieldCheck } from "lucide-react";
import { routes } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/Button";
import { StepTimeline } from "@/components/ui/Blocks";

export const metadata: Metadata = {
  title: "Başvurunuz Alındı | AHDE VEFA İnsani Yardım Derneği",
  description:
    "Başvurunuz başarıyla alındı. Ekibimiz en kısa sürede sizinle iletişime geçecektir.",
};

const NEXT_STEPS = [
  {
    title: "Başvurunuz Kaydedildi",
    description: "İletmiş olduğunuz bilgiler sistemimize başarıyla ulaştı.",
  },
  {
    title: "Değerlendirme",
    description:
      "Ekibimiz başvurunuzu en kısa sürede inceleyecek ve gerekli değerlendirmeyi yapacaktır.",
  },
  {
    title: "İletişim",
    description:
      "Paylaştığınız iletişim bilgileri üzerinden sizinle iletişime geçilecektir.",
  },
];

export default function FormBasariliPage() {
  return (
    <>
      {/* Success hero */}
      <section className="border-b border-hairline bg-brand-mint">
        <div className="container-page py-16 text-center md:py-24">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-green text-white shadow-card">
            <CheckCircle2 className="h-11 w-11" strokeWidth={2} />
          </div>
          <h1 className="text-[30px] font-extrabold leading-tight text-brand-green md:text-[44px]">
            Başvurunuz Alındı
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Bize ulaştığınız için teşekkür ederiz. Başvurunuz başarıyla kaydedildi;
            ekibimiz en kısa sürede sizinle iletişime geçecektir.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonLink href={routes.home} variant="primary" size="lg">
              <Home className="h-5 w-5" />
              Anasayfaya Dön
            </ButtonLink>
            <ButtonLink href={routes.bagis} variant="secondary" size="lg">
              Kampanyaları Keşfet
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Next steps + support */}
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-extrabold text-brand-green">
              Sırada Ne Var?
            </h2>
            <StepTimeline steps={NEXT_STEPS} />
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <div className="mb-3 flex items-center gap-2">
                <Mail className="h-5 w-5 text-brand-turquoise" />
                <h3 className="text-lg font-bold text-brand-green">
                  Bir Sorunuz mu Var?
                </h3>
              </div>
              <p className="text-sm text-muted">
                Başvurunuzla ilgili aklınıza takılan konular için iletişim
                sayfamızdan bize ulaşabilir veya sıkça sorulan soruları
                inceleyebilirsiniz.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href={routes.iletisim} variant="green" size="sm">
                  İletişime Geç
                </ButtonLink>
                <ButtonLink href={routes.sss} variant="ghost" size="sm">
                  Sıkça Sorulan Sorular
                </ButtonLink>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-hairline bg-brand-cream p-5">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
              <p className="text-sm text-muted">
                Paylaştığınız kişisel veriler, KVKK kapsamında yalnızca ilgili
                işlemin gerektirdiği ölçüde işlenir ve güvenle korunur.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
