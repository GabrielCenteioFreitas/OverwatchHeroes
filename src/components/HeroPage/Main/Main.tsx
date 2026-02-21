import { AbilityProps, DetailedHeroProps } from "@/pages/heroes/[slug]";
import { t } from "i18next";
import { useEffect, useRef, useState } from "react";
import { AbilitiesSection } from "./AbilitiesSection/AbilitiesSection";
import { AboutHeroSection } from "./AboutHeroSection/AboutHeroSection";
import { StorySection } from "./StorySection/StorySection";
import { twMerge } from "tailwind-merge";

interface MainProps {
  hero: DetailedHeroProps;
  roleIcon: string;
  abilities: AbilityProps[];
}

export const Main = ({ hero, roleIcon, abilities }: MainProps) => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!mainRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = mainRef.current;
      setIsAtBottom(scrollHeight - scrollTop - clientHeight < 10);
    };

    const main = mainRef.current;
    main?.addEventListener('scroll', handleScroll);
    return () => main?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main
      ref={mainRef}
      className={twMerge(
        "flex-1 sm:overflow-y-scroll sm:no-scrollbar",
        !isAtBottom && "mask-none sm:mask-fade-bottom"
      )}
      aria-label={t("HeroPage.aboutHero.ariaLabel")}
    >
      <AboutHeroSection hero={hero} roleIcon={roleIcon} />

      <AbilitiesSection abilities={abilities} />

      <StorySection name={hero.name} story={hero.story} />
    </main>
  );
}
