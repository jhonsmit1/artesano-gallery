import { defineField, defineType } from "sanity";

export const home = defineType({
  name: "home",
  title: "Landing (Inicio)",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "story", title: "Bienvenida e Historia" },
    { name: "menu", title: "Carrusel del Menú" },
    { name: "closing", title: "Cierre (salida/atardecer)" },
    { name: "contact", title: "Contacto" },
  ],
  fields: [
    // -------------------- HERO --------------------
    defineField({
      name: "hero",
      title: "Hero / Experiencia inmersiva",
      type: "object",
      group: "hero",
      fields: [
        { name: "eyebrow", title: "Antetítulo", type: "string" },
        { name: "title", title: "Título principal", type: "string" },
        { name: "subtitle", title: "Subtítulo", type: "text", rows: 2 },
        { name: "ctaLabel", title: "Texto del botón", type: "string" },
        { name: "ctaAnchor", title: "Ancla del botón", type: "string" },
        {
          name: "poster",
          title: "Imagen póster (mientras carga el video)",
          type: "image",
          options: { hotspot: true },
        },
        {
          name: "videoDesktop",
          title: "Video de fondo (Desktop)",
          type: "file",
          options: { accept: "video/*" },
        },
        {
          name: "videoMobile",
          title: "Video de fondo (Mobile)",
          type: "file",
          options: { accept: "video/*" },
        },
        {
          name: "videoDesktopUrl",
          title: "URL video Desktop (Cloudinary/Vercel Blob)",
          description: "Alternativa recomendada: hospeda el video fuera del CMS.",
          type: "url",
        },
        {
          name: "videoMobileUrl",
          title: "URL video Mobile (Cloudinary/Vercel Blob)",
          type: "url",
        },
      ],
    }),
    // -------------------- STORY (Bienvenida e Historia) --------------------
    defineField({
      name: "story",
      title: "Bienvenida e Historia",
      description:
        "Pantalla de bienvenida con el logo y, debajo, la historia en dos columnas (texto + video del lugar).",
      type: "object",
      group: "story",
      fields: [
        // -- Pantalla de bienvenida --
        {
          name: "logo",
          title: "Logo (pantalla de bienvenida)",
          description: "Logotipo centrado sobre fondo plano. PNG/SVG transparente recomendado.",
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
        },
        {
          name: "welcomeCaption",
          title: "Leyenda de bienvenida",
          type: "string",
          initialValue: "Conoce más",
        },
        {
          name: "background",
          title: "Color de fondo de la bienvenida",
          type: "string",
          options: {
            list: [
              { title: "Negro", value: "black" },
              { title: "Blanco", value: "white" },
            ],
            layout: "radio",
          },
          initialValue: "black",
        },
        // -- Columna izquierda (texto / historia) --
        {
          name: "eyebrow",
          title: "Antetítulo (col. izquierda)",
          type: "string",
        },
        {
          name: "title",
          title: "Título de la historia",
          type: "string",
          initialValue: "Artesano Bar",
        },
        {
          name: "body",
          title: "Texto narrativo",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "ctaLabel",
          title: "Texto del botón",
          type: "string",
          initialValue: "Conoce el menú",
        },
        {
          name: "ctaHref",
          title: "Destino del botón",
          description:
            "Ancla interna (ej: #contact) o URL completa. Si se deja vacío y hay carta PDF, se usa esa.",
          type: "string",
        },
        // -- Columna derecha (media / video ambiental) --
        {
          name: "mediaPoster",
          title: "Imagen póster del video (col. derecha)",
          type: "image",
          options: { hotspot: true },
        },
        {
          name: "mediaVideo",
          title: "Video del lugar — archivo",
          description: "Recorrido interno (autoplay, loop, silenciado).",
          type: "file",
          options: { accept: "video/*" },
        },
        {
          name: "mediaVideoUrl",
          title: "URL video del lugar (Cloudinary/Vercel Blob)",
          type: "url",
        },
      ],
    }),
    // -------------------- MENU (Carrusel del menú) --------------------
    defineField({
      name: "menu",
      title: "Carrusel del Menú (La Carta)",
      description:
        "Tarjetas horizontales (Bebidas, Comida, Eventos...). Cada una con foto, nombre y un PDF que se abre en otra pestaña.",
      type: "object",
      group: "menu",
      fields: [
        { name: "eyebrow", title: "Antetítulo", type: "string" },
        { name: "title", title: "Título de la sección", type: "string" },
        {
          name: "cards",
          title: "Tarjetas del menú",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Nombre (ej: Bebidas)",
                  type: "string",
                },
                {
                  name: "image",
                  title: "Foto",
                  type: "image",
                  options: { hotspot: true },
                  fields: [
                    { name: "alt", title: "Texto alternativo", type: "string" },
                  ],
                },
                {
                  name: "pdf",
                  title: "PDF (carta de esta categoría)",
                  type: "file",
                  options: { accept: "application/pdf" },
                },
                {
                  name: "pdfUrl",
                  title: "URL PDF externo (alternativa)",
                  description:
                    "Si el PDF está hospedado fuera, pega la URL aquí (tiene prioridad sobre el archivo).",
                  type: "url",
                },
              ],
              preview: {
                select: { title: "title", media: "image" },
              },
            },
          ],
        },
      ],
    }),
    // -------------------- CLOSING (Cierre / atardecer) --------------------
    defineField({
      name: "closing",
      title: "Cierre (salida / atardecer)",
      description:
        "Escena espejo del Hero: la perspectiva avanza desde el interior hacia afuera cruzando las puertas, revelando el atardecer. Texto opcional y botón a contacto.",
      type: "object",
      group: "closing",
      fields: [
        { name: "eyebrow", title: "Antetítulo", type: "string" },
        { name: "title", title: "Título", type: "string" },
        { name: "subtitle", title: "Subtítulo", type: "text", rows: 2 },
        {
          name: "ctaLabel",
          title: "Texto del botón",
          type: "string",
          initialValue: "Reserva tu experiencia",
        },
        {
          name: "ctaAnchor",
          title: "Ancla del botón (sección destino)",
          type: "string",
          initialValue: "contact",
        },
        {
          name: "poster",
          title: "Imagen póster (mientras carga)",
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
    // -------------------- CONTACT --------------------
    defineField({
      name: "contact",
      title: "Contacto y captación",
      type: "object",
      group: "contact",
      fields: [
        { name: "eyebrow", title: "Antetítulo", type: "string" },
        { name: "title", title: "Título", type: "string" },
        { name: "text", title: "Texto", type: "text", rows: 3 },
        { name: "buttonLabel", title: "Texto del botón", type: "string" },
        {
          name: "successMessage",
          title: "Mensaje de éxito",
          type: "string",
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Landing (Inicio)" }),
  },
});
