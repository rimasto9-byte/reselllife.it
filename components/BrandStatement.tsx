export default function BrandStatement() {
  const items = [
    "METODO",
    "FORNITORI",
    "BOT",
    "GUIDE",
    "COMMUNITY",
    "METODO",
    "FORNITORI",
    "BOT",
    "GUIDE",
    "COMMUNITY",
  ];

  return (
    <div
      className="bg-viola/10 border-y border-viola/20 py-3 overflow-hidden"
      aria-label="Pillars: Metodo, Fornitori, Bot, Guide, Community"
    >
      <div className="marquee-track" aria-hidden>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-3">
            <span className="font-anton text-sm tracking-[0.2em] uppercase text-viola">
              {item}
            </span>
            <span className="text-viola/40 text-base">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
