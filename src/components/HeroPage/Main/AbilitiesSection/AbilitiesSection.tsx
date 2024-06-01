import Divider from "@/components/Divider";
import { AbilityProps } from "@/pages/heroes/[slug]";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { AbilitiesList } from "./AbilitiesList";
import { CurrentAbility } from "./CurrentAbility";

interface AbilitiesSectionProps {
  abilities: AbilityProps[]
}

export const AbilitiesSection = ({ abilities }: AbilitiesSectionProps) => {
  const [currentAbility, setCurrentAbility] = useState<AbilityProps>({} as AbilityProps)
  
  const handleChangeCurrentAbility = (ability: AbilityProps) => {
    setCurrentAbility(ability)
  }

  useEffect(() => {
    setCurrentAbility(abilities?.[0])
  }, [abilities])

  return (
    <section>
      <h3 className="mt-6 text-2xl font-bold capitalize">
        {t(`HeroPage.aboutHero.abilities.title`)}
      </h3>

      <Divider className="opacity-50 mt-1 mb-4" />

      <div>
        <AbilitiesList
          abilities={abilities}
          currentAbility={currentAbility}
          handleChangeCurrentAbility={handleChangeCurrentAbility}
        />

        <CurrentAbility
          currentAbility={currentAbility}
        />
      </div>
    </section>
  );
}
