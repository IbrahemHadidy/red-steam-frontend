// Redux Handlers
import { setOverlayVisible } from '@store/features/game/gameSlice';

// Types
import type { AppDispatch } from '@store/store';

export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

/**
 * Handles the video time update and progress bar update
 * @param video The current video
 * @param progressBar The current video progress bar
 * @param dispatch Redux dispatch instance
 */
export const updateDisplayTime = (
  video: HTMLVideoElement | null,
  progressBar: HTMLInputElement | null
): void => {
  if (video) {
    // Calculate the playback progress percentage
    const progressPercentage = (video.currentTime / video.duration) * 100;

    // Update the video playback progress bar
    if (progressBar) {
      progressBar.value = progressPercentage.toString();
    }
  }
};

/**
 * Updates the video current time based on the progress bar value
 * @param video The current video
 * @param value The new value
 */
export const updateVideoCurrentTime = (video: HTMLVideoElement | null, value: number): void => {
  if (video) {
    const seekTime = (value / 100) * video.duration;
    video.currentTime = seekTime;
  }
};

/**
 * Toggles the video fullscreen
 * @param playerArea The custom video player
 * @param dispatch Redux dispatch instance
 */
export const fullscreenVideo = (playerArea: HTMLDivElement | null, dispatch: AppDispatch): void => {
  if (playerArea) {
    if (!document.fullscreenElement) {
      playerArea.requestFullscreen().then(() => {
        dispatch(setOverlayVisible(false));
      });
    } else {
      document.exitFullscreen().then(() => {
        dispatch(setOverlayVisible(true));
      });
    }
  }
};
