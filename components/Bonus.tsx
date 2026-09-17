export default function Bonus() {
  const steps = [
    {
      n: "1",
      text: "Ti registri sulle piattaforme indicate nella guida interna",
    },
    { n: "2", text: "Richiedi i bonus di benvenuto disponibili" },
    {
      n: "3",
      text: "Recuperi, in tutto o in parte, la quota d'iscrizione",
    },
  ];

  return (
    <section
      id="bonus"
      aria-labelledby="bonus-heading"
      className="py-20 lg:py-28 bg-superficie"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="bonus-heading"
          className="font-anton text-[clamp(1.8rem,4vw,3rem)] uppercase text-testo mb-5 leading-none"
        >
          RIENTRA DELLA QUOTA
          <br />
          <span className="text-viola">CON I BONUS DI BENVENUTO</span>
        </h2>

        <p className="text-testo/65 leading-relaxed mb-10">
          Non vogliamo che il costo dell&apos;Academy sia l&apos;ostacolo.
          Appena entri, trovi una guida dedicata per richiedere i bonus di
          benvenuto delle piattaforme segnalate.
        </p>

        <div className="space-y-5 mb-10">
          {steps.map((step) => (
            <div key={step.n} className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-viola/15 border border-viola/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="font-anton text-base text-viola leading-none">
                  {step.n}
                </span>
              </div>
              <p className="text-testo/80 leading-relaxed pt-1.5">{step.text}</p>
            </div>
          ))}
        </div>

        {/* Legal note — same text size, not tiny gray fine print */}
        <div className="bg-notte border border-bordo rounded-card p-5">
          <p className="text-sm text-testo/55 leading-relaxed">
            Le piattaforme e gli importi cambiano nel tempo e vengono
            aggiornati all&apos;interno dell&apos;Academy. I bonus sono erogati
            da soggetti terzi secondo le loro condizioni: per accedervi serve
            avere <strong className="text-testo/70">18 anni compiuti</strong>.
            I link segnalati possono essere link di affiliazione.
          </p>
        </div>
      </div>
    </section>
  );
}
