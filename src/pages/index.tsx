import { GetStaticProps } from "next";
import Head from "next/head";

import { api } from "@/services/api";

import Header from "@/components/header";
import HeroesList from "@/components/heroes-list";

import Divider from "@/components/divider";
import Footer from "@/components/footer";
import { HeroProps } from "@/types/hero";

interface HomeProps {
  heroes: HeroProps[];
}

export default function Home({ heroes }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Overwatch Heroes</title>
      </Head>
      <div className="max-w-7xl min-h-screen mx-auto flex flex-col gap-4 py-6 text-slate-900">
        <Header />

        <Divider />

        <main className="flex-1">
          <HeroesList heroes={heroes} />
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