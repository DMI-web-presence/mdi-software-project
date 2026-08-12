import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { TermsPolicy } from "@/components/terms-policy";

export const metadata: Metadata = {
  title: "Termeni și condiții | MDI Software",
  description:
    "Termenii și condițiile MDI Software explică regulile pentru solicitări, oferte, colaborări, plăți, livrare, suport și servicii digitale.",
};

export default function TermeniPage() {
  return (
    <>
      <TermsPolicy />
      <SiteFooter />
    </>
  );
}
