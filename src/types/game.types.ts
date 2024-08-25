import type { Developer, Publisher } from 'types/company.types';
import type { Feature } from 'types/feature.types';
import type { Language, LanguageSupportEntry } from 'types/language.types';
import type { ImageEntry, ThumbnailsEntry, VideoEntry } from 'types/media.types';
import type { PlatformEntry } from 'types/platform.types';
import type { Pricing } from 'types/pricing.types';
import type { Review } from 'types/review.types';
import type { SystemRequirementEntry } from 'types/system-requirements.types';
import type { Tag } from 'types/tag.types';

export interface Game {
  id: number;
  name: string;
  category: string;
  description: string;
  releaseDate: Date;
  featured: boolean;
  publishers: Publisher[];
  developers: Developer[];
  thumbnailEntries: ThumbnailsEntry;
  imageEntries: ImageEntry[];
  videoEntries: VideoEntry[];
  tags: Tag[];
  pricing: Pricing;
  gamesFeatures: Feature[];
  languages: Language[];
  languageSupport: LanguageSupportEntry[];
  platformEntries: PlatformEntry;
  link: string | null;
  about: string;
  mature: boolean;
  matureDescription: string;
  systemRequirements: SystemRequirementEntry;
  legal: string;
  reviews: Review[];
  totalSales: number;
  averageRating: number;
  reviewsCount: number;
}
