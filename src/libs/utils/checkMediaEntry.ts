import type { ImageEntry, VideoEntry } from '@interfaces/game';

/**
 * Type guard function to check if an entry is of type `VideoEntry`
 * @param entry A media entry
 * @returns true if the entry is of type VideoEntry
 */
export function isVideoEntry(entry: ImageEntry | VideoEntry | undefined): entry is VideoEntry {
  return entry !== undefined && 'posterLink' in entry;
}

/**
 * Type guard function to check if an entry is of type `ImageEntry`
 * @param entry A media entry
 * @returns true if the entry is of type ImageEntry
 */
export function isImageEntry(entry: ImageEntry | VideoEntry | undefined): entry is ImageEntry {
  return entry !== undefined && 'link' in entry && !('posterLink' in entry);
}
