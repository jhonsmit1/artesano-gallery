"use client";

import { useEffect, useRef, useState } from "react";

import { useGSAP } from "@gsap/react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { ScrollVideoContent } from "@/sanity/lib/types";

/**
 * Sección cinematográfica tipo "scroll-scrub": el video NO se reproduce solo;
 * su línea de tiempo (currentTime) se controla con el progreso del scroll.
 * Al bajar avanza, al subir rebobina. La sección queda fija (pin) mientras dura.
 *
 * Recomendación de encoding: el video debe tener keyframes frecuentes
 * (GOP corto, ~1 keyframe cada 0.1s) para que el "seek" sea fluido.
 */
export function ScrollVideo({ data }: { data: ScrollVideoContent }) {
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const src = (isMobile && data.videoMobileUrl) || data.videoDesktopUrl;

  useGSAP(
    () => {
      const video = videoRef.current;
      if (!video || !src) return;

      let trigger: ScrollTrigger | undefined;

      const build = () => {
        const duration = video.duration;
        if (!duration || !Number.isFinite(duration)) return;

        // Controla currentTime con el progreso. Lo suavizamos con quickTo.
        const seek = gsap.quickTo(video, "currentTime", {
          duration: 0.15,
          ease: "power1.out",
        });

        trigger = ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          // Cuanto mayor el %, más scroll hay que hacer para que avance el video.
          end: "+=120%",
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            seek(self.progress * duration);
          },
        });

        // Texto que entra y sale durante el recorrido.
        gsap.fromTo(
          "[data-sv-text]",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=40%",
              scrub: true,
            },
          },
        );
        gsap.to("[data-sv-text]", {
          opacity: 0,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "+=80%",
            end: "+=120%",
            scrub: true,
          },
        });

        ScrollTrigger.refresh();
      };

      if (video.readyState >= 1) {
        build();
      } else {
        video.addEventListener("loadedmetadata", build, { once: true });
      }

      return () => {
        trigger?.kill();
        video.removeEventListener("loadedmetadata", build);
      };
    },
    { scope: root, dependencies: [src] },
  );

  if (!src) {
    return (
      <section
        id="experience"
        className="flex h-svh items-center justify-center bg-neutral-900 text-neutral-500"
      >
        <p className="text-sm uppercase tracking-[0.3em]">
          Sube un video en el Studio para activar la experiencia
        </p>
      </section>
    );
  }

  return (
    <section
      id="experience"
      ref={root}
      className="relative h-svh w-full overflow-hidden bg-black"
    >
      <video
        ref={videoRef}
        key={src}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        preload="auto"
        poster={data.posterUrl}
        // No autoplay: la línea de tiempo la controla el scroll.
      >
        <source src={src} />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

      <div
        data-sv-text
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-neutral-50"
      >
        {data.eyebrow && (
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-neutral-300">
            {data.eyebrow}
          </p>
        )}
        {data.title && (
          <h2 className="max-w-4xl text-balance text-4xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
            {data.title}
          </h2>
        )}
        {data.subtitle && (
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-neutral-300 sm:text-lg">
            {data.subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
