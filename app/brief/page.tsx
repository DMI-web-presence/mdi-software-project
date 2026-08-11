import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Rocket } from "lucide-react";
import { ProjectBriefWizard } from "@/components/project-brief-wizard";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Brief ghidat | MDI Software",
  description:
    "Completează formularul ghidat MDI Software pentru a clarifica tipul proiectului, designul, secțiunile, funcționalitățile, bugetul și termenul.",
};

export default function BriefPage() {
  return (
    <main className="min-h-screen bg-[#f7f5ef]">
      <header className="section-shell flex items-center justify-between py-5">
        <Link className="focus-ring inline-flex items-center" href="/" aria-label="MDI Software">
          <Image
            alt="MDI Software"
            className="h-12 w-auto object-contain"
            height={558}
            priority
            src="/images/mdi-logo-cropped.png"
            width={939}
          />
        </Link>
        <Link
          className="focus-ring inline-flex items-center gap-2 rounded-md border border-ink/12 bg-white px-4 py-2.5 text-sm font-semibold text-ink shadow-sm transition hover:bg-mist"
          href="/"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Înapoi
        </Link>
      </header>

      <section className="relative overflow-hidden border-y border-ink/10 bg-ink py-16 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(53,184,255,0.2),transparent_28rem),radial-gradient(circle_at_18%_10%,rgba(228,93,54,0.15),transparent_24rem)]" />
        <div className="section-shell relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-4 py-2 text-sm font-bold text-white/86">
            <Rocket size={16} aria-hidden="true" />
            Brief ghidat
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.03] sm:text-5xl lg:text-6xl">
            Alege cerințele, iar proiectul capătă structură.
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-white/74">
            Formularul te ajută să alegi tipul proiectului, direcția vizuală, secțiunile, funcționalitățile,
            bugetul și termenul înainte de ofertă.
          </p>
        </div>
      </section>

      <section className="section-shell py-14 sm:py-20">
        <ProjectBriefWizard />
      </section>

      <SiteFooter />
    </main>
  );
}
