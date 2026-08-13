import type { Metadata } from "next";
import { CookieConsent } from "@/components/cookie-consent";
import { getSiteUrl, siteDescription, siteKeywords, siteName } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: siteName,
  title: {
    default: "MDI Software | Website-uri, aplicații web și magazine online custom",
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "software development",
  openGraph: {
    title: "MDI Software | Website-uri și aplicații web custom",
    description: siteDescription,
    url: "/",
    siteName,
    images: [
      {
        url: "/images/mdi-hero.png",
        width: 1536,
        height: 1024,
        alt: "MDI Software - website-uri, aplicații web și magazine online custom",
      },
    ],
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MDI Software | Website-uri și aplicații web custom",
    description: siteDescription,
    images: ["/images/mdi-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
