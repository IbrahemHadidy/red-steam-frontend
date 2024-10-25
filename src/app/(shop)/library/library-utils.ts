import type { Game, ImageEntry, VideoEntry } from '@interfaces/game';

/**
 * The media display logic
 * @param game - The game to check
 * @returns The video entry if it exists else a screenshot
 */
export const gameMediaItem = (game: Game): VideoEntry | ImageEntry | undefined => {
  const videoEntry = game.videoEntries.length > 0 && game.videoEntries[0];
  if (videoEntry) return videoEntry;

  const imageEntry = game.imageEntries.length > 0 && game.imageEntries[0];
  if (imageEntry) return imageEntry;
};

/**
 * Type guard function to check if an entry is of type VideoEntry
 * @param entry - The entry to check
 * @returns True if the entry is a VideoEntry
 */
export const isVideoEntry = (entry: VideoEntry | ImageEntry | undefined): entry is VideoEntry => {
  return (entry as VideoEntry)?.posterLink !== undefined;
};
