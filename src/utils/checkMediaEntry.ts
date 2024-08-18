import type { ImageEntry, VideoEntry } from 'types/media.types';

const isVideoEntry = (entry: ImageEntry | VideoEntry | undefined): entry is VideoEntry => {
  return entry !== undefined && 'posterLink' in entry;
};
export default isVideoEntry;
