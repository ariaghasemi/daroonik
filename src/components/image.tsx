"use client";

import Image from "next/image";
import { BASE_PATH } from "@/lib/base-path";

/**
 * next/image wrapper that prefixes the image `src` with the Next.js basePath.
 *
 * On GitHub Pages project sites (e.g. https://user.github.io/repo/) the site lives
 * under `/repo/`, so an `<BasePathImage src="/images/product/x.webp">` would resolve to
 * `/images/product/x.webp` (404) instead of `/repo/images/product/x.webp`.
 *
 * This component delegates to `next/image` while prepending BASE_PATH (read from
 * NEXT_PUBLIC_BASE_PATH at build time), so images work both on root hosting and on
 * GitHub Pages subpath hosting.
 */
export function BasePathImage(props: React.ComponentPropsWithRef<typeof Image>) {
  return <BasePathImage {...props} src={`${BASE_PATH}${props.src}`} />;
}

export default BasePathImage;
