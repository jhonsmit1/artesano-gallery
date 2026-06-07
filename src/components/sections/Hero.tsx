"use client";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";

import { useAppReady } from "@/lib/app-ready-context";
import { gsap, SplitText } from "@/lib/gsap";
import type { HeroContent } from "@/sanity/lib/types";

import { BackgroundVideo } from "@/components/ui/BackgroundVideo";

export function Hero({ data }: { data: HeroContent }) {
  const ready = useAppReady();
  const root = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!ready || !titleRef.current) return;

      // Animación de entrada del título por líneas (SplitText).
      const split = new SplitText(titleRef.current, { type: "lines" });
      const tl = gsap.timeline();
      tl.from(split.lines, {
        yPercent: 120,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.12,
      }).from(
        "[data-hero-fade]",
        { opacity: 0, y: 24, duration: 0.8, stagger: 0.1, ease: "power2.out" },
        "-=0.6",
      );

      // Parallax del fondo controlado por scroll (timeline única).
      gsap.to("[data-hero-bg]", {
        yPercent: 18,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Desvanecimiento del contenido al hacer scroll.
      gsap.to("[data-hero-content]", {
        opacity: 0,
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => {
        split.revert();
      };
    },
    { dependencies: [ready], scope: root },
  );

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-neutral-950"
    >
      <div data-hero-bg className="absolute inset-0 will-change-transform">
        <BackgroundVideo
          desktopUrl={data.videoDesktopUrl}
          mobileUrl={data.videoMobileUrl}
          posterUrl={data.posterUrl}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />

      <div
        data-hero-content
        className="relative z-10 mx-auto max-w-4xl px-6 text-center text-neutral-50"
      >
        {data.eyebrow && (
          <p
            data-hero-fade
            className="mb-6 text-xs uppercase tracking-[0.4em] text-neutral-300"
          >
            {data.eyebrow}
          </p>
        )}
        <h1
          ref={titleRef}
          className="text-balance text-5xl font-semibold leading-[1.05] sm:text-7xl lg:text-8xl"
        >
          {data.title ?? "Artesano Gallery"}
        </h1>
        {data.subtitle && (
          <p
            data-hero-fade
            className="mx-auto mt-8 max-w-xl text-pretty text-base text-neutral-300 sm:text-lg"
          >
            {data.subtitle}
          </p>
        )}
        {data.ctaLabel && (
          <a
            data-hero-fade
            href={`#${data.ctaAnchor ?? "concept"}`}
            className="mt-10 inline-block rounded-full bg-white px-8 py-3 text-sm font-medium uppercase tracking-widest text-neutral-950 transition-transform hover:scale-105"
          >
            {data.ctaLabel}
          </a>
        )}
      </div>

      <div
        data-hero-fade
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-neutral-300"
      >
        Scroll
      </div>
    </section>
  );
}
