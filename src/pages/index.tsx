import { GetStaticProps } from "next";
import Head from "next/head";

import { api } from "@/services/api";

import Header from "@/components/header";
import HeroesList from "@/components/heroes-list";

import Divider from "@/components/divider";
import Footer from "@/components/footer";


interface HeroProps {
  key: string;
  name: string;
  role: string;
  portrait: string;
}

interface HomeProps {
  heroes: HeroProps[];
}

export default function Home({ heroes }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Overwatch Heroes</title>
      </Head>
      <div className="max-w-7xl mx-auto grid gap-4 py-6 text-slate-900">
        <Header />

        <Divider />

        <main>
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