import type { Company } from '@entities/company.entity';
import type { Feature } from '@entities/feature.entity';
import type { Game } from '@entities/game.entity';
import type { Language } from '@entities/language.entity';
import type { Pricing } from '@entities/pricing.entity';
import type { Review } from '@entities/review.entity';
import type { Tag } from '@entities/tag.entity';

export const isFeature = (obj: object): obj is Feature => {
  return 'id' in obj && 'name' in obj && 'link' in obj && 'icon' in obj;
};

export const isCompany = (obj: object): obj is Company => {
  return 'id' in obj && 'name' in obj && 'website' in obj;
};

export const isTag = (obj: object): obj is Tag => {
  return 'id' in obj && 'name' in obj;
};

export const isLanguage = (obj: object): obj is Language => {
  return 'id' in obj && 'name' in obj;
};

export const isReview = (obj: object): obj is Review => {
  return 'id' in obj && 'positive' in obj && 'date' in obj && 'content' in obj;
};

export const isGame = (obj: object): obj is Game => {
  return 'id' in obj && 'name' in obj && 'category' in obj && 'description' in obj;
};

export const isPricing = (obj: object): obj is Pricing => {
  return 'id' in obj && 'free' in obj && 'basePrice' in obj;
};
