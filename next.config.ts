import type { NextConfig } from "next";

/**
 * Two build modes, one codebase:
 *
 * 1. `npm run build:pages` → `STATIC_EXPORT=1 next build`
 *    Fully prerendered static site in `out/` — this is what Cloudflare Pages hosts (no
 *    server, no database, free hosting). Images skip the Next optimizer (`unoptimized`)
 *    because there is no Node process to run it; the assets are already emitted as
 *    optimized webp by the build.
 *
 * 2. `npm run build` + `npm start` → normal Node server build.
 *    Adds the `/api/*` route handlers (contact, newsletter, orders, search) and real
 *    Postgres reads/writes through Drizzle when `DATABASE_URL` is set.
 */
const staticExport = process.env.STATIC_EXPORT === "1";
// Optional base path, e.g. BASE_PATH=/daroonik when the site is hosted under a GitHub Pages
// project subpath (https://user.github.io/repo/). Leave unset for root/custom-domain hosting.
const basePath = process.env.BASE_PATH || undefined;

// Cloudflare Pages sets CF_PAGES=1, and `npm run build` dispatches to the static export when it
// sees it (scripts/build.mjs). Reaching Next on Pages *without* STATIC_EXPORT=1 therefore means
// the build command was replaced by a raw `next build`: that produces a Node bundle (ƒ /api/* in
// the route table) and no `out/` directory, so Pages would publish nothing useful. Fail loudly
// with the fix instead of shipping a broken deploy.
const onCloudflarePages = process.env.CF_PAGES === "1";
if (onCloudflarePages && !staticExport && process.env.PAGES_ALLOW_SERVER_BUILD !== "1") {
  throw new Error(
    [
      "",
      "  Cloudflare Pages build detected, but this is not a static export.",
      "  `next build` was invoked directly; the Pages build command must go through the",
      "  project's build script so the static export (and the /api parking) happens:",
      "    • Build command          →  npm run build:pages   (or plain `npm run build`)",
      "    • Build output directory →  out",
      "    • Framework preset       →  None / Other (the Next.js preset runs `next build`)",
      "  (Escape hatch for a real Node deploy on Cloudflare: PAGES_ALLOW_SERVER_BUILD=1)",
      "",
    ].join("\n"),
  );
}

const nextConfig: NextConfig = {
  ...(staticExport
    ? {
        output: "export",
        images: { unoptimized: true },
      }
    : {
        images: {
          formats: ["image/avif", "image/webp"],
          deviceSizes: [390, 640, 768, 1024, 1280, 1440, 1920],
          imageSizes: [64, 96, 128, 190, 256, 384],
        },
      }),
  poweredByHeader: false,
};
if (basePath) nextConfig.basePath = basePath;

export default nextConfig;
