import { Tag } from 'types/tag.types';

const isTagInUserTags = (gametags: Tag[], userTags: Tag[]): boolean => {
  const commonTags: string[] = gametags
    .filter((gt) => userTags.some((ut) => ut.name === gt.name))
    .map((gt) => gt.name);

  return commonTags.length >= 3;
};

export default isTagInUserTags;
