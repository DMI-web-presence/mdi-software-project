export const siteName = "MDI Software";

export const siteDescription =
  "MDI Software construiește website-uri de prezentare, magazine online, aplicații web custom, dashboard-uri și integrări pentru afaceri care vor soluții digitale rapide și clare.";

export const siteKeywords = [
  "MDI Software",
  "MDI Software Romania",
  "website-uri custom",
  "website de prezentare",
  "magazin online custom",
  "aplicatii web custom",
  "automatizari business",
  "Next.js Romania",
];

export function getSiteUrl() {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";

  const url = rawUrl.startsWith("http://") || rawUrl.startsWith("https://") ? rawUrl : `https://${rawUrl}`;

  return url.replace(/\/+$/, "");
}

export function absoluteUrl(path = "/") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${getSiteUrl()}${cleanPath}`;
}
