import type { StructureResolver } from "sanity/structure";

// Estructura del Studio: documentos únicos (singletons) + lista de leads.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenido")
    .items([
      S.listItem()
        .title("Configuración del sitio")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("Landing (Inicio)")
        .id("home")
        .child(S.document().schemaType("home").documentId("home")),
      S.divider(),
      S.documentTypeListItem("lead").title("Leads (Contacto)"),
    ]);
