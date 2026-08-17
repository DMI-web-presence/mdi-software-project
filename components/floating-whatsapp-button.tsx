"use client";

import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";

const COOKIE_STORAGE_KEY = "mdi-cookie-consent";
const COOKIE_EVENT = "mdi-cookie-consent";
const whatsappHref = "https://wa.me/40760486699";

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener(COOKIE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(COOKIE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function hasConsent() {
  try {
    return window.localStorage.getItem(COOKIE_STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

export function FloatingWhatsAppButton() {
  const consentSaved = useSyncExternalStore(subscribeToConsent, hasConsent, () => true);
  const [isVisible, setIsVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > 180);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("[data-site-footer]");

    if (!footer) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      {
        threshold: 0.05,
      },
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <Link
      className={`focus-ring fixed right-4 z-[70] inline-flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-3 font-bold text-white shadow-[0_18px_38px_rgba(37,211,102,0.34)] transition-[opacity,transform,background-color,bottom] duration-300 hover:bg-[#1fba59] sm:right-6 ${
        footerVisible
          ? "bottom-20 sm:bottom-6"
          : consentSaved
            ? "bottom-4 sm:bottom-6"
            : "bottom-24 sm:bottom-28"
      } ${
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Deschide conversația pe WhatsApp la 0760 486 699"
      data-no-translate
    >
      <MessageCircleMore size={22} aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
    </Link>
  );
}
