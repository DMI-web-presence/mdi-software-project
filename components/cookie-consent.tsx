"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Check, Cookie, Settings2, X } from "lucide-react";

const STORAGE_KEY = "mdi-cookie-consent";
const CONSENT_EVENT = "mdi-cookie-consent";

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(CONSENT_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function hasConsent() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

type CookieChoice = {
  analytics: boolean;
  marketing: boolean;
  necessary: true;
  savedAt: string;
};

export function CookieConsent() {
  const consentSaved = useSyncExternalStore(subscribeToConsent, hasConsent, () => true);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  function saveConsent(choice: Omit<CookieChoice, "savedAt">) {
    const payload: CookieChoice = {
      ...choice,
      savedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: payload }));
  }

  if (consentSaved) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] px-1 pb-1 sm:px-2 sm:pb-2">
      <section
        className="relative overflow-hidden rounded-t-[18px] border border-[#d8d3ca] border-t-[#20d9ee] bg-[#fffdfb] text-[#071022] shadow-[0_-24px_70px_rgba(2,8,21,0.22)]"
        aria-label="Preferințe cookies"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_7%_70%,rgba(228,93,54,0.08),transparent_18rem),radial-gradient(circle_at_88%_34%,rgba(0,117,255,0.07),transparent_22rem)]" />
        <div className="relative mx-auto grid w-[min(1440px,calc(100%-32px))] items-center gap-6 py-7 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-9 max-[520px]:w-[calc(100%-24px)]">
          <div className="grid size-20 shrink-0 place-items-center justify-self-start rounded-full border border-signal/20 text-signal sm:size-24">
            <Cookie className="size-12 sm:size-14" strokeWidth={1.8} aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-black leading-tight sm:text-2xl">
                  Preferințele tale de confidențialitate
                </h2>
                <p className="mt-3 max-w-3xl text-base font-medium leading-8 text-[#253045]/82 sm:text-lg">
                  Folosim cookie-uri necesare pentru funcționarea site-ului și, cu acordul tău, cookie-uri pentru analiză și îmbunătățirea experienței.
                </p>
              </div>
              <button
                className="grid size-9 shrink-0 place-items-center rounded-full border border-[#ddd8d2] bg-white text-[#4b5563] transition hover:border-signal/60 hover:text-signal lg:hidden"
                onClick={() => saveConsent({ analytics: false, marketing: false, necessary: true })}
                type="button"
                aria-label="Închide și acceptă doar cookie-urile necesare"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {customizing && (
              <div className="mt-5 grid max-w-3xl gap-3 sm:grid-cols-2">
                <CookieToggle
                  checked
                  description="Necesare pentru securitate, formulare și funcționarea website-ului."
                  disabled
                  label="Cookie-uri necesare"
                />
                <CookieToggle
                  checked={analytics}
                  description="Ne ajută să înțelegem paginile vizitate și performanța website-ului."
                  label="Analytics"
                  onChange={setAnalytics}
                />
                <CookieToggle
                  checked={marketing}
                  description="Pot susține campanii, remarketing sau măsurarea conversiilor."
                  label="Marketing"
                  onChange={setMarketing}
                />
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
              <Link className="underline underline-offset-4 transition hover:text-signal" href="/confidentialitate">
                Politica de confidențialitate
              </Link>
              <Link className="underline underline-offset-4 transition hover:text-signal" href="/confidentialitate#section-9">
                Politica de cookie-uri
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:w-[560px]">
            {customizing ? (
              <button
                className="focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-md border border-signal bg-white px-5 text-base font-black text-[#071022] transition hover:bg-[#fff5f0]"
                onClick={() => saveConsent({ analytics, marketing, necessary: true })}
                type="button"
              >
                <Check size={19} aria-hidden="true" />
                Salvează
              </button>
            ) : (
              <button
                className="focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-md border border-signal bg-white px-5 text-base font-black text-[#071022] transition hover:bg-[#fff5f0]"
                onClick={() => setCustomizing(true)}
                type="button"
              >
                <Settings2 size={18} aria-hidden="true" />
                Personalizează
              </button>
            )}
            <button
              className="focus-ring min-h-14 rounded-md bg-[#030a19] px-5 text-base font-black text-white shadow-[0_12px_28px_rgba(3,10,25,0.18)] transition hover:bg-[#162033]"
              onClick={() => saveConsent({ analytics: false, marketing: false, necessary: true })}
              type="button"
            >
              Doar necesare
            </button>
            <button
              className="focus-ring min-h-14 rounded-md bg-signal px-5 text-base font-black text-white shadow-[0_14px_32px_rgba(228,93,54,0.24)] transition hover:bg-[#ff7048]"
              onClick={() => saveConsent({ analytics: true, marketing: true, necessary: true })}
              type="button"
            >
              Acceptă toate
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function CookieToggle({
  checked,
  description,
  disabled,
  label,
  onChange,
}: {
  checked: boolean;
  description: string;
  disabled?: boolean;
  label: string;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <label className="grid gap-2 rounded-md border border-[#e0dcd5] bg-white/72 p-3">
      <span className="flex items-center justify-between gap-4 text-sm font-black">
        {label}
        <input
          checked={checked}
          className="size-4 accent-signal"
          disabled={disabled}
          onChange={(event) => onChange?.(event.target.checked)}
          type="checkbox"
        />
      </span>
      <small className="text-[0.72rem] font-medium leading-5 text-[#5d6370]">{description}</small>
    </label>
  );
}
