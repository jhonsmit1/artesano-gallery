// Variables de entorno centralizadas para Sanity.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

// Valores de respaldo válidos para que el cliente no falle al instanciarse
// cuando aún no hay credenciales. Las peticiones reales se evitan mediante
// `isSanityConfigured`.
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";

export const readToken = process.env.SANITY_API_READ_TOKEN || "";

/**
 * Indica si el CMS está configurado. Permite renderizar el sitio con contenido
 * de respaldo (fallback) mientras Sanity aún no tiene credenciales reales.
 */
export const isSanityConfigured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET,
);
