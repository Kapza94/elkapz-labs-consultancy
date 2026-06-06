import { sendContactEmail } from "@/lib/contact/mailer";
import { validateContactSubmission } from "@/lib/contact/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const validation = validateContactSubmission(payload);
  if (!validation.ok) {
    return Response.json(
      { ok: false, errors: validation.errors },
      { status: 400 },
    );
  }

  if (validation.spam) {
    return Response.json({ ok: true });
  }

  const delivery = await sendContactEmail(validation.data);
  if (!delivery.ok) {
    const configurationError = delivery.reason === "configuration";
    return Response.json(
      {
        ok: false,
        error: configurationError
          ? "service_unavailable"
          : "delivery_failed",
      },
      { status: configurationError ? 503 : 502 },
    );
  }

  return Response.json({ ok: true });
}
