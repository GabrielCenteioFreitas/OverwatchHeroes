import Link from "next/link";
import HeroPortrait from "./hero-portrait";
import { HeroProps } from "@/types/hero";
import { useTranslation } from "react-i18next";

interface HeroCardProps {
  hero: HeroProps;
}

const HeroCard = ({ hero }: HeroCardProps) => {
  const { t } = useTranslation()

  return ( 
    <Link href={`/heroes/${hero.key}`}>
      <div className={`
        flex items-center gap-3 py-2 pl-5 pr-3 rounded-xl shadow-sm bg-white
        border border-px border-slate-400 hover:scale-105 transition-transform
        relative overflow-hidden
      `}>
        <HeroPortrait
          name={hero.name}
          portrait={hero.portrait}
          className="w-16"
        />

        <div className="grid gap-2">
          <h2 className="font-bold text-lg leading-none">
            {hero.name}
          </h2>
          <h3 className="font-medium text-sm leading-none capitalize ">
            { t(`Roles.${hero.role}`) }
          </h3>
        </div>

        <div className={`
          absolute -ml-5 w-3 h-24
          ${hero.role === "support" && "bg-gradient-to-b from-teal-500 to-green-400"}
          ${hero.role === "damage" && "bg-gradient-to-b from-red-500 to-red-400"}
          ${hero.role === "tank" && "bg-gradient-to-b from-blue-500 to-sky-400"}
        `} />
      </div>
    </Link>
  );
}
 
export default HeroCard;