import type { Metadata } from "next";
import { SITE_URL, QUIZ_URL, CALENDLY_URL } from "@/lib/config";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandStatement from "@/components/BrandStatement";
import ProblemSection from "@/components/ProblemSection";
import Metodo from "@/components/Metodo";
import Ecosistema from "@/components/Ecosistema";
import BotSection from "@/components/BotSection";
import FornitoriSection from "@/components/FornitoriSection";
import ProvaSociale from "@/components/ProvaSociale";
import Scelta from "@/components/Scelta";
import QuizSection from "@/components/QuizSection";
import CallSection from "@/components/CallSection";
import Bonus from "@/components/Bonus";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import BonusWheel from "@/components/BonusWheel";
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
          name: "Quanto costa l'Academy Resellife?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "L'accesso completo all'Academy è 90€. Include fornitori, Bot Resellife, guide operative, community privata e supporto diretto.",
          },
        },
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
          name: "Il Bot è incluso nell'Academy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sì, l'accesso al Bot Resellife è incluso nell'Academy.",
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
        {/* 1 — Hero: INIZIA A FARE RESELLING CON UN METODO */}
        <Hero />

        {/* 2 — Brand Statement: METODO · FORNITORI · BOT · GUIDE · COMMUNITY */}
        <BrandStatement />

        {/* 3 — Il Problema: IL PROBLEMA NON È INIZIARE */}
        <ProblemSection />

        {/* 4 — Il Metodo: ACQUISTA → VENDI → RIPETI */}
        <Metodo />

        {/* 5 — Cosa c'è dentro Academy */}
        <Ecosistema />

        {/* 6 — Bot Resellife: IL TUO RADAR SUL MERCATO */}
        <BotSection />

        {/* 7 — Fornitori: NON PARTI DA ZERO. PARTI DA UNA BASE. */}
        <FornitoriSection />

        {/* 8 — Prova Sociale: wall of proof */}
        <ProvaSociale />

        {/* 9 — Scelta: DUE STRADE */}
        <Scelta />

        {/* 10 — Quiz: IL RESELL FA PER TE? */}
        <QuizSection />

        {/* 11 — Call: HAI ANCORA DUBBI? PARLIAMONE IN 15 MINUTI */}
        <CallSection />

        {/* 12 — Bonus: L'ACADEMY NON FINISCE CON L'ISCRIZIONE */}
        <Bonus />

        {/* 13 — FAQ */}
        <FAQ />

        {/* 14 — CTA finale pre-footer */}
        <section
          id="cta-finale"
          aria-labelledby="cta-finale-heading"
          className="py-16 lg:py-28 bg-superficie"
        >
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              id="cta-finale-heading"
              className="font-anton text-[clamp(1.8rem,4vw,3rem)] uppercase text-testo mb-4 leading-none"
            >
              PRONTO A INIZIARE?
            </h2>
            <p className="text-muted/60 font-poppins mb-8 text-sm">
              Fai prima il quiz — scopri se il reselling fa per te in 60 secondi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={QUIZ_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="cta-quiz-finale"
                className="py-4 px-8 rounded-btn bg-viola text-testo font-poppins font-bold text-base uppercase hover:bg-viola-hover transition-all hover:scale-[1.02] shadow-lg shadow-viola/25"
              >
                INIZIA IL QUIZ →
              </a>
              <a
                href={ACADEMY_URL}
                rel="noopener"
                id="cta-academy-finale"
                className="py-4 px-8 rounded-btn border border-bordo text-testo/70 font-poppins font-medium text-base hover:border-viola/40 hover:text-testo transition-all"
              >
                Entra in Academy
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 15 — Footer */}
      <Footer />

      {/* Bonus Wheel — global overlay, sessionStorage-gated */}
      <BonusWheel />
    </>
  );
}
