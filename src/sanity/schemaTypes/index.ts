import type { SchemaTypeDefinition } from "sanity";

import { home } from "./home";
import { lead } from "./lead";
import { siteSettings } from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, home, lead],
};
