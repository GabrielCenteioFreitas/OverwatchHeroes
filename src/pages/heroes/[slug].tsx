import { startTransition, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GetServerSideProps } from "next";
import Head from "next/head";

import Divider from "@/components/divider";
import Footer from "@/components/footer";
import HeaderTitle from "@/components/header-title";
import HeroPortrait from "@/components/hero-portrait";
import HeroesList from "@/components/heroes-list";
import LanguageSwitch from "@/components/language-switch";
import VideoToGifComponent from "@/components/video-to-gif-component";

import { useHeroes } from "@/hooks/useHeroes";
import { useLanguages } from "@/hooks/useLanguages";

import { HeroProps } from "@/types/hero";
import ColorThemeSwitch from "@/components/color-theme-switch";
import { useQuery } from "react-query";
import LoadingIcon from "@/components/loading-icon";
import Header from "@/components/header";
import LoadingScreen from "@/components/loading-screen";


interface AbilityProps {
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
  story: {
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
  };
}

export interface RoleProps {
  key: string;
  icon: string;
}

interface HeroComicsAndShortStoriesProps {
  [key: string]: string[];
}

interface HeroPageProps {
  slug: string
}

const HeroPage = ({ slug }: HeroPageProps) => {
  const [hero, setHero] = useState<DetailedHeroProps>({} as DetailedHeroProps)
  const [sameRoleHeroes, setSameRoleHeroes] = useState<HeroProps[]>([])
  const [roles, setRoles] = useState<RoleProps[]>([])
  const [currentAbility, setCurrentAbility] = useState<AbilityProps>({} as AbilityProps)

  const { currentLanguage } = useLanguages();
  const { t } = useTranslation();
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
      setCurrentAbility(heroResponse.data.abilities?.[0])
      
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
      setRoles([
        {
          key: "damage",
          icon: "https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/bltc1d840ba007f88a8/62ea89572fdd1011027e605d/Damage.svg?format=webply&quality=90"
        },
        {
          key: "tank",
          icon: "https://blz-contentstack-images.akamaized.net/v3/assets/blt2477dcaf4ebd440c/bltf0889daa1ef606db/6504cff74d2a764cb7973991/Tank.svg?format=webply&quality=90"
        },
        {
          key: "support",
          icon: "https://blz-contentstack-images.akamaized.net/v3/assets/blt2477dcaf4ebd440c/blt3ccd5df488163b33/6504cff7fc2ae4d7c50445c4/Support.svg?format=webply&quality=90"
        }
      ])
    } else {
      setRoles(rolesResponse.data)
    }
  }, [rolesResponse.data])

  const HeroComicsAndShortStories: HeroComicsAndShortStoriesProps = {
   "mercy": [
    "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt1f3861c6b201b898/5dd464a30386806c8e4e0f17/shortstory-thumb_Mercy_EN.jpg?auto=webp",
   ],
   "pharah": [
    "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blte512f466a740534e/5d03c624cf7aa6330ac673c2/comic-thumb_5-MissionStatement_EN.jpg?auto=webp",
   ],
   "reaper": [
    "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt12d35bc951793fe2/62102027a6bb9250d3e44d29/OW_ReaperChallenge_ShortStoryCover_enUS.png?auto=webp",
   ],
   "symmetra": [
    "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt9a1b9a7d0533ef9a/5faed285ae5aee5796129383/shortstory-thumb-symmetra_enUS.jpg?auto=webp",
   ],
   "torbjorn": [
    "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltc1bc256e4ad6a806/5d03c68b7b48be290a7f976d/comic-thumb_6-Destroyer_PT.jpg?auto=webp",
   ],
   "tracer": [
    "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt2380a106b55f0ce7/5f5a8f861d800d48203ea9c5/comic-thumb-LondonCalling_BR.jpg?auto=webp",
    "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltfde5efc8f21da7f2/5f84cb50cdb10a0cf7444cc8/comic-thumb-LondonCalling2_BR.jpg?auto=webp",
    "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blte40644de66febe11/5fbea455ae5aee57961296ea/comic-thumb-LondonCalling3_BR.jpg?auto=webp",
    "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt25cc1d3d423391c3/5ffce60af5dbf40edb11d4c6/OVRWTR_i4_BR.jpg?auto=webp",
    "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt095dff2ef2fc65b8/602ed632c484333be943dedf/OW_1.5_BR.jpg?auto=webp",
   ],
   "zenyatta": [
    "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt9a1b9a7d0533ef9a/5faed285ae5aee5796129383/shortstory-thumb-symmetra_enUS.jpg?auto=webp",
   ],
  }
  const roleIcon = roles.find(role => role.key === hero.role)?.icon

  const handleChangeCurrentAbility = (ability: AbilityProps) => {
    setCurrentAbility(ability)
  }

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
                <aside className="max-w-80 h-fit mx-auto sm:mx-0 space-y-9">
                  <section className="p-3 rounded-2xl border border-slate-400 dark:border-slate-600" aria-label={t("HeroPage.heroInfo.ariaLabel")}>
                    <HeroPortrait
                      name={t(`HeroPage.heroInfo.name`)}
                      portrait={hero.portrait}
                      className="rounded-xl w-full h-auto 2xl:w-[296px]"
                    />

                    <Divider className="my-3" />

                    <div className="grid gap-2 text-base leading-none">
                      <div className="flex gap-1">
                        <h2 className="font-semibold capitalize">{t(`HeroPage.heroInfo.name`)}: </h2>
                        <span>{hero.name}</span>
                      </div>

                      <div className="flex gap-1">
                        <h2 className="font-semibold capitalize">{t(`HeroPage.heroInfo.role`)}: </h2>
                        <span className="capitalize">{t(`Roles.${hero.role}`)}</span>
                      </div>

                      <div className="flex gap-1">
                        <h2 className="font-semibold capitalize">{t(`HeroPage.heroInfo.location`)}: </h2>
                        <span>{hero.location}</span>
                      </div>
                    </div>

                    <Divider className="my-4" />

                    <div className="
                      grid grid-cols-3 gap-3 text-center p-2
                      border border-slate-400 dark:border-slate-600 rounded-xl shadow-sm
                    ">
                      <div className="flex flex-col gap-2 text-base">
                        <div>
                          <span className="font-semibold capitalize">{t(`HeroPage.heroInfo.hitpoints.health`)}</span>
                          <div className="w-full h-1 bg-gradient-to-r from-teal-500 to-green-400"/>
                        </div>
                        <span>{hero.hitpoints?.health}</span>
                      </div>

                      <div className="flex flex-col gap-2 text-base">
                        <div>
                          <span className="font-semibold capitalize">{t(`HeroPage.heroInfo.hitpoints.armor`)}</span>
                          <div className="w-full h-1 bg-gradient-to-r from-orange-300 to-orange-500 dark:from-orange-500 dark:to-orange-700" />
                        </div>
                        <span>{hero.hitpoints?.armor}</span>
                      </div>

                      <div className="flex flex-col gap-2 text-base">
                        <div>
                          <span className="font-semibold capitalize">{t(`HeroPage.heroInfo.hitpoints.shield`)}</span>
                          <div className="w-full h-1 bg-gradient-to-r from-sky-400 to-blue-500 dark:from-sky-600 dark:to-blue-700" />
                        </div>
                        <span>{hero.hitpoints?.shields}</span>
                      </div>
                    </div>
                  </section>

                  <section className="hidden sm:block" aria-label={t("HeroPage.otherHeroes.ariaLabel")}>
                    <h3 className="text-xl font-semibold">
                      {ready && (
                        currentLanguage === "pt_br"
                          ? `Outros heróis de ${t(`Roles.${hero.role}`)}`
                          : `Other ${hero.role} heroes`
                      )}
                    </h3>
                    <Divider className="opacity-50 mt-1 mb-3" />

                    {!allHeroesResponse.isLoading ? (
                      <HeroesList heroes={sameRoleHeroes.slice(0, 7)} className="grid-cols-1" />
                    ) : (
                      <div className="w-full flex justify-center pt-4">
                        <LoadingIcon className="size-1/6" />
                      </div>
                    )}
                  </section>
                </aside>

                <main className="flex-1" aria-label={t("HeroPage.aboutHero.ariaLabel")}>
                  <section>
                    <div className="flex gap-2">
                      <h2 className="text-3xl font-bold">{hero.name}</h2>
                      <div className="size-8 rounded-full bg-slate-400/75 dark:bg-gray-700 p-1.5">
                        <img className="size-full object-cover" src={roleIcon} alt={hero.role} />
                      </div>
                    </div>
                    <p className="text-sm text-justify lg:text-base">{hero.description}</p>
                  </section>

                  <section>
                    <h3 className="mt-6 text-2xl font-bold capitalize">{t(`HeroPage.aboutHero.abilities.title`)}</h3>
                    <Divider className="opacity-50 mt-1 mb-4" />
                    <div>
                      <div
                      className={`grid gap-1`}
                      style={{ gridTemplateColumns: `repeat(${hero.abilities?.length}, 1fr)` }}
                      >
                        {hero.abilities?.map(ability => (
                          <button
                            key={ability.icon}
                            aria-label={t('HeroPage.aboutHero.abilities.ariaLabel')}
                            className="grid gap-2 group"
                            onClick={() => handleChangeCurrentAbility(ability)}
                          >
                            <div className="grid gap-2 mx-auto self-start justify-items-center">
                              <div className={`
                                grid place-content-center size-12 2xl:size-20 rounded-full
                                
                                ${ability === currentAbility ? "bg-blue-500 dark:bg-blue-600" : "bg-slate-400/75 dark:bg-gray-700 group-hover:bg-slate-500/75 dark:group-hover:bg-slate-600"}
                                ${hero.abilities.indexOf(ability) === 0 ? "p-0.5 2xl:p-2" : "p-2 2xl:p-4"}
                              `}>
                                <img src={ability.icon} alt={ability.name} />
                              </div>
                            </div>
                            <div className={`w-full h-1 self-end ${ability.name === currentAbility?.name ? "bg-blue-500 dark:bg-blue-600" : "bg-slate-400/75 dark:bg-gray-700 group-hover:bg-slate-500/75 dark:group-hover:bg-slate-600" }`} />
                          </button>
                        ))}
                      </div>
                      <div className="mt-2 space-y-2">
                        <div className="md:space-y-0.5">
                          <span className="text-lg md:text-xl font-semibold leading-none">
                            {currentAbility?.name}
                          </span>
                          <p className="text-sm lg:text-base leading-none">
                            {currentAbility?.description}
                          </p>
                        </div>
                        <VideoToGifComponent
                          src={currentAbility?.video?.link.mp4}
                          poster={currentAbility?.video?.thumbnail}
                          name={currentAbility.name}
                        />
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="mt-3 text-2xl font-bold capitalize">{t(`HeroPage.aboutHero.story`)}</h3>
                    <Divider className="opacity-50 mt-1 mb-3" />
                    <p className="indent-2 lg:indent-4 text-justify text-sm lg:text-base">{hero.story?.summary}</p>

                    {hero.story?.media && (
                      <>
                        {hero.story.media.type === "video"
                        ? (
                          <div className="flex justify-center">
                            <iframe
                              src={(hero.story.media.link).replace(".be", "be.com/embed")}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                              className={`mt-2 w-full h-48 min-[400px]:h-56 sm-480:h-64 max-w-[35rem] lg:h-[19.6875rem]`}
                            />
                          </div>
                        ) : (
                          <div className="mt-2 flex gap-1 overflow-x-scroll h-96 no-scrollbar">
                            {HeroComicsAndShortStories[hero.name.toLocaleLowerCase()].map(heroComicOrShortStory => 
                              <img key={heroComicOrShortStory} src={heroComicOrShortStory} alt={heroComicOrShortStory} />
                            )}
                          </div>
                        )}
                      </>
                    )}

                    <div className="mt-2">
                      {hero.story?.chapters.map(chapter => 
                        <div className="grid" key={chapter.title}>
                          <h4 className="mt-3 text-xl font-semibold">{chapter.title}</h4>
                          <Divider className="opacity-50 mt-1 mb-3" />
                          <div className="grid gap-3 items-center justify-items-center">
                            <p className={`
                              indent-2 lg:indent-4 text-justify text-sm lg:text-base
                            `}>
                              {chapter.content}
                            </p>
                            <img
                              className={`w-full max-w-[40rem]`}
                              src={chapter.picture}
                              alt={chapter.title}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                </main>
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