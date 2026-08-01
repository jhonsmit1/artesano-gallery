"use client";

import Image from "next/image";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/types";

type Props = {
  images?: SanityImage[];
  caption?: string;
};

// Logos transparentes por defecto (fondo ya removido). Si el Studio tiene
// imágenes de bienvenida, esas tienen prioridad.
const DEFAULT_LOGOS = [
  { url: "/logos/logo-1.png", ratio: 1.79 },
  { url: "/logos/logo-2.png", ratio: 1.79 },
  { url: "/logos/logo-3.png", ratio: 1.79 },
];

/**
 * Pantalla de bienvenida: logos (transparentes) que se cruzan suavemente con el
 * scroll, centrados sobre el fondo cálido. Sección fijada (pin).
 */
export function WelcomeReveal({ images, caption }: Props) {
  const root = useRef<HTMLDivElement>(null);

  const studioImgs = (images ?? []).filter((i) => i?.asset);
  const slidesData =
    studioImgs.length > 0
      ? studioImgs.map((i) => ({
          url: urlForImage(i).width(1600).url(),
          ratio: i.aspectRatio && i.aspectRatio > 0 ? i.aspectRatio : 1.79,
          alt: i.alt,
          lqip: i.lqip,
        }))
      : DEFAULT_LOGOS.map((l) => ({
          url: l.url,
          ratio: l.ratio,
          alt: undefined as string | undefined,
          lqip: undefined as string | undefined,
        }));

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const slides = gsap.utils.toArray<HTMLElement>("[data-welcome-slide]");
      const n = slides.length;
      slides.forEach((s, i) => gsap.set(s, { opacity: i === 0 ? 1 : 0 }));

      if (reduced || n === 0) return;

      const tl = gsap.timeline();

      // Los cruces terminan al ~70% del recorrido; el 30% final "sostiene" la
      // última imagen completa antes de pasar a la sección de historia.
      const crossEnd = 0.7;
      if (n > 1) {
        const seg = crossEnd / (n - 1);
        for (let i = 1; i < n; i++) {
          const at = (i - 1) * seg;
          // Como los logos son transparentes, hay que DESVANECER el anterior
          // a la vez que aparece el siguiente (si no, quedan superpuestos).
          tl.to(
            slides[i - 1],
            { opacity: 0, ease: "sine.inOut", duration: seg },
            at,
          );
          tl.to(
            slides[i],
            { opacity: 1, ease: "sine.inOut", duration: seg },
            at,
          );
        }
      }
      // Sostener el último logo (ya solo, opacidad 1) hasta el final del pin.
      tl.to(slides[n - 1], { opacity: 1, duration: 1 - crossEnd });

      // Leyenda se desvanece al inicio.
      tl.to("[data-welcome-caption]", { opacity: 0, ease: "none", duration: 0.15 }, 0.05);

      const trigger = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        // Recorrido más corto: cada transición ocupa menos scroll = más ágil.
        end: `+=${70 + Math.max(0, n - 1) * 45}%`,
        pin: true,
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
    { scope: root },
  );

  return (
    <div
      ref={root}
      data-welcome-screen
      className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-[#f6f1e8]"
    >
      {slidesData.map((s, i) => (
        <div
          key={i}
          data-welcome-slide
          className="absolute inset-0 flex items-center justify-center p-6"
          style={{ opacity: i === 0 ? 1 : 0 }}
        >
          {/* Logo transparente centrado (sin máscara: el fondo es real). */}
          <div
            className="relative w-[min(90vw,820px)] max-h-[80vh]"
            style={{ aspectRatio: s.ratio }}
          >
            <Image
              src={s.url}
              alt={s.alt ?? `Artesano ${i + 1}`}
              fill
              priority={i === 0}
              sizes="(max-width: 820px) 90vw, 820px"
              placeholder={s.lqip ? "blur" : "empty"}
              blurDataURL={s.lqip}
              className="object-contain"
            />
          </div>
        </div>
      ))}

      {caption && (
        <span
          data-welcome-caption
          className="pointer-events-none absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-[#a9743c]"
        >
          {caption}
        </span>
      )}
    </div>
  );
}
