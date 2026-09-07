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
