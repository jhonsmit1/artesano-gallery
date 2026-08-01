"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { useGSAP } from "@gsap/react";

import { gsap } from "@/lib/gsap";
import { urlForImage } from "@/sanity/lib/image";
import type { DetailsContent } from "@/sanity/lib/types";

/**
 * Sección de desplegables (acordeón) + imagen al lado.
 *
 * Izquierda: lista de grupos colapsables (título + sub-items). Uno abierto por
 * defecto. Derecha: imagen. Todo editable desde el Studio (grupo "Detalles").
 */
export function DetailsAccordion({ data }: { data: DetailsContent }) {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(0);

  const groups = (data.groups ?? []).filter((g) => g?.title);
  const imageUrl = data.image?.asset
    ? urlForImage(data.image).width(1400).url()
    : null;

  useGSAP(
    () => {
      gsap.from("[data-details-reveal]", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root },
  );

  if (groups.length === 0 && !imageUrl) return null;

  return (
    <section
      id="detalles"
      ref={root}
      className="bg-[#f6f1e8] py-24 text-[#33241a] sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        {/* Columna izquierda: acordeón */}
        <div className="order-2 lg:order-1">
          {data.eyebrow && (
            <p
              data-details-reveal
              className="mb-3 text-xs uppercase tracking-[0.35em] text-[#a9743c]"
            >
              {data.eyebrow}
            </p>
          )}
          {data.title && (
            <h2
              data-details-reveal
              className="mb-8 text-balance text-3xl font-semibold leading-tight text-[#2a1d14] sm:text-4xl"
            >
              {data.title}
            </h2>
          )}

          <div data-details-reveal className="divide-y divide-[#dccdb4]">
            {groups.map((group, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-sm font-medium uppercase tracking-[0.15em] text-[#33241a]">
                      {group.title}
                    </span>
                    <span
                      className={`text-xl leading-none text-[#a9743c] transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>

                  {/* Panel colapsable (animación de altura con grid-rows) */}
                  <div
                    className="grid transition-[grid-template-rows] duration-[400ms] ease-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <ul className="space-y-2 pb-6 pl-1 text-[#6a5443]">
                        {(group.items ?? []).map((item, j) => (
                          <li key={j} className="flex gap-3 text-[15px]">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#a9743c]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {data.linkLabel && (
            <a
              data-details-reveal
              href={data.linkUrl || "#contact"}
              className="mt-8 inline-block text-sm font-medium tracking-wide text-[#a9743c] underline underline-offset-4 transition-colors hover:text-[#8f5f2e]"
            >
              {data.linkLabel}
            </a>
          )}
        </div>

        {/* Columna derecha: imagen */}
        <div
          data-details-reveal
          className="relative order-1 aspect-[4/5] overflow-hidden rounded-2xl border border-[#dccdb4] bg-[#efe6d6] lg:order-2 lg:sticky lg:top-24"
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={data.image?.alt ?? data.title ?? "Detalles"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder={data.image?.lqip ? "blur" : "empty"}
              blurDataURL={data.image?.lqip}
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm uppercase tracking-[0.3em] text-[#a9743c]/60">
              Imagen
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
