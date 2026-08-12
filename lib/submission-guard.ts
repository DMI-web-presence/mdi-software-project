import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const rateBuckets = new Map<string, number[]>();
const duplicateBuckets = new Map<string, number>();

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const DUPLICATE_COOLDOWN_MS = 30 * 60 * 1000;
const MIN_SUBMIT_TIME_MS = 4000;
const MAX_BUCKETS = 800;

type GuardInput = {
  body: unknown;
  endpoint: "brief" | "contact";
};

type SubmissionMeta = {
  companyWebsite?: unknown;
  startedAt?: unknown;
};

export type GuardFailure = {
  message: string;
  status: number;
};

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function cleanBuckets(now: number) {
  for (const [key, timestamps] of rateBuckets) {
    const fresh = timestamps.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
    if (fresh.length === 0) {
      rateBuckets.delete(key);
    } else {
      rateBuckets.set(key, fresh);
    }
  }

  for (const [key, timestamp] of duplicateBuckets) {
    if (now - timestamp > DUPLICATE_COOLDOWN_MS) {
      duplicateBuckets.delete(key);
    }
  }

  if (rateBuckets.size > MAX_BUCKETS) {
    const oldestKey = rateBuckets.keys().next().value;
    if (oldestKey) rateBuckets.delete(oldestKey);
  }

  if (duplicateBuckets.size > MAX_BUCKETS) {
    const oldestKey = duplicateBuckets.keys().next().value;
    if (oldestKey) duplicateBuckets.delete(oldestKey);
  }
}

async function getClientIp() {
  const headerStore = await headers();
  const forwardedFor = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim();

  return forwardedFor || headerStore.get("x-real-ip") || "unknown";
}

function getSubmissionMeta(body: unknown): SubmissionMeta {
  return asRecord(asRecord(body)._meta);
}

function normalizedPayload(body: unknown) {
  const record = asRecord(body);
  const copy = { ...record };
  delete copy._meta;
  delete copy.consent;

  return JSON.stringify(copy, Object.keys(copy).sort());
}

function makeDuplicateKey(endpoint: string, body: unknown) {
  const record = asRecord(body);
  const email = typeof record.email === "string" ? record.email.toLowerCase().trim() : "";
  const payloadHash = createHash("sha256").update(normalizedPayload(body)).digest("hex");

  return `${endpoint}:${email}:${payloadHash}`;
}

export async function guardSubmission({ body, endpoint }: GuardInput): Promise<GuardFailure | null> {
  const now = Date.now();
  cleanBuckets(now);

  const meta = getSubmissionMeta(body);
  if (typeof meta.companyWebsite === "string" && meta.companyWebsite.trim().length > 0) {
    return { message: "Solicitarea nu a putut fi trimisă.", status: 400 };
  }

  if (typeof meta.startedAt === "number" && now - meta.startedAt < MIN_SUBMIT_TIME_MS) {
    return { message: "Te rugăm să verifici formularul și să îl trimiți din nou.", status: 429 };
  }

  const ip = await getClientIp();
  const rateKey = `${endpoint}:${ip}`;
  const previous = rateBuckets.get(rateKey)?.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS) ?? [];

  if (previous.length >= RATE_LIMIT_MAX) {
    return { message: "Ai trimis prea multe solicitări într-un timp scurt. Te rugăm să încerci din nou mai târziu.", status: 429 };
  }

  rateBuckets.set(rateKey, [...previous, now]);

  const duplicateKey = makeDuplicateKey(endpoint, body);
  const duplicateTime = duplicateBuckets.get(duplicateKey);

  if (duplicateTime && now - duplicateTime < DUPLICATE_COOLDOWN_MS) {
    return { message: "Aceeași solicitare a fost deja trimisă recent. Te rugăm să aștepți înainte de a o retrimite.", status: 409 };
  }

  duplicateBuckets.set(duplicateKey, now);

  return null;
}

export function guardResponse(failure: GuardFailure) {
  return NextResponse.json({ ok: false, message: failure.message }, { status: failure.status });
}
