"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ACADEMY_URL, QUIZ_URL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

interface NavbarProps {
  academyUrl: string;
}

export default function Navbar({ academyUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-notte/95 backdrop-blur-md border-b border-bordo/60 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          : "bg-transparent border-b border-transparent"
      }`}
      aria-label="Navigazione principale"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / brand */}
        <Link
          href="/"
          className="font-anton text-xl uppercase text-testo tracking-wide hover:text-viola transition-colors duration-200"
          aria-label="Resellife Academy — homepage"
        >
          Resellife <span className="text-viola">Academy</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-testo/60">
          <Link
            href="#metodo"
            className="hover:text-testo transition-colors duration-150"
          >
            Come funziona
          </Link>
          <Link
            href="#bot"
            className="hover:text-testo transition-colors duration-150"
          >
            Bot
          </Link>
          <a
            href={QUIZ_URL}
            onClick={() => trackEvent("quiz_click_nav")}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-testo transition-colors duration-150"
          >
            Quiz
          </a>
          <Link
            href="#faq"
            className="hover:text-testo transition-colors duration-150"
          >
            FAQ
          </Link>
          <a
            href={academyUrl}
            onClick={() => trackEvent("academy_click_nav")}
            className="py-2 px-5 rounded-btn bg-viola text-testo font-semibold text-sm hover:bg-viola-hover transition-all hover:scale-[1.02] shadow-sm shadow-viola/30"
            rel="noopener"
          >
            Entra in Academy
          </a>
        </div>

        {/* Mobile: quiz CTA */}
        <a
          href={QUIZ_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("quiz_click_nav_mobile")}
          className="md:hidden py-2 px-4 rounded-btn border border-viola text-viola font-semibold text-xs hover:bg-viola/10 transition-colors"
        >
          Fai il quiz
        </a>
      </div>
    </nav>
  );
}
