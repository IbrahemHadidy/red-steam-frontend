interface Thumbnail {
  file: File | string | null;
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
  image: File | string;
  change: 'added' | 'deleted' | 'unchanged';
  featured?: boolean;
  order: number;
}
export interface Video {
  id: string;
  video: File | string;
  poster: File | string;
  change: 'added' | 'deleted' | 'unchanged';
  order: number;
}
export interface ChangedOrder {
  type: 'screenshot' | 'video';
  oldOrder: number;
  newOrder: number;
}
export interface ChangedFeatured {
  order: number;
  featured: boolean;
}
export interface Pricing {
  free: boolean;
  price?: number;
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
  os?: string;
  cpu?: string;
  ram?: string;
  gpu?: string;
  dx?: string;
  network?: string;
  storage?: string;
  additionalNotes?: string;
  soundCard?: string;
  vrSupport?: string;
}
export interface SystemRequirements {
  req64?: boolean;
  mini: SystemRequirementsDetails;
  recommended: SystemRequirementsDetails;
}
