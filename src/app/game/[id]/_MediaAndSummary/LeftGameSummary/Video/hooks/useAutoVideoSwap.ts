import { useAppSelector } from '@store/hooks';
import { useEffect } from 'react';
import useMediaSwapHandlers from '../../hooks/useMediaSwapHandlers';

import type { RefObject } from 'react';

/**
 * Handles the auto video swap
 */
const useAutoVideoSwap = (
  isPageVisible: boolean,
  videoRef: RefObject<HTMLVideoElement | null>,
  slideAreaRef: RefObject<HTMLDivElement | null>
) => {
  const { currentMediaLink } = useAppSelector((state) => state.game);

  const { handleRightSwap } = useMediaSwapHandlers({ slideAreaRef });

  useEffect(() => {
    const video = videoRef.current;

    const handleVideoEnded = (): void => {
      if (isPageVisible) handleRightSwap();
    };

    if (video) {
      if (currentMediaLink !== video?.src) {
        video.removeEventListener('ended', handleVideoEnded);
      } else {
        video.addEventListener('ended', handleVideoEnded);
      }

      return () => {
        video.removeEventListener('ended', handleVideoEnded);
      };
    }
  }, [currentMediaLink, handleRightSwap, isPageVisible, videoRef]);
};

export default useAutoVideoSwap;
