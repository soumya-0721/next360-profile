import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

/*
  Domain confirmed (SITE_URL defaults to https://next360.in): crawlers are
  allowed in and pointed at the sitemap. If SITE_URL is ever emptied,
  this falls back to keeping crawlers out rather than indexing a wrong host.
*/
export default function robots(): MetadataRoute.Robots {
  if (!SITE_URL) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
