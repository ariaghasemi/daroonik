export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { SITE } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/daroonik/api/", "/daroonik/account/", "/daroonik/checkout/", "/daroonik/cart/", "/daroonik/search/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: new URL(SITE.url).origin,
  };
}
