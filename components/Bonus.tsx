export default function Bonus() {
  const steps = [
    {
      n: "1",
      title: "Registrazione",
      text: "Ti registri sulle piattaforme indicate nella guida interna all'Academy.",
    },
    {
      n: "2",
      title: "Riscatto",
      text: "Riscatti i bonus di benvenuto disponibili seguendo le istruzioni.",
    },
    {
      n: "3",
      title: "Recupero",
      text: "Recuperi l'investimento dell'Academy, in tutto o in parte, in pochi giorni.",
    },
  ];

  return (
    <section
      id="bonus"
      aria-labelledby="bonus-heading"
      className="py-16 lg:py-28 bg-notte relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-notte via-[#100625] to-notte pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-viola font-poppins font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            Incluso nell&apos;Academy
          </p>
          <h2
            id="bonus-heading"
            className="font-anton text-[clamp(1.8rem,4vw,3rem)] uppercase text-testo leading-none mb-4"
          >
            L&apos;ACADEMY NON FINISCE
            <br />
            <span className="text-viola">CON L&apos;ISCRIZIONE.</span>
          </h2>
          <p className="text-muted/70 font-poppins max-w-xl mx-auto leading-relaxed">
            <strong className="text-testo/80 font-semibold">BONUS DI BENVENUTO</strong>
            {" "}— appena entri, trovi una guida dedicata per richiedere i bonus
            di benvenuto delle piattaforme segnalate.
          </p>
        </div>

        {/* Steps — elegant horizontal layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {steps.map((step) => (
            <div
              key={step.n}
              className="bg-superficie border border-bordo rounded-card-lg p-6 text-center hover:border-viola/30 transition-colors duration-200"
            >
              <div className="w-12 h-12 rounded-full bg-viola/15 border border-viola/30 flex items-center justify-center mx-auto mb-4">
                <span className="font-anton text-xl text-viola leading-none">
                  {step.n}
                </span>
              </div>
              <h3 className="font-poppins font-semibold text-testo text-sm mb-2">
                {step.title}
              </h3>
              <p className="text-muted/60 text-xs font-poppins leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* Legal note */}
        <div className="bg-superficie/50 border border-bordo rounded-card p-5">
          <p className="text-sm text-testo/50 leading-relaxed font-poppins text-center">
            Le piattaforme e gli importi cambiano nel tempo e vengono aggiornati
            all&apos;interno dell&apos;Academy. I bonus sono erogati da soggetti
            terzi secondo le loro condizioni:{" "}
            <strong className="text-testo/65">per accedervi serve avere 18 anni compiuti</strong>.
            I link segnalati possono essere link di affiliazione.
          </p>
        </div>
      </div>
    </section>
  );
}
