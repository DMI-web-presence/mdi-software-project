import type { Metadata } from "next";
import { CookieConsent } from "@/components/cookie-consent";
import "./globals.css";

export const metadata: Metadata = {
  title: "MDI Software | Website-uri, aplicații, automatizări",
  description:
    "MDI Software construiește website-uri de prezentare, website-uri business, aplicații web custom, dashboard-uri și integrări printr-un proces ghidat de definire a proiectului.",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon-32.png",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "icon", url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
