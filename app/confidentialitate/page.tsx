import type { Metadata } from "next";
import { ConfidentialityPolicy } from "@/components/confidentiality-policy";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Politica de confidențialitate | MDI Software",
  description:
    "Politica de confidențialitate MDI Software explică ce date colectăm, de ce le folosim, cum protejăm datele și ce drepturi ai.",
};

export default function ConfidentialitatePage() {
  return (
    <>
      <ConfidentialityPolicy />
      <SiteFooter />
    </>
  );
}
