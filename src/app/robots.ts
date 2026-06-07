import type { MetadataRoute } from "next";

import { getSiteSettings } from "@/lib/data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://artesanogallery.com";

export const dynamic = "force-static";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();
  const keywords = settings.business?.keywordsToExclude ?? [];

  // Aislamiento de marca: bloquea rutas que contengan términos corporativos
  // definidos en el CMS, además del Studio.
  const disallow = [
    "/studio",
    ...keywords
      .map((k) => k.trim())
      .filter(Boolean)
      .map((k) => `/*${encodeURIComponent(k)}*`),
  ];

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow,
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
