"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

import {
  submitLead,
  type ContactState,
} from "@/app/actions/contact";

const initialState: ContactState = { status: "idle", message: "" };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-8 py-3 text-sm font-medium uppercase tracking-[0.2em] text-amber-100 transition-all duration-300 hover:border-amber-300 hover:bg-amber-300 hover:text-neutral-950 hover:shadow-[0_0_24px_rgba(245,210,140,0.45)] disabled:opacity-50"
    >
      {pending ? "Enviando…" : label}
      {!pending && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      )}
    </button>
  );
}

export function ContactForm({
  buttonLabel = "Enviar",
  successMessage,
}: {
  buttonLabel?: string;
  successMessage?: string;
}) {
  const [state, formAction] = useActionState(submitLead, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5" noValidate>
      {/* Honeypot anti-spam (oculto para usuarios) */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0"
        aria-hidden
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="name"
          label="Nombre"
          required
          error={state.errors?.name}
        />
        <Field
          name="email"
          label="Email"
          type="email"
          required
          error={state.errors?.email}
        />
      </div>
      <Field name="phone" label="Teléfono (opcional)" error={state.errors?.phone} />

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-xs uppercase tracking-widest text-amber-200/70"
        >
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-neutral-100 outline-none transition-colors placeholder:text-neutral-500 focus:border-amber-300/60 focus:bg-white/[0.07]"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton label={buttonLabel} />
        {state.status === "success" && (
          <p className="text-sm text-emerald-400" role="status">
            {successMessage || state.message}
          </p>
        )}
        {state.status === "error" && !state.errors && (
          <p className="text-sm text-red-400" role="alert">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs uppercase tracking-widest text-amber-200/70"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        aria-invalid={Boolean(error)}
        className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-neutral-100 outline-none transition-colors placeholder:text-neutral-500 focus:border-amber-300/60 focus:bg-white/[0.07]"
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
