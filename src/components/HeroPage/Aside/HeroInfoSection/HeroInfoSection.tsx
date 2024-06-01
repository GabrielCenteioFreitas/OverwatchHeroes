import Divider from "@/components/Divider";
import { HeroProps } from "@/types/hero";
import { t } from "i18next";
import { HeroPagePortrait } from "../../HeroPagePortrait";
import { DetailedHeroProps } from "@/pages/heroes/[slug]";
import { InfoItem } from "./InfoItem";
import { HitpointsItem } from "./HitpointsItem";

interface HeroInfoSectionProps {
  hero: Omit<DetailedHeroProps, 'description' | 'abilities' | 'story'>;
}

export const HeroInfoSection = ({ hero }: HeroInfoSectionProps) => {
  return (
    <section className="p-3 rounded-2xl border border-slate-400 dark:border-slate-600" aria-label={t("HeroPage.heroInfo.ariaLabel")}>
      <HeroPagePortrait
        name={t(`HeroPage.heroInfo.name`)}
        portrait={hero.portrait}
        className="rounded-xl w-full h-auto 2xl:w-[296px]"
      />

      <Divider className="my-3" />

      <div className="grid gap-2 text-base leading-none">
        <InfoItem title={t(`HeroPage.heroInfo.name`)} text={hero.name} />

        <InfoItem title={t(`HeroPage.heroInfo.role`)} text={t(`Roles.${hero.role}`)} />

        <InfoItem title={t(`HeroPage.heroInfo.location`)} text={hero.location} />
      </div>

      <Divider className="my-4" />

      <div
        className="
          grid grid-cols-3 gap-3 text-center p-2
          border border-slate-400 dark:border-slate-600 rounded-xl shadow-sm
        "
      >
        <HitpointsItem
          hitpoint={{
            value: hero.hitpoints?.health,
            name: 'health'
          }}
          gradient="from-teal-500 to-green-400"
        />
        
        <HitpointsItem
          hitpoint={{
            value: hero.hitpoints?.armor,
            name: 'armor'
          }}
          gradient="from-orange-300 to-orange-500 dark:from-orange-500 dark:to-orange-700"
        />
        
        <HitpointsItem
          hitpoint={{
            value: hero.hitpoints?.shields,
            name: 'shield'
          }}
          gradient="from-sky-400 to-blue-500 dark:from-sky-600 dark:to-blue-700"
        />
      </div>
    </section>
  );
}
