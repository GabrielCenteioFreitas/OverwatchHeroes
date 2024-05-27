import { twMerge } from "tailwind-merge";

interface HeroPortraitProps {
  name: string;
  portrait: string;
  className?: string;
}

const HeroPortrait = ({ name, portrait, className }: HeroPortraitProps) => {
  return ( 
    <img
      src={portrait}
      alt={name}
      className={twMerge(`
        rounded-full border border-slate-400 shadow-md
        bg-gradient-to-t from-slate-300 to-slate-500
      `, className)}
    />
  );
}
 
export default HeroPortrait;