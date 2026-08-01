"use client";

import Image from "next/image";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { urlForImage } from "@/sanity/lib/image";
import type { GalleryContent } from "@/sanity/lib/types";

// Patrón de tamaños (cíclico) para un collage variado: grande, alta, ancha,
// normales... Con grid-auto-flow: dense se acomodan sin huecos.
const SPANS = [
  { c: 2, r: 2 }, // grande
  { c: 1, r: 1 },
  { c: 1, r: 2 }, // alta
  { c: 2, r: 1 }, // ancha
  { c: 1, r: 1 },
  { c: 1, r: 1 },
  { c: 2, r: 2 }, // grande
  { c: 1, r: 2 }, // alta
  { c: 1, r: 1 },
  { c: 2, r: 1 }, // ancha
];

// Ligera inclinación (foto pegada) por posición; se endereza al hover.
const TILTS = [-2, 1.4, -1, 1.8, -1.6, 0.8, -1.2, 1.2, -0.8, 1.6];

/**
 * Collage (galería del sitio): mosaico tipo editorial con fotos de distintos
 * tamaños (grande / alta / ancha), marco blanco estilo foto y leve inclinación.
 * Pensado para 20+ imágenes. Editable desde el Studio (grupo "Collage").
 */
export function Collage({ data }: { data: GalleryContent }) {
  const root = useRef<HTMLDivElement>(null);

  const images = (data.images ?? []).filter((img) => img?.asset);

  useGSAP(
    () => {
      if (images.length === 0) return;

      gsap.from("[data-collage-head]", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });

      const items = gsap.utils.toArray<HTMLElement>("[data-collage-item]");
      gsap.set(items, { opacity: 0, y: 50 });
      const batch = ScrollTrigger.batch(items, {
        start: "top 94%",
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            overwrite: true,
          }),
      });

      return () => batch.forEach((b) => b.kill());
    },
    { scope: root, dependencies: [images.length] },
  );

  if (images.length === 0) {
    return (
      <section
        id="galeria"
        className="flex min-h-[50svh] items-center justify-center bg-[#f6f1e8] text-[#a9743c]"
      >
        <p className="text-sm uppercase tracking-[0.3em]">
          Sube fotos del collage en el Studio
        </p>
      </section>
    );
  }

  return (
    <section
      id="galeria"
      ref={root}
      className="bg-[#f6f1e8] py-24 text-[#33241a] sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          {data.eyebrow && (
            <p
              data-collage-head
              className="mb-3 text-xs uppercase tracking-[0.4em] text-[#a9743c]"
            >
              {data.eyebrow}
            </p>
          )}
          {data.title && (
            <h2
              data-collage-head
              className="text-balance text-3xl font-semibold leading-tight text-[#2a1d14] sm:text-4xl lg:text-5xl"
            >
              {data.title}
            </h2>
          )}
        </div>

        {/* Bento: 4 columnas en desktop; filas fijas + spans variados. */}
        <div
          className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
          style={{
            gridAutoRows: "clamp(120px, 15vw, 190px)",
            gridAutoFlow: "dense",
          }}
        >
          {images.map((img, i) => {
            const span = SPANS[i % SPANS.length];
            const tilt = TILTS[i % TILTS.length];
            const url = urlForImage(img).width(1200).url();
            return (
              <div
                key={i}
                data-collage-item
                style={{
                  gridColumn: `span ${span.c}`,
                  gridRow: `span ${span.r}`,
                }}
              >
                {/* Marco blanco tipo foto, con leve inclinación que se endereza. */}
                <div
                  className="group relative h-full w-full rounded-md bg-white p-1.5 shadow-[0_6px_20px_rgba(80,60,40,0.18)] transition-all duration-500 ease-out hover:z-10 hover:scale-[1.03] hover:shadow-[0_14px_34px_rgba(80,60,40,0.3)] hover:![rotate:0deg]"
                  style={{ rotate: `${tilt}deg` }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-sm">
                    <Image
                      src={url}
                      alt={img.alt ?? `Artesano ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      placeholder={img.lqip ? "blur" : "empty"}
                      blurDataURL={img.lqip}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
