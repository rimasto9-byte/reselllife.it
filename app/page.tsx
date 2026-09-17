import type { Metadata } from "next";
import { SITE_URL, FORM_ENDPOINT } from "@/lib/config";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Metodo from "@/components/Metodo";
import Ecosistema from "@/components/Ecosistema";
import BotSection from "@/components/BotSection";
import ProvaSociale from "@/components/ProvaSociale";
import VipSection from "@/components/VipSection";
import Scelta from "@/components/Scelta";
import Bonus from "@/components/Bonus";
import Community from "@/components/Community";
import FAQ from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import { ACADEMY_URL } from "@/lib/config";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Resellife Academy",
      url: SITE_URL,
      logo: `${SITE_URL}/og-image.jpg`,
      sameAs: [
        "https://www.instagram.com/resellife_/",
        "https://www.tiktok.com/@_resellife._",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: "https://wa.me/393398420279",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Devo avere già esperienza con il reselling?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. L'Academy parte dal presupposto che tu non abbia mai venduto nulla online. Il primo modulo è pensato esattamente per quello.",
          },
        },
        {
          "@type": "Question",
          name: "Quanto capitale iniziale mi serve?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Si può partire con cifre piccole, anche poche decine di euro. Quanto serve dipende da cosa scegli di rivendere.",
          },
        },
        {
          "@type": "Question",
          name: "Quanto si guadagna davvero?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dipende da impegno, tempo e scelte di acquisto. Non garantiamo cifre. Quello che diamo sono metodo, fornitori testati e strumenti.",
          },
        },
        {
          "@type": "Question",
          name: "Il Bot è incluso?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sì, l'accesso al Bot Resellife è incluso nell'Academy.",
          },
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar academyUrl={ACADEMY_URL} />

      <main id="main-content">
        {/* 1 — Hero + form */}
        <Hero />

        {/* 2 — Metodo */}
        <Metodo />

        {/* 3 — Ecosistema */}
        <Ecosistema />

        {/* 4 — Bot */}
        <BotSection />

        {/* 5 — Prova sociale */}
        <ProvaSociale />

        {/* 5.5 — VIP */}
        <VipSection />

        {/* 6 — Scelta */}
        <Scelta />

        {/* 7 — Bonus */}
        <Bonus />

        {/* 8 — Community */}
        <Community />

        {/* 9 — FAQ */}
        <FAQ />

        {/* 10 — CTA finale (secondo form) */}
        <section
          id="cta-finale"
          aria-labelledby="cta-finale-heading"
          className="py-20 lg:py-28 bg-notte"
        >
          <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              id="cta-finale-heading"
              className="font-anton text-[clamp(1.8rem,4vw,3rem)] uppercase text-testo text-center mb-4 leading-none"
            >
              PRONTO A INIZIARE?
            </h2>
            <p className="text-center text-testo/55 mb-8 text-sm">
              Scarica la guida gratuita. Nessuna carta richiesta.
            </p>
            <LeadForm id="form-cta-finale" formEndpoint={FORM_ENDPOINT} />
          </div>
        </section>
      </main>

      {/* 11 — Footer */}
      <Footer />
    </>
  );
}
