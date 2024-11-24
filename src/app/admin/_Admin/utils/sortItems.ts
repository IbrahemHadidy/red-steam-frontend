import type { ItemSortConfig } from '@custom-types/admin';

/**
 * Function for sorting items in the admin panel.
 * @param key - The key of the item to be sorted.
 * @param sortConfig - The current sorting configuration.
 * @returns The updated sorting configuration.
 */
export default function sortItems(key: string, sortConfig: ItemSortConfig): ItemSortConfig {
  // Check if the same key is clicked, then toggle the direction
  if (sortConfig?.key === key) {
    // Toggle the sorting direction
    const newDirection = sortConfig.direction === 'ASC' ? 'DESC' : 'ASC';
    return { key, direction: newDirection };
  }

  // Otherwise, set a new sorting key with ascending order
  return { key, direction: 'ASC' };
}
