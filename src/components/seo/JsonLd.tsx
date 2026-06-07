import type { SiteSettings } from "@/sanity/lib/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://artesanogallery.com";

/**
 * Datos estructurados Schema.org para SEO local.
 * Tipología BarOrPub (subtipo de LocalBusiness) para posicionamiento local.
 */
export function JsonLd({ settings }: { settings: SiteSettings }) {
  const b = settings.business ?? {};

  const data = {
    "@context": "https://schema.org",
    "@type": ["BarOrPub", "LocalBusiness"],
    name: settings.brandName,
    legalName: b.legalName,
    description: settings.seo?.metaDescription,
    url: SITE_URL,
    image: settings.seo?.ogImageUrl,
    telephone: b.phone,
    email: b.email,
    priceRange: b.priceRange,
    servesCuisine: ["Cocktails", "Mixology"],
    address: b.streetAddress
      ? {
          "@type": "PostalAddress",
          streetAddress: b.streetAddress,
          addressLocality: b.locality,
          addressRegion: b.region,
          postalCode: b.postalCode,
          addressCountry: b.country,
        }
      : undefined,
    geo:
      b.geo?.lat && b.geo?.lng
        ? {
            "@type": "GeoCoordinates",
            latitude: b.geo.lat,
            longitude: b.geo.lng,
          }
        : undefined,
    openingHours: b.openingHours,
    sameAs: settings.socials?.map((s) => s.url),
  };

  return (
    <script
      type="application/ld+json"
      // El contenido proviene del CMS administrado; JSON serializado de forma segura.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
