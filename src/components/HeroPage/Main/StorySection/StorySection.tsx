import Divider from "@/components/Divider";
import { StoryProps } from "@/pages/heroes/[slug]";
import { t } from "i18next";
import { StoryChapters } from "./StoryChapters";
import { StorySummary } from "./StorySummary";

interface StorySectionProps {
  name: string;
  story: StoryProps; 
}

export const StorySection = ({ name, story }: StorySectionProps) => {
  return (
    <section>
      <h3 className="mt-3 text-2xl font-bold capitalize">
        {t(`HeroPage.aboutHero.story`)}
      </h3>
      <Divider className="opacity-50 mt-1 mb-3" />

      <StorySummary name={name} story={story} />

      <StoryChapters chapters={story?.chapters} />
    </section>
  );
}
