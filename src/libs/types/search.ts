import type { FilterCheckType, SearchDataSortOption, SearchDataUpcomingMode } from '@enums/search';

/**
 * Type representing available filter options for search results.
 * These options allow users to filter items based on various criteria,
 * such as price, preference, tags, operating system, publisher, developer,
 * features, and language.
 */
export interface Filter {
  id: number;
  name: string;
  check: FilterCheckType;
}

/**
 * Type representing the state of filters for search results.
 * It includes an array of filters for each available filter option.
 */
export interface FilterState {
  price: Filter[];
  preferences: Filter[];
  os: Filter[];
  tags: Filter[];
  publishers: Filter[];
  developers: Filter[];
  features: Filter[];
  languages: Filter[];
}

/**
 * Type representing the parameters for a search request.
 * It includes a search data object and a pagination object.
 */
export interface RequestParams {
  searchData: {
    sort?: SearchDataSortOption;
    partialName?: string;
    maxPrice?: string;
    tags?: number[];
    excludeTags?: number[];
    paid?: boolean;
    offers?: boolean;
    platforms?: ('win' | 'mac')[];
    publishers?: number[];
    developers?: number[];
    features?: number[];
    languages?: number[];
    featured?: boolean;
    excludeMature?: boolean;
    excludedGames?: number[];
    upcomingMode?: SearchDataUpcomingMode;
  };
  pagination: { page: number; limit: number };
}
