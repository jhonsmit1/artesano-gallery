"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import type { NavLink } from "@/sanity/lib/types";

// Logo local por defecto (se puede reemplazar desde el Studio).
const FALLBACK_LOGO = "/logo.png";

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

  // Scrollspy con IntersectionObserver: marca la sección activa cuando su
  // contenido cruza una banda en el CENTRO del viewport (posición real en
  // pantalla, inmune al pin del Hero). Solo se marca cuando de verdad estás ahí.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.anchor))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // Banda de ~20% en el centro del viewport.
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [navLinks]);

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
      className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-[#f6f1e8]/55 to-transparent backdrop-blur-[3px]"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button
          onClick={() => scrollTo(navLinks[0]?.anchor ?? "hero")}
          aria-label={brandName}
          className="flex items-center"
        >
          <Image
            src={logoUrl || FALLBACK_LOGO}
            alt={brandName}
            width={320}
            height={180}
            className="h-16 w-auto object-contain sm:h-20"
            priority
          />
        </button>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.anchor;
            return (
              <li key={link.anchor}>
                <button
                  onClick={() => scrollTo(link.anchor)}
                  className={`group relative text-[13px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${
                    isActive
                      ? "text-[#a9743c]"
                      : "text-[#4a3728] hover:text-[#a9743c]"
                  }`}
                >
                  {link.label}
                  {/* Subrayado que marca la sección activa */}
                  <span
                    className={`absolute -bottom-2 left-0 h-[2px] rounded-full bg-[#a9743c] transition-all duration-300 ${
                      isActive
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full group-hover:opacity-60"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4">
          {menuPdfUrl && (
            <a
              href={menuPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-[#a9743c]/50 px-5 py-2 text-xs uppercase tracking-widest text-[#6a5443] transition-colors hover:bg-[#a9743c] hover:text-[#f6f1e8] lg:inline-block"
            >
              Carta
            </a>
          )}
          <button
            aria-label="Abrir menú"
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-px w-7 bg-[#33241a]" />
            <span className="mt-2 block h-px w-7 bg-[#33241a]" />
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {open && (
        <ul className="space-y-4 border-t border-[#33241a]/10 bg-[#f6f1e8]/95 px-6 py-6 lg:hidden">
          {navLinks.map((link) => (
            <li key={link.anchor}>
              <button
                onClick={() => scrollTo(link.anchor)}
                className={`text-lg font-bold uppercase tracking-widest transition-colors ${
                  active === link.anchor ? "text-[#a9743c]" : "text-[#4a3728]"
                }`}
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
                className="text-lg uppercase tracking-widest text-[#6a5443]"
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
