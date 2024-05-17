import useColorMode from "@/hooks/useColorMode";
import { AiFillMoon } from "react-icons/ai";
import { BsSunFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

const ThemeSwitch = ({ className }: { className?: string }) => {
  const { colorMode, setColorMode } = useColorMode();

  const handleToggleThemeClick = () => {
    setColorMode(
      colorMode === "dark"
        ? "light"
        : "dark"
    )
  }

  return ( 
    <button
      onClick={handleToggleThemeClick}
      className={twMerge("p-[0.125rem] md:p-1 size-7 md:size-8 rounded-full bg-white dark:bg-slate-700 border border-slate-500 dark:border-slate-300", className)}
    >
      {colorMode === "dark" ? (
        <BsSunFill className="fill-slate-300 size-full p-0.5" />
      ) : (
        <AiFillMoon className="fill-slate-500 size-full" />
      )}
    </button>
  );
}
 
export default ThemeSwitch;