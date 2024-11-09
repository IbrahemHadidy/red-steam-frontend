import { useAppSelector } from '@store/hooks';
import { useEffect } from 'react';

import type { RefObject } from 'react';

const useVideoVolume = (videoRef: RefObject<HTMLVideoElement | null>) => {
  const { videoVolume, videoMuted } = useAppSelector((state) => state.game);

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.volume = videoMuted ? 0 : videoVolume;
  }, [videoVolume, videoMuted, videoRef]);
};

export default useVideoVolume;
