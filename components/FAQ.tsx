"use client";

import { trackEvent } from "@/lib/analytics";

const faqs = [
  {
    q: "Devo avere già esperienza con il reselling?",
    a: "No. L'Academy parte dal presupposto che tu non abbia mai venduto nulla online. Il primo modulo è pensato esattamente per quello.",
  },
  {
    q: "Quanto capitale iniziale mi serve?",
    a: "Si può partire con cifre piccole, anche poche decine di euro. Quanto serve dipende da cosa scegli di rivendere: dentro l'Academy trovi come impostare il primo acquisto in base al budget che hai.",
  },
  {
    q: "Quanto tempo devo dedicarci?",
    a: "Non c'è un numero fisso. È un'attività che si costruisce col tempo e i risultati dipendono da quanto ci lavori. Non è un reddito automatico.",
  },
  {
    q: "Quanto si guadagna davvero?",
    a: "Dipende da impegno, tempo e scelte di acquisto. Non garantiamo cifre, e chi lo fa non ti sta dicendo la verità. Quello che diamo sono metodo, fornitori testati e strumenti.",
  },
  {
    q: "Cosa succede dopo il pagamento?",
    a: "Ricevi subito l'accesso all'area riservata e l'ingresso alla community. Il supporto è attivo da quel momento.",
  },
  {
    q: "Posso iniziare senza entrare in Academy?",
    a: "Sì. Puoi partire da un singolo fornitore e vedere come ti trovi.",
  },
  {
    q: "Il Bot è incluso?",
    a: "Sì, l'accesso al Bot Resellife è incluso nell'Academy.",
  },
  {
    q: "Ho meno di 18 anni, posso iscrivermi?",
    a: "Per l'acquisto serve il consenso di un genitore o di chi esercita la responsabilità genitoriale. I bonus bancari di benvenuto, invece, richiedono la maggiore età.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 lg:py-28 bg-superficie"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="faq-heading"
          className="font-anton text-[clamp(1.8rem,4vw,3rem)] uppercase text-center text-testo mb-12"
        >
          DOMANDE FREQUENTI
        </h2>

        <div className="space-y-0 divide-y divide-bordo">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group py-1"
              onToggle={(e) => {
                if ((e.target as HTMLDetailsElement).open) {
                  trackEvent("faq_open", { question: faq.q.slice(0, 50) });
                }
              }}
            >
              <summary
                className="
                  flex items-center justify-between gap-4 py-4 cursor-pointer
                  text-testo/85 font-medium text-sm sm:text-base leading-snug
                  hover:text-testo transition-colors duration-150
                  list-none [&::-webkit-details-marker]:hidden
                  focus-visible:outline-none focus-visible:text-testo
                "
              >
                <span>{faq.q}</span>
                {/* Icon: + becomes × when open */}
                <span
                  className="
                    w-7 h-7 flex-shrink-0 rounded-full border border-bordo
                    flex items-center justify-center text-testo/50 text-lg leading-none
                    group-open:border-viola group-open:text-viola
                    transition-colors duration-150
                  "
                  aria-hidden
                >
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">×</span>
                </span>
              </summary>

              <div className="faq-body pb-5 pr-11 text-sm text-testo/60 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        {/* Legal note per ultima FAQ */}
        <p className="mt-8 text-xs text-testo/30 text-center">
          La risposta relativa ai minori è indicativa — per i dettagli legali
          consulta le condizioni generali di vendita.
        </p>
      </div>
    </section>
  );
}
