"use client";

import { useRef, useState } from "react";
import { Smartphone, CreditCard, Tag, Bell } from "lucide-react";

// Each slide: a phone-style screenshot card
// Replace testimonial content with real screenshots + signed consent
const slides = [
  {
    id: 1,
    icon: <Smartphone className="w-12 h-12 text-testo/60" />,
    caption: "Risultato di uno studente dell'Academy",
    detail: "Extra mensile raggiunto nei primi 30 giorni",
    // Replace bg gradient with real screenshot via next/image
  },
  {
    id: 2,
    icon: <CreditCard className="w-12 h-12 text-testo/60" />,
    caption: "Risultato di uno studente dell'Academy",
    detail: "Prima vendita conclusa il terzo giorno",
  },
  {
    id: 3,
    icon: <Tag className="w-12 h-12 text-testo/60" />,
    caption: "Risultato di uno studente dell'Academy",
    detail: "Margine su singola operazione documentata",
  },
  {
    id: 4,
    icon: <Bell className="w-12 h-12 text-testo/60" />,
    caption: "Risultato di uno studente dell'Academy",
    detail: "Alert Bot convertito in vendita entro 2 ore",
  },
];

export default function ProvaSociale() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScroll() {
    if (!trackRef.current) return;
    const { scrollLeft, clientWidth } = trackRef.current;
    setActiveIndex(Math.round(scrollLeft / clientWidth));
  }

  return (
    <section
      id="risultati"
      aria-labelledby="risultati-heading"
      className="py-20 lg:py-28 bg-superficie"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="risultati-heading"
          className="font-anton text-[clamp(1.8rem,4vw,3rem)] uppercase text-center text-testo mb-4"
        >
          I RISULTATI DEI NOSTRI STUDENTI
        </h2>
        <p className="text-center text-testo/50 text-sm mb-10">
          I risultati variano da persona a persona in base all&apos;impegno e
          al tempo dedicato.
        </p>

        {/* Carousel — single-card, swipeable */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="carousel-track"
          role="list"
          aria-label="Risultati degli studenti"
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              role="listitem"
              className="carousel-slide w-[min(320px,85vw)]"
            >
              {/* Phone-frame card */}
              <div className="bg-notte border border-bordo rounded-[24px] overflow-hidden">
                {/* Screen area — replace with real screenshot */}
                <div className="h-52 bg-gradient-to-br from-superficie to-notte flex flex-col items-center justify-center gap-3">
                  {slide.icon}
                  <span className="text-xs text-testo/30 px-6 text-center">
                    Screenshot reale da inserire
                    <br />
                    (consenso scritto richiesto)
                  </span>
                </div>
                {/* Caption */}
                <div className="p-4 border-t border-bordo">
                  <p className="text-xs font-medium text-testo/80">
                    {slide.caption}
                  </p>
                  <p className="text-xs text-testo/45 mt-0.5">{slide.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6" aria-hidden>
          {slides.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                i === activeIndex ? "bg-accento" : "bg-bordo"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
