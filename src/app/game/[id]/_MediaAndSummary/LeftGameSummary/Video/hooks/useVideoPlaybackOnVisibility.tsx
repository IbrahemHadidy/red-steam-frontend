import { setWasPausedBeforeSwapping } from '@store/features/game/gameSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useEffect } from 'react';

import type { RefObject } from 'react';

/**
 * Handles video playback based on visibility using Intersection Observer.
 * @param videoRef - Ref to the video element.
 */
const useVideoPlaybackOnVisibility = (
  videoRef: RefObject<HTMLVideoElement | null>,
  threshold = 0.8
) => {
  const dispatch = useAppDispatch();
  const { wasPausedBeforeSwapping } = useAppSelector((state) => state.game);

  useEffect(() => {
    const video = videoRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (video) {
            if (entry.isIntersecting) {
              // Resume playback if the video was not paused before scrolling out of view
              if (!wasPausedBeforeSwapping) {
                video.play();
              }
            } else {
              // Save the current playback state before scrolling out of view
              dispatch(setWasPausedBeforeSwapping(video.paused));
              video.pause();
            }
          }
        });
      },
      {
        threshold, // Use the provided threshold for intersection
      }
    );

    if (video) observer.observe(video);

    return () => {
      if (video) observer.unobserve(video);
      observer.disconnect();
    };
  }, [dispatch, videoRef, wasPausedBeforeSwapping, threshold]);
};

export default useVideoPlaybackOnVisibility;
