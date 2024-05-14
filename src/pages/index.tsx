import { GetStaticProps } from "next";
import Head from "next/head";

import { api } from "@/services/api";

import HeroesList from "@/components/heroes-list";

import Divider from "@/components/divider";
import Footer from "@/components/footer";
import { HeroProps } from "@/types/hero";
import HeaderTitle from "@/components/header-title";
import { useState, ChangeEvent, useEffect } from "react";

interface HomeProps {
  heroes: HeroProps[];
}

export default function Home({ heroes }: HomeProps) {
  const [search, setSearch] = useState('');

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
        min-h-screen mx-auto flex flex-col gap-4 text-slate-900"
      >
        <header className="flex flex-col gap-2 sm:gap-0 sm:flex-row items-center justify-between">
          <HeaderTitle className="text-3xl sm:text-4xl" />
          
          <div className="
            sm:min-w-64 md:min-w-96 flex px-3 py-1 rounded-xl bg-white
            border border-px border-slate-400 focus-within:border-slate-700"
          >
            <input
              type="text"
              onChange={handleSearch}
              value={search}
              placeholder="Search for a hero"
              className="focus:outline-none w-full text-slate-700"  
            />
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

export const getStaticProps: GetStaticProps = async () => {
  var heroes: HeroProps[] = []
  await api
    .get<HeroProps[]>(`/heroes`)
    .then(response => { 
      heroes = response.data
    })

  return {
    props: {
      heroes
    }
  }
}