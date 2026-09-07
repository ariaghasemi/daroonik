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

// Cloudflare Pages sets CF_PAGES=1 during its builds. If a Pages build reaches Next without
// STATIC_EXPORT=1, the project's build command is plain `next build`: that produces a Node
// server bundle (ƒ /api/* routes) and no `out/` directory, so Pages publishes nothing useful.
// Fail loudly with the exact fix instead of shipping a broken deploy.
const onCloudflarePages = process.env.CF_PAGES === "1";
if (onCloudflarePages && !staticExport && process.env.PAGES_ALLOW_SERVER_BUILD !== "1") {
  throw new Error(
    [
      "",
      "  Cloudflare Pages build detected, but this is not a static export.",
      "  Fix the Pages project settings (Build & deployment):",
      "    • Build command        →  npm run build:pages",
      "    • Build output directory →  out",
      "    • Framework preset     →  None / Other (the Next.js preset runs `next build`)",
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

export default nextConfig;
