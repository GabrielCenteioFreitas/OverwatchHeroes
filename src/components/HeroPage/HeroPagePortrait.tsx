import { getInitialLetters } from "@/utils/getInitialLetters";
import Image from "next/image";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

interface HeroPortraitProps {
  name: string;
  portrait: string;
  className?: string;
}

const HeroPagePortraitComponent = ({ name, portrait, className }: HeroPortraitProps) => {
  const initialLetters = getInitialLetters(name)

  if (typeof window === 'undefined') {
    return (
      <div
        className={twMerge(`
          rounded-full border border-slate-400 shadow-md
          bg-gradient-to-t from-slate-300 to-slate-500
          grid place-content-center text-slate-800 font-bold text-2xl
        `, className)}
      >
        {initialLetters}
      </div>
    )
  }

  return ( 
    <Image
      src={portrait}
      alt={name}
      className={twMerge(`
        rounded-full border border-slate-400 shadow-md
        bg-gradient-to-t from-slate-300 to-slate-500
      `, className)}
      width={296}
      height={296}
    />
  );
}

export const HeroPagePortrait = memo(HeroPagePortraitComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.portrait, nextProps.portrait)
});