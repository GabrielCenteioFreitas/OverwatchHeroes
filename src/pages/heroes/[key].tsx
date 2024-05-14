import Divider from "@/components/divider";
import Footer from "@/components/footer";
import HeaderTitle from "@/components/header-title";
import HeroPortrait from "@/components/hero-portrait";
import HeroesList from "@/components/heroes-list";
import { api } from "@/services/api";
import { HeroProps } from "@/types/hero";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

interface AbilityProps {
  name: string;
  description: string;
  icon: string;
  video: {
    thumbnail: string;
    link: {
      webm: string;
    };
  };
}

interface DetailedHeroProps {
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

interface RoleProps {
  key: string;
  icon: string;
}

interface HeroComicsAndShortStoriesProps {
  [key: string]: string[];
}

interface HeroPageProps {
  hero: DetailedHeroProps;
  roles: RoleProps[];
  sameRoleHeroes: HeroProps[];
}

const HeroPage = ({ hero, roles, sameRoleHeroes }: HeroPageProps) => {
  const [currentAbility, setCurrentAbility] = useState<AbilityProps>(hero.abilities[0])
  
  useEffect(() => {
    setCurrentAbility(hero.abilities[0])
  }, [hero])

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
        <header>
          <HeaderTitle className="text-3xl" />
        </header>

        <Divider className="-mt-2" />

        <div className="flex-1 flex flex-col sm:flex-row gap-5">
          <aside className="max-w-80 h-fit mx-auto sm:mx-0 space-y-9">
            <section className="p-3 rounded-2xl border border-px border-slate-400">
              <HeroPortrait
                name={hero.name}
                portrait={hero.portrait}
                className="rounded-xl w-full h-auto 2xl:w-[296px]"
              />

              <Divider className="my-3" />

              <div className="grid gap-2 text-md leading-none">
                <div className="flex gap-1">
                  <h2 className="font-semibold">Name: </h2>
                  <span>{hero.name}</span>
                </div>

                <div className="flex gap-1">
                  <h2 className="font-semibold">Role: </h2>
                  <span className="capitalize">{hero.role}</span>
                </div>

                <div className="flex gap-1">
                  <h2 className="font-semibold">Location: </h2>
                  <span>{hero.location}</span>
                </div>
              </div>

              <Divider className="my-4" />

              <div className="
                grid grid-cols-3 gap-3 text-center p-2
                border border-px border-slate-400 rounded-xl shadow-sm
              ">
                <div className="flex flex-col gap-2 text-md">
                  <div>
                    <span className="font-semibold">Health</span>
                    <div className="w-full h-1 bg-gradient-to-r from-teal-500 to-green-400" />
                  </div>
                  <span>{hero.hitpoints.health}</span>
                </div>

                <div className="flex flex-col gap-2 text-md">
                  <div>
                    <span className="font-semibold">Armor</span>
                    <div className="w-full h-1 bg-gradient-to-r from-orange-300 to-orange-500" />
                  </div>
                  <span>{hero.hitpoints.armor}</span>
                </div>

                <div className="flex flex-col gap-2 text-md">
                  <div>
                    <span className="font-semibold">Shield</span>
                    <div className="w-full h-1 bg-gradient-to-r from-sky-400 to-blue-500" />
                  </div>
                  <span>{hero.hitpoints.shields}</span>
                </div>
              </div>
            </section>

            <section className="hidden sm:block">
              <h3 className="text-xl font-semibold">Other {hero.role} heroes</h3>
              <Divider className="opacity-50 mt-1 mb-3" />

              <HeroesList heroes={sameRoleHeroes.slice(0, 7)} className="grid-cols-1" />
            </section>
          </aside>

          <main className="flex-1">
            <section>
              <div className="flex gap-2">
                <h2 className="text-3xl font-bold">{hero.name}</h2>
                <div className="size-8 rounded-full bg-slate-400/75 p-1.5">
                  <img className="size-full object-cover" src={roleIcon} alt={hero.role} />
                </div>
              </div>
              <p className="text-sm text-justify lg:text-md">{hero.description}</p>
            </section>

            <section>
              <h3 className="mt-6 text-2xl font-bold">Abilities</h3>
              <Divider className="opacity-50 mt-1 mb-4" />
              <div>
                <div
                className={`grid gap-1`}
                style={{ gridTemplateColumns: `repeat(${hero.abilities.length}, 1fr)` }}
                >
                  {hero.abilities.map(ability => (
                    <button
                      key={ability.name}
                      className="grid gap-2 group"
                      onClick={() => handleChangeCurrentAbility(ability)}
                    >
                      <div className="grid gap-2 mx-auto self-start justify-items-center">
                        <div className={`
                          grid place-content-center size-12 2xl:size-20 rounded-full
                          
                          ${ability === currentAbility ? "bg-blue-500/90 group-hover:bg-blue-600/90" : "bg-slate-400/75 group-hover:bg-slate-500/75"}
                          ${hero.abilities.indexOf(ability) === 0 ? "p-0.5 2xl:p-2" : "p-2 2xl:p-4"}
                        `}>
                          <img src={ability.icon} alt={ability.name} />
                        </div>
                        <span className="hidden md:inline text-sm md:text-md font-medium">{ability.name}</span>
                      </div>
                      <div className={`w-full h-1 self-end ${ability.name === currentAbility.name ? "bg-blue-500 group-hover:bg-blue-600/90" : "bg-slate-400/75 group-hover:bg-slate-500/75" }`} />
                    </button>
                  ))}
                </div>
                <div className="mt-2 md:mt-1 space-y-2 md:space-y-0.5">
                  <div className="block md:hidden">
                    <span className="inline md:hidden text-lg font-semibold leading-none">{currentAbility.name}</span>
                    <p className="text-sm lg:text-md leading-none">{currentAbility.description}</p>
                  </div>
                  <video
                    src={currentAbility.video.link?.webm}
                    poster={currentAbility.video.thumbnail}
                    autoPlay
                    loop
                  />
                  <p className="hidden md:block text-sm lg:text-md">{currentAbility.description}</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="mt-3 text-2xl font-bold">Story</h3>
              <Divider className="opacity-50 mt-1 mb-3" />
              <p className="indent-2 lg:indent-4 text-justify text-sm lg:text-md">{hero.story.summary}</p>

              {hero.story.media && (
                <>
                  {hero.story.media.type === "video"
                  ? (
                    <div className="flex justify-center">
                      <iframe
                        src={(hero.story.media.link).replace(".be", "be.com/embed")}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className={`mt-2 w-full h-48 min-[400px]:h-56 sm-480:h-64 max-w-[35rem] max-h-[19.6875rem]`}
                      />
                    </div>
                  ) : (
                    <div className="mt-2 flex gap-1 overflow-x-scroll h-96 no-scrollbar">
                      {HeroComicsAndShortStories[hero.name.toLocaleLowerCase()].map(heroComicOrShortStory => 
                        <img key={heroComicOrShortStory} src={heroComicOrShortStory} />
                      )}
                    </div>
                  )}
                </>
              )}

              <div className="mt-2">
                {hero.story.chapters.map(chapter => 
                  <div className="grid" key={chapter.title}>
                    <h4 className="mt-3 text-xl font-semibold">{chapter.title}</h4>
                    <Divider className="mt-1 mb-3" />
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
      </div>
    </>
  );
}

export default HeroPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const key = params?.key;
  
  var hero = {} as DetailedHeroProps;
  await api
    .get<DetailedHeroProps>(`/heroes/${key}`)
    .then(response => 
      hero = response.data
    )
    
  var sameRoleHeroes: HeroProps[] = [];
  await api
    .get<HeroProps[]>(`/heroes/`)
    .then(response => 
      sameRoleHeroes = response.data.filter(sameRoleHero =>
        sameRoleHero.role === hero.role && sameRoleHero.name !== hero.name
      )
    )

  var roles: RoleProps[] = []
  await api
    .get<RoleProps[]>(`/roles`)
    .then(response => 
      roles = response.data
    )

  return {
    props: {
      hero,
      sameRoleHeroes,
      roles
    }
  }
}