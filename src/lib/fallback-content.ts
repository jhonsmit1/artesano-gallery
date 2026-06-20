import type { HomeContent, SiteSettings } from "@/sanity/lib/types";

// Contenido de respaldo: permite ver el sitio funcionando antes de
// conectar Sanity. El administrador lo reemplaza desde el CMS.

export const FALLBACK_SETTINGS: SiteSettings = {
  brandName: "Artesano Gallery",
  tagline: "Mixología, arte y atmósfera",
  navLinks: [
    { label: "Home", anchor: "hero" },
    { label: "Historia", anchor: "historia" },
    { label: "Menús", anchor: "menus" },
    { label: "Contacto", anchor: "contact" },
  ],
  socials: [
    {
      platform: "Instagram",
      url: "https://instagram.com/artesanogallery",
    },
    {
      platform: "Facebook",
      url: "https://facebook.com/artesanogallery",
    },
  ],
  seo: {
    metaTitle: "Artesano Gallery — Mixología & Arte Local",
    metaDescription:
      "Una experiencia inmersiva de coctelería de autor, arte y atmósfera. Reserva tu visita.",
  },
  business: {
    legalName: "Artesano Gallery",
    phone: "(215) 483-9273",
    email: "events@artesanogallery.com",
    priceRange: "$$",
    streetAddress: "109 Green Ln",
    locality: "Philadelphia",
    region: "PA",
    postalCode: "19127",
    country: "US",
    openingHours: ["Tu-Su 18:00-02:00"],
    keywordsToExclude: [],
  },
};

export const FALLBACK_HOME: HomeContent = {
  hero: {
    eyebrow: "Cocktail Bar & Art Space",
    title: "Donde la mixología se convierte en arte",
    subtitle:
      "Una experiencia sensorial entre cócteles de autor, luz y obra local.",
    ctaLabel: "Descubre",
    ctaAnchor: "momentos",
  },
  story: {
    welcomeCaption: "Conoce más",
    background: "black",
    eyebrow: "Nuestra historia",
    title: "Artesano Bar",
    body: [
      {
        _type: "block",
        _key: "s1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s1s",
            text: "Transformamos un espacio industrial en un refugio donde el metal forjado a mano, la arquitectura y la coctelería de autor se encuentran. Cada detalle es parte de un relato pensado para los sentidos.",
            marks: [],
          },
        ],
      },
    ],
    ctaLabel: "Conoce el menú",
    ctaHref: "#contact",
  },
  menu: {
    eyebrow: "La Carta",
    title: "El Menú",
    cards: [
      { title: "Bebidas" },
      { title: "Comida" },
      { title: "Eventos" },
    ],
  },
  closing: {
    eyebrow: "El atardecer",
    title: "Hasta la próxima copa",
    subtitle:
      "Cruza las puertas y llévate la atmósfera. Te esperamos al caer la tarde.",
    ctaLabel: "Reserva tu experiencia",
    ctaAnchor: "contact",
  },
  contact: {
    eyebrow: "Contacto",
    title: "Reserva tu experiencia",
    text: "Déjanos tus datos y nuestro equipo te contactará.",
    buttonLabel: "Enviar",
    successMessage: "¡Gracias! Te contactaremos pronto.",
  },
};
