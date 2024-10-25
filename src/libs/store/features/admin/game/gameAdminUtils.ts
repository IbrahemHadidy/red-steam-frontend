// Toast Notifications
import { toast } from 'react-toastify';

// Types
import type { FileMetadata, Screenshot, Video } from '@app/admin/_GameAdmin/game-admin.types';

/**
 * Check if the screenshot is already in the state
 * @param file The file to check
 * @param screenshots The screenshots state
 * @return True if the file is duplicate
 */
export const checkDuplicateScreenshot = (
  file: FileMetadata | string,
  screenshots: Screenshot[]
): boolean => {
  if (file instanceof File) {
    if (
      screenshots.some(
        (screenshot) =>
          screenshot.image instanceof File &&
          screenshot.image.name === file.name &&
          screenshot.image.size === file.size &&
          screenshot.image.type === file.type
      )
    ) {
      toast.warn('This screenshot is already added.');
      return true;
    }
  }
  return false;
};

/**
 * Check if the video is already in the state
 * @param file The file to check
 * @param videos The videos state
 * @return True if the file is duplicate
 */
export const checkDuplicateVideo = (file: FileMetadata | string, videos: Video[]): boolean => {
  if (file instanceof File) {
    if (
      videos.some(
        (video) =>
          video.video instanceof File &&
          video.video.name === file.name &&
          video.video.size === file.size &&
          video.video.type === file.type
      )
    ) {
      toast.warn('This video is already added.');
      return true;
    }
  }
  return false;
};

/**
 * Check if the poster is already in the state
 * @param file The file to check
 * @param videos The videos state
 * @return True if the file is duplicate
 */
export const checkDuplicatePoster = (file: FileMetadata | string, videos: Video[]): boolean => {
  if (file instanceof File) {
    if (
      videos.some(
        (video) =>
          video.poster instanceof File &&
          video.poster.name === file.name &&
          video.poster.size === file.size &&
          video.poster.type === file.type
      )
    ) {
      toast.warn('This poster is already added.');
      return true;
    }
  }
  return false;
};

/**
 * Get next order for added media
 * @param screenshots The screenshots state
 * @param videos The videos state
 * @return The next order
 */
export const getNextOrder = (screenshots: Screenshot[], videos: Video[]): number => {
  const allItems = [...screenshots, ...videos];
  return allItems.length > 0 ? Math.max(...allItems.map((item) => item.order)) + 1 : 1;
};
