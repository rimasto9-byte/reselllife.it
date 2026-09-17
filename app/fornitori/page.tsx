import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fornitori | Resellife Academy",
  description:
    "Accedi a un fornitore testato di Resellife senza impegno. Inizia con un singolo fornitore e scopri il metodo.",
};

export default function FornitoriPage() {
  return (
    <main className="min-h-screen bg-notte py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-block mb-8 text-sm text-viola hover:text-viola-hover underline underline-offset-2"
        >
          ← Torna alla home
        </Link>

        <h1 className="font-anton text-[clamp(2rem,5vw,4rem)] uppercase text-testo leading-none mb-4">
          SCEGLI IL TUO FORNITORE
        </h1>
        <p className="text-testo/65 mb-12 max-w-xl leading-relaxed">
          Parti da un singolo fornitore testato, senza impegno. Tutti i
          fornitori sono verificati dal team Resellife.
        </p>

        {/* Placeholder grid — replace with real product cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="bg-superficie border border-bordo rounded-card-lg p-6"
            >
              <div className="h-32 bg-notte rounded-card mb-4 flex items-center justify-center">
                <span className="text-testo/20 text-xs">
                  Immagine fornitore {n}
                </span>
              </div>
              <p className="font-semibold text-testo mb-1">
                Fornitore {n} — da completare
              </p>
              <p className="text-xs text-testo/40 mb-4">
                Descrizione breve del fornitore e del settore merceologico.
              </p>
              <button
                disabled
                className="w-full py-3 px-5 rounded-btn border border-bordo text-testo/30 text-sm cursor-not-allowed"
              >
                URL checkout da aggiungere
              </button>
            </div>
          ))}
        </div>

        <p className="text-xs text-testo/30 text-center mt-10">
          Questa pagina è un placeholder — aggiungere i prodotti reali con le
          URL di checkout prima del lancio.
        </p>
      </div>
    </main>
  );
}
