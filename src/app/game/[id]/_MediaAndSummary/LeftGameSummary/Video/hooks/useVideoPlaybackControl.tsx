import { useAppSelector } from '@store/hooks';
import { useEffect } from 'react';

import type { RefObject } from 'react';

/**
 * Manages video playback based on the isVideoPlaying state.
 * @param videoRef - Ref to the video element.
 */
const useVideoPlaybackControl = (videoRef: RefObject<HTMLVideoElement | null>) => {
  const { isVideoPlaying } = useAppSelector((state) => state.game);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      if (isVideoPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }
  }, [isVideoPlaying, videoRef]);
};

export default useVideoPlaybackControl;
