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
    ? heroes.filter(hero => hero.key.includes(search.toLocaleLowerCase()))
    : heroes
  
  return (
    <>
      <Head>
        <title>Home | Overwatch Heroes</title>
      </Head>
      <div className="max-w-7xl min-h-screen mx-auto flex flex-col gap-4 py-6 text-slate-900">
        <header className="flex items-center justify-between">
          <HeaderTitle />
          
          <div className="
            min-w-96 flex px-3 py-1 rounded-xl bg-white
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
          <HeroesList heroes={filteredHeroes} />
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