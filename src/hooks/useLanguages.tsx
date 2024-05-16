import i18n from "@/i18n";
import { ReactNode, createContext, useContext, useState } from "react";

type LanguageType = "en_us" | "pt_br"

interface LanguagesContextData {
  currentLanguage: LanguageType,
  changeLanguage: (language: LanguageType) => void;
}

export const LanguagesContext = createContext<LanguagesContextData>(
  {} as LanguagesContextData
)

export function LanguagesProvider({ children }: { children: ReactNode; }) {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language as LanguageType)

  function changeLanguage(language: "en_us" | "pt_br") {
    setCurrentLanguage(language)
    document.querySelector("html")?.setAttribute("lang", 
      language === "pt_br"
        ? "pt-br"
        : "en"
    )
    i18n.changeLanguage(language)
  }

  return (
    <LanguagesContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguagesContext.Provider>
  )
}

export function useLanguages() {
  const context = useContext(LanguagesContext);

  return context;
}