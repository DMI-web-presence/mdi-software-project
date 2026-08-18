"use client";

import { useEffect } from "react";
import { localeChangeEvent, localeStorageKey, normalizeLocale, translateText, type SiteLocale } from "@/lib/site-translations";

const textNodeOriginals = new WeakMap<Text, string>();
const textNodeTranslated = new WeakMap<Text, string>();
const attrOriginals = new WeakMap<Element, Map<string, string>>();
const translatableAttributes = ["aria-label", "alt", "placeholder", "title"];
const ignoredTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"]);

function preserveSpacing(source: string, translated: string) {
  const leading = source.match(/^\s*/)?.[0] ?? "";
  const trailing = source.match(/\s*$/)?.[0] ?? "";
  return `${leading}${translated}${trailing}`;
}

function getLocale() {
  try {
    return normalizeLocale(window.localStorage.getItem(localeStorageKey));
  } catch {
    return "ro" as SiteLocale;
  }
}

function translateTextNode(node: Text, locale: SiteLocale) {
  const parent = node.parentElement;

  if (!parent || ignoredTags.has(parent.tagName) || parent.closest("[data-no-translate]")) {
    return;
  }

  const current = node.textContent ?? "";
  const previousTranslated = textNodeTranslated.get(node);
  let original = textNodeOriginals.get(node);

  if (!original || (current !== previousTranslated && current !== original)) {
    original = current;
    textNodeOriginals.set(node, original);
  }

  const key = original.trim().replace(/\s+/g, " ");

  if (!key) {
    return;
  }

  const nextValue = preserveSpacing(original, translateText(key, locale));
  textNodeTranslated.set(node, nextValue);

  if (current !== nextValue) {
    node.textContent = nextValue;
  }
}

function translateAttributes(element: Element, locale: SiteLocale) {
  if (element.closest("[data-no-translate]")) {
    return;
  }

  let originals = attrOriginals.get(element);

  if (!originals) {
    originals = new Map();
    attrOriginals.set(element, originals);
  }

  translatableAttributes.forEach((attribute) => {
    const current = element.getAttribute(attribute);

    if (!current) {
      return;
    }

    if (!originals.has(attribute)) {
      originals.set(attribute, current);
    }

    const original = originals.get(attribute) ?? current;
    const nextValue = translateText(original.trim().replace(/\s+/g, " "), locale);

    if (current !== nextValue) {
      element.setAttribute(attribute, nextValue);
    }
  });
}

function walkAndTranslate(root: ParentNode, locale: SiteLocale) {
  if (root instanceof Element) {
    translateAttributes(root, locale);
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let node = walker.nextNode();

  while (node) {
    if (node.nodeType === Node.TEXT_NODE) {
      translateTextNode(node as Text, locale);
    } else if (node instanceof Element) {
      translateAttributes(node, locale);
    }

    node = walker.nextNode();
  }
}

export function SiteTranslator() {
  useEffect(() => {
    let currentLocale = "ro" as SiteLocale;
    let started = false;

    const applyLocale = (locale: SiteLocale) => {
      currentLocale = locale;
      document.documentElement.lang = locale;
      walkAndTranslate(document.body, locale);
    };

    const observer = new MutationObserver((mutations) => {
      if (!started) {
        return;
      }

      mutations.forEach((mutation) => {
        if (mutation.type === "characterData" && mutation.target instanceof Text) {
          translateTextNode(mutation.target, currentLocale);
          return;
        }

        mutation.addedNodes.forEach((node) => {
          if (node instanceof Text) {
            translateTextNode(node, currentLocale);
          } else if (node instanceof Element) {
            walkAndTranslate(node, currentLocale);
          }
        });

        if (mutation.type === "attributes" && mutation.target instanceof Element) {
          translateAttributes(mutation.target, currentLocale);
        }
      });
    });

    const startTranslator = () => {
      if (started) {
        return;
      }

      started = true;
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: translatableAttributes,
        characterData: true,
        childList: true,
        subtree: true,
      });
    };

    const handleLocaleChange = (event: Event) => {
      startTranslator();
      const detail = event instanceof CustomEvent ? normalizeLocale(event.detail?.locale) : getLocale();
      applyLocale(detail);
    };

    window.addEventListener(localeChangeEvent, handleLocaleChange);
    window.addEventListener("storage", handleLocaleChange);

    if (document.readyState === "complete") {
      startTranslator();
    } else {
      window.addEventListener("load", startTranslator, { once: true });
    }

    return () => {
      window.removeEventListener("load", startTranslator);
      observer.disconnect();
      window.removeEventListener(localeChangeEvent, handleLocaleChange);
      window.removeEventListener("storage", handleLocaleChange);
    };
  }, []);

  return null;
}
