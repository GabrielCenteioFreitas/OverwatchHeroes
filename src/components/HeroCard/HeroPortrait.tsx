import { twMerge } from "tailwind-merge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface HeroPortraitProps {
  name: string;
  portrait: string;
  className?: string;
}

const HeroPortrait = ({ name, portrait, className }: HeroPortraitProps) => {
  const getInitialLetters = (name: string) => {
    const nameParts = name.split(' ')

    if (nameParts.length > 1) {
      return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase()
    }

    return (nameParts[0].substring(0, 2)).toUpperCase()
  }
  
  const initialLetters = getInitialLetters(name)

  return ( 
    <Avatar>
      <AvatarImage
        src={portrait}
        alt={name}
        className={twMerge(`
          rounded-full border border-slate-400 shadow-md
          bg-gradient-to-t from-slate-300 to-slate-500
        `, className)}
      />
      <AvatarFallback>
        <div
          className={twMerge(`
            rounded-full border border-slate-400 shadow-md
            bg-gradient-to-t from-slate-300 to-slate-500
            grid place-content-center text-slate-800 font-bold text-2xl
          `, className)}
        >
          {initialLetters}
        </div>
      </AvatarFallback>
    </Avatar>
  );
}
 
export default HeroPortrait;