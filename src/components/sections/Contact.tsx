"use client";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";

import { gsap } from "@/lib/gsap";
import type { ContactContent } from "@/sanity/lib/types";

import { ContactForm } from "@/components/ui/ContactForm";

export function Contact({ data }: { data: ContactContent }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-contact-reveal]", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      id="contact"
      ref={root}
      className="relative overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-950 to-black py-28 text-neutral-100 sm:py-40"
    >
      {/* Resplandor cálido ambiental (luz de bar) */}
      <div
        className="pointer-events-none absolute -left-1/4 top-0 h-[60%] w-[80%] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(180,120,55,0.22), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[50%] w-[60%] opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(120,90,160,0.14), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <p
            data-contact-reveal
            className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-amber-300/80"
          >
            <span className="h-px w-8 bg-amber-300/50" />
            {data.eyebrow ?? "Contacto"}
          </p>
          <h2
            data-contact-reveal
            className="mb-6 text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
          >
            {data.title ?? "Reserva tu experiencia"}
          </h2>
          {data.text && (
            <p
              data-contact-reveal
              className="max-w-md text-pretty text-lg text-neutral-400"
            >
              {data.text}
            </p>
          )}

          {/* Detalle temático: copa de líneas */}
          <svg
            data-contact-reveal
            viewBox="0 0 120 120"
            className="mt-10 hidden h-16 w-16 lg:block"
            fill="none"
            aria-hidden
          >
            <g
              stroke="#E8D2A8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.5"
            >
              <path d="M40 32 H80 L60 58 Z" />
              <path d="M60 58 V86 M46 90 H74" />
            </g>
            <circle cx="68" cy="42" r="3" fill="#E8D2A8" opacity="0.6" />
          </svg>
        </div>

        {/* Tarjeta de vidrio para el formulario */}
        <div
          data-contact-reveal
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 shadow-[0_8px_40px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:p-9"
        >
          <ContactForm
            buttonLabel={data.buttonLabel}
            successMessage={data.successMessage}
          />
        </div>
      </div>
    </section>
  );
}
