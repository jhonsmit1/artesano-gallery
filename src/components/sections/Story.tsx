"use client";

import Image from "next/image";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";

import { gsap } from "@/lib/gsap";
import type { StoryContent } from "@/sanity/lib/types";

import { PortableText } from "@/components/ui/PortableText";
import { WelcomeReveal } from "@/components/ui/WelcomeReveal";

/**
 * PARTE 2 — Pantalla de bienvenida e Historia.
 *
 *  - Bienvenida: 2-3 logos que se cruzan con el scroll mientras el fondo
 *    transita por tonos cálidos.
 *  - Historia: layout asimétrico de 2 columnas. Izquierda = narrativa;
 *    derecha = video ambiental del lugar.
 *
 * Todo el contenido es editable desde el Studio (grupo "Bienvenida e Historia").
 */
export function Story({ data }: { data: StoryContent }) {
  const root = useRef<HTMLDivElement>(null);

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
    <section ref={root}>
      {/* ---------- Pantalla de bienvenida: imágenes a pantalla completa ---------- */}
      <WelcomeReveal images={data.welcomeImages} caption={data.welcomeCaption} />

      {/* ---------- Historia (2 columnas asimétricas) ---------- */}
      <div
        id="historia"
        className="scroll-mt-24 bg-[#f6f1e8] py-24 text-[#33241a] sm:py-32"
      >
        <div
          data-story-grid
          className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[5fr_7fr] lg:gap-20"
        >
          {/* Columna izquierda: texto */}
          <div>
            {data.eyebrow && (
              <p
                data-reveal
                className="mb-4 text-xs uppercase tracking-[0.35em] text-[#a9743c]"
              >
                {data.eyebrow}
              </p>
            )}
            <h2
              data-reveal
              className="mb-8 text-balance text-4xl font-semibold leading-tight text-[#2a1d14] sm:text-5xl"
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
                className="mt-10 inline-block rounded-full border border-[#a9743c]/50 px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#6a5443] transition-colors hover:border-[#a9743c] hover:bg-[#a9743c] hover:text-[#f6f1e8]"
              >
                {data.ctaLabel}
              </a>
            )}
          </div>

          {/* Columna derecha: video ambiental del lugar */}
          <div
            data-reveal
            className="relative aspect-video overflow-hidden rounded-2xl border border-[#dccdb4] bg-[#efe6d6]"
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
              <div className="flex h-full w-full items-center justify-center text-sm uppercase tracking-[0.3em] text-[#a9743c]/60">
                Video del lugar
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
