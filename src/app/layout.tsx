import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ahdevefa.org"),
  title: {
    default: "AHDE VEFA İnsani Yardım Derneği | Bağış ve Yardım Kampanyaları",
    template: "%s | AHDE VEFA İnsani Yardım Derneği",
  },
  description:
    "AHDE VEFA İnsani Yardım Derneği; Afrika, Afganistan ve Türkiye başta olmak üzere ihtiyaç sahiplerine şeffaf, izlenebilir ve güvenilir yardım ulaştırır. Bağışınız sahada gerçek bir iyiliğe dönüşür.",
  keywords: [
    "bağış",
    "yardım",
    "kurban",
    "ramazan",
    "insani yardım",
    "AHDE VEFA",
    "dernek",
  ],
  icons: {
    icon: "/logo/ahde-vefa-logo.jpeg",
    apple: "/logo/ahde-vefa-logo.jpeg",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "AHDE VEFA İnsani Yardım Derneği",
    title: "AHDE VEFA İnsani Yardım Derneği",
    description:
      "Emanetlerinizi ihtiyaç sahiplerine ulaştırıyoruz. Şeffaf, izlenebilir ve güvenilir yardım süreci.",
    images: [{ url: "/logo/ahde-vefa-logo.jpeg", width: 940, height: 740 }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={manrope.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
