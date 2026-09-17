import Link from "next/link";

interface NavbarProps {
  academyUrl: string;
}

export default function Navbar({ academyUrl }: NavbarProps) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-notte/80 backdrop-blur-md border-b border-bordo/50"
      aria-label="Navigazione principale"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo / brand */}
        <Link
          href="/"
          className="font-anton text-xl uppercase text-testo tracking-wide hover:text-accento transition-colors"
          aria-label="Resellife Academy — homepage"
        >
          Resellife <span className="text-accento">Academy</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-testo/60">
          <Link href="#metodo" className="hover:text-testo transition-colors">
            Come funziona
          </Link>
          <Link href="#faq" className="hover:text-testo transition-colors">
            FAQ
          </Link>
          <a
            href={academyUrl}
            className="py-2 px-4 rounded-btn bg-accento text-testo font-semibold text-sm hover:bg-accento-hover transition-all hover:scale-[1.02] shadow-sm shadow-accento/20"
            rel="noopener"
          >
            Entra in Academy
          </a>
        </div>

        {/* Mobile: just the CTA */}
        <a
          href="#form-hero-mobile"
          className="md:hidden py-2 px-4 rounded-btn border border-accento text-accento font-semibold text-xs hover:bg-accento/10 transition-colors"
        >
          Guida gratis
        </a>
      </div>
    </nav>
  );
}
