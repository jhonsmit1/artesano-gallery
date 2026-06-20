import { groq } from "next-sanity";

const imageAsset = `{
  ...,
  "lqip": asset->metadata.lqip,
  "aspectRatio": asset->metadata.dimensions.aspectRatio
}`;

/** Configuración global del sitio (singleton). */
export const SITE_SETTINGS_QUERY = groq`
*[_type == "siteSettings"][0]{
  brandName,
  "logoUrl": logo.asset->url,
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
  story{
    "logo": logo{ ..., "lqip": asset->metadata.lqip, "aspectRatio": asset->metadata.dimensions.aspectRatio },
    welcomeCaption, background,
    eyebrow, title, body, ctaLabel, ctaHref,
    "mediaPosterUrl": mediaPoster.asset->url,
    "mediaVideoUrl": coalesce(mediaVideoUrl, mediaVideo.asset->url)
  },
  menu{
    eyebrow, title,
    cards[]{
      title,
      image${imageAsset},
      "pdfUrl": coalesce(pdfUrl, pdf.asset->url)
    }
  },
  closing{
    eyebrow, title, subtitle, ctaLabel, ctaAnchor,
    "posterUrl": poster.asset->url
  },
  contact{ eyebrow, title, text, buttonLabel, successMessage }
}`;
