import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Rocket } from "lucide-react";
import { ProjectBriefWizard } from "@/components/project-brief-wizard";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Brief ghidat | MDI Software",
  description:
    "Completează brief-ul ghidat MDI Software și definește tipul proiectului, designul, structura, conținutul, bugetul și termenul.",
};

export default function BriefPage() {
  return (
    <main className="brief-page">
      <header className="brief-site-header">
        <div className="brief-header-inner">
          <Link className="focus-ring brief-header-logo" href="/" aria-label="MDI Software - pagina principală">
            <Image
              alt="MDI Software"
              height={558}
              priority
              src="/images/mdi-logo-cropped.png"
              width={939}
            />
          </Link>
          <nav aria-label="Navigare principală">
            <Link href="/#services">Servicii</Link>
            <Link href="/#pricing">Prețuri</Link>
            <Link href="/#projects">Proiecte</Link>
            <Link href="/#experience">Experiență</Link>
          </nav>
          <Link className="brief-header-cta" href="#brief-form">
            Începe
            <Rocket size={16} aria-hidden="true" />
          </Link>
        </div>
      </header>

      <ProjectBriefWizard />
      <SiteFooter />
    </main>
  );
}
