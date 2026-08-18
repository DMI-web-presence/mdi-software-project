import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Layers3,
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
import { ContactForm } from "@/components/contact-form";
import { HeroCosmosScene } from "@/components/hero-cosmos-scene";
import { PricingBenefitsList, type PricingBenefitItem } from "@/components/pricing-benefits-list";
import { ProcessSection } from "@/components/process-section";
import { ProjectCarousel } from "@/components/project-carousel";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { portfolioProjects } from "@/lib/portfolio-projects";
import { absoluteUrl, siteDescription, siteKeywords, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "MDI Software | Website-uri, aplicații web și magazine online custom",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${absoluteUrl()}#organization`,
      name: siteName,
      url: absoluteUrl(),
      logo: absoluteUrl("/images/mdi-logo-cropped.png"),
      description: siteDescription,
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${absoluteUrl()}#website`,
      name: siteName,
      url: absoluteUrl(),
      description: siteDescription,
      publisher: {
        "@id": `${absoluteUrl()}#organization`,
      },
      inLanguage: "ro-RO",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${absoluteUrl()}#professional-service`,
      name: siteName,
      url: absoluteUrl(),
      image: absoluteUrl("/images/mdi-hero.png"),
      description: siteDescription,
      areaServed: "Romania",
      serviceType: siteKeywords.slice(2, 7),
      inLanguage: "ro-RO",
    },
  ],
};

const services = [
  {
    title: "Website-uri de prezentare",
    copy: "Site-uri rapide și elegante care explică oferta clar și conduc vizitatorii spre o decizie.",
    icon: Layers3,
    href: "/website-de-prezentare",
  },
  {
    title: "Website-uri business",
    copy: "Secțiuni custom, prețuri, galerii de proiecte, SEO de bază și formulare orientate spre conversii.",
    icon: BriefcaseBusiness,
    href: "/website-de-prezentare",
  },
  {
    title: "Aplicații web",
    copy: "Dashboard-uri, portaluri, instrumente admin și sisteme interne construite în jurul workflow-urilor reale.",
    icon: Code2,
    href: "/aplicatii-web",
  },
  {
    title: "Integrări",
    copy: "Brevo, plăți, analytics, programări, automatizări și conexiuni API.",
    icon: Workflow,
    href: "/aplicatii-web",
  },
];

const prices = [
  {
    name: "Pachet Startup",
    price: "999 €",
    fit: "Pentru lansare rapidă, cu catalog, plăți online, design custom și administrare de bază.",
    image: "/images/startup_price.png",
    maintenance: {
      name: "Mentenanță Start",
      price: "+40 €/lună",
      copy: "Verificări lunare, formular, SSL și mici modificări incluse.",
    },
    tier: "startup",
  },
  {
    name: "Pachet Professional",
    price: "2.490 €",
    fit: "Pentru magazine în creștere, cu mai multe produse, automatizări și configurări avansate.",
    image: "/images/proffesional_price.png",
    maintenance: {
      name: "Mentenanță Plus",
      price: "+100 €/lună",
      copy: "Actualizări lunare, Brevo, Analytics, performanță și mici optimizări.",
    },
    tier: "professional",
  },
  {
    name: "Pachet Business",
    price: "3.990 €",
    fit: "Pentru operațiuni complexe, cu facturare, curier, fluxuri complete și suport extins.",
    image: "/images/business_price.png",
    maintenance: {
      name: "Mentenanță Pro",
      price: "+150 €/lună",
      copy: "Suport prioritar, optimizări continue, tracking lead-uri și secțiuni mici.",
    },
    tier: "business",
  },
] satisfies {
  fit: string;
  image: string;
  maintenance: {
    copy: string;
    name: string;
    price: string;
  };
  name: string;
  price: string;
  tier: "startup" | "professional" | "business";
}[];

const priceComparison = [
  { benefit: "Preț unic", startup: "999 €", professional: "2.490 €", business: "3.990 €", highlight: true },
  { benefit: "Consultanță inițială", startup: "✓", professional: "✓", business: "✓" },
  { benefit: "Catalog și administrare produse", startup: "✓", professional: "✓", business: "✓" },
  { benefit: "Formular de contact", startup: "✓", professional: "✓", business: "✓" },
  { benefit: "Optimizare pentru mobil și tabletă", startup: "✓", professional: "✓", business: "✓" },
  { benefit: "Certificat SSL și configurare GDPR", startup: "✓", professional: "✓", business: "✓" },
  { benefit: "Configurare domeniu și găzduire", startup: "✓", professional: "✓", business: "✓" },
  { benefit: "Conectare rețele sociale", startup: "✓", professional: "✓", business: "✓" },
  { benefit: "Configurare plăți și livrare", startup: "Standard", professional: "Avansată", business: "Avansată" },
  { benefit: "Design complet personalizat", startup: "✓", professional: "✓", business: "✓" },
  { benefit: "Logo", startup: "5 variante", professional: "20 variante", business: "20 variante" },
  { benefit: "Identitate vizuală", startup: "Culori și fonturi", professional: "Mini-ghid de identitate", business: "Mini-ghid de identitate" },
  { benefit: "Sistem Live Chat", startup: "—", professional: "✓", business: "✓" },
  { benefit: "Google Analytics", startup: "Configurare de bază", professional: "✓", business: "Monitorizare avansată" },
  { benefit: "Google Search Console", startup: "—", professional: "✓", business: "✓" },
  { benefit: "Profil Google Business", startup: "—", professional: "Configurare", business: "Configurare și optimizare" },
  { benefit: "Optimizare SEO avansată", startup: "✓", professional: "✓", business: "✓" },
  { benefit: "Integrare sistem de facturare", startup: "—", professional: "Opțional", business: "✓" },
  { benefit: "Integrare SelfAWB/curier", startup: "—", professional: "Opțional", business: "✓" },
  { benefit: "Integrare plată cu cardul", startup: "✓", professional: "✓", business: "✓" },
  { benefit: "E-mailuri automate", startup: "Standard", professional: "Personalizate", business: "Fluxuri complete" },
  { benefit: "Reduceri și cupoane", startup: "✓", professional: "✓", business: "✓" },
  { benefit: "Filtrare produse", startup: "✓", professional: "✓", business: "✓" },
  { benefit: "Administrare stoc", startup: "De bază", professional: "✓", business: "✓" },
  { benefit: "Instruire pentru administrare", startup: "1 sesiune", professional: "2 sesiuni", business: "3 sesiuni" },
  { benefit: "Număr de pagini", startup: "Până la 6", professional: "Până la 15", business: "Până la 30" },
  { benefit: "Produse încărcate", startup: "Până la 20", professional: "Până la 100", business: "Până la 300" },
  { benefit: "Imagini premium de stoc", startup: "5", professional: "10", business: "15" },
  { benefit: "Revizii de design", startup: "5", professional: "10", business: "15" },
  { benefit: "Durată de execuție", startup: "7-14 zile", professional: "14-30 zile", business: "30-45 zile" },
  { benefit: "Suport după lansare", startup: "14 zile", professional: "30 zile", business: "60 zile" },
];

function getCommerceBenefitItems(tier: (typeof prices)[number]["tier"]): PricingBenefitItem[] {
  const rank = (value: string) => (value === "✓" ? 0 : value === "—" ? 1 : 2);

  return [...priceComparison.slice(1)]
    .sort((a, b) => rank(a[tier]) - rank(b[tier]))
    .filter((item) => tier !== "startup" || item[tier] !== "—")
    .map((item) => {
      const value = item[tier];

      if (value === "✓") {
        return { label: item.benefit };
      }

      if (value === "—") {
        return { label: item.benefit, state: "excluded" };
      }

      return { label: item.benefit, state: "text", value };
    });
}

function getCommerceMobilePreviewItems(tier: (typeof prices)[number]["tier"]): PricingBenefitItem[] | undefined {
  if (tier === "startup") {
    return undefined;
  }

  const rank = (item: PricingBenefitItem) => (item.state === "excluded" ? 0 : item.state === "text" ? 1 : 2);

  return [...getCommerceBenefitItems(tier)].sort((a, b) => rank(a) - rank(b));
}

const presentationPrices = [
  {
    name: "Pachet Esențial",
    price: "290 €",
    fit: "Pentru afaceri mici care au nevoie de o prezență online clară și de mai multe solicitări de contact.",
    image: "/images/website_prezentare_1.png",
    benefits: [
      "Design complet personalizat",
      "Până la 5 pagini",
      "Design responsive",
      "Prezentare servicii sau produse",
      "Galerii foto și integrare video",
      "Formular de contact",
      "Integrare Google Maps",
      "SEO și optimizare de performanță",
      "Configurare domeniu și SSL",
    ],
    maintenance: {
      name: "Mentenanță Start",
      price: "+20 €/lună",
      copy: "Verificări lunare, formular, SSL și mici modificări incluse.",
    },
  },
  {
    name: "Pachet Professional",
    price: "480 €",
    fit: "Pentru firme care au nevoie de structură de conversie, conținut extins și o imagine de brand coerentă.",
    image: "/images/website_prezentare_2.png",
    benefits: [
      "Design complet personalizat",
      "Până la 12 pagini",
      "Design responsive",
      "Prezentare servicii sau produse",
      "Galerii foto și integrare video",
      "Formulare orientate spre conversii",
      "Prezentare servicii sau produse",
      "Branding vizual coerent",
      "Animații și interacțiuni",
      "Blog sau administrare conținut",
      "Google Analytics și Search Console",
      "Integrări CRM, rezervări sau chat",
      "SEO și optimizare de performanță",
      "Performanță și suport prioritar",
      "Administrare avansată a conținutului",
    ],
    maintenance: {
      name: "Mentenanță Plus",
      price: "+40 €/lună",
      copy: "Actualizări lunare, Analytics, performanță și mici optimizări.",
    },
  },
];

function getPresentationMobilePreviewItems(plan: (typeof presentationPrices)[number]): PricingBenefitItem[] | undefined {
  if (plan.name !== "Pachet Professional") {
    return undefined;
  }

  const essentialBenefits = new Set(presentationPrices[0]?.benefits ?? []);

  return plan.benefits
    .filter((benefit) => !essentialBenefits.has(benefit))
    .map((benefit) => ({ label: benefit }));
}

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
      <ScrollReveal />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader />

      <section className="relative isolate min-h-[calc(100svh-60px)] overflow-hidden md:min-h-[calc(100svh-88px)]">
        <HeroCosmosScene />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/88 via-black/58 to-black/18" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/64 via-transparent to-black/20" />

        <div className="section-shell flex min-h-[calc(100svh-60px)] items-center py-16 md:min-h-[calc(100svh-88px)]">
          <div className="max-w-3xl text-white">
            <h1 className="hero-load hero-load-left mt-6 max-w-3xl text-5xl font-black leading-[1.02] sm:text-6xl lg:text-7xl">
              Website custom, decis de tine
            </h1>
            <p className="hero-load hero-load-left hero-load-delay-1 mt-5 max-w-2xl text-xl leading-8 text-white/80">
              Vrei un site de prezentare, magazin online sau aplicație web construită custom, pornind de la
              cerințele pe care le alegi în formular?
              <span className="hidden md:inline"> Fără WordPress, Shopify sau alte platforme de e-commerce, fără șabloane, fără limitări. Noi construim, tu decizi.</span>
            </p>
            <div className="hero-load hero-load-left hero-load-delay-2 mt-8 flex flex-wrap gap-3">
              <Link className="focus-ring inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 font-semibold text-white transition hover:bg-[#c94f2e]" href="/brief">
                Construiește brief-ul
                <ArrowDown size={18} aria-hidden="true" />
              </Link>
              <a className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/22 bg-white px-5 py-3 font-semibold text-ink transition hover:bg-mist" href="#pricing">
                Vezi prețurile
              </a>
            </div>
            <div className="hero-load hero-load-scale hero-load-delay-3 relative mt-8 w-full max-w-[calc(100vw-2rem)] overflow-hidden rounded-md bg-white/10 shadow-sm backdrop-blur sm:mt-10 sm:max-w-3xl">
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

      <section className="services-pricing isolate overflow-hidden bg-[#fbfaf7]" id="services">
        <div className="relative bg-[#fbfaf7] pb-28 pt-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(0,119,255,0.08),transparent_25rem),radial-gradient(circle_at_14%_20%,rgba(228,93,54,0.07),transparent_26rem)]" />
          <div className="section-shell relative">
            <p className="section-kicker scroll-reveal text-[#006dff]">Servicii</p>
            <h2 className="scroll-reveal reveal-delay-1 mt-3 max-w-4xl text-4xl font-black leading-[1.02] text-[#071022] sm:text-5xl lg:text-6xl">
              Construit în jurul lucrurilor de care clienții chiar au nevoie.
            </h2>
            <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article
                    className={`scroll-reveal group relative flex min-h-[315px] flex-col overflow-hidden rounded-lg border border-[#d8dde6] bg-white/[0.62] p-4 shadow-[0_22px_60px_rgba(7,16,34,0.08)] backdrop-blur sm:min-h-[440px] sm:p-7 ${index % 3 === 1 ? "reveal-delay-1" : index % 3 === 2 ? "reveal-delay-2" : ""}`}
                    data-pricing-card
                    data-reveal="scale"
                    key={service.title}
                  >
                    <div className="flex items-center gap-3 sm:block">
                      <Icon className="size-7 shrink-0 text-[#006dff] sm:size-[34px]" strokeWidth={1.8} aria-hidden="true" />
                      <h3 className="max-w-[13rem] text-lg font-black leading-tight text-[#071022] sm:mt-6 sm:text-2xl">
                        {service.title}
                      </h3>
                    </div>
                    <p className="mt-2.5 max-w-[16rem] text-[0.8rem] font-medium leading-5 text-[#253045]/[0.82] sm:mt-4 sm:max-w-[14rem] sm:text-base sm:leading-7">
                      {service.copy}
                    </p>
                    <div className="mt-auto pt-4 sm:pt-5">
                      <Link
                        className="focus-ring inline-flex max-w-full items-center gap-2 text-sm font-bold text-[#006dff] transition hover:text-[#0052c2]"
                        href={service.href}
                      >
                        <span className="truncate">Vezi pagina</span>
                        <ArrowRight className="shrink-0" size={16} aria-hidden="true" />
                      </Link>
                      <div className="relative mt-3 min-h-[6.5rem] sm:mt-4 sm:min-h-[9.5rem]">
                        <BlueprintIllustration index={index} />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pricing-cosmos relative -mt-16 pb-20 pt-28 text-white" id="pricing">
          <div className="section-shell relative z-10 mt-14">
            <div className="scroll-mt-24" id="pricing-presentation">
              <p className="section-kicker scroll-reveal text-signal">Prețuri</p>
              <h2 className="scroll-reveal reveal-delay-1 mt-3 max-w-3xl text-4xl font-black leading-[1.02] text-white sm:text-5xl">
                Prețuri creare website de prezentare
              </h2>
              <div className="mt-24 grid gap-x-6 gap-y-24 md:grid-cols-2 lg:mx-auto lg:max-w-4xl lg:gap-y-6">
                {presentationPrices.map((plan, index) => (
                  <article
                    className={`scroll-reveal group/pricing flex h-full flex-col rounded-lg border border-[#1572bf]/70 bg-[#071426]/[0.78] p-7 shadow-[0_0_34px_rgba(0,118,255,0.2)] backdrop-blur transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-[3px] hover:border-[rgba(69,199,255,0.9)] hover:shadow-[0_0_46px_rgba(0,118,255,0.28),0_22px_54px_rgba(0,0,0,0.26)] ${index === 1 ? "reveal-delay-1" : ""}`}
                    data-reveal="scale"
                    key={plan.name}
                  >
                    <div className="relative mx-auto -mt-20 mb-4 h-64 w-full max-w-[17rem] transition-[filter,transform] duration-300 group-hover/pricing:translate-y-[-10px] group-hover/pricing:scale-[1.04] group-hover/pricing:rotate-[1deg] lg:-mt-24 lg:h-72">
                      <Image
                        alt={`Ilustrație ${plan.name.toLowerCase()} pentru website de prezentare`}
                        className="object-contain drop-shadow-[0_0_26px_rgba(69,199,255,0.42)]"
                        fill
                        sizes="(min-width: 1024px) 272px, 78vw"
                        src={plan.image}
                      />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-[0.26em] text-signal">{plan.name}</p>
                    <p className="mt-4 text-4xl font-black leading-none text-white">{plan.price}</p>
                    <p className="mt-4 min-h-[4.5rem] text-base font-medium leading-6 text-white/[0.86]">{plan.fit}</p>
                    <PricingBenefitsList
                      items={plan.benefits.map((benefit) => ({ label: benefit }))}
                      mobilePreviewItems={getPresentationMobilePreviewItems(plan)}
                    />
                    <div className="mb-6 mt-auto rounded-lg border border-[#2a85d7]/60 bg-[#06111f]/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_40px_rgba(0,118,255,0.12)]">
                      <p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#69c8ff]">Opțional după lansare</p>
                      <div className="mt-3 flex items-start justify-between gap-4">
                        <div>
                          <p className="text-base font-black text-white">{plan.maintenance.name}</p>
                          <p className="mt-2 text-sm font-medium leading-5 text-white/68">{plan.maintenance.copy}</p>
                        </div>
                        <p className="shrink-0 text-right text-base font-black text-signal">{plan.maintenance.price}</p>
                      </div>
                    </div>
                    <Link className="focus-ring inline-flex w-full items-center justify-center gap-3 rounded-md bg-signal px-4 py-3 font-bold text-white shadow-[0_16px_34px_rgba(228,93,54,0.28)] transition hover:bg-[#ff7048]" href="/brief">
                      Alege
                      <ArrowRight size={20} aria-hidden="true" />
                    </Link>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-24 scroll-mt-24 sm:mt-32" id="pricing-ecommerce">
              <p className="section-kicker scroll-reveal text-signal">Prețuri</p>
              <h2 className="scroll-reveal reveal-delay-1 mt-3 max-w-3xl text-4xl font-black leading-[1.02] text-white sm:text-5xl">
                Prețuri creare magazin online
              </h2>
              <p className="scroll-reveal reveal-delay-2 mt-4 max-w-2xl text-lg font-medium leading-8 text-white/80">
                Alege pachetul potrivit pentru lansare, administrare produse, plăți online și creștere.
              </p>
            </div>
            <div className="mt-28 grid gap-x-6 gap-y-28 lg:grid-cols-3 lg:gap-y-6">
              {prices.map((plan, index) => (
                <article
                  className={`scroll-reveal group/pricing flex h-full flex-col rounded-lg border border-[#1572bf]/70 bg-[#071426]/[0.78] p-7 shadow-[0_0_34px_rgba(0,118,255,0.2)] backdrop-blur transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-[3px] hover:border-[rgba(69,199,255,0.9)] hover:shadow-[0_0_46px_rgba(0,118,255,0.28),0_22px_54px_rgba(0,0,0,0.26)] ${index === 1 ? "reveal-delay-1" : index === 2 ? "reveal-delay-2" : ""}`}
                  data-pricing-card
                  data-reveal="scale"
                  key={plan.name}
                >
                  <div className="relative mx-auto -mt-20 mb-4 h-52 w-full max-w-[15rem] transition-[filter,transform] duration-300 group-hover/pricing:translate-y-[-10px] group-hover/pricing:scale-[1.04] group-hover/pricing:rotate-[1deg] lg:-mt-24 lg:h-56">
                    <Image
                      alt=""
                      className="object-contain drop-shadow-[0_0_26px_rgba(69,199,255,0.42)]"
                      fill
                      sizes="(min-width: 1024px) 240px, 70vw"
                      src={plan.image}
                    />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-[0.26em] text-signal">{plan.name}</p>
                  <p className="mt-4 text-4xl font-black leading-none text-white">{plan.price}</p>
                  <p className="mt-4 min-h-[3.25rem] text-base font-medium leading-6 text-white/[0.86]">{plan.fit}</p>
                  <PricingBenefitsList
                    items={getCommerceBenefitItems(plan.tier)}
                    mobilePreviewItems={getCommerceMobilePreviewItems(plan.tier)}
                  />
                  <div className="mb-6 mt-auto rounded-lg border border-[#2a85d7]/60 bg-[#06111f]/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_40px_rgba(0,118,255,0.12)]">
                    <p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#69c8ff]">
                      Opțional după lansare
                    </p>
                    <div className="mt-3 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-base font-black text-white">{plan.maintenance.name}</p>
                        <p className="mt-2 text-sm font-medium leading-5 text-white/68">{plan.maintenance.copy}</p>
                      </div>
                      <p className="shrink-0 text-right text-base font-black text-signal">{plan.maintenance.price}</p>
                    </div>
                  </div>
                  <Link className="focus-ring inline-flex w-full items-center justify-center gap-3 rounded-md bg-signal px-4 py-3 font-bold text-white shadow-[0_16px_34px_rgba(228,93,54,0.28)] transition hover:bg-[#ff7048]" href="/brief">
                    Alege
                    <ArrowRight size={20} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider-light" aria-hidden="true" />

      <ProjectCarousel projects={portfolioProjects} />

      <section className="relative overflow-hidden bg-[#fbfaf7] py-24 sm:py-28" id="experience">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(0,119,255,0.08),transparent_25rem),radial-gradient(circle_at_14%_20%,rgba(228,93,54,0.07),transparent_26rem)]" />
        <div className="section-shell relative grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="scroll-reveal" data-reveal="left">
            <p className="section-kicker text-[#006dff]">Experiență</p>
            <h2 className="mt-8 max-w-xl text-4xl font-black leading-[1.04] text-[#071022] sm:text-5xl lg:text-6xl">
              Software practic,
              <br />
              construit cu o
              <br />
              gândire de produs.
            </h2>
          </div>

          <div className="relative lg:min-h-[680px]">
            {experience.map((item, index) => {
              const positions = [
                "lg:left-[0%] lg:top-[465px]",
                "lg:left-[14%] lg:top-[310px]",
                "lg:left-[28%] lg:top-[155px]",
                "lg:left-[42%] lg:top-0",
              ];
              const sizes = [
                "lg:w-[68%]",
                "lg:w-[68%]",
                "lg:w-[66%]",
                "lg:w-[66%]",
              ];
              const styles = [
                "border-[#258cff]/55 bg-white/[0.7] shadow-[0_24px_60px_rgba(22,80,150,0.12)]",
                "border-[#258cff]/50 bg-[#f7fbff]/[0.76] shadow-[0_24px_60px_rgba(22,80,150,0.13)]",
                "border-[#51c7cf]/60 bg-[#effcff]/[0.78] shadow-[0_24px_60px_rgba(28,147,154,0.14)]",
                "border-signal/70 bg-[#fff7f3]/[0.8] shadow-[0_24px_60px_rgba(228,93,54,0.12)]",
              ];
              const numberColor = index === 3 ? "text-signal/80" : index === 2 ? "text-[#48c5cf]/80" : "text-[#0075ff]/80";

              return (
                <article
                  className={`scroll-reveal relative mb-3 grid min-h-28 grid-cols-[3.5rem_minmax(0,1fr)] items-center gap-3 rounded-lg border px-4 py-4 backdrop-blur sm:mb-5 sm:flex sm:min-h-36 sm:gap-6 sm:p-6 lg:absolute lg:mb-0 lg:min-h-40 lg:p-8 ${index === 1 ? "reveal-delay-1" : index === 2 ? "reveal-delay-2" : index === 3 ? "reveal-delay-3" : ""} ${positions[index]} ${sizes[index]} ${styles[index]}`}
                  data-reveal="right"
                  key={item}
                >
                  <span
                    className={`shrink-0 text-[2.6rem] font-black leading-none sm:text-7xl ${numberColor}`}
                    style={{ WebkitTextFillColor: "transparent", WebkitTextStroke: "2px currentColor" }}
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-md text-[0.9rem] font-medium leading-6 text-[#071022]/[0.82] sm:text-xl sm:leading-8">{item}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <ProcessSection />

      <ContactForm />

      <SiteFooter />
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
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full text-[#0075ff] opacity-75 sm:h-36"
        fill="none"
        viewBox="0 4 280 188"
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
      className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full text-[#0075ff] opacity-72 sm:h-36"
      fill="none"
      viewBox="0 15 280 180"
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

