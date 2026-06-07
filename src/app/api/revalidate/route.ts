import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Webhook de Sanity -> revalida el contenido cacheado (ISR) al instante.
 * Configura en Sanity (API > Webhooks) una llamada POST a:
 *   https://artesanogallery.com/api/revalidate?secret=TU_SECRETO
 * con el header opcional o el query `secret`.
 */
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json(
      { message: "Webhook no configurado." },
      { status: 501 },
    );
  }

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "No autorizado." }, { status: 401 });
  }

  let type: string | undefined;
  try {
    const body = await req.json();
    type = body?._type;
  } catch {
    // Cuerpo vacío o inválido: revalidamos todo de todas formas.
  }

  // Revalida sólo el tipo afectado, o ambos si no se especifica.
  const tags = type ? [type] : ["home", "siteSettings"];
  tags.forEach((tag) => revalidateTag(tag, "max"));

  return NextResponse.json({ revalidated: true, tags, now: Date.now() });
}
