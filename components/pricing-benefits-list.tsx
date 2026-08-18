"use client";

import { useState } from "react";
import { BadgeCheck, CircleX } from "lucide-react";

export type PricingBenefitItem = {
  label: string;
  state?: "included" | "excluded" | "text";
  value?: string;
};

type PricingBenefitsListProps = {
  items: PricingBenefitItem[];
  mobilePreviewItems?: PricingBenefitItem[];
};

const mobileVisibleCount = 5;

export function PricingBenefitsList({ items, mobilePreviewItems }: PricingBenefitsListProps) {
  const [expanded, setExpanded] = useState(false);
  const hasToggle = items.length > mobileVisibleCount;
  const collapsedMobileItems = (mobilePreviewItems ?? items).slice(0, mobileVisibleCount);
  const mobileItems = expanded ? items : collapsedMobileItems;

  return (
    <>
      <BenefitList className="md:hidden" items={mobileItems} />
      {hasToggle && (
        <button
          className="mb-7 -mt-3 inline-flex w-fit text-sm font-black text-[#69c8ff] transition hover:text-white md:hidden"
          type="button"
          onClick={() => setExpanded((current) => !current)}
          aria-expanded={expanded}
        >
          {expanded ? "Ascunde beneficiile" : "Afișează toate beneficiile"}
        </button>
      )}
      <BenefitList className="hidden md:block" items={items} />
    </>
  );
}

function BenefitList({ className, items }: { className?: string; items: PricingBenefitItem[] }) {
  return (
    <ul className={`mb-7 mt-6 space-y-2.5 ${className ?? ""}`}>
      {items.map((item, index) => (
        <li
          className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-b border-white/8 pb-2.5 last:border-b-0 last:pb-0"
          key={`${item.label}-${index}`}
        >
          <span className="text-sm font-medium leading-5 text-white/68">{item.label}</span>
          <BenefitValue item={item} />
        </li>
      ))}
    </ul>
  );
}

function BenefitValue({ item }: { item: PricingBenefitItem }) {
  if (item.state === "excluded") {
    return <CircleX className="ml-auto text-red-400" size={18} aria-label="Neinclus" />;
  }

  if (item.state === "text" && item.value) {
    return <span className="max-w-[9.5rem] text-right text-sm font-bold leading-5 text-white/92">{item.value}</span>;
  }

  return <BadgeCheck className="ml-auto text-emerald-400" size={18} aria-label="Inclus" />;
}
