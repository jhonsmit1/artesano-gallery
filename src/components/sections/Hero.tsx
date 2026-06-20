"use client";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";

import { useAppReady } from "@/lib/app-ready-context";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import type { HeroContent } from "@/sanity/lib/types";

// Secuencia de frames del video de fachada (técnica tipo Apple): en lugar de
// hacer "seek" sobre un <video> (lento, parpadea en negro, se queda pegado),
// precargamos imágenes y pintamos el frame correspondiente en un <canvas>
// según el progreso del scroll. Resultado: scrubbing perfecto y fluido.
const FRAME_COUNT = 140;
const FRAME_BASE = "/hero-frames";
const FRAME_POSTER = `${FRAME_BASE}/frame-001.jpg`;

const framePath = (i: number) =>
  `${FRAME_BASE}/frame-${String(i).padStart(3, "0")}.jpg`;

/**
 * PARTE 1 — El Hero (evolución y entrada).
 *
 * Fijación vertical (GSAP ScrollTrigger pin):
 *  - 0% scroll: fachada exterior en BLANCO Y NEGRO.
 *  - Durante el scroll: transición progresiva a COLOR (crossfade) + escala
 *    controlada (efecto "caminata" / avance peatonal en eje Z).
 *  - Final: el plano queda totalmente a color y libera el scroll vertical.
 */
export function Hero({ data }: { data: HeroContent }) {
  const ready = useAppReady();
  const root = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // --- Canvas + secuencia de frames + scroll-scrub (se monta una sola vez) ---
  useGSAP(
    () => {
      const canvas = canvasRef.current;
      const media = mediaRef.current;
      if (!canvas || !media) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const images: HTMLImageElement[] = new Array(FRAME_COUNT);
      // El media se escala hasta 1.45x con el scroll; ese zoom es un transform
      // CSS sobre el canvas ya rasterizado, así que renderizamos el canvas a
      // mayor resolución (ratio * MAX_SCALE) para que no pixele al ampliarse.
      const MAX_SCALE = 1.45;
      const ratio =
        Math.min(window.devicePixelRatio || 1, 2) * MAX_SCALE;

      // Dibuja una imagen cubriendo el canvas (object-fit: cover).
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
        const i = gsap.utils.clamp(0, FRAME_COUNT - 1, Math.round(index));
        const img = images[i];
        // Si el frame destino aún no cargó, conserva el último pintado.
        if (img && img.complete && img.naturalWidth) {
          currentIndex = i;
          drawCover(img);
        }
      };

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = Math.round(rect.width * ratio);
        canvas.height = Math.round(rect.height * ratio);
        const img = images[Math.max(0, currentIndex)];
        if (img && img.complete) drawCover(img);
      };

      // 1) Primer frame YA: lo cargamos eager para pintar la fachada de
      //    inmediato (la <img> de poster del fondo cubre el instante previo).
      const first = new Image();
      first.src = framePath(1);
      images[0] = first;
      const paintFirst = () => {
        resize();
        renderFrame(0);
      };
      if (first.complete) paintFirst();
      else first.onload = paintFirst;

      // 2) El resto se carga DIFERIDO para no bloquear el preloader
      //    (window.load) ni la primera pintura. Se van rellenando solos.
      const loadRest = () => {
        for (let i = 1; i < FRAME_COUNT; i++) {
          const img = new Image();
          img.src = framePath(i + 1);
          images[i] = img;
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

      // Accesibilidad: sin movimiento, fachada a color y sin pin.
      if (reduced) {
        gsap.set(media, { filter: "grayscale(0)" });
        return () => {
          window.removeEventListener("resize", resize);
        };
      }

      // El pin se crea YA (no espera a las imágenes): la sección siempre
      // retiene el scroll aunque scrollees rápido y nunca salta a la siguiente.
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

          // 1) Frame según el progreso (caminata hacia el bar).
          renderFrame(p * (FRAME_COUNT - 1));

          // 2) Blanco y negro -> color (arranca ~15%, color pleno ~85%).
          const gray = gsap.utils.clamp(
            0,
            1,
            1 - gsap.utils.normalize(0.15, 0.85, p),
          );

          // 3) Escala de avance (eje Z): "caminata peatonal" hacia las puertas.
          const scale = 1 + gsap.parseEase("power2.in")(p) * 0.45;

          gsap.set(media, { filter: `grayscale(${gray})`, scale });
        },
      });

      // El contenido (título/CTA) se desvanece pronto para dejar la fachada.
      const contentTween = gsap.to("[data-hero-content]", {
        opacity: 0,
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=60%",
          scrub: true,
        },
      });

      // Atenuado a negro en el tramo final del pin (bajan las luces antes de
      // "entrar" al bar). Suaviza el corte hacia la pantalla de bienvenida.
      const fadeOutTween = gsap.fromTo(
        "[data-hero-fade-out]",
        { opacity: 0 },
        {
          opacity: 1,
          ease: "power1.in",
          scrollTrigger: {
            trigger: root.current,
            start: "top top-=150%", // arranca al ~75% del recorrido de 200%
            end: "+=50%",
            scrub: true,
          },
        },
      );

      return () => {
        window.removeEventListener("resize", resize);
        if (usedIdle) w.cancelIdleCallback?.(idleId);
        else window.clearTimeout(idleId);
        trigger.kill();
        contentTween.scrollTrigger?.kill();
        contentTween.kill();
        fadeOutTween.scrollTrigger?.kill();
        fadeOutTween.kill();
      };
    },
    { scope: root },
  );

  // --- Entrada del título (cuando el preloader termina) ---
  useGSAP(
    () => {
      if (!ready || !titleRef.current) return;
      const split = new SplitText(titleRef.current, { type: "lines" });
      const tl = gsap.timeline();
      if (split.lines.length) {
        tl.from(split.lines, {
          yPercent: 120,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.12,
        });
      }
      const fadeEls = root.current?.querySelectorAll("[data-hero-fade]");
      if (fadeEls && fadeEls.length) {
        tl.from(
          fadeEls,
          {
            opacity: 0,
            y: 24,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.6",
        );
      }
      return () => split.revert();
    },
    { dependencies: [ready], scope: root },
  );

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-black"
    >
      {/* Fachada: arranca en B/N y vira a color con la escala de avance. */}
      <div
        ref={mediaRef}
        data-hero-media
        className="absolute inset-0 will-change-transform [filter:grayscale(1)]"
      >
        {/* Póster de respaldo: se ve al instante, antes de que pinte el canvas. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.posterUrl ?? FRAME_POSTER}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </div>

      {/* Atenuado a negro al final (bajan las luces antes de "entrar" al bar). */}
      <div
        data-hero-fade-out
        className="pointer-events-none absolute inset-0 z-20 bg-black opacity-0"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/70" />

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
            href={`#${data.ctaAnchor ?? "historia"}`}
            className="mt-10 inline-block rounded-full bg-white px-8 py-3 text-sm font-medium uppercase tracking-widest text-neutral-950 transition-transform hover:scale-105"
          >
            {data.ctaLabel}
          </a>
        )}
      </div>

      <div
        data-hero-content
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-neutral-300"
      >
        Scroll ↓
      </div>
    </section>
  );
}
