import i18n from "@/i18n";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

export type LanguageType = "en_us" | "pt_br"

interface LanguagesContextData {
  currentLanguage: LanguageType,
  changeLanguage: (language: LanguageType) => void;
}

export const LanguagesContext = createContext<LanguagesContextData>(
  {} as LanguagesContextData
)

export function LanguagesProvider({ children }: { children: ReactNode; }) {
  const [currentLanguage, setCurrentLanguage] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("language") as LanguageType || "en_us"
      : "en_us"
  )

  function changeLanguage(language: "en_us" | "pt_br") {
    setCurrentLanguage(language)
    document.querySelector("html")?.setAttribute("lang", 
      language === "pt_br"
        ? "pt-br"
        : "en"
    )
    i18n.changeLanguage(language)
    localStorage.setItem("language", language)
  }

  useEffect(() => {
    changeLanguage(currentLanguage)
  }, [])

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