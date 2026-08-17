import type { Metadata } from "next";
import { PortfolioPage } from "@/components/portfolio-page";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Portofoliu | MDI Software",
  description:
    "Portofoliu cu proiecte de website-uri, ecommerce și aplicații web construite custom pentru nevoi reale de business.",
  alternates: {
    canonical: "/portofoliu",
  },
  openGraph: {
    title: "Portofoliu | MDI Software",
    description:
      "Exemple de proiecte reale: website-uri de prezentare, ecommerce și workflow-uri interne construite custom.",
    url: absoluteUrl("/portofoliu"),
    images: [absoluteUrl("/images/project-margele-homepage.png")],
  },
};

export default function PortofoliuPage() {
  return <PortfolioPage />;
}
