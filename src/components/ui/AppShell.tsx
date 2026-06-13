"use client";

import { useEffect, useRef, useState } from "react";

import { useGSAP } from "@gsap/react";

import { AppReadyContext } from "@/lib/app-ready-context";
import { gsap } from "@/lib/gsap";

/**
 * Preloader inteligente:
 * - Cubre la pantalla y bloquea la interacción (pointer-events) hasta que
 *   `window.load` se dispara (assets críticos en caché) o se alcanza un
 *   timeout de seguridad.
 * - Anima la salida con GSAP y expone `ready` por contexto.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  // Inicialización lazy: si la ventana ya cargó al montar, arrancamos en true
  // (evita un setState síncrono dentro del effect).
  const [assetsLoaded, setAssetsLoaded] = useState(
    () => typeof document !== "undefined" && document.readyState === "complete",
  );
  const [ready, setReady] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  // Si la ventana aún no cargó, escuchamos `load` (o un timeout de seguridad).
  useEffect(() => {
    if (assetsLoaded) return;
    const onLoad = () => setAssetsLoaded(true);
    window.addEventListener("load", onLoad);
    // Salida temprana: no bloqueamos por assets diferidos (p. ej. la secuencia
    // de frames del hero, que carga en segundo plano).
    const safety = window.setTimeout(() => setAssetsLoaded(true), 2500);
    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(safety);
    };
  }, [assetsLoaded]);

  // Bloquea el scroll del body mientras el preloader está visible.
  useEffect(() => {
    document.body.style.overflow = ready ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready]);

  useGSAP(
    () => {
      const counter = { value: 0 };
      const tl = gsap.timeline();

      // Progreso 0 -> 100 mientras carga.
      tl.to(counter, {
        value: 100,
        duration: assetsLoaded ? 0.6 : 2.4,
        ease: "power1.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = `${Math.round(counter.value)}`;
          }
        },
      });

      if (assetsLoaded) {
        tl.to(overlayRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power3.inOut",
          onComplete: () => setReady(true),
        });
      }
      return () => {
        tl.kill();
      };
    },
    { dependencies: [assetsLoaded] },
  );

  return (
    <AppReadyContext.Provider value={ready}>
      {!ready && (
        <div
          ref={overlayRef}
          aria-hidden
          className="fixed inset-0 z-[100] flex items-end justify-between bg-neutral-950 p-8 text-neutral-100"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-neutral-400">
            Artesano Gallery
          </span>
          <span className="font-mono text-6xl tabular-nums sm:text-8xl">
            <span ref={counterRef}>0</span>
            <span className="text-neutral-500">%</span>
          </span>
        </div>
      )}
      {children}
    </AppReadyContext.Provider>
  );
}
