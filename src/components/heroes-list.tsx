import { twMerge } from "tailwind-merge";
import HeroCard from "./hero-card";

interface HeroProps {
  key: string;
  name: string;
  role: string;
  portrait: string;
}

interface HeroesListProps {
  heroes: HeroProps[];
  className?: string;
}

const HeroesList = ({ heroes, className }: HeroesListProps) => {
  return ( 
    <div className={twMerge(`grid gap-x-4 gap-y-3 grid-cols-5`, className)}>
      {heroes.map(hero => (
        <HeroCard hero={hero} />
      ))}
    </div>
  );
}
 
export default HeroesList;