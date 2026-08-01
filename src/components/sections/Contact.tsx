"use client";

import Image from "next/image";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";

import { gsap } from "@/lib/gsap";
import type { ContactContent } from "@/sanity/lib/types";

import { ContactForm } from "@/components/ui/ContactForm";

export function Contact({
  data,
  logoUrl,
}: {
  data: ContactContent;
  logoUrl?: string;
}) {
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
      className="relative overflow-hidden bg-gradient-to-b from-[#f6f1e8] via-[#f1e8da] to-[#eaded0] py-28 text-[#33241a] sm:py-40"
    >
      {/* Resplandor cálido ambiental (luz de bar) */}
      <div
        className="pointer-events-none absolute -left-1/4 top-0 h-[60%] w-[80%] opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(200,150,80,0.20), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <p
            data-contact-reveal
            className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-[#a9743c]"
          >
            <span className="h-px w-8 bg-[#a9743c]/60" />
            {data.eyebrow ?? "Contacto"}
          </p>
          <h2
            data-contact-reveal
            className="mb-6 text-balance text-4xl font-semibold leading-tight text-[#2a1d14] sm:text-5xl lg:text-6xl"
          >
            {data.title ?? "Reserva tu experiencia"}
          </h2>
          {data.text && (
            <p
              data-contact-reveal
              className="max-w-md text-pretty text-lg text-[#6a5443]"
            >
              {data.text}
            </p>
          )}

          {/* Logo de la marca (editable desde el Studio) */}
          <Image
            data-contact-reveal
            src={logoUrl || "/logo.png"}
            alt="Artesano"
            width={420}
            height={235}
            className="mt-12 hidden h-32 w-auto object-contain opacity-90 lg:block"
          />
        </div>

        {/* Tarjeta para el formulario */}
        <div
          data-contact-reveal
          className="rounded-2xl border border-[#dccdb4] bg-white/70 p-7 shadow-[0_10px_40px_rgba(90,70,50,0.12)] backdrop-blur-sm sm:p-9"
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
