import isTagInUserTags from '@utils/recommendationReason';

import type { Game } from '@entities/game.entity';
import type { User } from '@entities/user.entity';

/**
 * Get recommendation class
 * @param slide The current game slide
 * @param currentUserData The current user
 * @returns
 */
const getRecommendationClass = (slide: Game, currentUserData?: User): string => {
  if (!currentUserData) return 'available';
  if (isTagInUserTags(slide.tags || [], currentUserData.tags || [])) return 'recommended';
  return 'available';
};

export default getRecommendationClass;
