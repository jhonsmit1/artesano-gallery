"use server";

import { createClient } from "next-sanity";
import { Resend } from "resend";
import { z } from "zod";

import { apiVersion, dataset, projectId } from "@/sanity/env";

// Validación en el servidor (defensa principal).
const LeadSchema = z.object({
  name: z.string().trim().min(2, "Nombre demasiado corto").max(120),
  email: z.string().trim().email("Email inválido").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  // Honeypot anti-spam: debe venir vacío.
  company: z.string().max(0).optional(),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string>;
};

export async function submitLead(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = LeadSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    company: formData.get("company"),
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[String(issue.path[0])] = issue.message;
    }
    return {
      status: "error",
      message: "Revisa los campos del formulario.",
      errors,
    };
  }

  const { name, email, phone, message, company } = parsed.data;

  // Si el honeypot tiene contenido, simulamos éxito sin procesar.
  if (company) {
    return { status: "success", message: "¡Gracias! Te contactaremos pronto." };
  }

  try {
    // 1) Notificación por email (Resend).
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "Artesano Gallery <onboarding@resend.dev>",
        to: process.env.LEAD_NOTIFICATION_EMAIL || "",
        replyTo: email,
        subject: `Nuevo lead — ${name}`,
        text: [
          `Nombre: ${name}`,
          `Email: ${email}`,
          `Teléfono: ${phone || "—"}`,
          "",
          message || "(sin mensaje)",
        ].join("\n"),
      });
    }

    // 2) Copia de respaldo en el CMS (Sanity).
    const writeToken = process.env.SANITY_API_WRITE_TOKEN;
    if (writeToken && projectId) {
      const writeClient = createClient({
        projectId,
        dataset,
        apiVersion,
        token: writeToken,
        useCdn: false,
      });
      await writeClient.create({
        _type: "lead",
        name,
        email,
        phone: phone || undefined,
        message: message || undefined,
        createdAt: new Date().toISOString(),
      });
    }

    return {
      status: "success",
      message: "¡Gracias! Hemos recibido tu mensaje.",
    };
  } catch (error) {
    console.error("submitLead error:", error);
    return {
      status: "error",
      message: "Hubo un problema al enviar. Inténtalo de nuevo.",
    };
  }
}
