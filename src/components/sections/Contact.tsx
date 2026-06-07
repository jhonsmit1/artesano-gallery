import type { ContactContent } from "@/sanity/lib/types";

import { ContactForm } from "@/components/ui/ContactForm";

export function Contact({ data }: { data: ContactContent }) {
  return (
    <section
      id="contact"
      className="bg-neutral-950 py-28 text-neutral-100 sm:py-40"
    >
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2">
        <div>
          {data.eyebrow && (
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-neutral-500">
              {data.eyebrow}
            </p>
          )}
          <h2 className="mb-6 text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            {data.title ?? "Reserva tu experiencia"}
          </h2>
          {data.text && (
            <p className="max-w-md text-pretty text-lg text-neutral-400">
              {data.text}
            </p>
          )}
        </div>

        <ContactForm
          buttonLabel={data.buttonLabel}
          successMessage={data.successMessage}
        />
      </div>
    </section>
  );
}
