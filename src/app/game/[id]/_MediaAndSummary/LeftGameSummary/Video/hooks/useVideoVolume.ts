import { useAppSelector } from '@store/hooks';
import { useEffect } from 'react';

import type { RefObject } from 'react';

/**
 * Custom hook to manage video volume based on the videoVolume and videoMuted state.
 * @param videoRef - Reference to the video element.
 */
const useVideoVolume = (videoRef: RefObject<HTMLVideoElement | null>) => {
  const { videoVolume, videoMuted } = useAppSelector((state) => state.game);

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.volume = videoMuted ? 0 : videoVolume;
  }, [videoVolume, videoMuted, videoRef]);
};

export default useVideoVolume;
