import type { MetadataRoute } from "next";

import { SEO_ROUTES, SITE_URL } from "@/lib/seo";

/*
  Absolute URLs come from SITE_URL (confirmed https://next360.in). If it is
  ever emptied, this returns an empty map rather than publishing entries
  under a placeholder host.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_URL) return [];
  return SEO_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date("2026-09-25"),
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));
}
