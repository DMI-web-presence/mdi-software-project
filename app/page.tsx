import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Code2,
  Layers3,
  MailCheck,
  Rocket,
  Workflow,
} from "lucide-react";
import {
  siBrevo,
  siCloudflare,
  siGithub,
  siGitlab,
  siNextdotjs,
  siPostgresql,
  siReact,
  siShadcnui,
  siSourcetree,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
} from "simple-icons";
import { HeroCosmosScene } from "@/components/hero-cosmos-scene";
import { ProjectBriefWizard } from "@/components/project-brief-wizard";

const services = [
  {
    title: "Website-uri de prezentare",
    copy: "Site-uri rapide și elegante care explică oferta clar și conduc vizitatorii spre o decizie.",
    icon: Layers3,
  },
  {
    title: "Website-uri business",
    copy: "Secțiuni custom, prețuri, galerii de proiecte, SEO de bază și formulare orientate spre conversii.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Aplicații web",
    copy: "Dashboard-uri, portaluri, instrumente admin și sisteme interne construite în jurul workflow-urilor reale.",
    icon: Code2,
  },
  {
    title: "Integrări",
    copy: "Brevo, plăți, analytics, programări, automatizări și conexiuni API.",
    icon: Workflow,
  },
];

const prices = [
  {
    name: "Pachet Starter",
    price: "de la 450 EUR",
    fit: "Un website de prezentare concentrat pentru o ofertă clară.",
    includes: ["Landing page", "Până la 5 secțiuni", "Design responsive", "SEO de bază"],
  },
  {
    name: "Pachet Business",
    price: "de la 1.200 EUR",
    fit: "Un site mai amplu, cu secțiuni de conversie și integrări.",
    includes: ["Structură custom", "Formular ghidat", "Integrare Brevo", "Secțiuni de proiecte și prețuri"],
  },
  {
    name: "Software Custom",
    price: "ofertă pe scope",
    fit: "O aplicație, un dashboard sau un sistem de automatizare construit la comandă.",
    includes: ["Discovery tehnic", "Aplicație web", "Integrări API", "Suport la lansare"],
  },
];

const projects = [
  {
    title: "Flux de prezentare imobiliară",
    copy: "Structură de website pentru proprietăți, cu progres de proiect, detalii pentru apartamente și captare de lead-uri.",
    stack: "Next.js, UI responsive, arhitectură de conținut",
  },
  {
    title: "Experiență de produs pentru commerce",
    copy: "Interfață de tip magazin, construită pentru navigare clară, produse ușor de înțeles și decizii mai rapide.",
    stack: "React, date de produs, filtrare",
  },
  {
    title: "Instrumente pentru workflow intern",
    copy: "Tool-uri de administrare și automatizări care reduc munca operațională repetitivă.",
    stack: "Dashboard-uri, API-uri, integrări",
  },
];

const experience = [
  "Website-uri și aplicații web custom, de la idee până la lansare.",
  "Experiență cu React, Next.js, TypeScript, API-uri și workflow-uri de automatizare.",
  "Proces practic de discovery care transformă cerințele neclare într-un scope realizabil.",
  "Focus pe interfețe curate, cod mentenabil și rezultate utile pentru business.",
];

const techStack = [
  { name: "React", icon: siReact },
  { name: "Next.js", icon: siNextdotjs, color: "#ffffff" },
  { name: "TypeScript", icon: siTypescript },
  { name: "Tailwind", icon: siTailwindcss },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "shadcn/ui", icon: siShadcnui, color: "#ffffff" },
];

const workflowStack = [
  { name: "GitHub", icon: siGithub, color: "#ffffff" },
  { name: "Vercel", icon: siVercel, color: "#ffffff" },
  { name: "Supabase", icon: siSupabase },
  { name: "Brevo", icon: siBrevo },
  { name: "Cloudflare", icon: siCloudflare },
  { name: "GitLab", icon: siGitlab },
  { name: "SourceTree", icon: siSourcetree },
];

export default function Home() {
  return (
    <main>
      <header className="section-shell flex items-center justify-between py-5">
        <a className="focus-ring inline-flex items-center" href="#top" id="top" aria-label="MDI Software">
          <Image
            alt="MDI Software"
            className="h-12 w-auto object-contain"
            height={558}
            priority
            src="/images/mdi-logo-cropped.png"
            width={939}
          />
        </a>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-ink/70 md:flex">
          <a className="transition hover:text-ink" href="#services">Servicii</a>
          <a className="transition hover:text-ink" href="#pricing">Prețuri</a>
          <a className="transition hover:text-ink" href="#projects">Proiecte</a>
          <a className="transition hover:text-ink" href="#experience">Experiență</a>
        </nav>
        <a className="focus-ring inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-denim" href="#brief">
          Începe
          <Rocket size={16} aria-hidden="true" />
        </a>
      </header>

      <section className="relative isolate min-h-[calc(100svh-88px)] overflow-hidden">
        <HeroCosmosScene />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/88 via-black/58 to-black/18" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/64 via-transparent to-black/20" />

        <div className="section-shell flex min-h-[calc(100svh-88px)] items-center py-16">
          <div className="max-w-3xl text-white">
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[1.02] sm:text-6xl lg:text-7xl">
              Website custom, decis de tine
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-white/82">
              Vrei un site de prezentare, magazin online sau aplicație web construită custom, pornind de la
              cerințele pe care le alegi în formular?
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="focus-ring inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 font-semibold text-white transition hover:bg-[#c94f2e]" href="#brief">
                Construiește brief-ul
                <ArrowDown size={18} aria-hidden="true" />
              </a>
              <a className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/22 bg-white px-5 py-3 font-semibold text-ink transition hover:bg-mist" href="#pricing">
                Vezi prețurile
              </a>
            </div>
            <div className="relative mt-8 w-full max-w-[calc(100vw-2rem)] overflow-hidden rounded-md bg-white/10 shadow-sm backdrop-blur sm:mt-10 sm:max-w-3xl">
              <p className="sr-only">
                Stack tehnic și workflow: React, Next.js, TypeScript, Tailwind, PostgreSQL, shadcn/ui,
                GitHub, Vercel, Supabase, Brevo, Cloudflare, GitLab și SourceTree.
              </p>
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#020817] to-transparent sm:w-16" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#020817] to-transparent sm:w-16" />
              <TechMarquee items={techStack} />
              <TechMarquee className="tech-marquee-reverse border-t border-white/8 opacity-[0.82]" items={workflowStack} />
            </div>
          </div>
        </div>
      </section>

      <section className="services-pricing isolate overflow-hidden" id="services">
        <div className="relative bg-[#fbfaf7] pb-28 pt-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(0,119,255,0.08),transparent_25rem),radial-gradient(circle_at_14%_20%,rgba(228,93,54,0.07),transparent_26rem)]" />
          <div className="section-shell relative">
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#006dff]">Servicii</p>
            <h2 className="mt-3 max-w-4xl text-4xl font-black leading-[1.02] text-[#071022] sm:text-5xl lg:text-6xl">
              Construit în jurul lucrurilor de care clienții chiar au nevoie.
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article
                    className="group relative min-h-[440px] overflow-hidden rounded-lg border border-[#d8dde6] bg-white/[0.62] p-7 shadow-[0_22px_60px_rgba(7,16,34,0.08)] backdrop-blur"
                    key={service.title}
                  >
                    <Icon className="text-[#006dff]" size={34} strokeWidth={1.8} aria-hidden="true" />
                    <h3 className="mt-6 max-w-[13rem] text-2xl font-black leading-tight text-[#071022]">
                      {service.title}
                    </h3>
                    <p className="mt-4 max-w-[14rem] text-base font-medium leading-7 text-[#253045]/[0.82]">
                      {service.copy}
                    </p>
                    <BlueprintIllustration index={index} />
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pricing-cosmos relative -mt-16 pb-20 pt-28 text-white" id="pricing">
          <div className="section-shell relative z-10">
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-signal">Prețuri</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black leading-[1.02] text-white sm:text-5xl">
              Puncte de pornire clare,
              <br />
              apoi ofertă în funcție de scope.
            </h2>
            <div className="mt-7 grid gap-6 lg:grid-cols-3">
              {prices.map((plan) => (
                <article
                  className="rounded-lg border border-[#1572bf]/70 bg-[#071426]/[0.78] p-7 shadow-[0_0_34px_rgba(0,118,255,0.2)] backdrop-blur"
                  key={plan.name}
                >
                  <p className="text-sm font-bold uppercase tracking-[0.26em] text-signal">{plan.name}</p>
                  <p className="mt-4 text-4xl font-black leading-none text-white">{plan.price}</p>
                  <p className="mt-4 min-h-[3.25rem] text-base font-medium leading-6 text-white/[0.86]">{plan.fit}</p>
                  <ul className="mt-6 space-y-3">
                    {plan.includes.map((item) => (
                      <li className="flex items-center gap-3" key={item}>
                        <BadgeCheck className="shrink-0 text-signal" size={18} aria-hidden="true" />
                        <span className="font-semibold text-white/[0.94]">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a className="focus-ring mt-7 inline-flex w-full items-center justify-center gap-3 rounded-md bg-signal px-4 py-3 font-bold text-white shadow-[0_16px_34px_rgba(228,93,54,0.28)] transition hover:bg-[#ff7048]" href="#brief">
                    Alege direcția
                    <ArrowRight size={20} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-white" id="projects">
        <div className="section-shell">
          <SectionIntro eyebrow="Proiecte" title="Lucrări reprezentative, orientate spre rezultate de business." dark />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {projects.map((project) => (
              <article className="rounded-lg border border-white/12 bg-white/7 p-6" key={project.title}>
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="mt-4 leading-7 text-white/70">{project.copy}</p>
                <p className="mt-6 rounded-md bg-white px-3 py-2 text-sm font-semibold text-ink">{project.stack}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell grid gap-10 py-20 lg:grid-cols-[0.78fr_1fr]" id="experience">
        <SectionIntro eyebrow="Experiență" title="Software practic, construit cu o gândire de produs." />
        <div className="grid gap-4">
          {experience.map((item, index) => (
            <div className="flex gap-4 rounded-lg bg-white p-5 shadow-sm" key={item}>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-denim font-bold text-white">{index + 1}</span>
              <p className="leading-7 text-ink/75">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="section-shell">
          <ProjectBriefWizard />
        </div>
      </section>

      <footer className="section-shell flex flex-col gap-3 border-t border-ink/10 py-8 text-sm text-ink/62 sm:flex-row sm:items-center sm:justify-between">
        <Image
          alt="MDI Software"
          className="h-10 w-auto object-contain"
          height={558}
          src="/images/mdi-logo-cropped.png"
          width={939}
        />
        <p className="inline-flex items-center gap-2">
          <MailCheck size={16} aria-hidden="true" />
          Captare de lead-uri prin Brevo
        </p>
      </footer>
    </main>
  );
}

function TechMarquee({
  className = "",
  items,
}: {
  className?: string;
  items: { color?: string; icon: { hex: string; path: string }; name: string }[];
}) {
  return (
    <div className={`tech-marquee flex w-max gap-2 py-2.5 sm:gap-3 sm:py-3 ${className}`}>
      {[...items, ...items].map((tech, index) => (
        <div
          aria-hidden={index >= items.length}
          className="flex h-10 min-w-max items-center gap-2 bg-white/8 px-3 text-xs font-bold text-white shadow-sm sm:h-12 sm:gap-3 sm:px-4 sm:text-sm"
          key={`${tech.name}-${index}`}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded bg-white/10 sm:h-7 sm:w-7">
            <svg
              aria-hidden="true"
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="currentColor"
              role="img"
              style={{ color: tech.color ?? `#${tech.icon.hex}` }}
              viewBox="0 0 24 24"
            >
              <path d={tech.icon.path} />
            </svg>
          </span>
          <span>{tech.name}</span>
        </div>
      ))}
    </div>
  );
}

function BlueprintIllustration({ index }: { index: number }) {
  const commonStroke = "stroke-[#0075ff]";
  const faintStroke = "stroke-[#7db8ff]";

  if (index === 3) {
    return (
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-[8px] h-48 w-full text-[#0075ff] opacity-75"
        fill="none"
        viewBox="0 0 280 176"
        aria-hidden="true"
      >
        <path className={faintStroke} d="M0 96H280M140 0V176" strokeDasharray="3 7" strokeWidth="1" />
        <circle className={faintStroke} cx="140" cy="96" r="48" strokeDasharray="3 6" strokeWidth="1" />
        <circle className={commonStroke} cx="140" cy="96" r="24" strokeWidth="1.6" />
        <circle className={commonStroke} cx="140" cy="96" r="16" strokeWidth="1.2" />
        {[
          [78, 36, 58, 18],
          [205, 34, 224, 18],
          [72, 138, 58, 154],
          [206, 138, 226, 154],
        ].map(([x1, y1, x2, y2]) => (
          <g key={`${x1}-${y1}`}>
            <path className={commonStroke} d={`M140 96L${x1} ${y1}`} strokeWidth="1.4" />
            <circle className="fill-[#0075ff]" cx={x1} cy={y1} r="3" />
            <rect className={commonStroke} height="26" rx="2" width="34" x={x2 - 17} y={y2 - 13} strokeWidth="1.4" />
          </g>
        ))}
        <path className={commonStroke} d="M47 151h17v-9h17M215 154h28v-19" strokeWidth="1.2" />
        <path className={commonStroke} d="M47 30h34v6H47zM215 25h26v26h-26z" strokeWidth="1.2" />
        <text className="fill-[#0075ff] text-[12px] font-black" x="215" y="143">API</text>
      </svg>
    );
  }

  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-[6px] h-52 w-full text-[#0075ff] opacity-72"
      fill="none"
      viewBox="0 0 280 176"
      aria-hidden="true"
    >
      <path className={faintStroke} d="M0 96c55-3 85-8 136-20 57-13 94-13 144-10" strokeDasharray="3 8" strokeWidth="1" />
      <path className={faintStroke} d="M28 132h225M48 50h205M34 78h208" strokeDasharray="2 8" strokeWidth="1" />
      <g transform={index === 1 ? "translate(12 20) rotate(-4 132 98)" : index === 2 ? "translate(10 16) rotate(-8 132 98)" : "translate(10 22) rotate(-10 132 98)"}>
        <rect className={commonStroke} height="102" rx="2" width="200" x="38" y="48" strokeWidth="1.6" />
        <path className={commonStroke} d="M38 68h200M50 59h5M62 59h5M74 59h5" strokeWidth="1.4" />
        {index === 0 && (
          <>
            <path className={faintStroke} d="M56 88h62M56 101h72M56 114h48" strokeWidth="1.2" />
            <rect className={faintStroke} height="50" width="82" x="130" y="86" strokeWidth="1.4" />
            <path className={commonStroke} d="M140 128l22-22 14 14 15-18 16 26" strokeWidth="1.4" />
            <circle className={commonStroke} cx="178" cy="98" r="5" strokeWidth="1.2" />
          </>
        )}
        {index === 1 && (
          <>
            <path className={commonStroke} d="M52 128c28-34 53 18 82-13 25-27 50-12 80-58" strokeWidth="2" />
            <path className={commonStroke} d="M202 60l14-5-4 15" strokeWidth="2" />
            {[54, 96, 135, 176, 214].map((x, dotIndex) => (
              <circle className="fill-[#0075ff]" cx={x} cy={[126, 104, 114, 88, 58][dotIndex]} key={x} r="4" />
            ))}
            <path className={faintStroke} d="M58 88h40M58 102h32M140 84h44M140 98h32" strokeWidth="1.2" />
          </>
        )}
        {index === 2 && (
          <>
            <rect className={faintStroke} height="18" width="48" x="56" y="84" strokeWidth="1.2" />
            <rect className={faintStroke} height="18" width="48" x="56" y="112" strokeWidth="1.2" />
            <circle className={commonStroke} cx="142" cy="103" r="28" strokeWidth="1.6" />
            <path className={commonStroke} d="M142 75v28h28" strokeWidth="1.4" />
            <path className={faintStroke} d="M186 84h36M186 98h26M186 116h38M76 140h44l14-18 16 12 20-30 24 36" strokeWidth="1.3" />
          </>
        )}
      </g>
    </svg>
  );
}

function SectionIntro({
  dark = false,
  eyebrow,
  title,
}: {
  dark?: boolean;
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${dark ? "text-signal" : "text-moss"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-4xl ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
    </div>
  );
}
