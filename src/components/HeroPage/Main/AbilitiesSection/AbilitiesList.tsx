import { AbilityProps } from "@/pages/heroes/[slug]";
import { AbilityItem } from "./AbilityItem";

interface AbilitiesListProps {
  abilities: AbilityProps[];
  currentAbility: AbilityProps;
  handleChangeCurrentAbility: (ability: AbilityProps) => void;
}

export const AbilitiesList = ({ abilities, currentAbility, handleChangeCurrentAbility }: AbilitiesListProps) => {
  return (
    <div
      className={`grid gap-1`}
      style={{ gridTemplateColumns: `repeat(${abilities?.length}, 1fr)` }}
    >
      {abilities?.map(ability => (
        <AbilityItem
          ability={ability}
          firstAbility={abilities[0]}
          currentAbility={currentAbility}
          handleChangeCurrentAbility={handleChangeCurrentAbility}
        />
      ))}
    </div>
  );
}
