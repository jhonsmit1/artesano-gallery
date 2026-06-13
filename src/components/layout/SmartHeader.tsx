"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { useGSAP } from "@gsap/react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import type { NavLink } from "@/sanity/lib/types";

import { ArtesanoMark } from "@/components/ui/ArtesanoMark";

type Props = {
  brandName: string;
  navLinks: NavLink[];
  menuPdfUrl?: string;
  logoUrl?: string;
};

export function SmartHeader({ brandName, navLinks, menuPdfUrl, logoUrl }: Props) {
  const headerRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string>(navLinks[0]?.anchor ?? "");
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;

      // Animación suave del header (mostrar/ocultar).
      const showHide = gsap.quickTo(header, "yPercent", {
        duration: 0.4,
        ease: "power2.out",
      });

      // Ocultar al bajar, mostrar al subir (Sticky & Smart).
      const directionTrigger = ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          if (self.scroll() < 80) {
            showHide(0); // siempre visible cerca del top
          } else if (self.direction === 1) {
            showHide(-100); // bajando -> ocultar
          } else {
            showHide(0); // subiendo -> mostrar
          }
        },
      });

      // Estado activo del menú según la sección en pantalla.
      // Solo creamos el trigger si la sección existe en el DOM (evita errores
      // si un nav link del CMS apunta a un ancla inexistente).
      const sectionTriggers = navLinks
        .filter((link) => document.getElementById(link.anchor))
        .map((link) =>
          ScrollTrigger.create({
            trigger: `#${link.anchor}`,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => self.isActive && setActive(link.anchor),
          }),
        );

      return () => {
        directionTrigger.kill();
        sectionTriggers.forEach((t) => t.kill());
      };
    },
    { dependencies: [navLinks] },
  );

  const scrollTo = (anchor: string) => {
    setOpen(false);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(`#${anchor}`, { offset: 0, duration: 1.1 });
      return;
    }
    gsap.to(window, {
      duration: 1,
      ease: "power3.inOut",
      scrollTo: { y: `#${anchor}`, offsetY: 0 },
    });
  };

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-neutral-950/60 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button
          onClick={() => scrollTo(navLinks[0]?.anchor ?? "hero")}
          aria-label={brandName}
          className="flex items-center"
        >
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={brandName}
              width={160}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          ) : (
            <ArtesanoMark />
          )}
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.anchor}>
              <button
                onClick={() => scrollTo(link.anchor)}
                className={`text-sm uppercase tracking-widest transition-colors ${
                  active === link.anchor
                    ? "text-white"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {menuPdfUrl && (
            <a
              href={menuPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-white/30 px-5 py-2 text-xs uppercase tracking-widest text-neutral-100 transition-colors hover:bg-white hover:text-neutral-950 md:inline-block"
            >
              Carta
            </a>
          )}
          <button
            aria-label="Abrir menú"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-px w-7 bg-neutral-100" />
            <span className="mt-2 block h-px w-7 bg-neutral-100" />
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {open && (
        <ul className="space-y-4 border-t border-white/10 px-6 py-6 md:hidden">
          {navLinks.map((link) => (
            <li key={link.anchor}>
              <button
                onClick={() => scrollTo(link.anchor)}
                className="text-lg uppercase tracking-widest text-neutral-200"
              >
                {link.label}
              </button>
            </li>
          ))}
          {menuPdfUrl && (
            <li>
              <a
                href={menuPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg uppercase tracking-widest text-neutral-200"
              >
                Carta (PDF)
              </a>
            </li>
          )}
        </ul>
      )}
    </header>
  );
}
