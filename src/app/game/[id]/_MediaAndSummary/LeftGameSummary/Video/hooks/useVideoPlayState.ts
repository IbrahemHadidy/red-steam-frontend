import { useCallback, useEffect, useState } from 'react';

import type { RefObject } from 'react';

/**
 * Manages the video play/pause state and syncs it with Redux.
 * @param videoRef - Ref to the video element.
 */
const useVideoPlayState = (videoRef: RefObject<HTMLVideoElement | null>) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;

    const handlePlayStateChange = (): void => {
      setIsVideoPlaying(!video?.paused);
    };

    if (video) {
      // Set initial play state
      setIsVideoPlaying(!video.paused);

      video.addEventListener('play', handlePlayStateChange);
      video.addEventListener('pause', handlePlayStateChange);

      return () => {
        video.removeEventListener('play', handlePlayStateChange);
        video.removeEventListener('pause', handlePlayStateChange);
      };
    }
  }, [videoRef]);

  const play = useCallback(() => videoRef.current?.play(), [videoRef]);
  const pause = useCallback(() => videoRef.current?.pause(), [videoRef]);

  return { isVideoPlaying, play, pause };
};

export default useVideoPlayState;
