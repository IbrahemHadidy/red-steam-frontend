import type { Developer, Publisher } from '@entities/company.entity';
import type { Feature } from '@entities/feature.entity';
import type { Language } from '@entities/language.entity';
import type { Pricing } from '@entities/pricing.entity';
import type { Review } from '@entities/review.entity';
import type { Tag } from '@entities/tag.entity';

export interface Game {
  id: number;
  name: string;
  category: string;
  description: string;
  releaseDate: Date;
  featured: boolean;
  publishers?: Publisher[];
  developers?: Developer[];
  thumbnailEntries: ThumbnailsEntry;
  imageEntries: ImageEntry[];
  videoEntries: VideoEntry[];
  tags?: Tag[];
  pricing?: Pricing;
  features?: Feature[];
  languages?: Language[];
  languageSupport: LanguageSupportEntry[];
  platformEntries: PlatformEntry;
  link: string | null;
  about: string;
  mature: boolean;
  matureDescription: string;
  systemRequirements: SystemRequirementsEntry;
  legal: string;
  reviews?: Review[];
  totalSales: number;
  averageRating: number;
  reviewsCount: number;
}

export interface ThumbnailsEntry {
  mainImage: string;
  backgroundImage: string;
  menuImg: string;
  horizontalHeaderImage: string;
  verticalHeaderImage: string;
  smallHeaderImage: string;
  searchImage: string;
  tabImage: string;
}

export interface ImageEntry {
  link: string;
  featured?: boolean;
  order: number;
}

export interface VideoEntry {
  link: string;
  posterLink: string;
  order: number;
}

export interface LanguageSupportEntry {
  name: string;
  interface: boolean;
  fullAudio: boolean;
  subtitles: boolean;
}

export interface PlatformEntry {
  win: boolean;
  mac: boolean;
}

export interface SystemRequirementsEntry {
  req64?: boolean;
  mini: SystemRequirementsDetails;
  recommended: SystemRequirementsDetails;
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
