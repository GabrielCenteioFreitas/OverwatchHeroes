import { t } from "i18next";
import { twMerge } from "tailwind-merge";

interface HitpointsItemProps {
  hitpoint: {
    value: number;
    name: string;
  }
  gradient: string;
}

export const HitpointsItem = ({ hitpoint, gradient }: HitpointsItemProps) => {
  return (
    <div className="flex flex-col gap-2 text-base">
      <div>
        <span className="font-semibold capitalize">{t(`HeroPage.heroInfo.hitpoints.${hitpoint.name}`)}</span>
        <div className={twMerge("w-full h-1 bg-gradient-to-r from-teal-500 to-green-400", gradient)}/>
      </div>
      <span>{hitpoint.value}</span>
    </div>
  );
}
