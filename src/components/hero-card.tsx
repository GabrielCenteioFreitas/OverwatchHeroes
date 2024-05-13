import Link from "next/link";
import HeroPortrait from "./hero-portrait";

interface HeroCardProps {
  hero: {
    key: string;
    name: string;
    role: string;
    portrait: string;
  }
}

const HeroCard = ({ hero }: HeroCardProps) => {
  return ( 
    <Link href={`/heroes/${hero.key}`}>
      <div className={`
        flex items-center gap-3 py-2 pl-5 pr-3 rounded-xl shadow-sm
        border border-px border-slate-400 hover:scale-105 transition-transform
        relative overflow-hidden
      `}>
        <HeroPortrait name={hero.name} portrait={hero.portrait} />
        <div className="grid gap-2">
          <h2 className="font-bold text-lg leading-none">{hero.name}</h2>
          <h3 className="font-medium text-sm leading-none capitalize ">{hero.role}</h3>
        </div>
        <div className={`
          absolute -ml-5 w-3 h-24
          ${hero.role === "support" && "bg-gradient-to-b from-cyan-300 to-green-400"}
          ${hero.role === "damage" && "bg-gradient-to-b from-red-500 to-red-400"}
          ${hero.role === "tank" && "bg-gradient-to-b from-blue-500 to-sky-400"}
        `} />
      </div>
    </Link>
  );
}
 
export default HeroCard;