import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import { HOME_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { HomeContent, SiteSettings } from "@/sanity/lib/types";

import { FALLBACK_HOME, FALLBACK_SETTINGS } from "@/lib/fallback-content";

// Revalidación incremental (ISR). Los webhooks de Sanity fuerzan re-builds,
// y este margen cubre cambios entre despliegues.
const REVALIDATE = 60;

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured) return FALLBACK_SETTINGS;
  try {
    const data = await client.fetch<SiteSettings | null>(
      SITE_SETTINGS_QUERY,
      {},
      { next: { revalidate: REVALIDATE, tags: ["siteSettings"] } },
    );
    return data ? { ...FALLBACK_SETTINGS, ...data } : FALLBACK_SETTINGS;
  } catch {
    return FALLBACK_SETTINGS;
  }
}

export async function getHome(): Promise<HomeContent> {
  if (!isSanityConfigured) return FALLBACK_HOME;
  try {
    const data = await client.fetch<HomeContent | null>(
      HOME_QUERY,
      {},
      { next: { revalidate: REVALIDATE, tags: ["home"] } },
    );
    return data ?? FALLBACK_HOME;
  } catch {
    return FALLBACK_HOME;
  }
}
