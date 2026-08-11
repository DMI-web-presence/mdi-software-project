import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MDI Software | Website-uri, aplicații, automatizări",
  description:
    "MDI Software construiește website-uri de prezentare, website-uri business, aplicații web custom, dashboard-uri și integrări printr-un proces ghidat de definire a proiectului.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
