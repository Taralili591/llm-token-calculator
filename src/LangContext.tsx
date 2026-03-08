import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { translations } from "./i18n";
import type { Lang, T } from "./i18n";

const STORAGE_KEY = "app_lang";

function getSavedLang(): Lang {
  const v = localStorage.getItem(STORAGE_KEY);
  return v === "en" ? "en" : "zh";
}

interface LangContextValue {
  lang: Lang;
  t: T;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue>(null!);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getSavedLang);

  function toggle() {
    const next: Lang = lang === "zh" ? "en" : "zh";
    setLang(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <LangContext.Provider value={{ lang, t: translations[lang] as T, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
