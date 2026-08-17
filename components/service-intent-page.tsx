import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { ServicePageConfig } from "@/lib/service-pages";
import { servicePages } from "@/lib/service-pages";

export function ServiceIntentPage({ page }: { page: ServicePageConfig }) {
  const relatedPages = servicePages.filter((item) => item.href !== page.href);

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#071022]">
      <SiteHeader />

      <section className="policy-hero relative isolate overflow-hidden py-20 text-white sm:py-24 lg:py-28">
        <div className="project-globe pointer-events-none absolute right-[-12rem] top-[-10rem] -z-10 h-[760px] w-[760px] opacity-90" />
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_40%,rgba(0,131,255,0.26),transparent_32rem),radial-gradient(circle_at_18%_24%,rgba(12,58,116,0.32),transparent_28rem),linear-gradient(180deg,#030b17_0%,#020815_100%)]" />
        <div className="section-shell relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-signal">Serviciu</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              {page.title}
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-medium leading-8 text-white/78">
              {page.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {page.highlights.map((highlight) => (
                <span
                  className="inline-flex items-center rounded-full border border-white/16 bg-white/10 px-4 py-2 text-sm font-semibold text-white/88 backdrop-blur"
                  key={highlight}
                >
                  {highlight}
                </span>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                className="focus-ring inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 font-semibold text-white transition hover:bg-[#c94f2e]"
                href="/brief"
              >
                Începe cu brief-ul
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/22 bg-white px-5 py-3 font-semibold text-ink transition hover:bg-mist"
                href="/#pricing"
              >
                Vezi prețurile
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[26rem]">
            <div className="absolute inset-x-8 inset-y-10 rounded-full bg-[radial-gradient(circle,rgba(60,193,255,0.28),transparent_70%)] blur-3xl" />
            <div className="relative rounded-[1.25rem] border border-[#1d7fca]/55 bg-[#071426]/78 p-5 shadow-[0_0_40px_rgba(0,118,255,0.16)] backdrop-blur">
              <div className="relative mx-auto h-[18rem] w-full max-w-[19rem]">
                <Image
                  alt={`Ilustrație pentru ${page.title.toLowerCase()}`}
                  className="object-contain drop-shadow-[0_0_26px_rgba(69,199,255,0.38)]"
                  fill
                  sizes="(min-width: 1024px) 380px, 84vw"
                  src={page.image}
                />
              </div>
              <div className="mt-4 rounded-xl border border-white/10 bg-white/6 p-4">
                <p className="text-[0.72rem] font-black uppercase tracking-[0.26em] text-[#69c8ff]">Ce construim</p>
                <p className="mt-3 text-base font-medium leading-7 text-white/82">{page.summary}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#fbfaf7] py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(0,119,255,0.08),transparent_25rem),radial-gradient(circle_at_14%_20%,rgba(228,93,54,0.07),transparent_26rem)]" />
        <div className="section-shell relative grid gap-6 lg:grid-cols-2">
          <article className="rounded-lg border border-[#d8dde6] bg-white/[0.72] p-6 shadow-[0_22px_60px_rgba(7,16,34,0.08)] backdrop-blur sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#006dff]">Potrivit pentru</p>
            <div className="mt-5 grid gap-4">
              {page.useCases.map((item) => (
                <div className="flex gap-3" key={item}>
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[#006dff]" size={20} aria-hidden="true" />
                  <p className="text-base font-medium leading-7 text-[#253045]/82">{item}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-[#d8dde6] bg-white/[0.72] p-6 shadow-[0_22px_60px_rgba(7,16,34,0.08)] backdrop-blur sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#006dff]">Ce include de obicei</p>
            <div className="mt-5 grid gap-4">
              {page.includes.map((item) => (
                <div className="flex gap-3" key={item}>
                  <CheckCircle2 className="mt-0.5 shrink-0 text-signal" size={20} aria-hidden="true" />
                  <p className="text-base font-medium leading-7 text-[#253045]/82">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="pricing-cosmos relative overflow-hidden py-20 text-white sm:py-24">
        <div className="section-shell relative z-10">
          <p className="text-sm font-black uppercase tracking-[0.32em] text-signal">Cum lucrăm</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black leading-[1.04] text-white sm:text-5xl">
            Pași clari, de la cerere la proiect lansat.
          </h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {page.process.map((step, index) => (
              <article
                className="rounded-lg border border-[#1572bf]/70 bg-[#071426]/[0.78] p-6 shadow-[0_0_34px_rgba(0,118,255,0.14)] backdrop-blur"
                key={step.title}
              >
                <p className="text-4xl font-black leading-none text-signal">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-5 text-xl font-black text-white">{step.title}</h3>
                <p className="mt-3 text-sm font-medium leading-7 text-white/72">{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#fbfaf7] py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(228,93,54,0.08),transparent_24rem),radial-gradient(circle_at_82%_20%,rgba(0,119,255,0.08),transparent_28rem)]" />
        <div className="section-shell relative grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#006dff]">Întrebări frecvente</p>
            <div className="mt-6 grid gap-4">
              {page.faq.map((item) => (
                <details
                  className="rounded-lg border border-[#d8dde6] bg-white/[0.72] p-5 shadow-[0_22px_60px_rgba(7,16,34,0.06)] backdrop-blur"
                  key={item.question}
                >
                  <summary className="cursor-pointer list-none text-lg font-black text-[#071022]">{item.question}</summary>
                  <p className="mt-3 text-base font-medium leading-7 text-[#253045]/82">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <aside className="rounded-lg border border-[#d8dde6] bg-white/[0.72] p-6 shadow-[0_22px_60px_rgba(7,16,34,0.08)] backdrop-blur sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#006dff]">Vezi și</p>
            <div className="mt-5 grid gap-4">
              {relatedPages.map((item) => (
                <Link
                  className="rounded-lg border border-[#e4e8ef] bg-[#f8fbff] px-4 py-4 transition hover:border-[#7cbcff] hover:bg-white"
                  href={item.href}
                  key={item.href}
                >
                  <p className="text-lg font-black text-[#071022]">{item.title}</p>
                  <p className="mt-2 text-sm font-medium leading-6 text-[#253045]/72">{item.summary}</p>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
