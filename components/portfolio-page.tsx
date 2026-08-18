import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPortfolioProjectHref, portfolioProjects } from "@/lib/portfolio-projects";

export function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#071022]">
      <SiteHeader />

      <section className="relative isolate overflow-hidden py-20 text-white shadow-[inset_0_-1px_0_rgba(255,255,255,0.08)] sm:py-24 lg:py-28">
        <div className="project-globe pointer-events-none absolute right-[-12rem] top-[-10rem] -z-10 h-[760px] w-[760px] opacity-90" />
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_40%,rgba(0,131,255,0.26),transparent_32rem),radial-gradient(circle_at_18%_24%,rgba(12,58,116,0.32),transparent_28rem),linear-gradient(180deg,#030b17_0%,#020815_100%)]" />
        <div className="section-shell relative grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_430px] lg:items-center">
          <div>
            <p className="section-kicker text-signal">Portofoliu</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Proiecte reale,
              <br />
              construite pe nevoi clare.
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-medium leading-8 text-white/78">
              Exemple de website-uri, ecommerce și instrumente interne unde am lucrat pe structură,
              experiență de utilizare și decizii tehnice care susțin business-ul.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-full border border-white/16 bg-white/10 px-4 py-2 text-sm font-semibold text-white/88 backdrop-blur">
                Website-uri de prezentare
              </span>
              <span className="inline-flex items-center rounded-full border border-white/16 bg-white/10 px-4 py-2 text-sm font-semibold text-white/88 backdrop-blur">
                Ecommerce custom
              </span>
              <span className="inline-flex items-center rounded-full border border-white/16 bg-white/10 px-4 py-2 text-sm font-semibold text-white/88 backdrop-blur">
                Workflow-uri interne
              </span>
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
                href="/#projects"
              >
                Vezi și carousel-ul
              </Link>
            </div>
          </div>

          <aside className="rounded-lg border border-[#1572bf]/70 bg-[#071426]/[0.78] p-6 shadow-[0_0_34px_rgba(0,118,255,0.18)] backdrop-blur sm:p-8">
            <p className="section-kicker text-[#69c8ff]">Cum arată selecția</p>
            <div className="mt-6 grid gap-4">
              {portfolioProjects.map((project, index) => (
                <Link
                  className="rounded-lg border border-white/10 bg-white/6 px-4 py-4 transition hover:border-[#7cbcff] hover:bg-white/10"
                  href={getPortfolioProjectHref(project)}
                  key={project.slug}
                >
                  <p className="text-sm font-black text-signal">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-2 text-lg font-black text-white">{project.title}</p>
                  <p className="mt-2 text-sm font-medium leading-6 text-white/72">{project.industry}</p>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#fbfaf7] py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(0,119,255,0.08),transparent_25rem),radial-gradient(circle_at_14%_20%,rgba(228,93,54,0.07),transparent_26rem)]" />
        <div className="section-shell relative">
          <p className="section-kicker text-[#006dff]">Selecție</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black leading-[1.04] text-[#071022] sm:text-5xl">
            Fiecare proiect pornește de la un context diferit.
          </h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {portfolioProjects.map((project) => (
              <article
                className="rounded-lg border border-[#d8dde6] bg-white/[0.72] p-6 shadow-[0_22px_60px_rgba(7,16,34,0.08)] backdrop-blur"
                key={project.slug}
              >
                <p className="text-sm font-black uppercase tracking-[0.28em] text-signal">{project.industry}</p>
                <h3 className="mt-4 text-2xl font-black text-[#071022]">{project.title}</h3>
                <p className="mt-4 text-base font-medium leading-7 text-[#253045]/82">{project.copy}</p>
                <p className="mt-5 inline-flex rounded-md bg-[#eef6ff] px-3 py-2 text-sm font-bold text-[#006dff]">
                  {project.stack}
                </p>
                <Link
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#006dff] transition hover:text-[#0052c2]"
                  href={getPortfolioProjectHref(project)}
                >
                  Vezi detaliile
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-cosmos relative overflow-hidden py-20 text-white sm:py-24">
        <div className="section-shell relative z-10 grid gap-8">
          {portfolioProjects.map((project, index) => (
            <article
              className="grid gap-6 rounded-[1.25rem] border border-[#1572bf]/70 bg-[#071426]/[0.78] p-6 shadow-[0_0_34px_rgba(0,118,255,0.14)] backdrop-blur lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:p-8"
              id={project.slug}
              key={project.slug}
            >
              <div>
                <p className="text-sm font-black uppercase tracking-[0.28em] text-[#69c8ff]">
                  Studiu de caz {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-3xl font-black text-white sm:text-4xl">{project.title}</h3>
                <p className="mt-4 text-base font-medium leading-7 text-white/76">{project.copy}</p>

                <div className="mt-8 grid gap-4">
                  <div className="rounded-lg border border-white/10 bg-white/6 p-5">
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-signal">Provocare</p>
                    <p className="mt-3 text-base font-medium leading-7 text-white/78">{project.challenge}</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/6 p-5">
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-signal">Soluție</p>
                    <p className="mt-3 text-base font-medium leading-7 text-white/78">{project.solution}</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/6 p-5">
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-signal">Rezultat</p>
                    <p className="mt-3 text-base font-medium leading-7 text-white/78">{project.outcome}</p>
                  </div>
                </div>
              </div>

              <div className="flex h-full flex-col">
                <div className="relative overflow-hidden rounded-[1rem] border border-[#47b8ff]/65 bg-[#0a1727] shadow-[0_0_32px_rgba(30,163,255,0.24)]">
                  {project.previewImage && project.previewEnabled !== false ? (
                    <div className="relative aspect-[1.15/1] min-h-[18rem]">
                      <Image
                        alt={`Preview proiect ${project.title}`}
                        className="object-cover object-top"
                        fill
                        sizes="(min-width: 1024px) 40vw, 92vw"
                        src={project.previewImage}
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[1.15/1] min-h-[18rem] items-center justify-center bg-[radial-gradient(circle_at_50%_20%,rgba(60,193,255,0.18),transparent_30%),linear-gradient(180deg,#091523_0%,#07111d_100%)] p-8">
                      <div className="w-full rounded-xl border border-white/10 bg-white/6 p-5">
                        <div className="grid gap-4">
                          <div className="h-3 w-24 rounded-full bg-white/18" />
                          <div className="h-16 rounded-md bg-white/10" />
                          <div className="grid grid-cols-2 gap-3">
                            <div className="h-20 rounded-md bg-white/10" />
                            <div className="h-20 rounded-md bg-white/10" />
                          </div>
                          <div className="h-3 w-3/4 rounded-full bg-white/18" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-5 rounded-lg border border-white/10 bg-white/6 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#69c8ff]">Puncte-cheie</p>
                  <div className="mt-4 grid gap-3">
                    <div className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-signal" size={18} aria-hidden="true" />
                      <p className="text-sm font-medium leading-6 text-white/78">{project.industry}</p>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-signal" size={18} aria-hidden="true" />
                      <p className="text-sm font-medium leading-6 text-white/78">{project.stack}</p>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-signal" size={18} aria-hidden="true" />
                      <p className="text-sm font-medium leading-6 text-white/78">Construit în jurul unei nevoi reale de business</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#fbfaf7] py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(228,93,54,0.08),transparent_24rem),radial-gradient(circle_at_82%_20%,rgba(0,119,255,0.08),transparent_28rem)]" />
        <div className="section-shell relative rounded-[1.25rem] border border-[#d8dde6] bg-white/[0.78] p-8 shadow-[0_22px_60px_rgba(7,16,34,0.08)] backdrop-blur sm:p-10">
          <p className="section-kicker text-[#006dff]">Următorul pas</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black leading-[1.04] text-[#071022] sm:text-5xl">
            Dacă vrei ceva similar, putem porni de la contextul tău.
          </h2>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-[#253045]/82">
            Brief-ul ghidat ne ajută să clarificăm ce tip de proiect ai, ce funcționalități contează și ce direcție are sens pentru business-ul tău.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="focus-ring inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 font-semibold text-white transition hover:bg-[#c94f2e]"
              href="/brief"
            >
              Construiește brief-ul
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              className="focus-ring inline-flex items-center gap-2 rounded-md border border-[#d8dde6] bg-white px-5 py-3 font-semibold text-ink transition hover:bg-mist"
              href="/#pricing"
            >
              Vezi pachetele
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
