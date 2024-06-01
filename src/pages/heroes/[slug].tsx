import { GetServerSideProps } from "next";
import Head from "next/head";
import { startTransition, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Divider from "@/components/Divider";
import Footer from "@/components/Footer";
import LanguageSwitch from "@/components/LanguageSwitch";

import { useHeroes } from "@/hooks/useHeroes";
import { useLanguages } from "@/hooks/useLanguages";

import ColorThemeSwitch from "@/components/ColorThemeSwitch";
import Header from "@/components/Header/Header";
import { Aside } from "@/components/HeroPage/Aside/Aside";
import { Main } from "@/components/HeroPage/Main/Main";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import { rolesData } from "@/lib/roles";
import { HeroProps } from "@/types/hero";
import { useQuery } from "react-query";

export interface AbilityProps {
  name: string;
  description: string;
  icon: string;
  video: {
    thumbnail: string;
    link: {
      mp4: string;
      webm: string;
    };
  };
}

export interface StoryProps {
  summary: string;
  media: {
    type: string;
    link: string;
  } | null;
  chapters: {
    title: string;
    content: string;
    picture: string;
  }[]
}

export interface DetailedHeroProps {
  name: string;
  portrait: string;
  role: string;
  location: string;
  hitpoints: {
    health: number;
    armor: number;
    shields: number;
  };
  description: string;
  abilities: AbilityProps[];
  story: StoryProps;
}

export interface RoleProps {
  key: string;
  icon: string;
}

interface HeroPageProps {
  slug: string
}

const HeroPage = ({ slug }: HeroPageProps) => {
  const [hero, setHero] = useState<DetailedHeroProps>({} as DetailedHeroProps)
  const [sameRoleHeroes, setSameRoleHeroes] = useState<HeroProps[]>([])
  const [roles, setRoles] = useState<RoleProps[]>([])

  const { currentLanguage } = useLanguages();
  const { getHero, getAllHeroes, getRoles } = useHeroes();

  const allHeroesResponse = useQuery(
    ['heroes', currentLanguage],
    async () => {
      const response = await getAllHeroes({ language: currentLanguage });
      return response
    },
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  );
  const heroResponse = useQuery(
    ['hero', currentLanguage, slug],
    async () => {
      const response = await getHero({ key: slug, language: currentLanguage });
      return response
    },
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  );
  const rolesResponse = useQuery(
    ['roles', currentLanguage],
    async () => {
      const response = await getRoles({ language: currentLanguage });
      return response
    },
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  );

  const [ready, setReady] = useState(false);
  useEffect(() => {
    startTransition(() => {
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if(heroResponse.data) {
      setHero(heroResponse.data)
      
      if (allHeroesResponse.data) {
        const filteredAllHeroes = 
          allHeroesResponse.data.filter(sameRoleHero =>
            sameRoleHero.role === heroResponse.data.role
            && sameRoleHero.name !== heroResponse.data.name
          )
        
        setSameRoleHeroes(filteredAllHeroes)
      }
    }
  }, [heroResponse.data])

  useEffect(() => {
    if (!rolesResponse || !rolesResponse.data) {
      setRoles(rolesData)
    } else {
      setRoles(rolesResponse.data)
    }
  }, [rolesResponse.data])

  const roleIcon = roles.find(role => role.key === hero.role)?.icon

  return (
    <>
      <Head>
        <title>{hero.name} | Overwatch Heroes</title>

        <meta
          name="description"
          content={
            currentLanguage === "pt_br"
            ? `Página contendo informações sobre a personagem ${hero.name} do jogo Overwatch`
            : `Page containing information about the Overwatch character ${hero.name}`
          }
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
          {!heroResponse.isLoading ? (
            <>
              <Header>
                <div className="flex gap-1 sm:gap-2 items-center">
                  <LanguageSwitch className="size-7 md:size-8 shrink-0" />

                  <ColorThemeSwitch className="size-7 md:size-8 shrink-0" />
                </div>
              </Header>

              <Divider className="-mt-3 sm-480:-mt-2" />

              <div className="flex-1 flex flex-col sm:flex-row gap-5">
                <Aside
                  hero={hero}
                  ready={ready}
                  sameRoleHeroes={sameRoleHeroes}
                  isLoading={allHeroesResponse.isLoading}
                />

                <Main
                  hero={hero}
                  roleIcon={roleIcon as string}
                  abilities={hero.abilities}
                />
              </div>

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

export default HeroPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug

  return {
    props: {
      slug
    }
  }
}