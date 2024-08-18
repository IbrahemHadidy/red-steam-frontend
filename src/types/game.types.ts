import { Developer, Publisher } from 'types/company.types';
import { Feature } from 'types/feature.types';
import { Language, LanguageSupportEntry } from 'types/language.types';
import { ImageEntry, ThumbnailsEntry, VideoEntry } from 'types/media.types';
import { PlatformEntry } from 'types/platform.types';
import { Pricing } from 'types/pricing.types';
import { Review } from 'types/review.types';
import { SystemRequirementEntry } from 'types/system-requirements.types';
import { Tag } from 'types/tag.types';

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
