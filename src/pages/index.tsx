import { GetStaticProps } from "next";
import Head from "next/head";

import { api } from "@/services/api";

import HeroesList from "@/components/heroes-list";

import Divider from "@/components/divider";
import Footer from "@/components/footer";
import { HeroProps } from "@/types/hero";
import HeaderTitle from "@/components/header-title";
import { useState, ChangeEvent, useEffect } from "react";
import LanguageSwitch from "@/components/language-switch";
import { useLanguages } from "@/hooks/useLanguages";
import { useTranslation } from "react-i18next";
import { useHeroes } from "@/hooks/useHeroes";
import ThemeSwitch from "@/components/theme-switch";

export default function Home() {
  const [search, setSearch] = useState('');
  const [heroes, setHeroes] = useState<HeroProps[]>([])
  const { currentLanguage } = useLanguages()
  const { t } = useTranslation();
  const { getAllHeroes } = useHeroes()

  useEffect(() => {
    async function getAndSetAllHeroes() {
      const allHeroesResponse = await getAllHeroes({language: currentLanguage })
      setHeroes(allHeroesResponse)
    }
    getAndSetAllHeroes()
  }, [currentLanguage])

  useEffect(() => {
    const url = new URL(window.location.toString());
    const searchParam = url.searchParams.get('search') ?? '';
    setSearch(searchParam);
  }, []);

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString())
    url.searchParams.set('search', search)
    window.history.pushState({}, "", url)

    setSearch(search)
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentSearch(event.target.value)
  }

  const filteredHeroes = search !== ''
    ? heroes.filter(hero => hero.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : heroes
  
  return (
    <>
      <Head>
        <title>Home | Overwatch Heroes</title>
      </Head>
      <div className="
        w-full px-1.5 py-3
        sm-480:px-3
        md:px-5
        lg:max-w-5xl lg:py-6
        xl:max-w-6xl
        2xl:max-w-7xl
        min-h-screen mx-auto flex flex-col gap-4"
      >
        <header className="flex flex-col gap-2 sm:gap-0 sm:flex-row items-center justify-between">
          <HeaderTitle className="text-3xl sm:text-4xl" />

          <div className="flex items-center gap-2">
            <div className="
              sm:min-w-64 md:min-w-96 flex px-3 py-1 rounded-xl bg-white dark:bg-slate-700
              border border-slate-400 dark:border-slate-500 focus-within:border-slate-700 dark:focus-within:border-slate-200"
            >
              <input
                type="text"
                onChange={handleSearch}
                value={search}
                placeholder={t("Search.placeholder")}
                className="focus:outline-none w-full text-slate-700 dark:text-slate-200 bg-transparent"  
              />
            </div>

            <LanguageSwitch className="shrink-0" />

            <ThemeSwitch className="shrink-0" />
          </div>
        </header>

        <Divider />

        <main className="flex-1">
          <HeroesList heroes={filteredHeroes} className="grid-cols-1 sm-480:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" />
        </main>

        <Divider />

        <Footer />
      </div>
    </>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   var enUsHeroes: HeroProps[] = []
//   await api
//     .get<HeroProps[]>(`/heroes?locale=en-us`)
//     .then(response => { 
//       enUsHeroes = response.data
//     })

//   return {
//     props: {
//       enUsHeroes
//     },
//     revalidate: 60 * 60 * 24, //24 hours
//   }
// }