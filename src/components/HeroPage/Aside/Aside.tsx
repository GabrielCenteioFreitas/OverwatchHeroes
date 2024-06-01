import { DetailedHeroProps } from "@/pages/heroes/[slug]";
import { HeroProps } from "@/types/hero";
import { HeroInfoSection } from "./HeroInfoSection/HeroInfoSection";
import { OtherHeroesSection } from "./OtherHeroesSection/OtherHeroesSection";

interface AsideProps {
  hero: DetailedHeroProps;
  ready: boolean;
  sameRoleHeroes: HeroProps[];
  isLoading: boolean;
}

export const Aside = ({ hero, ready, sameRoleHeroes, isLoading }: AsideProps) => {
  return (
    <aside className="max-w-80 h-fit mx-auto sm:mx-0 space-y-9">
      <HeroInfoSection hero={hero} />

      <OtherHeroesSection
        role={hero.role}
        sameRoleHeroes={sameRoleHeroes}
        ready={ready}
        isLoading={isLoading}
      />
    </aside>
  );
}