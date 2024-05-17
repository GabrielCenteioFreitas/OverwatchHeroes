import i18n from "@/i18n";
import { DetailedHeroProps, RoleProps } from "@/pages/heroes/[slug]";
import { api } from "@/services/api";
import { HeroProps } from "@/types/hero";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useLanguages } from "./useLanguages";

type LanguageType = "en_us" | "pt_br"

interface HeroesContextData {
  getAllHeroes: ({language}: {language: LanguageType}) => Promise<HeroProps[]>;
  getHero: ({key, language}: {key: string; language: LanguageType}) => Promise<DetailedHeroProps>;
  getRoles: ({language}: {language: LanguageType}) => Promise<RoleProps[] | null>;
}

export const HeroesContext = createContext<HeroesContextData>(
  {} as HeroesContextData
)

export function HeroesProvider({ children }: { children: ReactNode; }) {
  async function getAllHeroes({language}: {language: LanguageType}) {
    const response = await api
      .get<HeroProps[]>(`/heroes?locale=${language.replace("_", "-")}`)
    return response.data
  }

  async function getHero({key, language}: {key: string; language: LanguageType}) {
    const response = await api
      .get<DetailedHeroProps>(`/heroes/${key}?locale=${language.replace("_", "-")}`)
    return response.data
  }

  async function getRoles({language}: {language: LanguageType}) {
    try {
      const response = await api
        .get<RoleProps[]>(`/roles?locale=${language.replace("_", "-")}`)
      return response.data
    } catch {
      return null
    }
  }

  return (
    <HeroesContext.Provider value={{ getAllHeroes, getHero, getRoles }}>
      {children}
    </HeroesContext.Provider>
  )
}

export function useHeroes() {
  const context = useContext(HeroesContext);

  return context;
}