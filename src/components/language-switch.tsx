import { useLanguages } from "@/hooks/useLanguages";
import { CircleFlag } from 'react-circle-flags'
import { twMerge } from "tailwind-merge";

const LanguageSwitch = ({ className }: { className?: string }) => {
  const { currentLanguage, changeLanguage } = useLanguages()

  const handleChangeLanguage = () => {
    currentLanguage === "en_us"
      ? changeLanguage("pt_br")
      : changeLanguage("en_us")
  }

  return ( 
    <>
      <button
        className="size-7 md:size-8 rounded-full overflow-hidden"
        onClick={handleChangeLanguage}
      >
        {currentLanguage === "en_us" ? (
          <CircleFlag
            countryCode="br"
            title="Change language to PT-BR"
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