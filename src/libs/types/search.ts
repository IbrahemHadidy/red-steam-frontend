/**
 * Type representing the title of a filter block.
 */
export type FilterTitle =
  | 'Preference'
  | 'Tag'
  | 'Feature'
  | 'Developer'
  | 'Publisher'
  | 'OS'
  | 'Language';

/**
 * Type representing available sorting options for search results.
 * These options allow users to sort items based on criteria like relevance,
 * name, price, release date, user reviews, and sales performance.
 */
export type SortOption =
  | 'Relevance'
  | 'Name'
  | 'Lowest Price'
  | 'Highest Price'
  | 'Release Date'
  | 'User Reviews'
  | 'Top Sales';

/**
 * Type representing available filter options for search results.
 * These options allow users to filter items based on various criteria,
 * such as price, preference, tags, operating system, publisher, developer,
 * features, and language.
 */
export interface Filter {
  id: number;
  name: string;
  check: 'unchecked' | 'included' | 'excluded';
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
 * Type representing the keys of the search parameters used in the URL.
 */
export type FilterSearchParamKey =
  | 'priceOptions'
  | 'preferencesOptions'
  | 'tags'
  | 'excludedTags'
  | 'features'
  | 'developers'
  | 'publishers'
  | 'os'
  | 'languages';

/**
 * Type representing the parameters for a search request.
 * It includes a search data object and a pagination object.
 */
export interface RequestParams {
  searchData: {
    sort?:
      | 'relevance'
      | 'name'
      | 'lowestPrice'
      | 'highestPrice'
      | 'releaseDate'
      | 'reviews'
      | 'totalSales';
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
    upcomingMode?: 'onlyUpcoming' | 'exclude';
  };
  pagination: { page: number; limit: number };
}
