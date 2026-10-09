"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ACADEMY_URL, QUIZ_URL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

interface NavbarProps {
  academyUrl: string;
}

// Logo: aggiungi /public/logo.png dall'asset reale (Drive 01_LOGO) e cambia il valore qui sotto a false
// TODO: quando il file logo.png è caricato in /public/, imposta LOGO_MISSING = false
const LOGO_MISSING = false;
const LOGO_SRC = "/logo.png";

export default function Navbar({ academyUrl }: NavbarProps) {
  const [scrolled, setScrolled]         = useState(false);
  const [logoError, setLogoError]       = useState(LOGO_MISSING);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-notte/95 backdrop-blur-md border-b border-bordo/60 shadow-[0_4px_24px_rgba(0,0,0,0.4)] h-16"
          : "bg-notte/60 backdrop-blur-sm border-b border-white/5 h-20"
      }`}
      aria-label="Navigazione principale"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

        {/* ── Logo / brand ── */}
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-95 transition-opacity duration-200 py-1"
          aria-label="Resellife Academy — homepage"
        >
          {!logoError ? (
            <div className="flex items-center gap-2">
              <Image
                src={LOGO_SRC}
                alt="Resellife Academy Logo"
                width={200}
                height={64}
                className="h-12 sm:h-14 w-auto object-contain drop-shadow-[0_0_12px_rgba(139,92,246,0.4)]"
                onError={() => setLogoError(true)}
                priority
              />
            </div>
          ) : (
            <span className="font-anton text-xl sm:text-2xl uppercase text-testo tracking-wide">
              Resellife <span className="text-viola">Academy</span>
            </span>
          )}
        </Link>

        {/* ── Desktop nav links ── */}
        <div className="hidden md:flex items-center gap-6 text-sm text-testo/60">
          <Link href="#metodo" className="hover:text-testo transition-colors duration-150">
            Metodo
          </Link>
          <Link href="#ecosistema" className="hover:text-testo transition-colors duration-150">
            Academy
          </Link>
          <Link href="#bot" className="hover:text-testo transition-colors duration-150">
            Bot
          </Link>
          <a
            href="/fornitori"
            className="py-1.5 px-4 rounded-btn border border-viola text-viola font-semibold text-sm hover:bg-viola/10 transition-all"
          >
            Lista Fornitori
          </a>
          <a
            href={QUIZ_URL}
            onClick={() => trackEvent("quiz_click_nav")}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-testo transition-colors duration-150"
          >
            Fai il Quiz
          </a>
          <a
            href={academyUrl}
            onClick={() => trackEvent("academy_click_nav")}
            className="py-2 px-5 rounded-btn bg-viola text-testo font-semibold text-sm hover:bg-viola-hover transition-all hover:scale-[1.02] shadow-sm shadow-viola/30"
            rel="noopener"
          >
            Entra in Academy
          </a>
        </div>

        {/* ── Mobile: quiz & fornitori CTA ── */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href="/fornitori"
            className="py-2 px-4 rounded-btn border border-viola text-viola font-poppins font-bold text-xs uppercase tracking-wide hover:bg-viola/10 transition-colors"
          >
            Fornitori
          </a>
          <a
            href={QUIZ_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("quiz_click_nav_mobile")}
            className="rl-cta-pulse py-2 px-5 rounded-btn bg-viola text-white font-poppins font-bold text-xs uppercase tracking-wide hover:bg-viola-hover transition-colors shadow-lg"
          >
            Fai il quiz
          </a>
        </div>
      </div>
    </nav>
  );
}
