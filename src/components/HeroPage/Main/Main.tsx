import { AbilityProps, DetailedHeroProps } from "@/pages/heroes/[slug]";
import { t } from "i18next";
import { AbilitiesSection } from "./AbilitiesSection/AbilitiesSection";
import { AboutHeroSection } from "./AboutHeroSection/AboutHeroSection";
import { StorySection } from "./StorySection/StorySection";

interface MainProps {
  hero: DetailedHeroProps;
  roleIcon: string;
  abilities: AbilityProps[];
}

export const Main = ({ hero, roleIcon, abilities }: MainProps) => {
  return (
    <main className="flex-1" aria-label={t("HeroPage.aboutHero.ariaLabel")}>
      <AboutHeroSection hero={hero} roleIcon={roleIcon} />

      <AbilitiesSection abilities={abilities} />

      <StorySection name={hero.name} story={hero.story} />
    </main>
  );
}
