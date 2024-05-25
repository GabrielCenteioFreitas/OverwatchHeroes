import React, { useEffect, useState, startTransition } from 'react';
import LoadingIcon from './loading-icon';

interface VideoToGifComponentProps {
  src: string;
  poster: string;
}

const VideoToGifComponent = ({ src, poster }: VideoToGifComponentProps) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
      startTransition(() => {
          setReady(true);
      });
  }, []);

  if (!ready) {
    return (
      <div className="w-full h-auto relative">
        <div className="absolute flex justify-center items-center bg-black/70 w-full h-full">
          <LoadingIcon className="size-2/12 opacity-70" />
        </div>
        <img src={poster} />
      </div>
    );
  }

  return (
    <video
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      controls={false}
    />
  );
};

export default VideoToGifComponent;