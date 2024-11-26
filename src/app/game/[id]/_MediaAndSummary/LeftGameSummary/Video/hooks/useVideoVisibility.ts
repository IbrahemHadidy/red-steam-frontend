import { setWasPausedBeforeSwapping } from '@store/features/game/gameSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useCallback, useEffect } from 'react';

import type { RefObject } from 'react';

/**
 * Handles the visibility change of the video and pauses it if the tab is hidden.
 * If the video was not paused before visibility change, it resumes playback.
 * @param videoRef The video element ref
 */
const useVideoVisibility = (videoRef: RefObject<HTMLVideoElement | null>) => {
  const dispatch = useAppDispatch();
  const { wasPausedBeforeSwapping } = useAppSelector((state) => state.game);

  const handleVisibilityChange = useCallback((): void => {
    const video = videoRef.current;

    if (video) {
      dispatch(setWasPausedBeforeSwapping(video.paused));
      if (document.hidden) {
        video.pause();
      } else if (!wasPausedBeforeSwapping) {
        video.play();
      }
    }
  }, [dispatch, wasPausedBeforeSwapping, videoRef]);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);
};

export default useVideoVisibility;
