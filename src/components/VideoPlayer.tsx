import { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ videoUrl }: any) => {
  const videoNode = useRef(null);

  useEffect(() => {
    // Initialize Video.js player when the component mounts
    //@ts-ignore
    const player = videojs(videoNode.current, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      sources: [
        {
          src: videoUrl,
          type: 'video/mp4',
        },
      ],
    });

    // Clean up the player when the component unmounts
    return () => {
      player.dispose();
    };
  }, [videoUrl]);

  return (
    <div className="w-full h-[65vh] flex items-center justify-center overflow-hidden shadow-lg bg-black">
      <video
        ref={videoNode}
        className="video-js vjs-default-skin w-full h-full rounded-lg"
        controls
      ></video>
    </div>
  );
};

export default VideoPlayer;
