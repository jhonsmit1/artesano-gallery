"use client";

import Image from "next/image";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";

import { gsap } from "@/lib/gsap";
import { urlForImage } from "@/sanity/lib/image";
import type { ConceptContent } from "@/sanity/lib/types";

import { PortableText } from "@/components/ui/PortableText";

export function Concept({ data }: { data: ConceptContent }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-reveal]", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
        },
      });

      if (root.current?.querySelector("[data-concept-media]")) {
        gsap.to("[data-concept-media]", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: root },
  );

  const imageUrl = data.media?.asset
    ? urlForImage(data.media).width(1400).url()
    : null;

  return (
    <section
      id="concept"
      ref={root}
      className="relative bg-neutral-950 py-28 text-neutral-100 sm:py-40"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          {data.eyebrow && (
            <p
              data-reveal
              className="mb-4 text-xs uppercase tracking-[0.35em] text-neutral-500"
            >
              {data.eyebrow}
            </p>
          )}
          <h2
            data-reveal
            className="mb-8 text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
          >
            {data.title ?? "The Concept"}
          </h2>
          <div data-reveal>
            <PortableText value={data.body} />
          </div>
        </div>

        <div
          data-reveal
          className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900"
        >
          {data.mediaVideoUrl ? (
            <video
              data-concept-media
              className="h-[112%] w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={data.mediaVideoUrl} />
            </video>
          ) : imageUrl ? (
            <Image
              data-concept-media
              src={imageUrl}
              alt={data.media?.alt ?? data.title ?? "Concept"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder={data.media?.lqip ? "blur" : "empty"}
              blurDataURL={data.media?.lqip}
              className="object-cover"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
