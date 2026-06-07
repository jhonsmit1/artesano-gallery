import { groq } from "next-sanity";

// Proyección reutilizable para assets de archivo (videos, PDF).
const fileAsset = `{
  "url": asset->url,
  "originalFilename": asset->originalFilename
}`;

const imageAsset = `{
  ...,
  "lqip": asset->metadata.lqip,
  "aspectRatio": asset->metadata.dimensions.aspectRatio
}`;

/** Configuración global del sitio (singleton). */
export const SITE_SETTINGS_QUERY = groq`
*[_type == "siteSettings"][0]{
  brandName,
  tagline,
  navLinks[]{ label, "anchor": anchor },
  "menuPdfUrl": menuPdf.asset->url,
  socials[]{ platform, url },
  seo{ metaTitle, metaDescription, "ogImageUrl": ogImage.asset->url },
  business{
    legalName, phone, email, priceRange,
    streetAddress, locality, region, postalCode, country,
    geo, openingHours, keywordsToExclude
  }
}`;

/** Contenido editable de la landing (singleton). */
export const HOME_QUERY = groq`
*[_type == "home"][0]{
  hero{
    eyebrow, title, subtitle, ctaLabel, ctaAnchor,
    "posterUrl": poster.asset->url,
    "videoDesktopUrl": coalesce(videoDesktopUrl, videoDesktop.asset->url),
    "videoMobileUrl": coalesce(videoMobileUrl, videoMobile.asset->url)
  },
  moments{
    eyebrow, title,
    items[]{ title, caption, image${imageAsset} }
  },
  concept{
    eyebrow, title, body,
    media${imageAsset},
    "mediaVideoUrl": coalesce(mediaVideoUrl, mediaVideo.asset->url)
  },
  experience{
    eyebrow, title, subtitle,
    "posterUrl": poster.asset->url,
    "videoDesktopUrl": coalesce(videoDesktopUrl, videoDesktop.asset->url),
    "videoMobileUrl": coalesce(videoMobileUrl, videoMobile.asset->url)
  },
  space{
    eyebrow, title, intro,
    gallery[]${imageAsset}
  },
  contact{ eyebrow, title, text, buttonLabel, successMessage }
}`;
