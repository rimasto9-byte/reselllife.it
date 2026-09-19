"use client";

import { trackEvent } from "@/lib/analytics";

interface BuyButtonProps {
  url: string;
  productId: string;
  price: number;
  label: string;
  ariaLabel: string;
}

export default function BuyButton({
  url,
  productId,
  price,
  label,
  ariaLabel,
}: BuyButtonProps) {
  return (
    <a
      href={url}
      rel="noopener"
      aria-label={ariaLabel}
      onClick={() =>
        trackEvent("fornitore_click", { product: productId, price })
      }
      className="block w-full py-3 px-5 rounded-btn bg-viola text-white font-semibold text-sm text-center hover:bg-viola-hover transition-colors duration-200 min-h-[44px] flex items-center justify-center"
    >
      {label}
    </a>
  );
}
