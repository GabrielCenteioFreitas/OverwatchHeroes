import { twMerge } from "tailwind-merge";

interface HeroPortraitProps {
  name: string;
  portrait: string;
  size: number;
  className?: string;
}

const HeroPortrait = ({ name, portrait, size, className }: HeroPortraitProps) => {
  return ( 
    <img
      src={portrait}
      alt={name}
      style={{width: `${size/16}rem`, height: `${size/16}rem`}}
      className={twMerge(`
        rounded-full border border-px border-slate-400 shadow-md
        bg-gradient-to-t from-slate-300 to-slate-500
      `, className)}
    />
  );
}
 
export default HeroPortrait;