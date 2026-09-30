"use client";

import { useEffect, useState } from "react";
import { QUIZ_URL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);
  const [ctaInView, setCtaInView] = useState(false);

  useEffect(() => {
    // Show bar after scrolling past hero
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Hide when either main CTA is visible
    const ctaEls = [
      document.getElementById("cta-quiz-hero"),
      document.getElementById("cta-quiz-finale"),
    ].filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting);
        setCtaInView(anyVisible);
      },
      { threshold: 0.1 }
    );
    ctaEls.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  if (!visible || ctaInView) return null;

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 z-50 p-3 
        rl-bg-b border-t border-bordo
        flex md:hidden
        translate-y-0 transition-transform duration-200
      "
      aria-hidden={!visible}
    >
      <a
        href={QUIZ_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("cta_quiz_mobile_sticky")}
        className="
          rl-cta-pulse
          flex-1 py-4 px-5 rounded-btn bg-viola text-white
          font-poppins font-bold text-sm uppercase tracking-wide text-center
          hover:bg-viola-hover transition-colors
        "
      >
        SCOPRI SE FA PER TE →
      </a>
    </div>
  );
}
