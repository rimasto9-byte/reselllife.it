import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/config";
import CookieBanner from "@/components/CookieBanner";
import MobileStickyCTA from "@/components/MobileStickyCTA";

// ── Fonts autohosted — zero runtime requests to Google ──
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Resellife Academy | Iniziare con il reselling in Italia",
  description:
    "Il metodo, i fornitori testati e il Bot Resellife per costruirti un extra mensile con il reselling. Scarica la guida gratuita.",
  openGraph: {
    title: "Resellife Academy | Iniziare con il reselling in Italia",
    description:
      "Il metodo, i fornitori testati e il Bot Resellife per costruirti un extra mensile con il reselling. Scarica la guida gratuita.",
    url: SITE_URL,
    siteName: "Resellife Academy",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Resellife Academy — inizia con il reselling",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resellife Academy | Iniziare con il reselling in Italia",
    description:
      "Il metodo, i fornitori testati e il Bot Resellife per costruirti un extra mensile con il reselling.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="it"
      className={`${anton.variable} ${inter.variable}`}
    >
      <body className="bg-notte text-testo font-inter antialiased">
        {children}
        {/* Cookie banner — renders on client, fires no pixels before consent */}
        <CookieBanner />
        {/* Mobile sticky CTA — appears after scrolling past hero */}
        <MobileStickyCTA />
      </body>
    </html>
  );
}
