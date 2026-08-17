"use client";

import { useSyncExternalStore } from "react";
import { localeChangeEvent, localeStorageKey, normalizeLocale, type SiteLocale } from "@/lib/site-translations";

const languages: { flag: string; label: string; locale: SiteLocale }[] = [
  { flag: "RO", label: "Română", locale: "ro" },
  { flag: "EN", label: "English", locale: "en" },
];

function subscribeToLocaleChanges(callback: () => void) {
  window.addEventListener(localeChangeEvent, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(localeChangeEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

function getStoredLocale() {
  return normalizeLocale(window.localStorage.getItem(localeStorageKey));
}

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const locale = useSyncExternalStore(subscribeToLocaleChanges, getStoredLocale, () => "ro");

  function updateLocale(nextLocale: SiteLocale) {
    window.localStorage.setItem(localeStorageKey, nextLocale);
    window.dispatchEvent(new CustomEvent(localeChangeEvent, { detail: { locale: nextLocale } }));
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border border-black/10 bg-white/70 p-1 shadow-sm backdrop-blur ${compact ? "gap-0.5" : "gap-1"}`}
      data-no-translate
      aria-label="Language selector"
    >
      {languages.map((language) => (
        <button
          aria-label={`Switch to ${language.label}`}
          aria-pressed={locale === language.locale}
          className={`grid place-items-center rounded-full text-base font-black transition ${
            compact ? "size-8" : "size-9"
          } ${
            locale === language.locale
              ? "bg-[#071022] text-white shadow-[0_7px_16px_rgba(7,16,34,0.18)]"
              : "text-[#071022] hover:bg-black/5"
          }`}
          key={language.locale}
          onClick={() => updateLocale(language.locale)}
          type="button"
        >
          <span aria-hidden="true">{language.flag}</span>
        </button>
      ))}
    </div>
  );
}
