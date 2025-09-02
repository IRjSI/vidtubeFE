import { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/http-streaming';
import './video-skin.css';

export const VideoPlayer = ({ options, onReady }: any) => {
    const videoRef = useRef<any>(null);
    const playerRef = useRef<any>(null);

    useEffect(() => {
        if (!playerRef.current) {
            const videoElement = document.createElement("video");
            videoElement.className = 'video-js vjs-big-play-centered vjs-youtube-skin';
            videoElement.setAttribute('controls', '');
            videoElement.setAttribute('preload', 'auto');
            videoElement.setAttribute('data-setup', '{}');

            videoRef.current.appendChild(videoElement);

            const player = playerRef.current = videojs(videoElement, {
                ...options,
                fluid: true,
                aspectRatio: "16:9",
                controlBar: {
                    volumePanel: { inline: false }
                },
                playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2], // YouTube-like speed options
                html5: {
                    hls: {
                        enableLowInitialPlaylist: true,
                        smoothQualityChange: true,
                        overrideNative: true
                    }
                }
            }, () => {
                onReady && onReady(player);
            });
        } else {
            const player = playerRef.current;
            player.autoplay(options.autoplay);
            player.src(options.sources);
        }
    }, [options]);

    useEffect(() => {
        const player = playerRef.current;
        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, []);

    return (
        <div data-vjs-player className="w-full max-w-4xl mx-auto">
            <div ref={videoRef} />
        </div>
    );
};

export default VideoPlayer;
