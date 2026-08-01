import type { HomeContent, SiteSettings } from "@/sanity/lib/types";

// Contenido de respaldo: permite ver el sitio funcionando antes de
// conectar Sanity. El administrador lo reemplaza desde el CMS.

export const FALLBACK_SETTINGS: SiteSettings = {
  brandName: "Artesano Gallery",
  tagline: "Mixología, arte y atmósfera",
  navLinks: [
    { label: "Home", anchor: "hero" },
    { label: "Our Story", anchor: "historia" },
    { label: "Resources", anchor: "menus" },
    { label: "Gallery", anchor: "galeria" },
    { label: "Inquire", anchor: "contact" },
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
    title: "Artesano Gallery",
    images: [],
  },
  story: {
    welcomeImages: [],
    welcomeCaption: "Conoce más",
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
  details: {
    eyebrow: "Los detalles",
    title: "Todo lo que incluye",
    groups: [
      {
        title: "Ceremonia",
        items: [
          "Espacios interior y exterior",
          "Sillas para la ceremonia",
          "Ensayo (día previo)",
        ],
      },
      {
        title: "Recepción",
        items: ["Montaje de mesas", "Iluminación ambiental", "Sonido"],
      },
      {
        title: "Alimentos y bebidas",
        items: ["Coctelería de autor", "Menú de degustación", "Bar premium"],
      },
      {
        title: "Suite privada",
        items: ["Área reservada", "Atención dedicada"],
      },
    ],
    linkLabel: "Ver lista de proveedores",
    linkUrl: "#contact",
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
  gallery: {
    eyebrow: "El lugar",
    title: "Un vistazo a Artesano",
    images: [],
  },
  contact: {
    eyebrow: "Contacto",
    title: "Reserva tu experiencia",
    text: "Déjanos tus datos y nuestro equipo te contactará.",
    buttonLabel: "Enviar",
    successMessage: "¡Gracias! Te contactaremos pronto.",
  },
};
