import type { PortableTextBlock } from "@portabletext/react";

export type SanityImage = {
  _type: "image";
  asset?: { _ref: string; _type: "reference" };
  alt?: string;
  lqip?: string;
  aspectRatio?: number;
};

export type NavLink = { label: string; anchor: string };
export type Social = { platform: string; url: string };

export type SiteSettings = {
  brandName?: string;
  tagline?: string;
  navLinks?: NavLink[];
  menuPdfUrl?: string;
  socials?: Social[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImageUrl?: string;
  };
  business?: {
    legalName?: string;
    phone?: string;
    email?: string;
    priceRange?: string;
    streetAddress?: string;
    locality?: string;
    region?: string;
    postalCode?: string;
    country?: string;
    geo?: { lat?: number; lng?: number };
    openingHours?: string[];
    keywordsToExclude?: string[];
  };
};

export type HeroContent = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaAnchor?: string;
  posterUrl?: string;
  videoDesktopUrl?: string;
  videoMobileUrl?: string;
};

export type StoryContent = {
  // Pantalla de bienvenida
  logo?: SanityImage;
  welcomeCaption?: string;
  background?: "black" | "white";
  // Columna izquierda (historia)
  eyebrow?: string;
  title?: string;
  body?: PortableTextBlock[];
  ctaLabel?: string;
  ctaHref?: string;
  // Columna derecha (media)
  mediaPosterUrl?: string;
  mediaVideoUrl?: string;
};

export type ConceptContent = {
  eyebrow?: string;
  title?: string;
  body?: PortableTextBlock[];
  media?: SanityImage;
  mediaVideoUrl?: string;
};

export type ScrollVideoContent = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  posterUrl?: string;
  videoDesktopUrl?: string;
  videoMobileUrl?: string;
};

export type Moment = {
  title?: string;
  caption?: string;
  image?: SanityImage;
};

export type MomentsContent = {
  eyebrow?: string;
  title?: string;
  items?: Moment[];
};

export type SpaceContent = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  gallery?: SanityImage[];
};

export type ContactContent = {
  eyebrow?: string;
  title?: string;
  text?: string;
  buttonLabel?: string;
  successMessage?: string;
};

export type HomeContent = {
  hero?: HeroContent;
  story?: StoryContent;
  moments?: MomentsContent;
  concept?: ConceptContent;
  experience?: ScrollVideoContent;
  space?: SpaceContent;
  contact?: ContactContent;
};
