import { defineField, defineType } from "sanity";

export const home = defineType({
  name: "home",
  title: "Landing (Inicio)",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "story", title: "Bienvenida e Historia" },
    { name: "details", title: "Detalles (desplegables)" },
    { name: "menu", title: "Carrusel del Menú" },
    { name: "gallery", title: "Collage (galería)" },
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
        {
          name: "title",
          title: "Título principal",
          type: "string",
          initialValue: "Artesano Gallery",
        },
        { name: "subtitle", title: "Subtítulo", type: "text", rows: 2 },
        { name: "ctaLabel", title: "Texto del botón", type: "string" },
        { name: "ctaAnchor", title: "Ancla del botón", type: "string" },
        {
          name: "images",
          title: "Imágenes del Hero (galería con scroll)",
          description:
            "Se muestran una tras otra a medida que el visitante hace scroll. Sube 2 o más. La primera es la que se ve al cargar.",
          type: "array",
          of: [
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                { name: "alt", title: "Texto alternativo", type: "string" },
              ],
            },
          ],
          options: { layout: "grid" },
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
          name: "welcomeImages",
          title: "Imágenes de bienvenida (logo a pantalla completa)",
          description:
            "Se muestran a pantalla completa y se cruzan con el scroll. Como cubren toda la pantalla, no se ve el borde de la imagen. Sube 2 o 3.",
          type: "array",
          of: [
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                { name: "alt", title: "Texto alternativo", type: "string" },
              ],
            },
          ],
          options: { layout: "grid" },
        },
        {
          name: "welcomeCaption",
          title: "Leyenda de bienvenida",
          type: "string",
          initialValue: "Conoce más",
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
    // -------------------- DETAILS (desplegables) --------------------
    defineField({
      name: "details",
      title: "Detalles (desplegables)",
      description:
        "Lista de desplegables (acordeón) con una imagen al lado. Cada desplegable tiene un título y sub-items.",
      type: "object",
      group: "details",
      fields: [
        { name: "eyebrow", title: "Antetítulo", type: "string" },
        { name: "title", title: "Título de la sección", type: "string" },
        {
          name: "image",
          title: "Imagen (lado derecho)",
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
        },
        {
          name: "groups",
          title: "Desplegables",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", title: "Título del desplegable", type: "string" },
                {
                  name: "items",
                  title: "Sub-items",
                  type: "array",
                  of: [{ type: "string" }],
                },
              ],
              preview: {
                select: { title: "title", items: "items" },
                prepare: ({ title, items }) => ({
                  title: title || "Desplegable",
                  subtitle: `${(items as string[] | undefined)?.length ?? 0} items`,
                }),
              },
            },
          ],
        },
        {
          name: "linkLabel",
          title: "Texto del enlace (opcional)",
          type: "string",
        },
        {
          name: "linkUrl",
          title: "URL del enlace (opcional)",
          type: "string",
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
    // -------------------- GALLERY (Collage) --------------------
    defineField({
      name: "gallery",
      title: "Collage (galería del sitio)",
      description:
        "Mosaico de fotos del lugar. Sube tantas como quieras (20+ se ve genial). Se acomodan solas en un collage responsivo.",
      type: "object",
      group: "gallery",
      fields: [
        { name: "eyebrow", title: "Antetítulo", type: "string" },
        { name: "title", title: "Título de la sección", type: "string" },
        {
          name: "images",
          title: "Imágenes del collage",
          type: "array",
          of: [
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                { name: "alt", title: "Texto alternativo", type: "string" },
              ],
            },
          ],
          options: { layout: "grid" },
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
