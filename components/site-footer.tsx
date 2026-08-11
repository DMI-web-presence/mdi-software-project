import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";

const footerServices = [
  "Website-uri de prezentare",
  "Website-uri business",
  "Aplicații web",
  "Integrări",
];

export function SiteFooter() {
  return (
    <footer className="footer-cosmos relative overflow-hidden text-white">
      <div className="section-shell relative z-10 flex flex-col items-center pb-16 pt-20 text-center sm:pt-24">
        <Image
          alt="MDI Software"
          className="h-16 w-auto object-contain brightness-0 invert"
          height={558}
          src="/images/mdi-logo-cropped.png"
          width={939}
        />
        <h2 className="mt-10 max-w-4xl text-3xl font-black leading-[1.04] text-white sm:text-5xl lg:text-6xl">
          Construim produse digitale
          <br className="hidden sm:block" />
          care cresc odată cu afacerea ta.
        </h2>
        <p className="mt-7 text-xl font-medium text-white/76 sm:text-2xl">
          Website-uri și aplicații custom, de la idee la lansare.
        </p>
        <Link
          className="focus-ring mt-8 inline-flex items-center justify-center gap-3 rounded-md bg-signal px-9 py-4 text-lg font-bold text-white shadow-[0_0_36px_rgba(228,93,54,0.42)] transition hover:bg-[#ff7048]"
          href="/brief"
        >
          Începe un proiect
          <ArrowRight size={24} aria-hidden="true" />
        </Link>
        <p className="mt-8 inline-flex items-center gap-3 text-base font-medium text-white/88">
          <span className="availability-dot h-3 w-3 rounded-full bg-[#35e795]" aria-hidden="true" />
          Disponibil pentru proiecte noi
        </p>

        <div className="mt-16 grid w-full max-w-5xl gap-10 text-left md:grid-cols-3 md:gap-0">
          <div className="footer-column md:pr-12">
            <h3 className="text-sm font-black uppercase tracking-[0.26em] text-signal">Navigare</h3>
            <nav className="mt-6 grid gap-3 text-lg font-medium text-white/88">
              <Link className="transition hover:text-signal" href="/#services">Servicii</Link>
              <Link className="transition hover:text-signal" href="/#pricing">Prețuri</Link>
              <Link className="transition hover:text-signal" href="/#projects">Proiecte</Link>
              <Link className="transition hover:text-signal" href="/#experience">Experiență</Link>
            </nav>
          </div>
          <div className="footer-column md:px-12">
            <h3 className="text-sm font-black uppercase tracking-[0.26em] text-signal">Servicii</h3>
            <div className="mt-6 grid gap-3 text-lg font-medium text-white/88">
              {footerServices.map((service) => (
                <Link className="transition hover:text-signal" href="/#services" key={service}>
                  {service}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:pl-12">
            <h3 className="text-sm font-black uppercase tracking-[0.26em] text-signal">Contact</h3>
            <div className="mt-6 grid gap-7 text-lg font-medium text-white/88">
              <a className="inline-flex items-center gap-4 transition hover:text-signal" href="mailto:contact@mdi-software.ro">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-signal/45 text-signal">
                  <Mail size={20} aria-hidden="true" />
                </span>
                <span className="whitespace-nowrap">contact@mdi-software.ro</span>
              </a>
              <p className="inline-flex items-center gap-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-signal/45 text-signal">
                  <MapPin size={21} aria-hidden="true" />
                </span>
                Oradea, România
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/14">
        <div className="section-shell flex flex-col gap-4 py-7 text-sm font-medium text-white/46 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 MDI Software. Toate drepturile rezervate.</p>
          <div className="flex gap-6">
            <Link className="transition hover:text-white" href="/#top">Confidențialitate</Link>
            <span className="text-white/22" aria-hidden="true">|</span>
            <Link className="transition hover:text-white" href="/#top">Termeni</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
