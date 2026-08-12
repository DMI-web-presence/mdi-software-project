import { NextResponse } from "next/server";
import { getBrevoListIds, hasBrevoConfig, sendBrevoNotification, upsertBrevoContact } from "@/lib/brevo";
import { getLeadRecommendation, type LeadFormData, type LeadRecommendation, leadSchema } from "@/lib/lead-schema";
import { guardResponse, guardSubmission } from "@/lib/submission-guard";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function displayValue(value?: string | string[]) {
  const display = Array.isArray(value) ? value.filter(Boolean).join(", ") : value;

  return escapeHtml(display || "-");
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const value = parts.length >= 2 ? `${parts[0][0]}${parts[1][0]}` : name.slice(0, 2);

  return escapeHtml(value.toUpperCase() || "MD");
}

function countLabel(count: number, singular: string, plural: string) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function formatTimestamp() {
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    month: "long",
    timeZone: "Europe/Bucharest",
    year: "numeric",
  }).format(new Date());
}

function detailsTable(rows: Array<[string, string | string[] | undefined]>) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${rows
        .map(
          ([label, value]) => `
            <tr>
              <td width="35%" valign="top" style="padding:0 0 14px;color:#0d1830;font-size:15px;line-height:1.55;">${escapeHtml(label)}</td>
              <td valign="top" style="padding:0 0 14px;color:#0d1830;font-size:15px;font-weight:700;line-height:1.55;">${displayValue(value)}</td>
            </tr>`,
        )
        .join("")}
    </table>`;
}

function timelineSection(index: number, icon: string, title: string, rows: Array<[string, string | string[] | undefined]>) {
  return `
    <tr>
      <td width="74" valign="top" style="padding:22px 0;border-bottom:1px solid #dce2ea;">
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="width:34px;height:34px;border-radius:999px;background:#f05736;color:#ffffff;font-size:16px;font-weight:900;line-height:34px;">${index}</td>
          </tr>
        </table>
      </td>
      <td width="84" valign="top" style="padding:22px 0;border-bottom:1px solid #dce2ea;">
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="width:58px;height:58px;border-radius:999px;background:#eef4fa;color:#0d1830;font-size:26px;line-height:58px;">${icon}</td>
          </tr>
        </table>
      </td>
      <td width="150" valign="top" style="padding:29px 20px 22px 0;border-bottom:1px solid #dce2ea;">
        <p style="margin:0;color:#0d1830;font-size:22px;font-weight:900;line-height:1.25;">${escapeHtml(title)}</p>
      </td>
      <td valign="top" style="padding:25px 0 12px;border-bottom:1px solid #dce2ea;">
        ${detailsTable(rows)}
      </td>
    </tr>`;
}

function summaryItem(icon: string, label: string, value: string) {
  return `
    <td valign="top" style="padding:0 18px;border-right:1px solid #dce2ea;">
      <p style="margin:0 0 12px;color:#0aaee8;font-size:30px;line-height:1;">${icon}</p>
      <p style="margin:0 0 7px;color:#0d1830;font-size:15px;font-weight:900;">${escapeHtml(label)}</p>
      <p style="margin:0;color:#0d1830;font-size:15px;line-height:1.5;">${escapeHtml(value || "-")}</p>
    </td>`;
}

function briefHtml(data: LeadFormData, recommendation: LeadRecommendation) {
  const replyHref = `mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent(`Re: Brief MDI Software - ${recommendation.packageName}`)}`;
  const timestamp = formatTimestamp();

  return `
    <!doctype html>
    <html>
      <body style="margin:0;background:#101a27;font-family:Arial,Helvetica,sans-serif;color:#0d1830;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#101a27;padding:0 14px 38px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:960px;">
                <tr>
                  <td style="padding:18px 8px;color:#d6dde8;font-size:15px;font-weight:900;letter-spacing:.16em;text-transform:uppercase;">Brief nou</td>
                </tr>
                <tr>
                  <td style="border:1px solid #8aa4c5;border-radius:14px 14px 0 0;background:#071a35;color:#ffffff;overflow:hidden;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:34px 48px 24px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="150" valign="top">
                                <p style="margin:0;color:#25d9ff;font-size:16px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;">Brief nou</p>
                              </td>
                              <td valign="top">
                                <h1 style="margin:0;color:#ffffff;font-size:34px;font-weight:900;line-height:1.12;">Ai primit un brief nou</h1>
                                <p style="margin:16px 0 0;max-width:560px;color:#ffffff;font-size:18px;line-height:1.55;">Un client a finalizat formularul ghidat. Mai jos ai răspunsurile esențiale și brief-ul complet.</p>
                                <p style="margin:14px 0 0;color:#d7deea;font-size:15px;line-height:1.5;">◷ Trimis la ${escapeHtml(timestamp)}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 48px;">
                          <div style="height:1px;background:#50667f;line-height:1px;">&nbsp;</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:24px 48px 34px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="122" valign="middle">
                                <table role="presentation" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td align="center" style="width:96px;height:96px;border-radius:999px;border:2px solid #d7e4ff;background:#244da2;color:#ffffff;font-size:34px;font-weight:900;line-height:96px;">${initials(data.name)}</td>
                                  </tr>
                                </table>
                              </td>
                              <td valign="middle">
                                <h2 style="margin:0 0 12px;color:#ffffff;font-size:28px;font-weight:900;line-height:1.2;">${escapeHtml(data.name)}</h2>
                                <p style="margin:0 0 9px;color:#d7deea;font-size:17px;line-height:1.45;">✉ <a style="color:#25c9ff;text-decoration:underline;" href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
                                <p style="margin:0 0 9px;color:#d7deea;font-size:17px;line-height:1.45;">☏ <a style="color:#25c9ff;text-decoration:underline;" href="tel:${escapeHtml(data.phone || "")}">${displayValue(data.phone)}</a></p>
                                <p style="margin:0 0 9px;color:#d7deea;font-size:17px;line-height:1.45;">♙ ${displayValue(data.company)}</p>
                                <p style="margin:0;color:#d7deea;font-size:17px;line-height:1.45;">◉ Preferință contact: <strong style="color:#ffffff;">${displayValue(data.contactPreference)}</strong></p>
                              </td>
                              <td width="230" align="right" valign="middle">
                                <a href="${replyHref}" style="display:inline-block;border-radius:7px;background:#f05736;color:#ffffff;font-size:16px;font-weight:900;text-decoration:none;padding:18px 22px;">Răspunde clientului&nbsp; →</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="background:#ffffff;padding:28px 30px 0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #d8dde6;border-radius:14px;background:#ffffff;">
                      <tr>
                        <td style="padding:20px 18px 18px;">
                          <p style="margin:0 0 22px;color:#f05736;font-size:13px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;">Rezumat executiv</p>
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              ${summaryItem("▣", "Proiect", data.projectType)}
                              ${summaryItem("◎", "Obiectiv", data.goal)}
                              ${summaryItem("▤", "Buget", data.budget)}
                              <td valign="top" style="padding:0 18px;">
                                <p style="margin:0 0 12px;color:#195ac8;font-size:30px;line-height:1;">▣</p>
                                <p style="margin:0 0 7px;color:#0d1830;font-size:15px;font-weight:900;">Termen</p>
                                <p style="margin:0;color:#0d1830;font-size:15px;line-height:1.5;">${displayValue(data.timeline)}</p>
                              </td>
                            </tr>
                          </table>
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;border:1px solid #f5cabb;border-radius:10px;background:#fff8f4;">
                            <tr>
                              <td width="64" align="center" style="padding:18px;color:#f05736;font-size:30px;">☆</td>
                              <td style="padding:18px 18px 18px 0;">
                                <p style="margin:0 0 5px;color:#f05736;font-size:15px;font-weight:900;">Recomandare</p>
                                <p style="margin:0;color:#0d1830;font-size:18px;font-weight:900;">${escapeHtml(recommendation.packageName)}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="background:#ffffff;padding:18px 30px 0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      ${timelineSection(1, "▱", "Proiect", [
                        ["Tip proiect", data.projectType],
                        ["Obiectiv", data.goal],
                        ["Descriere", data.projectDescription],
                      ])}
                      ${timelineSection(2, "✎", "Stil vizual", [
                        ["Stil vizual", data.style],
                        ["Paletă", data.colorFamily],
                        ["Fonturi", data.fontPair],
                        ["Referințe", countLabel(data.inspirationLinks.filter(Boolean).length, "link", "linkuri")],
                      ])}
                      ${timelineSection(3, "▣", "Structură", [
                        ["Pagini", countLabel(data.pages.length, "pagină", "pagini")],
                        ["Secțiuni", countLabel(data.sections.length, "secțiune", "secțiuni")],
                        ["Funcționalități", data.features],
                      ])}
                      ${timelineSection(4, "▤", "Conținut", [
                        ["Status conținut", data.contentStatus],
                        ["Fișiere încărcate", countLabel(data.assetNames.length, "fișier", "fișiere")],
                        ["Fișiere", data.assetNames],
                        ["Observații", data.contentNotes],
                      ])}
                      ${timelineSection(5, "⚑", "Plan", [
                        ["Buget", data.budget],
                        ["Lansare", data.timeline],
                        ["Suport", data.support],
                      ])}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="background:#ffffff;padding:22px 30px 0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #cfe2f7;border-radius:10px;background:#f3f9ff;">
                      <tr>
                        <td width="74" align="center" valign="top" style="padding:22px 0;color:#195ac8;font-size:34px;">☆</td>
                        <td style="padding:22px 22px 22px 0;">
                          <p style="margin:0 0 6px;color:#f05736;font-size:16px;font-weight:900;">Recomandare automată</p>
                          <p style="margin:0 0 6px;color:#0d1830;font-size:16px;line-height:1.55;">Pe baza răspunsurilor, recomandăm <strong>${escapeHtml(recommendation.packageName)}</strong>.</p>
                          <p style="margin:0;color:#6b7586;font-size:15px;line-height:1.55;">Aceasta este o recomandare orientativă, nu o ofertă finală.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="background:#ffffff;padding:28px 30px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="310" valign="top">
                          <a href="${replyHref}" style="display:inline-block;border-radius:7px;background:#f05736;color:#ffffff;font-size:17px;font-weight:900;text-decoration:none;padding:18px 27px;">Răspunde clientului&nbsp; →</a>
                        </td>
                        <td width="300" valign="top">
                          <a href="mailto:${escapeHtml(data.email)}" style="display:inline-block;border:2px solid #0d1830;border-radius:7px;color:#0d1830;font-size:17px;font-weight:900;text-decoration:none;padding:16px 25px;">Deschide brief-ul complet ↗</a>
                        </td>
                        <td valign="middle" align="right">
                          <a href="mailto:${escapeHtml(data.email)}" style="color:#168bd8;font-size:16px;font-weight:900;text-decoration:none;">▧ Descarcă brief PDF</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="background:#ffffff;padding:0 30px;">
                    <div style="height:1px;background:#dce2ea;line-height:1px;">&nbsp;</div>
                  </td>
                </tr>
                <tr>
                  <td style="background:#ffffff;padding:24px 30px 28px;color:#7a8495;font-size:15px;line-height:1.6;">
                    Mesaj generat automat de website-ul MDI Software.<br />
                    © 2026 MDI Software
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const guardFailure = await guardSubmission({ body, endpoint: "brief" });

  if (guardFailure) {
    return guardResponse(guardFailure);
  }

  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const recommendation = getLeadRecommendation(data);

  if (!hasBrevoConfig()) {
    return NextResponse.json({
      ok: true,
      mode: "preview",
      recommendation,
      message: "Lead validat local. Adaugă BREVO_API_KEY pentru trimiterea către Brevo.",
    });
  }

  try {
    await upsertBrevoContact({
      email: data.email,
      listIds: getBrevoListIds("BREVO_BRIEF_LIST_ID", "BREVO_LIST_ID"),
      standardAttributes: {
        FIRSTNAME: data.name,
      },
      attributes: {
        PROJECT_TYPE: data.projectType,
        PROJECT_GOAL: data.goal,
        BUDGET: data.budget,
        TIMELINE: data.timeline,
        RECOMMENDED_PACKAGE: recommendation.packageName,
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
      subject: `Brief nou de proiect: ${recommendation.packageName}`,
      htmlContent: briefHtml(data, recommendation),
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

  return NextResponse.json({ ok: true, mode: "brevo", recommendation });
}
