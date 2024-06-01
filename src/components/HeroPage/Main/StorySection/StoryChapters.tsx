import Divider from "@/components/Divider";

interface StoryChaptersProps {
  chapters: {
    title: string;
    content: string;
    picture: string;
  }[];
}

export const StoryChapters = ({ chapters }: StoryChaptersProps) => {
  return (
    <div className="mt-2">
      {chapters?.map(chapter => 
        <div className="grid" key={chapter.title}>
          <h4 className="mt-3 text-xl font-semibold">
            {chapter.title}
          </h4>

          <Divider className="opacity-50 mt-1 mb-3" />

          <div className="grid gap-3 items-center justify-items-center">
            <p className={`
              indent-2 lg:indent-4 text-justify text-sm lg:text-base
            `}>
              {chapter.content}
            </p>
            <img
              className={`w-full max-w-[40rem]`}
              src={chapter.picture}
              alt={chapter.title}
            />
          </div>
        </div>
      )}
    </div>
  );
}
