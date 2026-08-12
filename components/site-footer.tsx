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
      <div className="section-shell relative z-10 flex flex-col items-center pb-9 pt-10 text-center sm:pb-16 sm:pt-24">
        <Image
          alt="MDI Software"
          className="hidden h-16 w-auto object-contain brightness-0 invert sm:block"
          height={558}
          src="/images/mdi-logo-cropped.png"
          width={939}
        />
        <h2 className="max-w-[19rem] text-[1.35rem] font-black leading-[1.12] text-white sm:mt-10 sm:max-w-4xl sm:text-5xl sm:leading-[1.04] lg:text-6xl">
          <span className="block">Construim produse digitale</span>
          <span className="block">care cresc odată cu afacerea ta.</span>
        </h2>
        <p className="mt-7 hidden text-xl font-medium text-white/76 sm:block sm:text-2xl">
          Website-uri și aplicații custom, de la idee la lansare.
        </p>
        <Link
          className="focus-ring mt-8 hidden items-center justify-center gap-3 rounded-md bg-signal px-9 py-4 text-lg font-bold text-white shadow-[0_0_36px_rgba(228,93,54,0.42)] transition hover:bg-[#ff7048] sm:inline-flex"
          href="/brief"
        >
          Începe un proiect
          <ArrowRight size={24} aria-hidden="true" />
        </Link>
        <p className="mt-5 inline-flex items-center gap-2.5 text-sm font-medium text-white/88 sm:mt-8 sm:gap-3 sm:text-base">
          <span className="availability-dot h-3 w-3 rounded-full bg-[#35e795]" aria-hidden="true" />
          Disponibil pentru proiecte noi
        </p>

        <div className="mt-8 grid w-full max-w-5xl grid-cols-2 gap-x-5 text-left sm:mt-12 md:mt-16 md:grid-cols-3 md:gap-0">
          <div className="footer-column hidden md:block md:pr-12">
            <h3 className="text-sm font-black uppercase tracking-[0.26em] text-signal">Navigare</h3>
            <nav className="mt-5 grid gap-3 text-base font-medium text-white/88 md:mt-6 md:text-lg">
              <Link className="transition hover:text-signal" href="/#services">Servicii</Link>
              <Link className="transition hover:text-signal" href="/#pricing">Prețuri</Link>
              <Link className="transition hover:text-signal" href="/#projects">Proiecte</Link>
              <Link className="transition hover:text-signal" href="/#experience">Experiență</Link>
            </nav>
          </div>
          <div className="footer-column pr-3 md:px-12">
            <h3 className="text-sm font-black uppercase tracking-[0.26em] text-signal">Servicii</h3>
            <div className="mt-4 grid gap-2 text-sm font-medium leading-5 text-white/88 sm:mt-5 sm:gap-3 sm:text-base sm:leading-normal md:mt-6 md:text-lg">
              {footerServices.map((service) => (
                <Link className="transition hover:text-signal" href="/#services" key={service}>
                  {service}
                </Link>
              ))}
            </div>
          </div>
          <div className="min-w-0 pl-1 md:pl-12">
            <h3 className="text-sm font-black uppercase tracking-[0.26em] text-signal">Contact</h3>
            <div className="mt-4 grid gap-3 text-xs font-medium text-white/88 sm:mt-5 sm:gap-4 sm:text-sm md:mt-6 md:gap-7 md:text-lg">
              <a className="flex min-w-0 items-center gap-2.5 transition hover:text-signal md:gap-4" href="mailto:contact@mdi-software.ro">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-signal/45 text-signal md:h-9 md:w-9">
                  <Mail size={20} aria-hidden="true" />
                </span>
                <span className="min-w-0 break-all md:whitespace-nowrap">contact@mdi-software.ro</span>
              </a>
              <p className="flex items-center gap-2.5 md:gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-signal/45 text-signal md:h-9 md:w-9">
                  <MapPin size={21} aria-hidden="true" />
                </span>
                Oradea, România
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/14">
        <div className="section-shell flex flex-col items-center gap-2.5 py-4 text-center text-xs font-medium text-white/46 sm:flex-row sm:justify-between sm:gap-4 sm:py-7 sm:text-left sm:text-sm">
          <p>© 2026 MDI Software. Toate drepturile rezervate.</p>
          <div className="flex justify-center gap-4 sm:gap-6">
            <Link className="transition hover:text-white" href="/confidentialitate">Confidențialitate</Link>
            <span className="text-white/22" aria-hidden="true">|</span>
            <Link className="transition hover:text-white" href="/termeni">Termeni</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
