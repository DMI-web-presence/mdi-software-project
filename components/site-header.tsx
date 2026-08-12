"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, Rocket, X } from "lucide-react";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 16);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setPricingOpen(false);
      }
    };
    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 isolate border-b bg-[#fbf8f4] text-ink transition-[border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-black/10 shadow-[0_10px_28px_rgba(5,12,28,0.16)]"
          : "border-transparent shadow-none"
      }`}
    >
      <div className="section-shell flex items-center justify-between py-3 md:py-5">
        <Link className="focus-ring inline-flex items-center" href="/#top" id="top" aria-label="MDI Software">
          <Image
            alt="MDI Software"
            className="h-9 w-auto object-contain md:h-12"
            height={558}
            priority
            src="/images/mdi-logo-cropped.png"
            width={939}
          />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-ink/70 md:flex">
          <div className="group relative">
            <button
              aria-expanded={pricingOpen}
              aria-haspopup="true"
              className="focus-ring inline-flex items-center gap-1 py-2 transition hover:text-ink"
              onClick={() => setPricingOpen((open) => !open)}
              type="button"
            >
              Prețuri
              <ChevronDown className={`transition-transform ${pricingOpen ? "rotate-180" : ""}`} size={15} aria-hidden="true" />
            </button>
            <div
              className={`absolute left-1/2 top-full w-72 -translate-x-1/2 pt-2 transition duration-150 ${
                pricingOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
              }`}
            >
              <div className="grid rounded-md border border-black/10 bg-[#fbf8f4] p-2 shadow-[0_14px_30px_rgba(5,12,28,0.16)]">
                <Link className="rounded px-3 py-2.5 text-ink/80 transition hover:bg-black/5 hover:text-ink" href="/#pricing-presentation" onClick={() => setPricingOpen(false)}>
                  Website de prezentare
                </Link>
                <Link className="whitespace-nowrap rounded px-3 py-2.5 text-ink/80 transition hover:bg-black/5 hover:text-ink" href="/#pricing-ecommerce" onClick={() => setPricingOpen(false)}>
                  Magazin online (e-commerce)
                </Link>
              </div>
            </div>
          </div>
          <a className="transition hover:text-ink" href="#experience">Experiență</a>
          <a className="transition hover:text-ink" href="#contact">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <button
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Închide meniul" : "Deschide meniul"}
            className="focus-ring inline-flex size-9 items-center justify-center rounded-md border border-black/15 bg-white text-ink transition hover:border-black/30 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
          <Link className="focus-ring inline-flex items-center gap-1.5 rounded-md bg-signal px-3 py-2 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(228,93,54,0.24)] transition hover:bg-[#c94f2e] md:gap-2 md:px-4 md:py-2.5 md:text-sm" href="/brief">
            Începe
            <Rocket size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <nav
        className={`absolute inset-x-0 top-full border-t border-black/10 bg-[#fbf8f4] shadow-[0_14px_28px_rgba(5,12,28,0.14)] transition duration-200 md:hidden ${
          menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
        id="mobile-navigation"
        aria-hidden={!menuOpen}
      >
        <div className="section-shell grid py-2 text-sm font-semibold text-ink/80">
          <button
            aria-expanded={pricingOpen}
            className="flex items-center justify-between rounded-md px-3 py-3 text-left transition hover:bg-black/5 hover:text-ink"
            onClick={() => setPricingOpen((open) => !open)}
            type="button"
          >
            Prețuri
            <ChevronDown className={`transition-transform ${pricingOpen ? "rotate-180" : ""}`} size={16} aria-hidden="true" />
          </button>
          <div className={`grid overflow-hidden pl-3 transition-[grid-template-rows,opacity] duration-200 ${pricingOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
            <div className="min-h-0 border-l border-black/10 pl-2">
              <Link className="block rounded-md px-3 py-2.5 transition hover:bg-black/5 hover:text-ink" href="/#pricing-presentation" onClick={() => { setMenuOpen(false); setPricingOpen(false); }}>Website de prezentare</Link>
              <Link className="block rounded-md px-3 py-2.5 transition hover:bg-black/5 hover:text-ink" href="/#pricing-ecommerce" onClick={() => { setMenuOpen(false); setPricingOpen(false); }}>Magazin online (e-commerce)</Link>
            </div>
          </div>
          <a className="rounded-md px-3 py-3 transition hover:bg-black/5 hover:text-ink" href="#experience" onClick={() => setMenuOpen(false)}>Experiență</a>
          <a className="rounded-md px-3 py-3 transition hover:bg-black/5 hover:text-ink" href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      </nav>
    </header>
  );
}
