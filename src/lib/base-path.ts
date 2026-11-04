/**
 * Base path used when the site is hosted under a subpath, e.g. GitHub Pages project site
 * at https://user.github.io/repo/ (basePath = "/repo"). Empty for root/custom-domain hosting.
 *
 * The value is read from NEXT_PUBLIC_BASE_PATH at build time so both server and client code
 * can prefix image/public asset URLs correctly.
 */
export const BASE_PATH = (typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_BASE_PATH
  ? process.env.NEXT_PUBLIC_BASE_PATH
  : "").replace(/\/+$/, "");
