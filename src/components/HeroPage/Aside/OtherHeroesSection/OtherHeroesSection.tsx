import Divider from "@/components/Divider";
import HeroesList from "@/components/HeroesList";
import LoadingIcon from "@/components/Loading/LoadingIcon";
import { useLanguages } from "@/hooks/useLanguages";
import { HeroProps } from "@/types/hero";
import { t } from "i18next";

interface OtherHeroesSectionProps {
  role: string;
  sameRoleHeroes: HeroProps[];
  ready: boolean;
  isLoading: boolean;
}

export const OtherHeroesSection = ({ role, sameRoleHeroes, ready, isLoading }: OtherHeroesSectionProps) => {
  const { currentLanguage } = useLanguages();

  if (sameRoleHeroes.length === 0 && !isLoading) {
    return null
  }

  return (
    <section className="hidden sm:block" aria-label={t("HeroPage.otherHeroes.ariaLabel")}>
      <h3 className="text-xl font-semibold">
        {ready && (
          currentLanguage === "pt_br"
            ? `Outros heróis de ${t(`Roles.${role}`)}`
            : `Other ${role} heroes`
        )}
      </h3>
      
      <Divider className="opacity-50 mt-1 mb-3" />

      {!isLoading ? (
        <HeroesList heroes={sameRoleHeroes.slice(0, 7)} className="grid-cols-1" />
      ) : (
        <div className="w-full flex justify-center pt-4">
          <LoadingIcon className="size-1/6" />
        </div>
      )}
    </section>
  );
}
