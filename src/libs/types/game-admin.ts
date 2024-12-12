import type FileMetadata from '@custom-types/file-metadata';
import type { GameMediaChangeStatus } from '@enums/admin';

interface Thumbnail {
  file: FileMetadata | string | null;
  changed: boolean;
}
export interface Thumbnails {
  mainImage: Thumbnail;
  backgroundImage: Thumbnail;
  menuImg: Thumbnail;
  horizontalHeaderImage: Thumbnail;
  verticalHeaderImage: Thumbnail;
  smallHeaderImage: Thumbnail;
  searchImage: Thumbnail;
  tabImage: Thumbnail;
}

export interface Screenshot {
  id: string;
  image: FileMetadata | string;
  change: GameMediaChangeStatus;
  featured?: boolean;
  baseOrder: number;
  order: number;
}

export interface Video {
  id: string;
  video: FileMetadata | string;
  poster: FileMetadata | string;
  change: GameMediaChangeStatus;
  baseOrder: number;
  order: number;
}

export interface Pricing {
  free: boolean;
  price?: string;
}

export interface Language {
  name: string;
  interface: boolean;
  fullAudio: boolean;
  subtitles: boolean;
}

export interface Platforms {
  win: boolean;
  mac: boolean;
}

export interface SystemRequirementsDetails {
  os: string;
  cpu: string;
  ram: string;
  gpu: string;
  dx: string;
  network: string;
  storage: string;
  additionalNotes: string;
  soundCard: string;
  vrSupport: string;
}
export interface SystemRequirements {
  req64: boolean;
  mini: SystemRequirementsDetails;
  recommended: SystemRequirementsDetails;
}
