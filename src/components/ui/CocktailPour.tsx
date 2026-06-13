"use client";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

type Props = {
  caption?: string;
  /** Fondo blanco (true) o negro (false, por defecto). */
  light?: boolean;
};

/**
 * Pantalla de bienvenida: un cóctel que "se sirve" dibujado en <canvas> y
 * ligado al scroll (scrub) mientras la sección queda fija (pin).
 *
 *  - Al bajar: cae el chorro -> la copa se llena de dorado -> cae la aceituna
 *    -> se revela el wordmark "ARTESANO BAR".
 *  - Al subir: todo retrocede (como un video rebobinado).
 *
 * Se dibuja por código (no video, no SVG): nítido sobre fondo oscuro y con
 * scrubbing perfecto, igual de fluido que la secuencia de frames del Hero.
 */
export function CocktailPour({ caption, light = false }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(
    () => {
      const canvas = canvasRef.current;
      const section = root.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !section || !ctx) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      const clamp = gsap.utils.clamp(0, 1);
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      const state = { p: reduced ? 1 : 0 };

      const draw = () => {
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const p = state.p;
        const cx = w / 2;
        const cy = h / 2;
        const S = Math.min(w, h) * 0.44; // escala global del cóctel

        // --- Geometría del vaso (martini) ---
        const openY = cy - 0.42 * S;
        const openL = cx - 0.5 * S;
        const openR = cx + 0.5 * S;
        const tipX = cx;
        const tipY = cy + 0.06 * S;
        const stemBottomY = cy + 0.4 * S;
        const baseHalf = 0.26 * S;
        const baseY = cy + 0.46 * S;
        const glass = light ? "60, 60, 70" : "225, 230, 240";

        // Resplandor ambiental cálido detrás del vaso (da profundidad).
        if (!light) {
          const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 1.1 * S);
          glow.addColorStop(0, "rgba(120, 85, 35, 0.22)");
          glow.addColorStop(1, "rgba(120, 85, 35, 0)");
          ctx.fillStyle = glow;
          ctx.fillRect(0, 0, w, h);

          // "Encendido" cálido al entrar (viene del hero en negro): un
          // resplandor ámbar fuerte que se atenúa en el primer tramo del scroll.
          const warmIn = clamp(1 - p / 0.18);
          if (warmIn > 0.01) {
            const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 1.4 * S);
            g2.addColorStop(0, `rgba(180, 120, 55, ${0.5 * warmIn})`);
            g2.addColorStop(1, "rgba(120, 70, 25, 0)");
            ctx.fillStyle = g2;
            ctx.fillRect(0, 0, w, h);
          }
        }

        // --- 2) Líquido que llena la copa (con volumen y brillo) ---
        const fillT = clamp((p - 0.14) / 0.5); // 0 vacío -> 1 lleno
        if (fillT > 0.001) {
          const surfaceY = lerp(tipY, openY, fillT);
          const edgeT = (surfaceY - openY) / (tipY - openY);
          const lx = lerp(openL, tipX, edgeT);
          const rx = lerp(openR, tipX, edgeT);

          const grad = ctx.createLinearGradient(0, surfaceY, 0, tipY);
          grad.addColorStop(0, "rgba(247, 205, 130, 0.97)");
          grad.addColorStop(0.5, "rgba(225, 150, 70, 0.97)");
          grad.addColorStop(1, "rgba(170, 95, 38, 0.98)");

          ctx.save();
          // Cuerpo del líquido (triángulo).
          ctx.beginPath();
          ctx.moveTo(lx, surfaceY);
          ctx.lineTo(rx, surfaceY);
          ctx.lineTo(tipX, tipY);
          ctx.closePath();
          ctx.fillStyle = grad;
          ctx.shadowColor = "rgba(245, 185, 100, 0.55)";
          ctx.shadowBlur = 0.08 * S;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Menisco: superficie elíptica con degradado (da sensación de líquido).
          const surfW = Math.max(1, (rx - lx) / 2);
          const surfGrad = ctx.createLinearGradient(lx, 0, rx, 0);
          surfGrad.addColorStop(0, "rgba(255, 236, 190, 0.95)");
          surfGrad.addColorStop(0.5, "rgba(255, 248, 220, 1)");
          surfGrad.addColorStop(1, "rgba(245, 205, 150, 0.95)");
          ctx.beginPath();
          ctx.ellipse((lx + rx) / 2, surfaceY, surfW, 0.04 * S, 0, 0, Math.PI * 2);
          ctx.fillStyle = surfGrad;
          ctx.fill();

          // Reflejo especular interno (banda diagonal sutil).
          ctx.globalAlpha = 0.4;
          ctx.beginPath();
          ctx.moveTo(lx + (rx - lx) * 0.18, surfaceY + 0.02 * S);
          ctx.lineTo(lx + (rx - lx) * 0.34, surfaceY + 0.02 * S);
          ctx.lineTo(tipX - 0.01 * S, tipY - 0.02 * S);
          ctx.closePath();
          ctx.fillStyle = "rgba(255, 250, 235, 0.8)";
          ctx.fill();
          ctx.restore();
        }

        // --- 1) Chorro de líquido (flujo con ancho y brillo, no una raya) ---
        const streamTopY = openY - 0.7 * S;
        const streamFall = clamp(p / 0.16);
        const streamRetract = clamp((p - 0.66) / 0.1);
        const streamAlpha = (1 - streamRetract) * (streamFall > 0.01 ? 1 : 0);
        if (streamAlpha > 0.01) {
          const yEnd = lerp(streamTopY, openY + 0.03 * S, streamFall);
          ctx.save();
          ctx.globalAlpha = streamAlpha;
          // Forma del chorro: angosto arriba, ensancha al caer (perfil curvo).
          const wTop = 0.012 * S;
          const wBot = 0.045 * S;
          const sx = cx + 0.02 * S; // leve desviación natural
          const grad = ctx.createLinearGradient(0, streamTopY, 0, yEnd);
          grad.addColorStop(0, "rgba(255, 226, 160, 0.95)");
          grad.addColorStop(1, "rgba(225, 150, 70, 0.98)");
          ctx.beginPath();
          ctx.moveTo(cx - wTop, streamTopY);
          ctx.quadraticCurveTo(
            sx - wBot,
            (streamTopY + yEnd) / 2,
            sx - wBot,
            yEnd,
          );
          ctx.lineTo(sx + wBot, yEnd);
          ctx.quadraticCurveTo(
            sx + wBot,
            (streamTopY + yEnd) / 2,
            cx + wTop,
            streamTopY,
          );
          ctx.closePath();
          ctx.fillStyle = grad;
          ctx.shadowColor = "rgba(255, 210, 140, 0.7)";
          ctx.shadowBlur = 0.04 * S;
          ctx.fill();
          // Brillo central del chorro.
          ctx.globalAlpha = streamAlpha * 0.6;
          ctx.fillStyle = "rgba(255, 248, 225, 0.9)";
          ctx.fillRect(cx - wTop * 0.4, streamTopY, wTop * 0.8, yEnd - streamTopY);
          ctx.restore();

          // Salpicadura/gotas al impactar en la superficie.
          if (streamFall > 0.6 && fillT < 0.98) {
            ctx.save();
            ctx.globalAlpha = streamAlpha * 0.8;
            ctx.fillStyle = "rgba(255, 226, 160, 0.9)";
            for (let i = 0; i < 3; i++) {
              const a = (i / 3) * Math.PI - Math.PI / 2;
              const dx = Math.cos(a) * 0.06 * S;
              const dy = -Math.abs(Math.sin(a)) * 0.04 * S;
              ctx.beginPath();
              ctx.arc(sx + dx, yEnd + dy, 0.01 * S, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();
          }
        }

        // --- 3) Aceituna con pincho ---
        const oliveT = clamp((p - 0.6) / 0.14);
        if (oliveT > 0.01) {
          const ox = cx + 0.13 * S;
          const oyTarget = openY + 0.1 * S;
          const oy = lerp(oyTarget - 0.5 * S, oyTarget, oliveT);
          ctx.save();
          ctx.globalAlpha = oliveT;
          // Pincho (palillo de madera).
          ctx.strokeStyle = "rgba(120, 92, 60, 0.95)";
          ctx.lineWidth = Math.max(1.5, 0.012 * S);
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(ox + 0.07 * S, oy - 0.16 * S);
          ctx.lineTo(ox - 0.04 * S, oy + 0.06 * S);
          ctx.stroke();
          // Aceituna con volumen (degradado radial) + brillo.
          const og = ctx.createRadialGradient(
            ox - 0.018 * S,
            oy - 0.018 * S,
            0.005 * S,
            ox,
            oy,
            0.06 * S,
          );
          og.addColorStop(0, "rgba(180, 200, 110, 1)");
          og.addColorStop(1, "rgba(110, 130, 55, 1)");
          ctx.beginPath();
          ctx.arc(ox, oy, 0.055 * S, 0, Math.PI * 2);
          ctx.fillStyle = og;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(ox - 0.018 * S, oy - 0.018 * S, 0.014 * S, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 235, 0.8)";
          ctx.fill();
          ctx.restore();
        }

        // --- 4) Vaso de vidrio: grosor, reflejos y transparencia ---
        ctx.save();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        // Trazo principal (vidrio claro con brillo).
        const rim = ctx.createLinearGradient(openL, 0, openR, 0);
        rim.addColorStop(0, `rgba(${glass}, 0.5)`);
        rim.addColorStop(0.5, `rgba(${glass}, 0.95)`);
        rim.addColorStop(1, `rgba(${glass}, 0.5)`);
        ctx.strokeStyle = rim;
        ctx.lineWidth = Math.max(2, 0.022 * S);
        if (!light) {
          ctx.shadowColor = "rgba(220, 230, 245, 0.4)";
          ctx.shadowBlur = 0.05 * S;
        }
        // Copa (V).
        ctx.beginPath();
        ctx.moveTo(openL, openY);
        ctx.lineTo(tipX, tipY);
        ctx.lineTo(openR, openY);
        ctx.stroke();
        // Borde superior (elipse del rim).
        ctx.beginPath();
        ctx.ellipse(cx, openY, 0.5 * S, 0.06 * S, 0, 0, Math.PI * 2);
        ctx.stroke();
        // Tallo y base.
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.moveTo(tipX, tipY);
        ctx.lineTo(tipX, stemBottomY);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(cx, baseY, baseHalf, 0.05 * S, 0, 0, Math.PI * 2);
        ctx.stroke();
        // Reflejo vertical en el vidrio (highlight).
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = Math.max(1, 0.01 * S);
        ctx.beginPath();
        ctx.moveTo(openL + 0.1 * S, openY + 0.03 * S);
        ctx.lineTo(tipX - 0.06 * S, tipY - 0.04 * S);
        ctx.stroke();
        ctx.restore();

        // --- 5) Wordmark "ARTESANO BAR" + leyenda ---
        const wordT = clamp((p - 0.8) / 0.2);
        if (wordT > 0.01) {
          ctx.save();
          ctx.globalAlpha = wordT;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = light ? "rgba(20,20,20,1)" : "rgba(245, 239, 227, 1)";
          const baseY1 = baseY + 0.34 * S;
          ctx.font = `${0.17 * S}px Georgia, 'Times New Roman', serif`;
          if ("letterSpacing" in ctx) {
            (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${0.04 * S}px`;
          }
          ctx.fillText("ARTESANO", cx, baseY1);
          ctx.font = `${0.07 * S}px Georgia, 'Times New Roman', serif`;
          if ("letterSpacing" in ctx) {
            (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${0.1 * S}px`;
          }
          ctx.fillStyle = light
            ? "rgba(60,60,60,0.85)"
            : "rgba(232, 210, 168, 0.85)";
          ctx.fillText("B A R", cx, baseY1 + 0.13 * S);
          ctx.restore();
        }

        // Leyenda "Conoce más" (debajo del wordmark, aparece al final).
        const capT = clamp((p - 0.9) / 0.1);
        if (caption && capT > 0.01) {
          ctx.save();
          ctx.globalAlpha = capT;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = `${0.045 * S}px ui-sans-serif, system-ui, sans-serif`;
          if ("letterSpacing" in ctx) {
            (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${0.06 * S}px`;
          }
          ctx.fillStyle = light
            ? "rgba(90,90,90,0.9)"
            : "rgba(160, 160, 160, 0.9)";
          ctx.fillText(
            caption.toUpperCase(),
            cx + 0.03 * S, // compensa el letter-spacing para centrar
            baseY + 0.62 * S,
          );
          ctx.restore();
        }
      };

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = Math.round(rect.width * ratio);
        canvas.height = Math.round(rect.height * ratio);
        draw();
      };

      resize();
      window.addEventListener("resize", resize);

      // Sin movimiento: cóctel servido completo y estático, sin pin.
      if (reduced) {
        return () => window.removeEventListener("resize", resize);
      }

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=220%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: resize,
        onUpdate: (self) => {
          state.p = self.progress;
          draw();
        },
      });

      ScrollTrigger.refresh();

      return () => {
        window.removeEventListener("resize", resize);
        st.kill();
      };
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      data-welcome-screen
      className={`relative flex h-svh w-full items-center justify-center overflow-hidden ${
        light ? "bg-white" : "bg-black"
      }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
