"use client";

import Image from "next/image";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { urlForImage } from "@/sanity/lib/image";
import type { MomentsContent } from "@/sanity/lib/types";

/**
 * Sección "Momentos": un recorrido horizontal fijado (pin) por el que van
 * pasando las imágenes a medida que el usuario hace scroll vertical.
 * Inspirada en el sitio de referencia (gris de la calle al calor de adentro).
 */
export function MomentsScroll({ data }: { data: MomentsContent }) {
  const root = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const items = data.items ?? [];

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track || items.length === 0) return;

      // Distancia horizontal a recorrer.
      const getScrollAmount = () =>
        track.scrollWidth - window.innerWidth;

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

      // Aparición suave de cada panel al entrar en pantalla.
      const panels = gsap.utils.toArray<HTMLElement>("[data-moment]");
      panels.forEach((panel) => {
        gsap.from(panel.querySelector("[data-moment-inner]"), {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: "left 80%",
          },
        });
      });

      return () => {
        st.kill();
        tween.kill();
      };
    },
    { scope: root, dependencies: [items.length] },
  );

  if (items.length === 0) {
    return (
      <section
        id="momentos"
        className="flex h-svh items-center justify-center bg-stone-100 text-stone-400"
      >
        <p className="text-sm uppercase tracking-[0.3em]">
          Añade momentos en el Studio para activar el recorrido
        </p>
      </section>
    );
  }

  return (
    <section
      id="momentos"
      ref={root}
      className="relative h-svh overflow-hidden bg-stone-100 text-stone-900"
    >
      {/* Etiqueta tipo plano arquitectónico */}
      <div className="pointer-events-none absolute left-6 top-6 z-20 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-stone-500">
        <span className="h-px w-8 bg-amber-700/60" />
        <span>{data.eyebrow ?? "El recorrido"}</span>
      </div>
      {data.title && (
        <h2 className="pointer-events-none absolute right-6 top-6 z-20 max-w-xs text-right text-sm font-medium uppercase tracking-widest text-stone-700">
          {data.title}
        </h2>
      )}

      {/* Pista horizontal */}
      <div
        ref={trackRef}
        className="flex h-full w-max items-center gap-6 px-[8vw] will-change-transform"
      >
        {items.map((item, i) => {
          const url = item.image?.asset
            ? urlForImage(item.image).width(1400).url()
            : null;
          return (
            <article
              key={i}
              data-moment
              className="relative flex h-[70vh] w-[78vw] shrink-0 overflow-hidden rounded-sm border border-stone-300 bg-stone-200 sm:w-[58vw] lg:w-[42vw]"
            >
              {url ? (
                <Image
                  src={url}
                  alt={item.image?.alt ?? item.title ?? `Momento ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 58vw, 42vw"
                  placeholder={item.image?.lqip ? "blur" : "empty"}
                  blurDataURL={item.image?.lqip}
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-stone-300 via-stone-200 to-amber-100" />
              )}

              {/* Degradado para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/10 to-transparent" />

              <div
                data-moment-inner
                className="relative z-10 mt-auto w-full p-7 text-stone-50"
              >
                <span className="font-mono text-sm text-amber-300/90">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.title && (
                  <h3 className="mt-1 text-3xl font-semibold sm:text-4xl">
                    {item.title}
                  </h3>
                )}
                {item.caption && (
                  <p className="mt-2 max-w-sm text-pretty text-sm text-stone-200">
                    {item.caption}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Indicador de scroll */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-stone-500">
        Scroll →
      </div>
    </section>
  );
}
