import type { ItemSortConfig } from '@custom-types/admin';

export type SortArrow = '▲' | '▼' | '';

/**
 * Get the sort arrow based on the provided key and sort configuration.
 * @param key - The key to check for sorting.
 * @param sortConfig - The sort configuration object.
 * @returns - The sort arrow ('▲' for ascending, '▼' for descending, or an empty string for non-sorted columns).
 */
export default function getSortArrow(key: string, sortConfig: ItemSortConfig): SortArrow {
  if (key === sortConfig.key) {
    return sortConfig.direction === 'ASC' ? '▲' : '▼';
  }
  return ''; // No arrow for non-sorted columns
}
