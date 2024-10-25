import type { Developer, Publisher } from '@interfaces/company';
import type { Feature } from '@interfaces/feature';
import type { Language } from '@interfaces/language';
import type { Pricing } from '@interfaces/pricing';
import type { Review } from '@interfaces/review';
import type { Tag } from '@interfaces/tag';

export interface Game {
  readonly id: number;
  readonly name: string;
  readonly category: string;
  readonly description: string;
  readonly releaseDate: string;
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
  readonly req64: boolean;
  readonly mini: SystemRequirementsDetails;
  readonly recommended: SystemRequirementsDetails;
}

export interface SystemRequirementsDetails {
  readonly os: string;
  readonly cpu: string;
  readonly ram: string;
  readonly gpu: string;
  readonly dx: string;
  readonly network: string;
  readonly storage: string;
  readonly additionalNotes: string;
  readonly soundCard: string;
  readonly vrSupport: string;
}
