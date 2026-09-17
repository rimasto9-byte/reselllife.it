export default function Metodo() {
  const steps = [
    {
      n: "1",
      title: "TROVA",
      body: "Individui i prodotti giusti da comprare a poco e rivendere con margine: fornitori già testati, oppure occasioni segnalate dal Bot Resellife.",
    },
    {
      n: "2",
      title: "VENDI",
      body: "Pubblichi su Vinted o sul marketplace più adatto al prodotto, seguendo le strategie di prezzo e presentazione dell'Academy.",
    },
    {
      n: "3",
      title: "RIPETI",
      body: "Reinvesti il margine, aumenti il numero di operazioni e costruisci un'entrata che continua nel tempo.",
    },
  ];

  return (
    <section
      id="metodo"
      aria-labelledby="metodo-heading"
      className="py-20 lg:py-28 bg-notte"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="metodo-heading"
          className="font-anton text-[clamp(1.8rem,4vw,3rem)] uppercase text-center text-testo mb-14"
        >
          COME FUNZIONA
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.n}
              className="bg-superficie border border-bordo rounded-card p-6 lg:p-8 group hover:border-viola/40 transition-colors duration-200"
            >
              {/* Number — filled circle like a messaging app bullet */}
              <div className="w-10 h-10 rounded-full bg-accento flex items-center justify-center mb-5">
                <span className="font-anton text-lg text-testo leading-none">
                  {step.n}
                </span>
              </div>

              <h3 className="font-anton text-2xl uppercase text-testo mb-3">
                {step.title}
              </h3>
              <p className="text-testo/65 text-sm leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
