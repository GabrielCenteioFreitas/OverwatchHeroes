import { AbilityProps } from "@/pages/heroes/[slug]";
import VideoToGifComponent from "../../VideoToGifComponent";

interface CurrentAbilityProps {
  currentAbility: AbilityProps;
}

export const CurrentAbility = ({ currentAbility }: CurrentAbilityProps) => {
  return (
    <div className="mt-2 space-y-2">
      <div className="md:space-y-0.5">
        <span className="text-lg md:text-xl font-semibold leading-none">
          {currentAbility?.name}
        </span>
        <p className="text-sm lg:text-base leading-none">
          {currentAbility?.description}
        </p>
      </div>
      <VideoToGifComponent
        src={currentAbility?.video?.link.mp4}
        poster={currentAbility?.video?.thumbnail}
        name={currentAbility?.name}
      />
    </div>
  );
}
