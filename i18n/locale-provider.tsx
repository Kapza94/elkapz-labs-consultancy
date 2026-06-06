"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { dictionaries } from "./dictionaries";
import type { Dictionary, Locale } from "./types";

const STORAGE_KEY = "elkapz-locale";

interface LocaleContextValue {
  locale: Locale;
  dictionary: Dictionary;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function detectLocale(): Locale {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "sr-Latn") {
    return stored;
  }
  return window.navigator.language.toLowerCase().startsWith("sr")
    ? "sr-Latn"
    : "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    queueMicrotask(() => setLocaleState(detectLocale()));
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    const syncMetadata = () => {
      document.title = dictionaries[locale].meta.title;

      let description = document.querySelector<HTMLMetaElement>(
        'meta[name="description"]',
      );
      if (!description) {
        description = document.createElement("meta");
        description.name = "description";
        document.head.appendChild(description);
      }
      description.content = dictionaries[locale].meta.description;

      const socialMetadata = [
        ["property", "og:title", dictionaries[locale].meta.title],
        ["property", "og:description", dictionaries[locale].meta.description],
      ] as const;
      for (const [attribute, key, content] of socialMetadata) {
        let meta = document.querySelector<HTMLMetaElement>(
          `meta[${attribute}="${key}"]`,
        );
        if (!meta) {
          meta = document.createElement("meta");
          meta.setAttribute(attribute, key);
          document.head.appendChild(meta);
        }
        meta.content = content;
      }
    };

    syncMetadata();
    const timeoutId = window.setTimeout(syncMetadata, 50);
    return () => window.clearTimeout(timeoutId);
  }, [locale]);

  const setLocale = (nextLocale: Locale) => {
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    setLocaleState(nextLocale);
  };

  const value = useMemo(
    () => ({ locale, dictionary: dictionaries[locale], setLocale }),
    [locale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
