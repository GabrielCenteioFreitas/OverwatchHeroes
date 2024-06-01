import { heroComicsAndShortStories } from "@/lib/heroComicsAndShortStories";
import { StoryProps } from "@/pages/heroes/[slug]"
import Image from "next/image";

interface StorySummaryProps {
  name: string;
  story: StoryProps;
}

export const StorySummary = ({ name, story }: StorySummaryProps) => {
  return (
    <>
      <p className="indent-2 lg:indent-4 text-justify text-sm lg:text-base">
        {story?.summary}
      </p>

      {story?.media && (
        <>
          {story.media.type === "video"
          ? (
            <div className="flex justify-center">
              <iframe
                src={(story.media.link).replace(".be", "be.com/embed")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className={`mt-2 w-full h-48 min-[400px]:h-56 sm-480:h-64 max-w-[35rem] lg:h-[19.6875rem]`}
              />
            </div>
          ) : (
            <div className="mt-2 flex gap-1 overflow-x-scroll h-96 no-scrollbar">
              {heroComicsAndShortStories[name]?.map(heroComicOrShortStory => 
                <Image
                  key={heroComicOrShortStory}
                  src={heroComicOrShortStory}
                  alt={heroComicOrShortStory}
                  width={256}
                  height={384}
                />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
