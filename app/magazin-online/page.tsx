import type { Metadata } from "next";
import { ServiceIntentPage } from "@/components/service-intent-page";
import { absoluteUrl } from "@/lib/seo";
import { getServicePage } from "@/lib/service-pages";

const page = getServicePage("/magazin-online")!;

export const metadata: Metadata = {
  title: "Magazin online custom | MDI Software",
  description:
    "Magazin online custom pentru business-uri care au nevoie de catalog clar, plăți online, administrare produse și flux comercial bine structurat.",
  alternates: {
    canonical: "/magazin-online",
  },
  openGraph: {
    title: "Magazin online custom | MDI Software",
    description:
      "Magazin online custom pentru business-uri care au nevoie de catalog clar, plăți online, administrare produse și flux comercial bine structurat.",
    url: absoluteUrl("/magazin-online"),
    images: [absoluteUrl(page.image)],
  },
};

export default function MagazinOnlinePage() {
  return <ServiceIntentPage page={page} />;
}
