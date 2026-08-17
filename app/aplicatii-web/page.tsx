import type { Metadata } from "next";
import { ServiceIntentPage } from "@/components/service-intent-page";
import { absoluteUrl } from "@/lib/seo";
import { getServicePage } from "@/lib/service-pages";

const page = getServicePage("/aplicatii-web")!;

export const metadata: Metadata = {
  title: "Aplicații web custom | MDI Software",
  description:
    "Aplicații web custom pentru dashboard-uri, portaluri, panouri admin și fluxuri interne care au nevoie de control, automatizare și extindere clară.",
  alternates: {
    canonical: "/aplicatii-web",
  },
  openGraph: {
    title: "Aplicații web custom | MDI Software",
    description:
      "Aplicații web custom pentru dashboard-uri, portaluri, panouri admin și fluxuri interne care au nevoie de control, automatizare și extindere clară.",
    url: absoluteUrl("/aplicatii-web"),
    images: [absoluteUrl(page.image)],
  },
};

export default function AplicatiiWebPage() {
  return <ServiceIntentPage page={page} />;
}
