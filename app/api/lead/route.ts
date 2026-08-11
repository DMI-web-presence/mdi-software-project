import { NextResponse } from "next/server";
import { getLeadRecommendation, leadSchema } from "@/lib/lead-schema";

const BREVO_API_URL = "https://api.brevo.com/v3";

function envNumber(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function briefHtml(data: Record<string, unknown>) {
  const labels: Record<string, string> = {
    projectType: "Tip proiect",
    goal: "Obiectiv",
    visualAssets: "Imagini",
    dominantColor: "Culoare dominantă",
    style: "Stil",
    sections: "Secțiuni",
    features: "Funcționalități",
    budget: "Buget",
    timeline: "Termen",
    name: "Nume",
    email: "Email",
    company: "Companie",
    message: "Mesaj",
    recommendation: "Recomandare",
  };

  const rows = Object.entries(data)
    .filter(([key]) => key !== "consent")
    .map(([key, value]) => {
      const label = labels[key] || key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
      const display = Array.isArray(value) ? value.join(", ") : String(value || "-");
      return `<tr><td style="padding:8px 12px;border-bottom:1px solid #e9e2d7;font-weight:700;">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #e9e2d7;">${display}</td></tr>`;
    })
    .join("");

  return `<html><body style="font-family:Arial,sans-serif;color:#151618;"><h2>Brief nou pentru MDI Software</h2><table style="border-collapse:collapse;width:100%;max-width:760px;">${rows}</table></body></html>`;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const recommendation = getLeadRecommendation(data);
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      ok: true,
      mode: "preview",
      recommendation,
      message: "Lead validat local. Adaugă BREVO_API_KEY pentru trimiterea către Brevo.",
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
        COMPANY: data.company || "",
        PROJECT_TYPE: data.projectType,
        PROJECT_GOAL: data.goal,
        BUDGET: data.budget,
        TIMELINE: data.timeline,
        RECOMMENDED_PACKAGE: recommendation.packageName,
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
        subject: `Brief nou de proiect: ${recommendation.packageName}`,
        htmlContent: briefHtml({ ...data, recommendation: recommendation.packageName }),
      }),
    });
  }

  return NextResponse.json({ ok: true, mode: "brevo", recommendation });
}
