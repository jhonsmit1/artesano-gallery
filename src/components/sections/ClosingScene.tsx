"use client";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { ClosingContent } from "@/sanity/lib/types";

// PARTE 4 — El cierre (transición de salida y atardecer).
//
// Espejo narrativo del Hero: misma técnica (canvas + secuencia de frames con
// scroll-scrub y pin), pero la perspectiva avanza hacia AFUERA. Reutiliza los
// frames del hero reproducidos en sentido inverso (de las puertas hacia la
// vista exterior) a todo color, con un retroceso de cámara.
//
// Para sustituir por material propio (interior -> puertas -> atardecer), basta
// con generar una carpeta de frames y cambiar FRAME_BASE/FRAME_COUNT.
const FRAME_COUNT = 140;
const FRAME_BASE = "/hero-frames";
const REVERSED = true;
const framePath = (i: number) =>
  `${FRAME_BASE}/frame-${String(i).padStart(3, "0")}.jpg`;

export function ClosingScene({ data }: { data: ClosingContent }) {
  const root = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const canvas = canvasRef.current;
      const media = canvas?.parentElement;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !media || !ctx) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      // Resolución extra para que el zoom inicial (1.2x) no pixele.
      const MAX_SCALE = 1.2;
      const ratio = Math.min(window.devicePixelRatio || 1, 2) * MAX_SCALE;

      const images: HTMLImageElement[] = new Array(FRAME_COUNT);

      const drawCover = (img: HTMLImageElement) => {
        const cw = canvas.width;
        const ch = canvas.height;
        const ir = img.width / img.height;
        let dw = cw;
        let dh = ch;
        if (ir > cw / ch) {
          dh = ch;
          dw = ch * ir;
        } else {
          dw = cw;
          dh = cw / ir;
        }
        ctx.clearRect(0, 0, cw, ch);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      };

      let currentIndex = -1;
      const renderFrame = (index: number) => {
        const raw = gsap.utils.clamp(0, FRAME_COUNT - 1, Math.round(index));
        const i = REVERSED ? FRAME_COUNT - 1 - raw : raw;
        const img = images[i];
        if (img && img.complete && img.naturalWidth) {
          currentIndex = i;
          drawCover(img);
        } else if (currentIndex >= 0 && images[currentIndex]?.complete) {
          drawCover(images[currentIndex]);
        }
      };

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = Math.round(rect.width * ratio);
        canvas.height = Math.round(rect.height * ratio);
        if (currentIndex >= 0 && images[currentIndex]?.complete) {
          drawCover(images[currentIndex]);
        }
      };

      // Primer frame (el del arranque: puertas) eager; el resto diferido.
      const firstRaw = REVERSED ? FRAME_COUNT - 1 : 0;
      const first = new Image();
      first.src = framePath(firstRaw + 1);
      images[firstRaw] = first;
      const paintFirst = () => {
        resize();
        renderFrame(0);
      };
      if (first.complete) paintFirst();
      else first.onload = paintFirst;

      const loadRest = () => {
        for (let i = 0; i < FRAME_COUNT; i++) {
          if (images[i]) continue;
          const im = new Image();
          im.src = framePath(i + 1);
          images[i] = im;
        }
      };
      type IdleWin = Window & {
        requestIdleCallback?: (cb: () => void) => number;
        cancelIdleCallback?: (id: number) => void;
      };
      const w = window as IdleWin;
      const usedIdle = typeof w.requestIdleCallback === "function";
      const idleId = usedIdle
        ? w.requestIdleCallback!(loadRest)
        : window.setTimeout(loadRest, 200);

      resize();
      window.addEventListener("resize", resize);

      if (reduced) {
        gsap.set(media, { scale: 1 });
        renderFrame(FRAME_COUNT - 1);
        return () => {
          window.removeEventListener("resize", resize);
          if (usedIdle) w.cancelIdleCallback?.(idleId);
          else window.clearTimeout(idleId);
        };
      }

      const trigger = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: resize,
        onUpdate: (self) => {
          const p = self.progress;
          // Avance del "salir" cruzando las puertas.
          renderFrame(p * (FRAME_COUNT - 1));
          // Retroceso de cámara: arranca zoom (interior/puertas) y se abre a
          // la vista exterior.
          const scale = MAX_SCALE - gsap.parseEase("power2.out")(p) * 0.2;
          gsap.set(media, { scale });
        },
      });

      // El texto/CTA aparece al final, ya con la vista exterior revelada.
      const contentTween = gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top-=140%",
            end: "+=40%",
            scrub: true,
          },
        },
      );

      ScrollTrigger.refresh();

      return () => {
        window.removeEventListener("resize", resize);
        if (usedIdle) w.cancelIdleCallback?.(idleId);
        else window.clearTimeout(idleId);
        trigger.kill();
        contentTween.scrollTrigger?.kill();
        contentTween.kill();
      };
    },
    { scope: root },
  );

  return (
    <section
      id="cierre"
      ref={root}
      className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-black"
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={
          data.posterUrl
            ? {
                backgroundImage: `url(${data.posterUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </div>

      {/* Degradado cálido tipo atardecer + legibilidad del texto */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-amber-900/10 to-black/30" />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto max-w-3xl px-6 text-center text-neutral-50"
        style={{ opacity: 0 }}
      >
        {data.eyebrow && (
          <p className="mb-5 text-xs uppercase tracking-[0.4em] text-amber-200/80">
            {data.eyebrow}
          </p>
        )}
        {data.title && (
          <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-6xl">
            {data.title}
          </h2>
        )}
        {data.subtitle && (
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-neutral-300 sm:text-lg">
            {data.subtitle}
          </p>
        )}
        {data.ctaLabel && (
          <a
            href={`#${data.ctaAnchor ?? "contact"}`}
            className="mt-9 inline-block rounded-full bg-white px-8 py-3 text-sm font-medium uppercase tracking-widest text-neutral-950 transition-transform hover:scale-105"
          >
            {data.ctaLabel}
          </a>
        )}
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-neutral-300">
        Scroll ↓
      </div>
    </section>
  );
}
