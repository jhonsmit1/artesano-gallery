import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configuración del sitio",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "nav", title: "Navegación" },
    { name: "seo", title: "SEO" },
    { name: "business", title: "Negocio (SEO local)" },
  ],
  fields: [
    defineField({
      name: "brandName",
      title: "Nombre de marca",
      type: "string",
      group: "general",
      initialValue: "Artesano Gallery",
    }),
    defineField({
      name: "logo",
      title: "Logo del header",
      description:
        "Logo que aparece en la barra superior. PNG/SVG con fondo transparente. Si se deja vacío, se usa el ícono de la copa por defecto.",
      type: "image",
      group: "general",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
    }),
    defineField({
      name: "tagline",
      title: "Eslogan",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "navLinks",
      title: "Enlaces del menú",
      type: "array",
      group: "nav",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Texto", type: "string" },
            {
              name: "anchor",
              title: "Ancla (id de sección, ej: concept)",
              type: "string",
            },
          ],
          preview: {
            select: { title: "label", subtitle: "anchor" },
          },
        },
      ],
    }),
    defineField({
      name: "menuPdf",
      title: "Carta del bar (PDF)",
      description:
        "Sube aquí el PDF de la carta. El botón de menú lo abrirá dinámicamente.",
      type: "file",
      group: "general",
      options: { accept: "application/pdf" },
    }),
    defineField({
      name: "reservationUrl",
      title: "Enlace de reservas",
      description:
        "URL del sistema de reservas (ej: OpenTable, Resy) o deja vacío para enlazar a la sección de contacto.",
      type: "url",
      group: "general",
    }),
    defineField({
      name: "socials",
      title: "Redes sociales",
      type: "array",
      group: "general",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", title: "Plataforma", type: "string" },
            { name: "url", title: "URL", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO por defecto",
      type: "object",
      group: "seo",
      fields: [
        { name: "metaTitle", title: "Meta título", type: "string" },
        {
          name: "metaDescription",
          title: "Meta descripción",
          type: "text",
          rows: 3,
        },
        {
          name: "ogImage",
          title: "Imagen para redes (OG)",
          type: "image",
        },
      ],
    }),
    defineField({
      name: "business",
      title: "Datos del negocio",
      description: "Se usan para los datos estructurados Schema.org (LocalBusiness / BarOrPub).",
      type: "object",
      group: "business",
      fields: [
        { name: "legalName", title: "Razón social", type: "string" },
        { name: "phone", title: "Teléfono", type: "string" },
        { name: "email", title: "Email", type: "string" },
        {
          name: "priceRange",
          title: "Rango de precios (ej: $$)",
          type: "string",
        },
        { name: "streetAddress", title: "Dirección", type: "string" },
        { name: "locality", title: "Ciudad", type: "string" },
        { name: "region", title: "Región / Estado", type: "string" },
        { name: "postalCode", title: "Código postal", type: "string" },
        { name: "country", title: "País (ISO, ej: MX)", type: "string" },
        {
          name: "geo",
          title: "Coordenadas",
          type: "object",
          fields: [
            { name: "lat", title: "Latitud", type: "number" },
            { name: "lng", title: "Longitud", type: "number" },
          ],
        },
        {
          name: "openingHours",
          title: "Horarios (formato SEO, ej: Mo-Su 16:00-02:00)",
          description:
            "SOLO para Google/SEO (Schema.org). Usa el formato técnico: días en inglés abreviado y hora 24h. Ej: 'Mo-Su 16:00-02:00'. No se muestra en la web.",
          type: "array",
          of: [{ type: "string" }],
        },
        {
          name: "hoursText",
          title: "Horarios (texto para mostrar en la web)",
          description:
            "Lo que ve el visitante en el footer. Escribe libremente. Ej: 'Lunes a Domingo' en una línea y '4pm - 2am' en otra (Enter para salto de línea).",
          type: "text",
          rows: 2,
        },
        {
          name: "keywordsToExclude",
          title: "Palabras clave a excluir del indexado",
          description:
            "Términos corporativos que NO quieres posicionar. Se añaden como reglas en robots.txt.",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Configuración del sitio" }),
  },
});
