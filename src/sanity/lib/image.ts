import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "@/sanity/env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Genera URLs optimizadas del CDN de Sanity.
 * Ejemplo: urlForImage(img).width(1600).format("webp").url()
 */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}
