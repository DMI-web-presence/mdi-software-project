"use client";

import { useEffect, useMemo, useState } from "react";

export function PolicyScrollSpy({ sections }: { sections: string[] }) {
  const [activeSection, setActiveSection] = useState(1);
  const sectionIds = useMemo(() => sections.map((_, index) => `section-${index + 1}`), [sections]);

  useEffect(() => {
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sectionElements.length === 0) {
      return;
    }

    const selectCurrentSection = () => {
      const readingLine = window.innerHeight * 0.34;
      let currentIndex = 0;

      sectionElements.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= readingLine) {
          currentIndex = index;
        }
      });

      setActiveSection(currentIndex + 1);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];

        if (!visibleEntry) {
          selectCurrentSection();
          return;
        }

        const nextIndex = sectionIds.indexOf(visibleEntry.target.id);

        if (nextIndex >= 0) {
          setActiveSection(nextIndex + 1);
        }
      },
      {
        rootMargin: "-24% 0px -58% 0px",
        threshold: [0, 0.25, 0.5, 0.75],
      },
    );

    sectionElements.forEach((section) => observer.observe(section));
    selectCurrentSection();
    window.addEventListener("scroll", selectCurrentSection, { passive: true });
    window.addEventListener("resize", selectCurrentSection);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", selectCurrentSection);
      window.removeEventListener("resize", selectCurrentSection);
    };
  }, [sectionIds]);

  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-8 border-l border-[#cbd0d5]" aria-label="Secțiuni politica de confidențialitate">
        {sections.map((section, index) => {
          const sectionNumber = index + 1;
          const isActive = activeSection === sectionNumber;

          return (
            <a
              className={`relative flex min-h-[3.1rem] items-center gap-4 pl-[1.65rem] text-[0.95rem] font-semibold transition-[color,transform] duration-200 ${
                isActive ? "font-extrabold text-signal" : "text-[rgba(41,50,68,0.78)] hover:translate-x-[2px] hover:text-signal"
              }`}
              href={`#section-${sectionNumber}`}
              key={section}
              aria-current={isActive ? "true" : undefined}
            >
              <span
                aria-hidden="true"
                className={`absolute left-[-0.45rem] h-[0.8rem] w-[0.8rem] rounded-full border-2 bg-[#fbfaf7] ${
                  isActive
                    ? "border-signal shadow-[0_0_0_4px_rgba(228,93,54,0.12),0_0_16px_rgba(228,93,54,0.3)]"
                    : "border-[#cbd0d5]"
                }`}
              />
              {sectionNumber}. {section}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
