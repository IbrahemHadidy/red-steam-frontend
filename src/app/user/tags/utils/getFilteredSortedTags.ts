import type { Tag } from '@interfaces/tag';

/**
 * Filter and sort tags based on search query and selected status
 * @param searchQuery The search query
 * @param initialTags The initial tags
 * @param selectedTags The selected tags
 * @returns The filtered and sorted tags
 */
export default function getFilteredSortedTags(
  searchQuery: string,
  initialTags: Tag[],
  selectedTags: Tag[]
): Tag[] {
  const normalizedQuery = searchQuery.toLowerCase();

  return initialTags
    .filter((tag) => tag.name.toLowerCase().includes(normalizedQuery))
    .sort((a, b) => {
      const aSelected = selectedTags.some((selectedTag) => selectedTag.name === a.name);
      const bSelected = selectedTags.some((selectedTag) => selectedTag.name === b.name);

      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;

      // Sort alphabetically if both are selected/unselected
      return a.name.localeCompare(b.name);
    });
}
