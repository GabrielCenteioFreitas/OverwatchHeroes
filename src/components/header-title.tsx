import { useLanguages } from "@/hooks/useLanguages";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

const HeaderTitle = ({ className }: { className?: string }) => {  
  const { t } = useTranslation()

  return ( 
    <Link href="/">
      <h1 className={twMerge("text-4xl font-bold", className)}>
        { t("HeaderTitle.title") }
      </h1>
    </Link>
  );
}
 
export default HeaderTitle;