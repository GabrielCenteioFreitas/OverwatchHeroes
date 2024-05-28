import { LanguageType, useLanguages } from "@/hooks/useLanguages";
import { t } from "i18next";
import { Suspense, startTransition, useEffect, useState } from "react";
import { CircleFlag } from 'react-circle-flags'
import { twMerge } from "tailwind-merge";
import LoadingIcon from "./Loading/LoadingIcon";

const LanguageSwitch = ({ className }: { className?: string }) => {
  const { currentLanguage, changeLanguage } = useLanguages()

  const [ready, setReady] = useState(false);
  useEffect(() => {
      startTransition(() => {
          setReady(true);
      });
  }, []);
  if (!ready) {
    return <LoadingIcon className="size-5 md:size-6" />;
  }

  const handleChangeLanguage = () => {
    currentLanguage === "en_us"
      ? changeLanguage("pt_br")
      : changeLanguage("en_us")
  }

  return ( 
    <>
      <button
        onClick={handleChangeLanguage}
        aria-label={t('Language.ariaLabel')}
        className="size-7 md:size-8 rounded-full overflow-hidden transition-all"
      >
        {currentLanguage === "en_us" ? (
          <CircleFlag
            countryCode="br"
            title={"Change language to PT-BR"}
            className={twMerge("size-full object-cover", className)}
          />
        ) : (
          <CircleFlag
            countryCode="us"
            title="Change language to EN-US"
            className={twMerge("size-full object-cover", className)}
          />
        )}
      </button>
    </>
  )
}

export default LanguageSwitch