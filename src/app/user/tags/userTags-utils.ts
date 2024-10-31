import type { Tag } from '@interfaces/tag';

// Check if a tag is selected
export const isTagSelected = (selectedTags: Tag[], tag: Tag): boolean => {
  return selectedTags.some((selectedTag) => selectedTag.id === tag.id);
};

// Filter and sort tags based on search query and selected status
export const filteredSortedTags = (
  searchQuery: string,
  initialTags: Tag[],
  selectedTags: Tag[]
) => {
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
};
