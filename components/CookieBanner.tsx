"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if no previous choice stored
    const stored = localStorage.getItem("rl_cookie_consent");
    if (!stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    } else {
      window.__consent = stored as "accepted" | "declined";
      if (stored === "accepted") loadAnalytics();
    }
  }, []);

  function accept() {
    localStorage.setItem("rl_cookie_consent", "accepted");
    window.__consent = "accepted";
    loadAnalytics();
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("rl_cookie_consent", "declined");
    window.__consent = "declined";
    setVisible(false);
  }

  function loadAnalytics() {
    // GA4
    const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
    if (ga4Id && !document.getElementById("ga4-script")) {
      const s = document.createElement("script");
      s.id = "ga4-script";
      s.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
      s.async = true;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function (...args: unknown[]) {
        window.dataLayer?.push(args);
      };
      window.gtag?.("js", new Date());
      window.gtag?.("config", ga4Id);
    }

    // Meta Pixel
    const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    if (metaId && typeof window.fbq === "undefined") {
      // minimal fbq stub + script injection
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const n: any = function (...args: unknown[]) {
        (n.q = n.q || []).push(args);
      };
      n.q = [];
      n.version = "2.0";
      window.fbq = n;
      const s = document.createElement("script");
      s.src = "https://connect.facebook.net/en_US/fbevents.js";
      s.async = true;
      document.head.appendChild(s);
      window.fbq?.("init", metaId);
      window.fbq?.("track", "PageView");
    }
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Banner consenso cookie"
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
    >
      <div className="max-w-3xl mx-auto bg-superficie border border-bordo rounded-card-lg p-5 md:p-6 shadow-2xl">
        <p className="text-sm text-testo/80 leading-relaxed mb-4">
          Questo sito usa cookie tecnici (necessari) e, con il tuo consenso,
          cookie di marketing (Google Analytics, Meta Pixel). Puoi scegliere.{" "}
          <a
            href="/informativa-sui-cookie"
            className="text-viola underline hover:text-viola-hover text-xs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Informativa cookie
          </a>
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={accept}
            className="flex-1 py-2.5 px-5 rounded-btn bg-viola text-testo text-sm font-medium hover:bg-viola-hover transition-colors"
          >
            Accetto tutto
          </button>
          <button
            onClick={decline}
            className="flex-1 py-2.5 px-5 rounded-btn border border-bordo text-testo/60 text-sm hover:border-testo/30 transition-colors"
          >
            Solo tecnici
          </button>
        </div>
      </div>
    </div>
  );
}

