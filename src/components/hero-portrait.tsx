interface HeroPortraitProps {
  name: string;
  portrait: string;
}

const HeroPortrait = ({ name, portrait }: HeroPortraitProps) => {
  return ( 
    <img
      src={portrait}
      alt={name}
      className="
        size-16 rounded-full border border-px border-slate-400 shadow-md
        bg-gradient-to-t from-slate-300 to-slate-500"
    />
  );
}
 
export default HeroPortrait;