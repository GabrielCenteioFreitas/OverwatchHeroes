import React, { useEffect, useState, startTransition } from 'react';
import Video from 'next-video';

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
      return <div>Loading...</div>;
    }

    return (
      <Video
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