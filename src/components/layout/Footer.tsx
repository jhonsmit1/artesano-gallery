import Link from "next/link";

import type { Social } from "@/sanity/lib/types";
import type { SiteSettings } from "@/sanity/lib/types";

/** Icono según la plataforma (Instagram / Facebook / fallback). */
function SocialIcon({ platform }: { platform: string }) {
  const p = platform.toLowerCase();

  if (p.includes("insta")) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
        fill="currentColor"
      >
        <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.9.07s-3.63 0-4.9-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5.01-4.74.07-.9.04-1.38.19-1.7.31-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.12.32-.27.8-.31 1.7C3.2 8.5 3.2 8.85 3.2 12s0 3.5.06 4.74c.04.9.19 1.38.31 1.7.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.12.8.27 1.7.31 1.24.06 1.59.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.38-.19 1.7-.31.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.12-.32.27-.8.31-1.7.06-1.24.07-1.59.07-4.74s0-3.5-.07-4.74c-.04-.9-.19-1.38-.31-1.7a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.32-.12-.8-.27-1.7-.31C15.5 4.01 15.15 4 12 4Zm0 3.06A4.94 4.94 0 1 1 7.06 12 4.94 4.94 0 0 1 12 7.06Zm0 8.15A3.21 3.21 0 1 0 8.79 12 3.21 3.21 0 0 0 12 15.2Zm6.3-8.35a1.15 1.15 0 1 1-1.15-1.15 1.15 1.15 0 0 1 1.15 1.15Z" />
      </svg>
    );
  }

  if (p.includes("face") || p === "fb") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
        fill="currentColor"
      >
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
      </svg>
    );
  }

  return <span className="text-xs uppercase tracking-widest">{platform}</span>;
}

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  const brand = settings.brandName ?? "Artesano Gallery";
  const b = settings.business ?? {};
  const socials: Social[] = settings.socials ?? [];

  const cityLine = [
    b.locality,
    [b.region, b.postalCode].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <footer
      id="footer"
      className="border-t border-stone-200 bg-stone-50 px-6 py-16 text-stone-700"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Wordmark */}
        <div className="font-serif leading-none text-stone-900">
          <p className="text-4xl tracking-tight sm:text-5xl">ARTESANO</p>
          <p className="mt-2 text-lg tracking-[0.45em] sm:text-2xl">GALLERY</p>
        </div>

        {/* Datos de contacto */}
        <address className="mt-8 space-y-1 not-italic text-base text-stone-600">
          {b.streetAddress && <p>{b.streetAddress}</p>}
          {cityLine && <p>{cityLine}</p>}
          {b.phone && (
            <p>
              <a
                href={`tel:${b.phone.replace(/[^\d+]/g, "")}`}
                className="transition-colors hover:text-stone-900"
              >
                {b.phone}
              </a>
            </p>
          )}
          {b.email && (
            <p>
              <a
                href={`mailto:${b.email}`}
                className="transition-colors hover:text-stone-900"
              >
                {b.email}
              </a>
            </p>
          )}
        </address>

        {/* Redes sociales */}
        {socials.length > 0 && (
          <ul className="mt-8 flex items-center gap-6">
            {socials.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  className="text-stone-700 transition-colors hover:text-amber-700"
                >
                  <SocialIcon platform={s.platform} />
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Aviso Microsoft Clarity + privacidad */}
        <p className="mt-12 max-w-2xl text-balance text-sm leading-relaxed text-stone-500">
          We improve our products and advertising by using Microsoft Clarity to
          see how you use our website. By using our site, you agree that we and
          Microsoft can collect and use this data. Our privacy statement{" "}
          <Link
            href="/privacidad"
            className="font-semibold text-stone-800 underline underline-offset-2 transition-colors hover:text-amber-700"
          >
            LINK
          </Link>{" "}
          has more details.
        </p>

        <p className="mt-8 text-xs text-stone-400">
          © {year} {brand}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
