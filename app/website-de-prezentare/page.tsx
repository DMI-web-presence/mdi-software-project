import type { Metadata } from "next";
import { ServiceIntentPage } from "@/components/service-intent-page";
import { absoluteUrl } from "@/lib/seo";
import { getServicePage } from "@/lib/service-pages";

const page = getServicePage("/website-de-prezentare")!;

export const metadata: Metadata = {
  title: "Website de prezentare | MDI Software",
  description:
    "Website de prezentare custom pentru firme care au nevoie de structură clară, imagine profesionistă și formulare care aduc cereri relevante.",
  alternates: {
    canonical: "/website-de-prezentare",
  },
  openGraph: {
    title: "Website de prezentare | MDI Software",
    description:
      "Website de prezentare custom pentru firme care au nevoie de structură clară, imagine profesionistă și formulare care aduc cereri relevante.",
    url: absoluteUrl("/website-de-prezentare"),
    images: [absoluteUrl(page.image)],
  },
};

export default function WebsiteDePrezentarePage() {
  return <ServiceIntentPage page={page} />;
}
