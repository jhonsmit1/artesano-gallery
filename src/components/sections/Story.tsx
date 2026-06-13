"use client";

import Image from "next/image";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";

import { gsap } from "@/lib/gsap";
import type { StoryContent } from "@/sanity/lib/types";

import { CocktailPour } from "@/components/ui/CocktailPour";
import { PortableText } from "@/components/ui/PortableText";

/**
 * PARTE 2 — Pantalla de bienvenida e Historia.
 *
 *  - Bienvenida: el cóctel "se sirve" (canvas + scroll-scrub) y al llenarse
 *    aparece el wordmark. Si el Studio tiene un logo propio, se muestra ese.
 *  - Historia: layout asimétrico de 2 columnas. Izquierda = narrativa
 *    (arquitectura, metal, concepto). Derecha = video ambiental del lugar.
 *
 * Todo el contenido es editable desde el Studio (grupo "Bienvenida e Historia").
 */
export function Story({ data }: { data: StoryContent }) {
  const root = useRef<HTMLDivElement>(null);

  const isWhite = data.background === "white";

  useGSAP(
    () => {
      // Revelado de la historia por columnas al entrar en viewport.
      const reveal = gsap.from("[data-reveal]", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-story-grid]", start: "top 75%" },
      });

      return () => {
        reveal.scrollTrigger?.kill();
        reveal.kill();
      };
    },
    { scope: root },
  );

  return (
    <section id="historia" ref={root}>
      {/* ---------- Pantalla de bienvenida: cóctel servido (canvas) ---------- */}
      <CocktailPour caption={data.welcomeCaption} light={isWhite} />

      {/* ---------- Historia (2 columnas asimétricas) ---------- */}
      <div className="bg-neutral-950 py-24 text-neutral-100 sm:py-32">
        <div
          data-story-grid
          className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[5fr_7fr] lg:gap-20"
        >
          {/* Columna izquierda: texto */}
          <div>
            {data.eyebrow && (
              <p
                data-reveal
                className="mb-4 text-xs uppercase tracking-[0.35em] text-neutral-500"
              >
                {data.eyebrow}
              </p>
            )}
            <h2
              data-reveal
              className="mb-8 text-balance text-4xl font-semibold leading-tight sm:text-5xl"
            >
              {data.title ?? "Artesano Bar"}
            </h2>
            <div data-reveal>
              <PortableText value={data.body} />
            </div>
            {data.ctaLabel && (
              <a
                data-reveal
                href={data.ctaHref || "#contact"}
                className="mt-10 inline-block rounded-full border border-neutral-600 px-8 py-3 text-sm font-medium uppercase tracking-widest text-neutral-100 transition-colors hover:border-neutral-100 hover:bg-neutral-100 hover:text-neutral-950"
              >
                {data.ctaLabel}
              </a>
            )}
          </div>

          {/* Columna derecha: video ambiental del lugar */}
          <div
            data-reveal
            className="relative aspect-video overflow-hidden rounded-2xl bg-neutral-900"
          >
            {data.mediaVideoUrl ? (
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={data.mediaPosterUrl}
              >
                <source src={data.mediaVideoUrl} />
              </video>
            ) : data.mediaPosterUrl ? (
              <Image
                src={data.mediaPosterUrl}
                alt={data.title ?? "El lugar"}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm uppercase tracking-[0.3em] text-neutral-600">
                Video del lugar
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
