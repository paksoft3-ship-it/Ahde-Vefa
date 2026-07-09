import type { Metadata } from "next";
import { Clock, Mail, MapIcon, MapPin, MessageCircle, Phone } from "lucide-react";
import { routes } from "@/lib/routes";
import { CONTACT } from "@/lib/constants";
import { whatsappLink } from "@/lib/integrations/whatsapp";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "İletişim | AHDE VEFA İnsani Yardım Derneği",
  description:
    "AHDE VEFA İnsani Yardım Derneği ile iletişime geçin. Telefon, e-posta, adres ve WhatsApp üzerinden bize ulaşabilir, mesaj gönderebilirsiniz.",
};

const CONTACT_CARDS = [
  { icon: Phone, label: "Telefon", value: CONTACT.phone },
  { icon: Mail, label: "E-posta", value: CONTACT.email },
  { icon: MapPin, label: "Adres", value: CONTACT.address },
  { icon: Clock, label: "Çalışma Saatleri", value: CONTACT.workingHours },
];

const FAQ_LINKS = [
  { label: "Bağış nasıl yapılır?", href: routes.sss },
  { label: "Bağışımı nasıl takip ederim?", href: routes.bagisTakip },
  { label: "Dekont nasıl bildirilir?", href: routes.dekontBildir },
  { label: "Gönüllü nasıl olurum?", href: routes.gonulluOl },
];

export default function IletisimPage() {
  const waHref = whatsappLink(
    CONTACT.whatsapp,
    "Merhaba, AHDE VEFA hakkında bilgi almak istiyorum.",
  );

  return (
    <>
      <PageHero
        title="İletişim"
        description="Sorularınız, talepleriniz ve iş birlikleri için bize ulaşın. Size yardımcı olmaktan memnuniyet duyarız."
        breadcrumb={[
          { label: "Anasayfa", href: routes.home },
          { label: "İletişim" },
        ]}
      />

      <section className="container-page py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Contact info column */}
          <div className="space-y-8">
            <div>
              <SectionHeading
                eyebrow="İletişim Bilgileri"
                title="Bize Ulaşın"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {CONTACT_CARDS.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="card p-5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-mint text-brand-green">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold text-muted">{label}</p>
                    <p className="mt-1 font-bold text-ink">{value}</p>
                  </div>
                ))}
              </div>

              {/* WhatsApp */}
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-green btn-lg mt-5 w-full"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp ile Yazın
              </a>
              <p className="mt-2 text-center text-xs text-muted">
                İletişim bilgileri dernek tarafından tamamlandıkça güncellenecektir.
              </p>
            </div>

            {/* Map placeholder */}
            <div>
              <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-brand-green/30 bg-brand-mint/60 text-center">
                <MapIcon className="h-10 w-10 text-brand-green" strokeWidth={1.5} />
                <p className="mt-3 font-bold text-brand-green">Harita {CONTACT.address}</p>
                <p className="mt-1 max-w-xs text-sm text-muted">
                  Konum bilgisi ve harita, adres bilgileri tamamlandıkça bu alanda
                  yer alacaktır.
                </p>
              </div>
            </div>

            {/* FAQ quick links */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-brand-green">Sık Sorulanlar</h3>
              <p className="mt-1 text-sm text-muted">
                Aradığınız yanıt burada olabilir.
              </p>
              <ul className="mt-4 space-y-2">
                {FAQ_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="flex items-center justify-between rounded-md border border-hairline px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand-green hover:text-brand-green"
                    >
                      {link.label}
                      <span aria-hidden>→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form column */}
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
