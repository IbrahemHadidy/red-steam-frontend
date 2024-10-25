import type { Tag } from '@interfaces/tag';

const MINIMUM_COMMON_TAGS = 3;

/**
 * Check if a game has at least the minimum common tags with the user
 * @param gametags
 * @param userTags
 * @returns true if the game has at least the minimum common tags with the user
 */
export default function isTagInUserTags(gametags: Tag[], userTags: Tag[]): boolean {
  if (gametags.length === 0 || userTags.length === 0) return false;

  const userTagNames = new Set(userTags.map((ut) => ut.name));
  const commonTagsCount = gametags.reduce((count, gt) => {
    if (userTagNames.has(gt.name)) return count + 1;
    return count;
  }, 0);

  return commonTagsCount >= MINIMUM_COMMON_TAGS;
}
