import { useColorTheme } from "@/hooks/useColorTheme";
import { t } from "i18next";
import { useState, useEffect, startTransition } from "react";
import { AiFillMoon } from "react-icons/ai";
import { BsSunFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

const ColorThemeSwitch = ({ className }: { className?: string }) => {
  const { colorTheme, changeColorTheme } = useColorTheme();

  const [ready, setReady] = useState(false);
  useEffect(() => {
      startTransition(() => {
          setReady(true);
      });
  }, []);
  if (!ready) {
    return <div>Loading...</div>;
  }

  const handleToggleThemeClick = () => {
    changeColorTheme(
      colorTheme === "dark"
        ? "light"
        : "dark"
    )
  }

  return ( 
    <button
      onClick={handleToggleThemeClick}
      aria-label={t('ColorTheme.ariaLabel')}
      className={twMerge("p-[0.125rem] md:p-1 size-7 md:size-8 rounded-full bg-white dark:bg-slate-700 border border-slate-500 dark:border-slate-300 transition-all", className)}
    >
      {colorTheme === "dark" ? (
        <BsSunFill className="fill-slate-300 size-full p-0.5" />
      ) : (
        <AiFillMoon className="fill-slate-500 size-full" />
      )}
    </button>
  );
}
 
export default ColorThemeSwitch;