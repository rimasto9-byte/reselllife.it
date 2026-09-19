/**
 * lib/analytics.ts — Wrapper per eventi GA4/Meta/TikTok.
 *
 * Nulla si invia prima che l'utente abbia accettato i cookie di marketing
 * (GDPR + Garante Privacy italiano). Il CookieBanner imposta
 * window.__consent = 'accepted' prima di chiamare initAnalytics().
 */

declare global {
  interface Window {
    __consent?: "accepted" | "declined";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer?: any[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (...args: unknown[]) => void };
  }
}

function hasConsent(): boolean {
  return (
    typeof window !== "undefined" && window.__consent === "accepted"
  );
}

export type AnalyticsEvent =
  | "view_hero"
  | "cta_guida_click"
  | "form_start"
  | "form_submit"
  | "form_success"
  | "academy_click"
  | "fornitore_click"
  | "whatsapp_click"
  | "faq_open"
  | "testimonial_open";

export function trackEvent(
  event: AnalyticsEvent,
  params?: Record<string, string | number | boolean>
): void {
  if (!hasConsent()) return;

  // GA4
  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }

  // Meta Pixel — map to standard events where applicable
  if (typeof window.fbq === "function") {
    if (event === "form_success") {
      window.fbq("track", "Lead", params);
    } else if (event === "academy_click") {
      window.fbq("track", "InitiateCheckout", params);
    } else {
      window.fbq("trackCustom", event, params);
    }
  }

  // TikTok Pixel
  if (typeof window.ttq !== "undefined") {
    if (event === "form_success") {
      window.ttq.track("SubmitForm", params);
    } else {
      window.ttq.track(event, params);
    }
  }
}
