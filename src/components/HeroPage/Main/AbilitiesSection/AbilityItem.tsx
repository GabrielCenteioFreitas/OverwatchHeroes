import { AbilityProps } from "@/pages/heroes/[slug]";
import { t } from "i18next";
import Image from "next/image";

interface AbilityItemProps {
  ability: AbilityProps;
  currentAbility: AbilityProps;
  firstAbility: AbilityProps;
  handleChangeCurrentAbility: (ability: AbilityProps) => void;
}

export const AbilityItem = ({ ability, firstAbility, currentAbility, handleChangeCurrentAbility }: AbilityItemProps) => {
  return (
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
          ${ability === firstAbility ? "p-0.5 2xl:p-2" : "p-2 2xl:p-4"}
        `}>
          <Image src={ability.icon} alt={ability.name} width={64} height={64} />
        </div>
      </div>
      <div className={`w-full h-1 self-end ${ability.name === currentAbility?.name ? "bg-blue-500 dark:bg-blue-600" : "bg-slate-400/75 dark:bg-gray-700 group-hover:bg-slate-500/75 dark:group-hover:bg-slate-600" }`} />
    </button>
  );
}
