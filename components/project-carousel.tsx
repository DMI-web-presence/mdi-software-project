"use client";

import { useEffect, useState } from "react";
import { siNextdotjs, siReact } from "simple-icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type ProjectSlide = {
  copy: string;
  stack: string;
  title: string;
};

export function ProjectCarousel({ projects }: { projects: ProjectSlide[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(1);
  const activeProject = projects[activeIndex] ?? projects[0];
  const previousIndex = (activeIndex - 1 + projects.length) % projects.length;
  const nextIndex = (activeIndex + 1) % projects.length;

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateActiveSlide = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    updateActiveSlide();
    api.on("select", updateActiveSlide);
    api.on("reInit", updateActiveSlide);

    return () => {
      api.off("select", updateActiveSlide);
      api.off("reInit", updateActiveSlide);
    };
  }, [api]);

  return (
    <section className="project-showcase relative isolate overflow-hidden bg-[#020914] py-16 text-white sm:py-20 lg:min-h-[930px] lg:py-12" id="projects">
      <div className="project-globe pointer-events-none absolute right-[-9rem] top-10 -z-10 h-[780px] w-[780px] opacity-70" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_34%,rgba(15,119,205,0.26),transparent_27rem),radial-gradient(circle_at_82%_55%,rgba(12,91,166,0.22),transparent_32rem),linear-gradient(180deg,#030b17_0%,#020815_62%,#020711_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(83,178,255,0.12),transparent_1px)] [background-size:74px_74px] opacity-40" />

      <div className="mx-auto w-full max-w-[1480px] px-6 sm:px-8">
        <p className="text-sm font-black uppercase tracking-[0.32em] text-signal">Proiecte</p>
        <h2 className="mt-4 max-w-[820px] text-4xl font-black leading-[1.04] text-white sm:text-5xl lg:text-[3.45rem]">
          Lucrări reprezentative,
          <br />
          orientate spre rezultate de business.
        </h2>

        <Carousel
          className="relative mt-12 min-h-[650px] lg:mt-16 lg:min-h-[620px]"
          opts={{ align: "center", loop: true, startIndex: 1 }}
          setApi={setApi}
        >
          <button
            className="project-side-card left-[-18rem] top-[74px] hidden w-[560px] xl:block"
            type="button"
            onClick={() => api?.scrollTo(previousIndex)}
            aria-label={`Vezi proiectul ${projects[previousIndex]?.title}`}
          >
            <BrowserMockup variant={getVariant(previousIndex)} muted />
          </button>

          <button
            className="project-side-card right-[-18rem] top-[74px] hidden w-[560px] xl:block"
            type="button"
            onClick={() => api?.scrollTo(nextIndex)}
            aria-label={`Vezi proiectul ${projects[nextIndex]?.title}`}
          >
            <BrowserMockup variant={getVariant(nextIndex)} muted />
          </button>

          <CarouselContent className="items-start">
            {projects.map((project, index) => (
              <CarouselItem className="basis-full" key={project.title}>
                <div className="project-main-mockup relative z-10 mx-auto max-w-[760px] rounded-[1.35rem] border border-[#47b8ff]/65 bg-[#081a2a]/78 p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_42px_rgba(30,163,255,0.36),0_34px_80px_rgba(0,0,0,0.48)] backdrop-blur">
                  <BrowserMockup variant={getVariant(index)} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <article className="project-active-card relative z-20 mx-auto -mt-1 grid max-w-[690px] gap-5 rounded-lg border border-[#84d7ff]/60 bg-[#102033]/86 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.42),0_0_42px_rgba(69,199,255,0.16)] backdrop-blur-md sm:grid-cols-[5rem_1px_1fr] sm:p-6 lg:-mt-1">
            <p className="text-4xl font-black leading-none text-signal sm:text-5xl">{formatNumber(activeIndex)}</p>
            <div className="hidden h-full w-px bg-white/30 sm:block" />
            <div>
              <h3 className="text-xl font-black leading-tight text-white sm:text-2xl">{activeProject.title}</h3>
              <p className="mt-4 text-base font-medium leading-7 text-white/72 sm:text-lg">{activeProject.copy}</p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-md bg-white/12 px-4 py-2 text-base font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <StackIcon stack={activeProject.stack} />
                {activeProject.stack}
              </p>
            </div>
          </article>

          <div className="mt-7 flex items-center justify-center gap-5">
            {projects.map((project, index) => (
              <button
                className={`project-step ${index === activeIndex ? "project-step-active" : ""}`}
                key={project.title}
                type="button"
                onClick={() => api?.scrollTo(index)}
                aria-label={`Afișează proiectul ${project.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
              >
                <span className="sr-only">{formatNumber(index)}</span>
              </button>
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  );
}

function StackIcon({ stack }: { stack: string }) {
  const icon = stack.toLowerCase().startsWith("next.js")
    ? siNextdotjs
    : stack.toLowerCase().startsWith("react")
      ? siReact
      : null;

  if (!icon) {
    return null;
  }

  return (
    <svg className="size-5 shrink-0" fill="currentColor" role="img" viewBox="0 0 24 24" aria-label={icon.title}>
      <path d={icon.path} />
    </svg>
  );
}

function BrowserMockup({
  muted = false,
  variant,
}: {
  muted?: boolean;
  variant: "cards" | "dashboard" | "landing";
}) {
  return (
    <div className={`project-browser ${muted ? "project-browser-muted" : ""}`}>
      <div className="project-browser-top">
        <span className="size-6 rounded-full bg-[#c7ccd1]" />
        <div className="ml-auto flex gap-6">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="project-browser-body">
        {variant === "landing" && <LandingWireframe />}
        {variant === "cards" && <CardsWireframe />}
        {variant === "dashboard" && <DashboardWireframe />}
      </div>
    </div>
  );
}

function LandingWireframe() {
  return (
    <div className="flex h-full flex-col">
      <div className="grid flex-1 gap-8 p-10 sm:grid-cols-[1.05fr_1fr]">
        <div className="h-full min-h-24 rounded-md bg-[#d8dadd]" />
        <div className="space-y-4 pt-1">
          <span className="block h-3 rounded-full bg-[#d2d4d7]" />
          <span className="block h-3 rounded-full bg-[#d2d4d7]" />
          <span className="block h-3 w-4/5 rounded-full bg-[#d2d4d7]" />
          <span className="block h-8 w-24 rounded-md bg-[#c9ccd0]" />
        </div>
      </div>
      <div className="grid min-h-[40%] grid-cols-4 gap-8 border-t border-[#f0f0f0] px-10 py-8">
        {[0, 1, 2, 3].map((item) => (
          <div key={item}>
            <div className="h-24 max-h-[58%] rounded-md bg-[#dcdedf]" />
            <span className="mt-6 block h-3 rounded-full bg-[#d0d2d4]" />
            <span className="mt-3 block h-3 w-3/4 rounded-full bg-[#d0d2d4]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CardsWireframe() {
  return (
    <div className="h-full p-8">
      <span className="block h-3 w-28 rounded-full bg-[#ced2d6]" />
      <div className="mt-5 grid h-[calc(100%-2rem)] grid-cols-3 grid-rows-2 gap-4">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <div className="rounded-md bg-[#d7d9dc] p-4" key={item}>
            <span className="mt-[42%] block h-2.5 rounded-full bg-[#c8cbd0]" />
            <span className="mt-3 block h-2.5 w-3/4 rounded-full bg-[#c8cbd0]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardWireframe() {
  return (
    <div className="grid h-full grid-cols-[5rem_1fr]">
      <div className="space-y-3 border-r border-[#d9dcdf] p-5">
        {[0, 1, 2, 3, 4, 5, 6].map((item) => (
          <span className="block h-2.5 rounded-full bg-[#ccd0d4]" key={item} />
        ))}
      </div>
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((item) => (
            <div className="h-12 rounded-md bg-[#d6d8db]" key={item} />
          ))}
        </div>
        <div className="mt-7 h-[35%] rounded-md bg-[#d8dade]">
          <svg className="h-full w-full text-[#b8bdc3]" fill="none" viewBox="0 0 300 112" aria-hidden="true">
            <path d="M12 82l38-34 32 30 35-22 46 36 54-48 36 25 35-37" stroke="currentColor" strokeWidth="3" />
            {[50, 117, 217].map((x) => (
              <circle cx={x} cy={x === 217 ? 44 : x === 117 ? 56 : 48} fill="currentColor" key={x} r="8" />
            ))}
          </svg>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-5">
          {[0, 1, 2, 3].map((item) => (
            <div key={item}>
              <span className="block h-3 rounded-full bg-[#cdd1d5]" />
              <span className="mt-4 block h-2.5 rounded-full bg-[#d7dadd]" />
              <span className="mt-3 block h-2.5 w-3/4 rounded-full bg-[#d7dadd]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getVariant(index: number): "cards" | "dashboard" | "landing" {
  if (index === 0) {
    return "cards";
  }

  if (index === 2) {
    return "dashboard";
  }

  return "landing";
}

function formatNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}
