import type { Company } from '@entities/company.entity';
import type { Feature } from '@entities/feature.entity';
import type { Game } from '@entities/game.entity';
import type { Language } from '@entities/language.entity';
import type { Pricing } from '@entities/pricing.entity';
import type { Review } from '@entities/review.entity';
import type { Tag } from '@entities/tag.entity';
import type { User } from '@entities/user.entity';

/**
 * Type guard to check if an object is a game
 * @param obj The object to check
 * @returns True if the object is a game and false otherwise
 */
export function isFeature(obj: object): obj is Feature {
  return 'id' in obj && 'name' in obj && 'icon' in obj;
}

/**
 * Type guard to check if an object is a game
 * @param obj The object to check
 * @returns True if the object is a game and false otherwise
 */
export function isCompany(obj: object): obj is Company {
  return 'id' in obj && 'name' in obj && 'website' in obj;
}

/**
 * Type guard to check if an object is a game
 * @param obj The object to check
 * @returns True if the object is a game and false otherwise
 */
export function isTag(obj: object): obj is Tag {
  return 'id' in obj && 'name' in obj;
}

/**
 * Type guard to check if an object is a game
 * @param obj The object to check
 * @returns True if the object is a game and false otherwise
 */
export function isLanguage(obj: object): obj is Language {
  return 'id' in obj && 'name' in obj;
}

/**
 * Type guard to check if an object is a game
 * @param obj The object to check
 * @returns True if the object is a game and false otherwise
 */
export function isReview(obj: object): obj is Review {
  return 'id' in obj && 'positive' in obj && 'date' in obj && 'content' in obj;
}

/**
 * Type guard to check if an object is a game
 * @param obj The object to check
 * @returns True if the object is a game and false otherwise
 */
export function isUser(obj: object): obj is User {
  return 'id' in obj && 'username' in obj && 'email' in obj;
}

/**
 * Type guard to check if an object is a game
 * @param obj The object to check
 * @returns True if the object is a game and false otherwise
 */
export function isGame(obj: object): obj is Game {
  return 'id' in obj && 'name' in obj && 'category' in obj && 'description' in obj;
}

/**
 * Type guard to check if an object is a game
 * @param obj The object to check
 * @returns True if the object is a game and false otherwise
 */
export function isPricing(obj: object): obj is Pricing {
  return 'id' in obj && 'free' in obj && 'basePrice' in obj;
}
