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
              className={`policy-nav-item ${isActive ? "policy-nav-item-active" : ""}`}
              href={`#section-${sectionNumber}`}
              key={section}
              aria-current={isActive ? "true" : undefined}
            >
              <span aria-hidden="true" />
              {sectionNumber}. {section}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
