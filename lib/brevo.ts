const BREVO_API_URL = "https://api.brevo.com/v3";

type BrevoHeaders = {
  accept: string;
  "api-key": string;
  "content-type": string;
};

type BrevoEmailRecipient = {
  email: string;
  name?: string;
};

type BrevoContactInput = {
  attributes?: Record<string, string>;
  email: string;
  listIds?: number[];
  standardAttributes?: Record<string, string>;
};

type BrevoEmailInput = {
  attachment?: Array<{
    content: string;
    name: string;
  }>;
  htmlContent: string;
  replyTo?: BrevoEmailRecipient;
  subject: string;
};

export function envNumber(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function getBrevoListIds(...envNames: string[]) {
  const ids = envNames
    .map((name) => envNumber(process.env[name]))
    .filter((id): id is number => typeof id === "number");

  return ids.length > 0 ? ids : undefined;
}

export function hasBrevoConfig() {
  return Boolean(process.env.BREVO_API_KEY);
}

function brevoHeaders(): BrevoHeaders {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    throw new Error("BREVO_API_KEY is not configured.");
  }

  return {
    accept: "application/json",
    "api-key": apiKey,
    "content-type": "application/json",
  };
}

async function brevoFetch(path: string, init: RequestInit) {
  const response = await fetch(`${BREVO_API_URL}${path}`, {
    ...init,
    headers: {
      ...brevoHeaders(),
      ...init.headers,
    },
  });

  if (!response.ok) {
    const message = await response.text().catch(() => "");
    throw new Error(message || `Brevo request failed with status ${response.status}.`);
  }

  return response;
}

export async function upsertBrevoContact({ attributes = {}, email, listIds, standardAttributes = {} }: BrevoContactInput) {
  const useCustomAttributes = process.env.BREVO_USE_CUSTOM_ATTRIBUTES === "true";

  await brevoFetch("/contacts", {
    body: JSON.stringify({
      email,
      updateEnabled: true,
      ...(listIds ? { listIds } : {}),
      attributes: {
        ...standardAttributes,
        ...(useCustomAttributes ? attributes : {}),
      },
    }),
    method: "POST",
  });
}

export async function sendBrevoNotification({ attachment, htmlContent, replyTo, subject }: BrevoEmailInput) {
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const recipientEmail = process.env.MDI_CONTACT_EMAIL;

  if (!senderEmail || !recipientEmail) {
    return false;
  }

  await brevoFetch("/smtp/email", {
    body: JSON.stringify({
      sender: {
        name: process.env.BREVO_SENDER_NAME || "MDI Software",
        email: senderEmail,
      },
      to: [{ email: recipientEmail, name: "MDI Software" }],
      ...(replyTo ? { replyTo } : {}),
      subject,
      htmlContent,
      ...(attachment?.length ? { attachment } : {}),
    }),
    method: "POST",
  });

  return true;
}
