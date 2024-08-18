export interface Thumbnails {
  mainImage: string | File | null;
  backgroundImage: string | File | null;
  menuImg: string | File | null;
  horizontalHeaderImage: string | File | null;
  verticalHeaderImage: string | File | null;
  smallHeaderImage: string | File | null;
  searchImage: string | File | null;
  tabImage: string | File | null;
}
export interface Screenshot {
  id: number;
  image: File;
  featured?: boolean;
  order: number;
}
export interface Video {
  id: number;
  video: File;
  poster: File;
  order: number;
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
