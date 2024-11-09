import { setOverlayVisible } from '@store/features/game/gameSlice';
import { useAppDispatch } from '@store/hooks';
import { useEffect } from 'react';

import type { RefObject } from 'react';

/**
 * Custom hook to manage video overlay visibility based on fullscreen state.
 * @param videoOverlayRef - Reference to the video overlay element.
 */
const useVideoFullscreen = (videoOverlayRef: RefObject<HTMLDivElement | null>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleFullscreenChange = (): void => {
      const isFullscreen = !!document.fullscreenElement;
      const videoOverlay = videoOverlayRef.current;

      if (videoOverlay) {
        dispatch(setOverlayVisible(isFullscreen));
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [dispatch, videoOverlayRef]);
};

export default useVideoFullscreen;
