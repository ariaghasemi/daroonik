import localFont from "next/font/local";

/**
 * Self-hosted Persian fonts, wired through `next/font/local`.
 *
 * Faces are served as woff2 (`npm run fonts:build` converts the TTF sources next to
 * them) — ~620KB of TTF became ~220KB of woff2. next/font then emits `font-display: swap`,
 * preloads the faces each page needs and hashes the URLs so they can be cached forever.
 *
 * This replaces the previous hand-written `@font-face` block in globals.css, which had two
 * real bugs:
 *   • it pointed at raw, un-hashed, un-preloaded TTFs (flash of unstyled Persian text);
 *   • `Kalameh-Black.ttf` was in fact a woff2 payload wearing a .ttf name and declared
 *     `format("truetype")`, so the Black weight used by every h1–h4 never applied and all
 *     headings silently fell back to the body font. The file is now correctly named
 *     `Kalameh-Black.woff2` and declared as woff2.
 *
 * `variable` exposes each family as a CSS custom property; `globals.css` maps the
 * design tokens (--font-sans / --font-display / --font-num) onto them.
 *
 * `Rokh-*.{ttf,woff2}` sit in src/fonts but are not registered on purpose: no component
 * asks for them, and registering a face makes next/font preload it on every page.
 */
export const fontSans = localFont({
  src: [
    { path: "../fonts/Dana-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Dana-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/Dana-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-dana",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: false,
});

export const fontDisplay = localFont({
  src: [
    { path: "../fonts/Kalameh-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/Kalameh-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-kalameh",
  display: "swap",
  fallback: ["var(--font-dana)", "system-ui", "sans-serif"],
  adjustFontFallback: false,
});

export const fontNum = localFont({
  src: [
    { path: "../fonts/Peyda-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Peyda-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/Peyda-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-peyda",
  display: "swap",
  fallback: ["var(--font-dana)", "system-ui", "sans-serif"],
  adjustFontFallback: false,
});

/** Applied to <html> in the root layout. */
export const fontVariables = `${fontSans.variable} ${fontDisplay.variable} ${fontNum.variable}`;
