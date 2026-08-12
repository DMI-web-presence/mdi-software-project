import { NextResponse } from "next/server";
import { getBrevoListIds, hasBrevoConfig, sendBrevoNotification, upsertBrevoContact } from "@/lib/brevo";
import { contactSchema } from "@/lib/lead-schema";
import { guardResponse, guardSubmission } from "@/lib/submission-guard";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function contactHtml(data: {
  budget?: string;
  email: string;
  message: string;
  name: string;
  phone?: string;
  projectType: string;
}) {
  const rows = [
    ["Nume", data.name],
    ["Email", data.email],
    ["Telefon", data.phone || "-"],
    ["Tip proiect", data.projectType],
    ["Buget", data.budget || "-"],
    ["Mesaj", data.message],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #e9e2d7;font-weight:700;">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #e9e2d7;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `<html><body style="font-family:Arial,sans-serif;color:#151618;"><h2>Mesaj nou de contact pentru MDI Software</h2><table style="border-collapse:collapse;width:100%;max-width:760px;">${rows}</table></body></html>`;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const guardFailure = await guardSubmission({ body, endpoint: "contact" });

  if (guardFailure) {
    return guardResponse(guardFailure);
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (!hasBrevoConfig()) {
    return NextResponse.json({
      ok: true,
      mode: "preview",
      message: "Mesaj validat local. Adaugă BREVO_API_KEY pentru trimiterea către Brevo.",
    });
  }

  try {
    await upsertBrevoContact({
      email: data.email,
      listIds: getBrevoListIds("BREVO_CONTACT_LIST_ID", "BREVO_LIST_ID"),
      standardAttributes: {
        FIRSTNAME: data.name,
      },
      attributes: {
        PROJECT_TYPE: data.projectType,
        BUDGET: data.budget || "",
        LEAD_SOURCE: "contact-form",
      },
    });
  } catch (error) {
    console.error("Brevo contact sync failed", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          process.env.NODE_ENV === "development"
            ? `Brevo contact sync failed: ${error instanceof Error ? error.message : "Unknown error"}`
            : "Trimiterea către Brevo a eșuat. Verifică API key și lista configurată.",
      },
      { status: 502 },
    );
  }

  try {
    await sendBrevoNotification({
      replyTo: { email: data.email, name: data.name },
      subject: `Mesaj contact MDI: ${data.projectType}`,
      htmlContent: contactHtml(data),
    });
  } catch (error) {
    console.error("Brevo notification failed", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          process.env.NODE_ENV === "development"
            ? `Brevo notification failed: ${error instanceof Error ? error.message : "Unknown error"}`
            : "Trimiterea către Brevo a eșuat. Verifică sender-ul configurat.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, mode: "brevo" });
}
