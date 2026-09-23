import { XCircle } from "lucide-react";

const problems = [
  "NON SAI COSA VENDERE",
  "NON SAI DOVE COMPRARE",
  "NON SAI COME TROVARE GLI AFFARI",
];

// Inline SVG icons for the placeholder cards
function IconPhone() {
  return (
    <svg className="w-8 h-8 text-viola/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeLinecap="round" strokeWidth={2.5} />
    </svg>
  );
}

function IconMessageSquare() {
  return (
    <svg className="w-8 h-8 text-viola/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconBarChart() {
  return (
    <svg className="w-8 h-8 text-accento/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <line x1="18" y1="20" x2="18" y2="10" strokeLinecap="round" />
      <line x1="12" y1="20" x2="12" y2="4" strokeLinecap="round" />
      <line x1="6" y1="20" x2="6" y2="14" strokeLinecap="round" />
    </svg>
  );
}

export default function ProblemSection() {
  return (
    <section
      id="problema"
      aria-labelledby="problema-heading"
      className="py-16 lg:py-28 bg-notte relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#0D0714] via-[#10061c] to-[#0D0714] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] rounded-full bg-viola/5 blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: copy */}
          <div>
            <h2
              id="problema-heading"
              className="font-anton text-[clamp(2.2rem,6vw,4.5rem)] leading-none uppercase mb-8"
            >
              <span className="text-testo block">IL PROBLEMA</span>
              <span className="text-testo block">NON È INIZIARE.</span>
              <span className="text-viola block">È INIZIARE</span>
              <span className="text-viola block">SENZA METODO.</span>
            </h2>

            <div className="space-y-4 mb-10">
              {problems.map((p, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-accento/15 border border-accento/30 flex items-center justify-center flex-shrink-0 group-hover:bg-accento/25 transition-colors duration-200">
                    <XCircle className="w-4 h-4 text-accento" strokeWidth={2} />
                  </div>
                  <p className="font-poppins font-semibold text-sm sm:text-base uppercase tracking-wide text-testo/80">
                    {p}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-muted/70 font-poppins leading-relaxed text-sm max-w-md">
              Ogni settimana migliaia di persone provano a fare reselling e si
              fermano entro i primi tre mesi — non perché non funziona, ma
              perché partono senza una struttura.
            </p>
          </div>

          {/* Right: collage placeholder */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[480px] max-w-[400px] lg:max-w-none mx-auto w-full">
            {/* Card 1 */}
            <div className="absolute top-0 left-0 w-[60%] aspect-[4/3] rounded-2xl bg-superficie border border-bordo overflow-hidden shadow-[0_8px_32px_rgba(123,47,214,0.15)] rotate-[-2deg]">
              <div className="w-full h-full bg-gradient-to-br from-viola/20 to-superficie flex items-center justify-center p-4">
                <div className="text-center">
                  <IconPhone />
                  <p className="text-xs text-muted/40 font-poppins mt-2">Screenshot Vinted</p>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="absolute top-[15%] right-0 w-[52%] aspect-[4/3] rounded-2xl bg-superficie border border-viola/20 overflow-hidden shadow-[0_8px_32px_rgba(123,47,214,0.2)] rotate-[2deg]">
              <div className="w-full h-full bg-gradient-to-br from-[#1a0835] to-superficie flex items-center justify-center p-4">
                <div className="text-center">
                  <IconMessageSquare />
                  <p className="text-xs text-muted/40 font-poppins mt-2">Community screenshot</p>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="absolute bottom-0 left-[10%] w-[40%] aspect-square rounded-2xl bg-superficie border border-accento/15 overflow-hidden shadow-[0_8px_24px_rgba(255,31,168,0.12)] rotate-[-1deg]">
              <div className="w-full h-full bg-gradient-to-br from-accento/10 to-superficie flex items-center justify-center p-4">
                <div className="text-center">
                  <IconBarChart />
                  <p className="text-xs text-muted font-poppins mt-2">Risultati</p>
                </div>
              </div>
            </div>
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-notte via-transparent to-transparent pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
