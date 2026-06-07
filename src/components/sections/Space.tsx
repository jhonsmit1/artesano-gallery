"use client";

import Image from "next/image";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";

import { gsap } from "@/lib/gsap";
import { urlForImage } from "@/sanity/lib/image";
import type { SpaceContent } from "@/sanity/lib/types";

export function Space({ data }: { data: SpaceContent }) {
  const root = useRef<HTMLDivElement>(null);
  const gallery = data.gallery ?? [];

  useGSAP(
    () => {
      gsap.from("[data-space-head]", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });

      gsap.utils.toArray<HTMLElement>("[data-gallery-item]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 1.08, clipPath: "inset(12% 0% 12% 0%)" },
          {
            opacity: 1,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
        );
      });
    },
    { scope: root, dependencies: [gallery.length] },
  );

  return (
    <section
      id="space"
      ref={root}
      className="bg-neutral-100 py-28 text-neutral-900 sm:py-40"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          {data.eyebrow && (
            <p
              data-space-head
              className="mb-4 text-xs uppercase tracking-[0.35em] text-neutral-500"
            >
              {data.eyebrow}
            </p>
          )}
          <h2
            data-space-head
            className="mb-6 text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
          >
            {data.title ?? "The Space"}
          </h2>
          {data.intro && (
            <p data-space-head className="text-pretty text-lg text-neutral-600">
              {data.intro}
            </p>
          )}
        </div>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {gallery.map((img, i) => {
            const url = img.asset
              ? urlForImage(img).width(1200).url()
              : null;
            if (!url) return null;
            return (
              <div
                key={i}
                data-gallery-item
                className="relative overflow-hidden rounded-xl bg-neutral-200"
                style={{ aspectRatio: img.aspectRatio ?? 0.8 }}
              >
                <Image
                  src={url}
                  alt={img.alt ?? `Espacio ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder={img.lqip ? "blur" : "empty"}
                  blurDataURL={img.lqip}
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
