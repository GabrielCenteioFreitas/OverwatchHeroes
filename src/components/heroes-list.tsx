import HeroCard from "./hero-card";

interface HeroProps {
  key: string;
  name: string;
  role: string;
  portrait: string;
}

interface HeroesListProps {
  heroes: HeroProps[];
}

const HeroesList = ({ heroes }: HeroesListProps) => {
  return ( 
    <div className="grid gap-x-4 gap-y-3 grid-cols-5">
      {heroes.map(hero => (
        <HeroCard hero={hero} />
      ))}
    </div>
  );
}
 
export default HeroesList;