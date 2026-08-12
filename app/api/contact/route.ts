import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/lead-schema";

const BREVO_API_URL = "https://api.brevo.com/v3";

function envNumber(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

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
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      ok: true,
      mode: "preview",
      message: "Mesaj validat local. Adaugă BREVO_API_KEY pentru trimiterea către Brevo.",
    });
  }

  const headers = {
    accept: "application/json",
    "api-key": apiKey,
    "content-type": "application/json",
  };
  const listId = envNumber(process.env.BREVO_LIST_ID);

  const contactResponse = await fetch(`${BREVO_API_URL}/contacts`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email: data.email,
      updateEnabled: true,
      ...(listId ? { listIds: [listId] } : {}),
      attributes: {
        FIRSTNAME: data.name,
        PHONE: data.phone || "",
        PROJECT_TYPE: data.projectType,
        BUDGET: data.budget || "",
        LEAD_SOURCE: "contact-form",
      },
    }),
  });

  if (!contactResponse.ok) {
    return NextResponse.json(
      { ok: false, message: "Crearea contactului în Brevo a eșuat." },
      { status: 502 },
    );
  }

  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const recipientEmail = process.env.MDI_CONTACT_EMAIL;

  if (senderEmail && recipientEmail) {
    await fetch(`${BREVO_API_URL}/smtp/email`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        sender: {
          name: process.env.BREVO_SENDER_NAME || "MDI Software",
          email: senderEmail,
        },
        to: [{ email: recipientEmail, name: "MDI Software" }],
        replyTo: { email: data.email, name: data.name },
        subject: `Mesaj contact MDI: ${data.projectType}`,
        htmlContent: contactHtml(data),
      }),
    });
  }

  return NextResponse.json({ ok: true, mode: "brevo" });
}
