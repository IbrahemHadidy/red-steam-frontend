import type { Tag } from '@interfaces/tag';

/**
 * Check if a tag is selected
 * @param selectedTags The selected tags
 * @param tag The tag to check
 * @returns True if the tag is selected, false otherwise
 */
export default function isTagSelected(selectedTags: Tag[], tag: Tag): boolean {
  return selectedTags.some((selectedTag) => selectedTag.id === tag.id);
}
