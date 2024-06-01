import Head from "next/head";

import HeroesList from "@/components/HeroesList";

import Divider from "@/components/Divider";
import Footer from "@/components/Footer";
import { HeroProps } from "@/types/hero";
import { useState, ChangeEvent, useEffect } from "react";
import LanguageSwitch from "@/components/LanguageSwitch";
import { useLanguages } from "@/hooks/useLanguages";
import { useTranslation } from "react-i18next";
import { useHeroes } from "@/hooks/useHeroes";
import ColorThemeSwitch from "@/components/ColorThemeSwitch";
import { useQuery } from "react-query";
import Header from "@/components/Header/Header";
import SearchInput from "@/components/Header/SearchInput";
import LoadingScreen from "@/components/Loading/LoadingScreen";

export default function Home() {
  const [search, setSearch] = useState('');
  const [heroes, setHeroes] = useState<HeroProps[]>([])
  const { currentLanguage } = useLanguages()
  const { t } = useTranslation();
  const { getAllHeroes } = useHeroes()

  const { data, isLoading } = useQuery(
    ['heroes', currentLanguage],
    async () => {
      const response = await getAllHeroes({ language: currentLanguage });
      return response
    },
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  );

  useEffect(() => {
    if (!data) {
      return
    }
    setHeroes(data)
  }, [data])

  useEffect(() => {
    const url = new URL(window.location.toString());
    const searchParam = url.searchParams.get('search') ?? '';
    setSearch(searchParam);
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value

    const url = new URL(window.location.toString())
    url.searchParams.set('search', search)
    window.history.pushState({}, "", url)

    setSearch(search)
  }

  const filteredHeroes = search !== ''
    ? heroes.filter(hero => hero.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : heroes
  
  return (
    <>
      <Head>
        <title>Home | Overwatch Heroes</title>

        <meta
          name="description"
          content={t("Home.metaDescription")}
          key="desc"
        />
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
        {!isLoading ? (
          <>
            <Header className="flex-col gap-2 sm:gap-0 sm:flex-row">
              <div className="flex items-center gap-2">
                <SearchInput search={search} handleSearch={handleSearch} />

                <LanguageSwitch className="shrink-0" />

                <ColorThemeSwitch className="shrink-0" />
              </div>
            </Header>

            <Divider />

            <main className="flex-1">
              <HeroesList heroes={filteredHeroes} className="grid-cols-1 sm-480:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" />
            </main>

            <Divider />

            <Footer />
          </>
        ) : (
          <LoadingScreen />
        )}
      </div>
    </>
  );
}
