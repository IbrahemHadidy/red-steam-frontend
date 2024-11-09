import { useEffect, useState } from 'react';

import type { RefObject } from 'react';

/**
 * Custom hook to manage video progress and buffering state.
 * @param videoRef - Reference to the video element.
 * @param progressBarRef - Reference to the video progress bar element.
 * @param bufferProgressBarRef - Reference to the buffer progress bar element.
 */
const useVideoProgress = (
  videoRef: RefObject<HTMLVideoElement | null>,
  progressBarRef: RefObject<HTMLInputElement | null>,
  bufferProgressBarRef: RefObject<HTMLProgressElement | null>
) => {
  const [videoCurrentTime, setVideoCurrentTime] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);

  useEffect(() => {
    const video: HTMLVideoElement | null = videoRef.current;

    const handleTimeUpdate = (): void => {
      if (video) {
        setVideoCurrentTime(video.currentTime);

        // Calculate the playback progress percentage
        const progressPercentage: number = (video.currentTime / video.duration) * 100;

        // Update the video playback progress bar
        if (progressBarRef.current) {
          progressBarRef.current.value = progressPercentage.toString();
        }
      }
    };

    const handleBufferProgress = (): void => {
      if (video && bufferProgressBarRef.current && video.buffered.length > 0) {
        let bufferedAmount = 0;
        for (let i = 0; i < video.buffered.length; i++) {
          bufferedAmount = Math.max(bufferedAmount, video.buffered.end(i));
        }

        const progressPercentage: number = (bufferedAmount / video.duration) * 100;
        bufferProgressBarRef.current.value = progressPercentage;
      }
    };

    const handleDurationChange = (): void => {
      if (video) setVideoDuration(video.duration);
    };

    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('durationchange', handleDurationChange);
      video.addEventListener('progress', handleBufferProgress);

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('durationchange', handleDurationChange);
        video.removeEventListener('progress', handleBufferProgress);
      };
    }
  }, [videoRef, bufferProgressBarRef, progressBarRef]);

  return { videoCurrentTime, videoDuration };
};

export default useVideoProgress;
