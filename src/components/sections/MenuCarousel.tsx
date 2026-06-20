"use client";

import Image from "next/image";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { urlForImage } from "@/sanity/lib/image";
import type { MenuContent } from "@/sanity/lib/types";

/**
 * PARTE 3 — El carrusel del menú ("La Carta").
 *
 * Lógica: scroll vertical -> desplazamiento horizontal. La sección se fija
 * (pin) y las tarjetas se panean lateralmente con el scroll. Cada tarjeta
 * enlaza a su PDF, que se abre en una pestaña nueva.
 *
 * Editable desde el Studio (grupo "Carrusel del Menú"): nombres, fotos y PDFs.
 */
export function MenuCarousel({ data }: { data: MenuContent }) {
  const root = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cards = data.cards ?? [];

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track || cards.length === 0) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) return; // sin pin: el track se ve con scroll normal/horizontal

      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        scrub: 1,
        animation: tween,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });

      // Entrada suave de cada tarjeta al aparecer en el paneo horizontal.
      const panels = gsap.utils.toArray<HTMLElement>("[data-menu-card]");
      panels.forEach((panel) => {
        gsap.from(panel, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: "left 85%",
          },
        });
      });

      return () => {
        st.kill();
        tween.kill();
      };
    },
    { scope: root, dependencies: [cards.length] },
  );

  if (cards.length === 0) {
    return (
      <section
        id="menus"
        className="flex h-svh items-center justify-center bg-neutral-950 text-neutral-500"
      >
        <p className="text-sm uppercase tracking-[0.3em]">
          Añade tarjetas del menú en el Studio
        </p>
      </section>
    );
  }

  return (
    <section
      id="menus"
      ref={root}
      className="relative h-svh overflow-hidden bg-neutral-950 text-neutral-100"
    >
      {/* Encabezado fijo de la sección */}
      <div className="pointer-events-none absolute left-6 top-8 z-20 sm:left-10">
        {data.eyebrow && (
          <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-500">
            {data.eyebrow}
          </p>
        )}
        {data.title && (
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            {data.title}
          </h2>
        )}
      </div>

      {/* Pista horizontal de tarjetas */}
      <div
        ref={trackRef}
        className="flex h-full w-max items-center gap-6 px-[8vw] will-change-transform"
      >
        {cards.map((card, i) => {
          const imageUrl = card.image?.asset
            ? urlForImage(card.image).width(1100).url()
            : null;
          const hasPdf = Boolean(card.pdfUrl);

          const inner = (
            <>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={card.image?.alt ?? card.title ?? `Categoría ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 32vw"
                  placeholder={card.image?.lqip ? "blur" : "empty"}
                  blurDataURL={card.image?.lqip}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-amber-950/40" />
              )}

              {/* Degradado para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              <div className="relative z-10 mt-auto w-full p-7">
                {card.title && (
                  <h3 className="text-3xl font-semibold uppercase tracking-wide sm:text-4xl">
                    {card.title}
                  </h3>
                )}
                <span className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-300">
                  {hasPdf ? "Ver carta (PDF)" : "PDF no disponible"}
                  {hasPdf && <span aria-hidden>→</span>}
                </span>
              </div>
            </>
          );

          const cardClass =
            "group relative flex h-[68vh] w-[80vw] shrink-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-neutral-900 sm:w-[50vw] lg:w-[32vw]";

          return hasPdf ? (
            <a
              key={i}
              data-menu-card
              href={card.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${cardClass} cursor-pointer transition-colors hover:border-amber-300/50`}
            >
              {inner}
            </a>
          ) : (
            <article key={i} data-menu-card className={cardClass}>
              {inner}
            </article>
          );
        })}
      </div>

      {/* Indicador de scroll */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-neutral-500">
        Scroll →
      </div>
    </section>
  );
}
