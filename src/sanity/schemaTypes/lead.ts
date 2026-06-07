import { defineField, defineType } from "sanity";

export const lead = defineType({
  name: "lead",
  title: "Leads (Contacto)",
  type: "document",
  // Copia de respaldo de los envíos del formulario.
  readOnly: true,
  fields: [
    defineField({ name: "name", title: "Nombre", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Teléfono", type: "string" }),
    defineField({ name: "message", title: "Mensaje", type: "text" }),
    defineField({
      name: "createdAt",
      title: "Fecha",
      type: "datetime",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "email" },
  },
});
