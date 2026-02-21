import { DetailedHeroProps } from "@/pages/heroes/[slug]";
import { HeroProps } from "@/types/hero";
import { useEffect, useRef, useState } from "react";
import { HeroInfoSection } from "./HeroInfoSection/HeroInfoSection";
import { OtherHeroesSection } from "./OtherHeroesSection/OtherHeroesSection";
import { twMerge } from "tailwind-merge";

interface AsideProps {
  hero: DetailedHeroProps;
  ready: boolean;
  sameRoleHeroes: HeroProps[];
  isLoading: boolean;
}

export const Aside = ({ hero, ready, sameRoleHeroes, isLoading }: AsideProps) => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!asideRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = asideRef.current;
      setIsAtBottom(scrollHeight - scrollTop - clientHeight < 10);
    };

    const aside = asideRef.current;
    aside?.addEventListener('scroll', handleScroll);
    return () => aside?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside ref={asideRef} className={twMerge(
      "max-w-80 mx-auto sm:mx-0 space-y-6 sm:overflow-y-scroll sm:no-scrollbar",
      !isAtBottom && "mask-none sm:mask-fade-bottom"
    )}>
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