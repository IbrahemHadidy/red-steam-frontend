import { useEffect } from 'react';

import type { RefObject } from 'react';

/**
 * Cleans up the video element when the component unmounts.
 * @param videoRef - Reference to the video element.
 */
const useVideoCleanup = (videoRef: RefObject<HTMLVideoElement | null>) => {
  useEffect(() => {
    const videoElement = videoRef.current;

    return () => {
      if (videoElement) {
        videoElement.pause();
        videoElement.src = '';
        videoElement.load();
      }
    };
  }, [videoRef]);
};

export default useVideoCleanup;
