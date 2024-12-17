/**
 * Enum representing the titles of filters for search results.
 */
export const enum FilterTitle {
  Preference = 'Preference',
  Tag = 'Tag',
  Feature = 'Feature',
  Developer = 'Developer',
  Publisher = 'Publisher',
  OS = 'OS',
  Language = 'Language',
}

/**
 * Enum representing available sorting options for search results.
 * These options allow users to sort items based on criteria like relevance,
 * name, price, release date, user reviews, and sales performance.
 */
export const enum SortOption {
  Relevance = 'Relevance',
  Name = 'Name',
  LowestPrice = 'Lowest Price',
  HighestPrice = 'Highest Price',
  ReleaseDate = 'Release Date',
  UserReviews = 'User Reviews',
  TopSales = 'Top Sales',
}

/**
 * Enum representing available check types for filters.
 */
export const enum FilterCheckType {
  Unchecked = 'Unchecked',
  Included = 'Included',
  Excluded = 'Excluded',
}

/**
 * Enum representing the keys of the search parameters used in the URL.
 */
export const enum FilterSearchParamKey {
  PriceOptions = 'priceOptions',
  PreferencesOptions = 'preferencesOptions',
  Tags = 'tags',
  ExcludedTags = 'excludedTags',
  Features = 'features',
  Developers = 'developers',
  Publishers = 'publishers',
  OS = 'os',
  Languages = 'languages',
}

/**
 * Enum representing available sort options for search results.
 * These options allow users to sort items based on criteria like relevance,
 * name, price, release date, user reviews, and sales performance.
 */
export const enum SearchDataSortOption {
  Relevance = 'relevance',
  Name = 'name',
  LowestPrice = 'lowestPrice',
  HighestPrice = 'highestPrice',
  ReleaseDate = 'releaseDate',
  UserReviews = 'reviews',
  TotalSales = 'totalSales',
}

/**
 * Enum representing available upcoming modes for search results.
 */
export const enum SearchDataUpcomingMode {
  OnlyUpcoming = 'onlyUpcoming',
  ExcludeUpcoming = 'exclude',
}
