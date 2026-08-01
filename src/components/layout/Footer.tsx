"use client";

import Link from "next/link";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";

import { gsap } from "@/lib/gsap";
import type { Social, SiteSettings } from "@/sanity/lib/types";

/** Logo de la red social según la plataforma. */
function SocialIcon({ platform }: { platform: string }) {
  const p = platform.toLowerCase();
  const cls = "h-5 w-5";

  if (p.includes("insta"))
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden>
        <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.9.07s-3.63 0-4.9-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5.01-4.74.07-.9.04-1.38.19-1.7.31-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.12.32-.27.8-.31 1.7C3.2 8.5 3.2 8.85 3.2 12s0 3.5.06 4.74c.04.9.19 1.38.31 1.7.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.12.8.27 1.7.31 1.24.06 1.59.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.38-.19 1.7-.31.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.12-.32.27-.8.31-1.7.06-1.24.07-1.59.07-4.74s0-3.5-.07-4.74c-.04-.9-.19-1.38-.31-1.7a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.32-.12-.8-.27-1.7-.31C15.5 4.01 15.15 4 12 4Zm0 3.06A4.94 4.94 0 1 1 7.06 12 4.94 4.94 0 0 1 12 7.06Zm0 8.15A3.21 3.21 0 1 0 8.79 12 3.21 3.21 0 0 0 12 15.2Zm6.3-8.35a1.15 1.15 0 1 1-1.15-1.15 1.15 1.15 0 0 1 1.15 1.15Z" />
      </svg>
    );

  if (p.includes("face") || p === "fb")
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden>
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
      </svg>
    );

  if (p.includes("tiktok"))
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden>
        <path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.1v12.43a2.59 2.59 0 1 1-2.6-2.59c.27 0 .53.04.78.12v-3.2a5.78 5.78 0 0 0-.78-.05 5.79 5.79 0 1 0 5.79 5.79V8.9a7.36 7.36 0 0 0 4.31 1.38V7.18a4.28 4.28 0 0 1-3.34-1.36Z" />
      </svg>
    );

  if (p.includes("whats"))
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden>
        <path d="M12.04 2a9.9 9.9 0 0 0-8.46 15.03L2 22l5.1-1.34A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 0 1 6.86 12.4l-.2.32.85 3.1-3.18-.83-.31.18a8.1 8.1 0 1 1-4.02-15.17Zm-3.2 4.2c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.7 4.18 3.68 2.06.82 2.48.66 2.93.62.45-.04 1.45-.6 1.65-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.46-.28-.24-.12-1.45-.72-1.67-.8-.22-.08-.38-.12-.54.12-.16.24-.62.8-.76.96-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.21-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.33-.74-1.81-.2-.48-.4-.41-.54-.42h-.46Z" />
      </svg>
    );

  if (p === "x" || p.includes("twitter"))
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden>
        <path d="M18.24 2.25h3.31l-7.23 8.26L22.5 21.75h-6.6l-5.17-6.76-5.92 6.76H1.5l7.73-8.84L1.5 2.25h6.77l4.67 6.18 5.3-6.18Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z" />
      </svg>
    );

  if (p.includes("youtube") || p.includes("yt"))
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden>
        <path d="M23.5 6.5a3 3 0 0 0-2.1-2.12C19.5 3.85 12 3.85 12 3.85s-7.5 0-9.4.53A3 3 0 0 0 .5 6.5 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.5 3 3 0 0 0 2.1 2.12c1.9.53 9.4.53 9.4.53s7.5 0 9.4-.53a3 3 0 0 0 2.1-2.12A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.5ZM9.6 15.5v-7l6.2 3.5-6.2 3.5Z" />
      </svg>
    );

  return <span className="text-xs uppercase tracking-widest">{platform}</span>;
}

function Column({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div data-foot-item className="flex flex-col items-center gap-3">
      <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a9743c]">
        {label}
      </h3>
      <div className="space-y-1 text-sm text-[#6a5443]">{children}</div>
    </div>
  );
}

export function Footer({ settings }: { settings: SiteSettings }) {
  const root = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();
  const brand = settings.brandName ?? "Artesano Bar";
  const b = settings.business ?? {};
  const socials: Social[] = settings.socials ?? [];
  const reserveHref = settings.reservationUrl || "#contact";
  const reserveExternal = Boolean(settings.reservationUrl);

  const cityLine = [
    b.locality,
    [b.region, b.postalCode].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(", ");

  useGSAP(
    () => {
      // Línea dorada superior: barrido de brillo continuo (tipo "luz de bar").
      gsap.fromTo(
        "[data-foot-shine]",
        { backgroundPosition: "-200% 0" },
        {
          backgroundPosition: "200% 0",
          duration: 4,
          ease: "none",
          repeat: -1,
        },
      );

      // Entrada en cascada al aparecer el footer.
      gsap.from("[data-foot-item]", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 85%" },
      });

      // Flotación sutil del wordmark.
      gsap.to("[data-foot-mark]", {
        y: -6,
        duration: 2.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: root },
  );

  return (
    <footer
      id="footer"
      ref={root}
      className="relative overflow-hidden border-t border-[#dccdb4] bg-[#efe6d6] px-6 py-20 text-[#6a5443]"
    >
      {/* Línea caramelo con brillo en movimiento */}
      <div
        data-foot-shine
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(169,116,60,0.15) 35%, rgba(169,116,60,0.9) 50%, rgba(169,116,60,0.15) 65%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
      />
      {/* Resplandor cálido ambiental */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[80%] -translate-x-1/2 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(200,150,80,0.22), transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Wordmark */}
        <div
          data-foot-mark
          className="font-serif leading-none text-[#2a1d14]"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          <p className="text-4xl tracking-[0.12em] sm:text-5xl">ARTESANO</p>
          <p className="mt-2 text-base tracking-[0.5em] text-[#a9743c] sm:text-lg">
            BAR
          </p>
        </div>

        <p
          data-foot-item
          className="mt-8 text-xs font-semibold uppercase tracking-[0.45em] text-[#a9743c]"
        >
          Visítanos
        </p>

        {/* Columnas: Dirección · Horarios · Redes */}
        <div className="mt-8 grid w-full gap-10 sm:grid-cols-3">
          <Column label="Dirección">
            {b.streetAddress && <p>{b.streetAddress}</p>}
            {cityLine && <p>{cityLine}</p>}
            {b.phone && (
              <p>
                <a
                  href={`tel:${b.phone.replace(/[^\d+]/g, "")}`}
                  className="transition-colors hover:text-[#a9743c]"
                >
                  {b.phone}
                </a>
              </p>
            )}
          </Column>

          <Column label="Horarios">
            {b.hoursText
              ? b.hoursText
                  .split("\n")
                  .filter(Boolean)
                  .map((line, i) => <p key={i}>{line}</p>)
              : (b.openingHours ?? []).length > 0
                ? b.openingHours!.map((h, i) => <p key={i}>{h}</p>)
                : <p>Consúltanos</p>}
          </Column>

          <Column label="Redes">
            {socials.length > 0 ? (
              <ul className="flex items-center justify-center gap-5">
                {socials.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.platform}
                      className="inline-flex text-[#6a5443] transition-all duration-300 hover:-translate-y-1 hover:text-[#a9743c] hover:drop-shadow-[0_0_8px_rgba(169,116,60,0.5)]"
                    >
                      <SocialIcon platform={s.platform} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Próximamente</p>
            )}
          </Column>
        </div>

        {/* Botón de reserva */}
        <a
          data-foot-item
          href={reserveHref}
          {...(reserveExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="group mt-12 inline-flex items-center gap-2 rounded-full bg-[#a9743c] px-8 py-3 text-sm font-medium uppercase tracking-[0.2em] text-[#f6f1e8] transition-all duration-300 hover:bg-[#8f5f2e] hover:shadow-[0_8px_24px_rgba(169,116,60,0.4)]"
        >
          Reservar en línea
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>

        {/* Aviso de privacidad + copyright */}
        <p
          data-foot-item
          className="mt-12 max-w-2xl text-balance text-xs leading-relaxed text-[#8a7462]"
        >
          Usamos Microsoft Clarity para mejorar la experiencia del sitio. Al
          navegar, aceptas la recolección de estos datos. Más detalles en{" "}
          <Link
            href="/privacidad"
            className="font-semibold text-[#6a5443] underline underline-offset-2 transition-colors hover:text-[#a9743c]"
          >
            nuestra política de privacidad
          </Link>
          .
        </p>

        <p className="mt-6 text-xs text-[#a3937d]">
          © {year} {brand}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
