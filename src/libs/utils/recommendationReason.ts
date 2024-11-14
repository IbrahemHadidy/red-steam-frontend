import type { Game } from '@interfaces/game';
import type { Tag } from '@interfaces/tag';
import type { User } from '@interfaces/user';

const MINIMUM_COMMON_TAGS = 3;

/**
 * Check if a game has at least the minimum common tags with the user
 * @param gametags
 * @param userTags
 * @returns true if the game has at least the minimum common tags with the user
 */
export function isTagInUserTags(gametags: Tag[], userTags: Tag[]): boolean {
  if (gametags.length === 0 || userTags.length === 0) return false;

  const userTagNames = new Set(userTags.map((ut) => ut.name));
  const commonTagsCount = gametags.reduce((count, gt) => {
    if (userTagNames.has(gt.name)) return count + 1;
    return count;
  }, 0);

  return commonTagsCount >= MINIMUM_COMMON_TAGS;
}

/**
 * Get recommendation class
 * @param game The current game to get recommendation class for
 * @param currentUserData The current user
 * @returns
 */
export const getRecommendationClass = (game: Game, currentUserData?: User): string => {
  if (!currentUserData) return 'available';
  if (isTagInUserTags(game.tags ?? [], currentUserData.tags ?? [])) return 'recommended';
  return 'available';
};
