import RecommendationStatus from '@enums/recommendation-status';

import type { Game } from '@interfaces/game';
import type { Tag } from '@interfaces/tag';
import type { User } from '@interfaces/user';

const MINIMUM_COMMON_TAGS = 3;

/**
 * Check if a game has at least the minimum number of common tags with the user.
 * @param gametags Tags associated with the game.
 * @param userTags Tags associated with the user.
 * @returns True if the game has at least the minimum number of common tags with the user.
 */
export function hasMinimumCommonTags(gametags: Tag[], userTags: Tag[]): boolean {
  if (!gametags?.length || !userTags?.length) return false;

  const userTagIds = new Set(userTags.map((ut) => ut.id));
  const commonTagsCount = gametags.filter((gt) => userTagIds.has(gt.id)).length;

  return commonTagsCount >= MINIMUM_COMMON_TAGS;
}

/**
 * Determine the recommendation class for a game based on user data.
 * @param game The current game to evaluate.
 * @param currentUserData The current user's data (optional).
 * @returns The recommendation class for the game ('recommended' or 'available').
 */
export function getRecommendationClass(game: Game, currentUserData?: User): RecommendationStatus {
  const gameTags = game.tags ?? [];
  const userTags = currentUserData?.tags ?? [];
  if (gameTags.length < 3 || userTags.length < 3) return RecommendationStatus.AVAILABLE;

  return hasMinimumCommonTags(gameTags, userTags)
    ? RecommendationStatus.RECOMMENDED
    : RecommendationStatus.AVAILABLE;
}
