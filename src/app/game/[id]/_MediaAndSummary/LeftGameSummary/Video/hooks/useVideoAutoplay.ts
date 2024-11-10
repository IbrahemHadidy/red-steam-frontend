import { useAppSelector } from '@store/hooks';
import { useEffect } from 'react';

import type { RefObject } from 'react';

/**
 * Custom hook to manage autoplay of a video based on the autoPlayVideo state.
 * @param videoRef - Reference to the video element.
 */
const useVideoAutoplay = (videoRef: RefObject<HTMLVideoElement | null>) => {
  const { autoPlayVideo, currentMediaLink } = useAppSelector((state) => state.game);

  useEffect(() => {
    const video = videoRef.current;

    if (video?.src === currentMediaLink && autoPlayVideo) {
      video.play().catch((error) => {
        console.error('Autoplay was prevented:', error);
      });
    }
  }, [autoPlayVideo, currentMediaLink, videoRef]);
};

export default useVideoAutoplay;
