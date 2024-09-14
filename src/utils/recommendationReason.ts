import { Tag } from '@entities/tag.entity';

const isTagInUserTags = (gametags: Tag[], userTags: Tag[]): boolean => {
  if (gametags.length === 0 || userTags.length === 0) {
    return false;
  }

  const userTagNames = new Set(userTags.map((ut) => ut.name));
  const commonTagsCount = gametags.reduce((count, gt) => {
    if (userTagNames.has(gt.name)) {
      return count + 1;
    }
    return count;
  }, 0);

  return commonTagsCount >= 3;
};

export default isTagInUserTags;
