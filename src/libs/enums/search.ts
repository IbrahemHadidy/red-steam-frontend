/**
 * Enum representing the titles of filters for search results.
 */
export const enum FilterTitle {
  PREFERENCE = 'Preference',
  TAG = 'Tag',
  FEATURE = 'Feature',
  DEVELOPER = 'Developer',
  PUBLISHER = 'Publisher',
  OS = 'OS',
  LANGUAGE = 'Language',
}

/**
 * Enum representing available sorting options for search results.
 * These options allow users to sort items based on criteria like relevance,
 * name, price, release date, user reviews, and sales performance.
 */
export const enum SortOption {
  RELEVANCE = 'Relevance',
  NAME = 'Name',
  LOWEST_PRICE = 'Lowest Price',
  HIGHEST_PRICE = 'Highest Price',
  RELEASE_DATE = 'Release Date',
  USER_REVIEWS = 'User Reviews',
  TOP_SALES = 'Top Sales',
}

/**
 * Enum representing available check types for filters.
 */
export const enum FilterCheckType {
  UNCHECKED = 'UNCHECKED',
  INCLUDED = 'INCLUDED',
  EXCLUDED = 'EXCLUDED',
}

/**
 * Enum representing the keys of the search parameters used in the URL.
 */
export const enum FilterSearchParamKey {
  PRICE_OPTIONS = 'priceOptions',
  PREFERENCES_OPTIONS = 'preferencesOptions',
  TAGS = 'tags',
  EXCLUDED_TAGS = 'excludedTags',
  FEATURES = 'features',
  DEVELOPERS = 'developers',
  PUBLISHERS = 'publishers',
  OS = 'os',
  LANGUAGES = 'languages',
}

/**
 * Enum representing available sort options for search results.
 * These options allow users to sort items based on criteria like relevance,
 * name, price, release date, user reviews, and sales performance.
 */
export const enum SearchDataSortOption {
  RELEVANCE = 'relevance',
  NAME = 'name',
  LOWEST_PRICE = 'lowestPrice',
  HIGHEST_PRICE = 'highestPrice',
  RELEASE_DATE = 'releaseDate',
  USER_REVIEWS = 'reviews',
  TOP_SALES = 'totalSales',
}

export const enum SearchDataUpcomingMode {
  ONLY_UPCOMING = 'onlyUpcoming',
  EXCLUDE_UPCOMING = 'exclude',
}
