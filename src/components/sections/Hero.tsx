"use client";

import Image from "next/image";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { urlForImage } from "@/sanity/lib/image";
import type { HeroContent } from "@/sanity/lib/types";

/**
 * PARTE 1 — El Hero.
 *
 * Galería de imágenes (subidas desde el Studio) que se van cruzando a medida
 * que el visitante hace scroll, mientras el título "Artesano Gallery" —centrado
 * al inicio— se ESTIRA hacia los lados y se disuelve. Sección fijada (pin).
 */
export function Hero({ data }: { data: HeroContent }) {
  const root = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const images = (data.images ?? []).filter((img) => img?.asset);
  const urls = images.map((img) => urlForImage(img).width(2000).url());
  const title = data.title ?? "Artesano Gallery";

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const slides = gsap.utils.toArray<HTMLElement>("[data-hero-slide]");
      const n = slides.length;

      // Estado base: primera imagen visible.
      slides.forEach((s, i) => gsap.set(s, { opacity: i === 0 ? 1 : 0 }));

      if (reduced) return;

      // Todo dentro de una timeline con scrub → 100% ligado al scroll y
      // totalmente reversible al subir.
      const tl = gsap.timeline();

      // 1) Cruce de imágenes repartido en TODO el recorrido (arranca de una).
      if (n > 1) {
        const seg = 1 / (n - 1);
        for (let i = 1; i < n; i++) {
          const at = (i - 1) * seg;
          tl.to(slides[i], { opacity: 1, ease: "none", duration: seg }, at);
          tl.fromTo(
            slides[i].querySelector("[data-hero-img]"),
            { scale: 1.1 },
            { scale: 1, ease: "none", duration: seg },
            at,
          );
        }
      }

      // 2) Título: se estira hacia los lados y se disuelve en el primer ~30%.
      //    fromTo explícito → reversible (al devolver el scroll vuelve el texto).
      tl.fromTo(
        titleRef.current,
        { scaleX: 1, letterSpacing: "0em", filter: "blur(0px)", opacity: 1 },
        {
          scaleX: 2.6,
          letterSpacing: "0.7em",
          filter: "blur(10px)",
          opacity: 0,
          ease: "power2.in",
          duration: 0.3,
        },
        0,
      );

      // 3) Indicador de scroll se va al inicio.
      tl.to("[data-hero-scroll]", { opacity: 0, ease: "none", duration: 0.1 }, 0);

      // Recorrido del pin: proporcional al nº de imágenes (más ágil que antes).
      const end = 100 + Math.max(0, n - 1) * 40; // %

      const trigger = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: `+=${end}%`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: tl,
      });

      return () => {
        trigger.kill();
        tl.kill();
      };
    },
    { scope: root, dependencies: [urls.length] },
  );

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-[#f6f1e8]"
    >
      {/* Galería de imágenes apiladas (crossfade con el scroll) */}
      <div className="absolute inset-0 z-0">
        {urls.length > 0 ? (
          urls.map((url, i) => (
            <div
              key={i}
              data-hero-slide
              className="absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <div
                data-hero-img
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={url}
                  alt={images[i]?.alt ?? `Artesano ${i + 1}`}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  placeholder={images[i]?.lqip ? "blur" : "empty"}
                  blurDataURL={images[i]?.lqip}
                  className="object-cover"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#efe6d6] via-[#e7dac6] to-[#d8c6ab]" />
        )}
      </div>

      {/* Velo cálido suave para legibilidad del título */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#f6f1e8]/10 via-transparent to-[#f6f1e8]/25" />

      {/* Título centrado que se estira y desaparece */}
      <h1
        ref={titleRef}
        className="relative z-10 px-6 text-center text-5xl font-semibold text-[#2a1d14] will-change-transform [text-shadow:0_2px_20px_rgba(246,241,232,0.55)] sm:text-7xl lg:text-8xl"
        style={{ transformOrigin: "center center" }}
      >
        {title}
      </h1>

      <div
        data-hero-scroll
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-[#6a5443]"
      >
        Scroll ↓
      </div>
    </section>
  );
}
