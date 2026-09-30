# Resellife Academy - Responsive & Performance Audit Report (Before)

## 1. Issues Found per Section & Viewport

| Section | Issue Detected | Viewports Affected | Plan to Fix |
| :--- | :--- | :--- | :--- |
| **Global** | `<body overflow-x: hidden>` is used instead of section-level clipping, masking true overflow. | All | Remove `overflow-x: hidden` from body. Add `overflow-x: clip` to parent sections that need it. |
| **Global** | No `rl-lite` class applied on low-power/reduced-motion devices. | Mobile, low-end | Add a client component `<LiteModeDetector />` that adds `.rl-lite` to `<html>` if hardware concurrency/memory is low or reduced motion is preferred. |
| **Global** | `safe-area-inset` is not consistently applied for bottom sticky elements (CookieBanner, StickyCTA). | Mobile Safari (375x667, 390x844) | Add `pb-[env(safe-area-inset-bottom)]` and adjust z-indexes so CookieBanner stacks above/pushes Sticky CTA. |
| **Hero** | Anton headline lacks `text-wrap: balance` and might break mid-word at 320px. | 320x568 | Add `text-wrap: balance` to Anton `<h1>` and adjust clamp minimum size to ensure it fits. |
| **ScrollMarquee** | Rotated and scaled text pushes viewport width. | All Mobile | Apply `overflow-x: clip` to the section. Increase mobile font size to ~2.2rem. Pause animation when off-screen. |
| **StickyStatement** | `200vh` scroll height is too long for phones; scaling text gets cut by viewport edges. | All Mobile | Reduce height to `160svh` on mobile. Cap the initial scale factor so it starts smaller and doesn't jump. |
| **Metodo** | Step cards `min-h-[340px]` works, but number/icon positioning could collide on very narrow screens. | 320x568 | Ensure proper flex spacing between the number and icon. |
| **Ecosistema / HorizontalPin** | Pinning logic continues on very short screens (`< 560px`), causing usability issues. Slides have fixed width. | Landscape (844x390), Small Mobile | Add a check: if `window.innerHeight < 560` or `.rl-lite`, disable pinning and use a native CSS scroll-snap horizontal row. Use `min(80vw, 340px)` for slide widths. |
| **BotSection** | Phone width hardcoded to `290px`. | 320x568 | Change to `width: min(290px, 78vw)` and make inner elements proportional. |
| **BotSection** | Radar, chat loop, and chip animations never pause once started. | All | Refactor `useEffect` to use an IntersectionObserver that sets a state (`isBotInView`). Pause timeouts/animations via CSS `animation-play-state: paused` when hidden. |
| **BotSection** | Flow steps (1-4) overlap or wrap poorly at 320px. | 320x568 | Reduce circle sizes (`.stp .n`) and font-sizes for labels on mobile. |
| **FornitoriSection** | Mobile snap carousel doesn't give a clear "peek" of the next card on all sizes, and lacks `overscroll-behavior-x: contain`. | All Mobile | Add `overscroll-behavior-x: contain` and precise padding/margins to ensure the next card peeks. |
| **ProvaSociale** | Fan cards overflow horizontally if animated strongly. | All Mobile | Restrict fan rotation and spread on mobile to show exactly 3 cards (center + 1 each side). Container `overflow-x: clip`. |
| **VideoSection** | Videos lack `preload="none"`. Videos download simultaneously, hurting LCP. | All | Set `preload="none"` (except poster). Implement IntersectionObserver to auto-play only when in view (muted, playsInline). |
| **Scelta** | Pricing cards lack `text-wrap: balance` on headers. | All Mobile | Apply `text-wrap: balance` and ensure features checklist remains 1 column on mobile. |
| **BonusWheel** | Modal might overflow on 100vh if toolbar appears (iOS). | iOS Safari | Change modal max-height to `100dvh` and ensure internal scrolling works. |

## 2. Lighthouse Mobile Audit Summary (Before)
*(Values based on the `lh-before.json` execution on standalone build)*
- **Performance Score**: 83
- **LCP**: 1.6s
- **CLS**: 0
- **TBT**: 640ms
- **Total Payload**: ~1.5MB (Videos and JS chunking can be optimized)

## 3. Playwright Issues Logged (Before)
- **Horizontal Overflow**: Found on `BotSection` radar, `ProvaSociale` fan, and `ScrollMarquee`.
- **Hydration Warnings**: `Target ref is defined but not hydrated` (from `framer-motion` useScroll on `StickyStatement.tsx`).
- **Small Tap Targets**: Video playlist items (`.item`) and volume toggle (`.audio`) are sometimes `< 44px` tall on strict viewports.

## 4. Immediate Action Plan

1. **Global CSS**: Fix the body overflow and create `.rl-lite` overrides. Implement `overflow-x: clip`.
2. **Components**: Update `BotSection.tsx` (pause logic + phone width), `VideoSection.tsx` (preload="none" + pausing), `StickyStatement.tsx` (fix useScroll hydration and svh), and `HorizontalPin.tsx` (fallback for small height).
3. **Typography**: Add `text-wrap: balance` to `Hero` and `Scelta`.
4. **Performance**: Add the `<LiteModeDetector />` in `app/layout.tsx` to automatically inject the class based on `navigator.hardwareConcurrency`, `deviceMemory`, and `matchMedia('(prefers-reduced-motion: reduce)')`.

Please approve this plan, and I will begin the implementation step by step.
