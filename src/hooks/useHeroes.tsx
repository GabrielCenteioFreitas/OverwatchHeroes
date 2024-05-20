import i18n from "@/i18n";
import { DetailedHeroProps, RoleProps } from "@/pages/heroes/[slug]";
import { api } from "@/services/api";
import { HeroProps } from "@/types/hero";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useLanguages } from "./useLanguages";
import { UseQueryResult, useQuery } from "react-query";

type LanguageType = "en_us" | "pt_br"

interface getAllHeroesProps {
  language: LanguageType;
}
interface getHeroProps {
  key: string;
  language: LanguageType;
}
interface getRolesProps {
  language: LanguageType;
}

interface HeroesContextData {
  getAllHeroes: ({language}: getAllHeroesProps) => Promise<HeroProps[]>;
  getHero: ({key, language}: getHeroProps) => Promise<DetailedHeroProps>;
  getRoles: ({language}: getRolesProps) => Promise<RoleProps[]> | null;
}

export const HeroesContext = createContext<HeroesContextData>(
  {} as HeroesContextData
)

export function HeroesProvider({ children }: { children: ReactNode; }) {
  const getAllHeroes = async ({ language }: getAllHeroesProps) => {
    const response = await api
      .get(`/heroes?locale=${language.replace("_", "-")}`);
    return response.data;
  }

  const getHero = async ({ key, language }: getHeroProps) => {
    const response = await api
      .get(`/heroes/${key}?locale=${language.replace("_", "-")}`)
    return response.data
  }

  const getRoles = async ({ language }: getRolesProps) => {
    try {
      const response = await api
        .get(`/roles?locale=${language.replace("_", "-")}`)
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