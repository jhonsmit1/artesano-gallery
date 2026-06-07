import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // CDN para lecturas rápidas en producción (SSG/ISR).
  useCdn: true,
  perspective: "published",
});
