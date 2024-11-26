import { useEffect } from 'react';

import type { RefObject } from 'react';

/**
 * Cleans up the video element when the component unmounts.
 * @param videoRef - Reference to the video element.
 */
const useVideoCleanup = (videoRef: RefObject<HTMLVideoElement | null>) => {
  useEffect(() => {
    const video = videoRef.current;

    return () => {
      if (video) {
        video.pause();
        video.src = '';
        video.load();
      }
    };
  }, [videoRef]);
};

export default useVideoCleanup;
