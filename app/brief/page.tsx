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
    <main className="min-h-screen bg-[#fbfaf8]">
      <header className="relative z-30 border-b border-[#e6e3df] bg-white">
        <div className="mx-auto grid min-h-[76px] w-[min(1360px,calc(100%-48px))] grid-cols-[1fr_auto_1fr] items-center max-[1023px]:w-[min(100%-32px,900px)] max-[820px]:min-h-[68px] max-[820px]:grid-cols-[1fr_auto] max-[520px]:w-[calc(100%-24px)]">
          <Link className="focus-ring" href="/#top" aria-label="MDI Software - pagina principală">
            <Image
              className="block h-12 w-auto object-contain max-[820px]:h-[42px]"
              alt="MDI Software"
              height={558}
              priority
              src="/images/mdi-logo-cropped.png"
              width={939}
            />
          </Link>
          <nav className="flex gap-10 text-sm font-medium max-[1023px]:gap-6 max-[820px]:hidden" aria-label="Navigare principală">
            <Link href="/#services">Servicii</Link>
            <Link href="/#pricing">Prețuri</Link>
            <Link href="/#projects">Proiecte</Link>
            <Link href="/#experience">Experiență</Link>
          </nav>
          <Link className="inline-flex min-h-[42px] items-center gap-2 justify-self-end rounded-[5px] bg-signal px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(228,93,54,0.24)] transition hover:bg-[#c94f2e] max-[520px]:min-h-[38px] max-[520px]:px-3 max-[520px]:py-2" href="#brief-form">
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
