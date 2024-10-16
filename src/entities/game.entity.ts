import type { Developer, Publisher } from '@entities/company.entity';
import type { Feature } from '@entities/feature.entity';
import type { Language } from '@entities/language.entity';
import type { Pricing } from '@entities/pricing.entity';
import type { Review } from '@entities/review.entity';
import type { Tag } from '@entities/tag.entity';

export interface Game {
  readonly id: number;
  readonly name: string;
  readonly category: string;
  readonly description: string;
  readonly releaseDate: Date;
  readonly featured: boolean;
  readonly publishers?: Publisher[];
  readonly developers?: Developer[];
  readonly thumbnailEntries: ThumbnailsEntry;
  readonly imageEntries: ImageEntry[];
  readonly videoEntries: VideoEntry[];
  readonly tags?: Tag[];
  readonly pricing?: Pricing;
  readonly features?: Feature[];
  readonly languages?: Language[];
  readonly languageSupport: LanguageSupportEntry[];
  readonly platformEntries: PlatformEntry;
  readonly link: string | null;
  readonly about: string;
  readonly mature: boolean;
  readonly matureDescription: string;
  readonly systemRequirements: SystemRequirementsEntry;
  readonly legal: string;
  readonly reviews?: Review[];
  readonly totalSales: number;
  readonly averageRating: number;
  readonly reviewsCount: number;
}

export interface ThumbnailsEntry {
  readonly mainImage: string;
  readonly backgroundImage: string;
  readonly menuImg: string;
  readonly horizontalHeaderImage: string;
  readonly verticalHeaderImage: string;
  readonly smallHeaderImage: string;
  readonly searchImage: string;
  readonly tabImage: string;
}

export interface ImageEntry {
  readonly link: string;
  readonly featured?: boolean;
  readonly order: number;
}

export interface VideoEntry {
  readonly link: string;
  readonly posterLink: string;
  readonly order: number;
}

export interface LanguageSupportEntry {
  readonly name: string;
  readonly interface: boolean;
  readonly fullAudio: boolean;
  readonly subtitles: boolean;
}

export interface PlatformEntry {
  readonly win: boolean;
  readonly mac: boolean;
}

export interface SystemRequirementsEntry {
  readonly req64?: boolean;
  readonly mini: SystemRequirementsDetails;
  readonly recommended: SystemRequirementsDetails;
}

export interface SystemRequirementsDetails {
  readonly os?: string;
  readonly cpu?: string;
  readonly ram?: string;
  readonly gpu?: string;
  readonly dx?: string;
  readonly network?: string;
  readonly storage?: string;
  readonly additionalNotes?: string;
  readonly soundCard?: string;
  readonly vrSupport?: string;
}
