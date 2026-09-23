export default function BrandStatement() {
  const items = ["METODO", "FORNITORI", "BOT", "GUIDE", "COMMUNITY"];

  return (
    <div
      className="bg-viola/10 border-y border-viola/20 py-3 relative overflow-hidden"
      aria-label="Pillars: Metodo, Fornitori, Bot, Guide, Community"
    >
      {/* Fade edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-[#160d20] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-[#160d20] to-transparent"
      />

      <div className="marquee-track" aria-hidden>
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-8 px-4">
            <span className="font-anton text-sm tracking-[0.25em] uppercase text-viola">
              {item}
            </span>
            <span className="text-accento/40 text-base leading-none">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
