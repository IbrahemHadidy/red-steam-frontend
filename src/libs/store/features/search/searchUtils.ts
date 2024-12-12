// Thunks

// Utils
import Decimal from 'decimal.js';

// Constants
import { PRICE_RANGES } from '@config/constants/search';

// Enums
import {
  FilterCheckType,
  FilterSearchParamKey,
  SearchDataSortOption,
  SearchDataUpcomingMode,
  SortOption,
} from '@enums/search';

// Types
import type { FilterState, RequestParams } from '@custom-types/search';
import type { User } from '@interfaces/user';

//----------------------------- Initialize filters --------------------------------//
export const initializeFilterData = <T extends { id: number; name: string }>(
  items: T[]
): { id: number; name: string; check: FilterCheckType.Unchecked }[] =>
  items.map(({ id, name }) => ({ id, name, check: FilterCheckType.Unchecked }));

//----------------------- Update filters from search params -----------------------//
export const setFiltersFromSearchParams = (
  baseFilters: FilterState,
  searchParams: URLSearchParams
): Partial<FilterState> => {
  const updatedFilters: Partial<FilterState> = {};

  const fieldsToUpdate: {
    key: FilterSearchParamKey;
    field: keyof FilterState;
    status: FilterCheckType;
  }[] = [
    { key: FilterSearchParamKey.PriceOptions, field: 'price', status: FilterCheckType.Included },
    {
      key: FilterSearchParamKey.PreferencesOptions,
      field: 'preferences',
      status: FilterCheckType.Included,
    },
    { key: FilterSearchParamKey.Tags, field: 'tags', status: FilterCheckType.Included },
    { key: FilterSearchParamKey.ExcludedTags, field: 'tags', status: FilterCheckType.Excluded },
    { key: FilterSearchParamKey.Features, field: 'features', status: FilterCheckType.Included },
    {
      key: FilterSearchParamKey.Developers,
      field: 'developers',
      status: FilterCheckType.Included,
    },
    {
      key: FilterSearchParamKey.Publishers,
      field: 'publishers',
      status: FilterCheckType.Included,
    },
    { key: FilterSearchParamKey.OS, field: 'os', status: FilterCheckType.Included },
    { key: FilterSearchParamKey.Languages, field: 'languages', status: FilterCheckType.Included },
  ];

  fieldsToUpdate.forEach(({ key, field, status }) => {
    const options =
      searchParams
        ?.get(key)
        ?.split(',')
        .map((id) => Number(id)) ?? [];

    if (options.length) {
      updatedFilters[field] = baseFilters[field].map((row) =>
        options.includes(row.id) ? { ...row, check: status } : row
      );
    }
  });

  return { ...baseFilters, ...updatedFilters };
};

//----------------------- Update search params from filters -----------------------//
export const getNewSearchUrl = (
  filters: FilterState,
  rangeValue: number,
  sortOption: string,
  searchQuery: string
) => {
  const createQueryString = (key: string, value: string | number | number[]): string => {
    if (Array.isArray(value)) {
      return value.length > 0 ? `${key}=${value.join(',')}` : '';
    }
    return value || value === 0 ? `${key}=${encodeURIComponent(value)}` : '';
  };

  const priceValue = (rangeValue: number) =>
    PRICE_RANGES[rangeValue].value !== null ? PRICE_RANGES[rangeValue].value : '';

  const queryParams = [
    createQueryString('term', searchQuery),
    createQueryString('sort', sortOption),
    createQueryString('maxPrice', priceValue(rangeValue)),
    createQueryString(
      'priceOptions',
      filters.price.filter((f) => f.check === FilterCheckType.Included).map((f) => f.id)
    ),
    createQueryString(
      'preferencesOptions',
      filters.preferences.filter((f) => f.check === FilterCheckType.Included).map((f) => f.id)
    ),
    createQueryString(
      'tags',
      filters.tags.filter((f) => f.check === FilterCheckType.Included).map((f) => f.id)
    ),
    createQueryString(
      'os',
      filters.os.filter((f) => f.check === FilterCheckType.Included).map((f) => f.id)
    ),
    createQueryString(
      'excludedTags',
      filters.tags.filter((f) => f.check === FilterCheckType.Excluded).map((f) => f.id)
    ),
    createQueryString(
      'features',
      filters.features.filter((f) => f.check === FilterCheckType.Included).map((f) => f.id)
    ),
    createQueryString(
      'developers',
      filters.developers.filter((f) => f.check === FilterCheckType.Included).map((f) => f.id)
    ),
    createQueryString(
      'publishers',
      filters.publishers.filter((f) => f.check === FilterCheckType.Included).map((f) => f.id)
    ),
    createQueryString(
      'languages',
      filters.languages.filter((f) => f.check === FilterCheckType.Included).map((f) => f.id)
    ),
  ];

  const baseURL = '/search';
  const queryString = queryParams.filter((param) => param !== '').join('&');
  return queryString ? `${baseURL}?${queryString}` : baseURL;
};

//----------------------- Update request params from filters ----------------------//
export const getNewRequestParams = (
  filters: FilterState,
  rangeValue: number,
  sortOption: SortOption,
  searchQuery: string,
  currentUserData: User | null
) => {
  const searchData: RequestParams['searchData'] = {};

  // Get saved search value
  if (searchQuery !== '') searchData.partialName = searchQuery;

  // Get sort option
  if (sortOption === SortOption.Relevance) {
    searchData.sort = SearchDataSortOption.Relevance;
  } else if (sortOption === SortOption.Name) {
    searchData.sort = SearchDataSortOption.Name;
  } else if (sortOption === SortOption.LowestPrice) {
    searchData.sort = SearchDataSortOption.LowestPrice;
  } else if (sortOption === SortOption.HighestPrice) {
    searchData.sort = SearchDataSortOption.HighestPrice;
  } else if (sortOption === SortOption.ReleaseDate) {
    searchData.sort = SearchDataSortOption.ReleaseDate;
  } else if (sortOption === SortOption.UserReviews) {
    searchData.sort = SearchDataSortOption.UserReviews;
  } else if (sortOption === SortOption.TopSales) {
    searchData.sort = SearchDataSortOption.TotalSales;
  }

  // Get price range
  if (PRICE_RANGES[rangeValue].value !== null) {
    searchData.maxPrice = new Decimal(PRICE_RANGES[rangeValue].value).toDecimalPlaces(2).toString();
  }

  // Get tags
  if (filters.tags.filter((f) => f.check === FilterCheckType.Included).length > 0) {
    searchData.tags = filters.tags
      .filter((f) => f.check === FilterCheckType.Included)
      .map((f) => f.id);
  }

  // Get excluded tags
  if (filters.tags.filter((f) => f.check === FilterCheckType.Excluded).length > 0) {
    searchData.excludeTags = filters.tags
      .filter((f) => f.check === FilterCheckType.Excluded)
      .map((f) => f.id);
  }

  // Get paid only
  if (
    filters.price.filter(
      (f) => f.name === 'Hide free to play games' && f.check === FilterCheckType.Included
    ).length > 0
  ) {
    searchData.paid = true;
  }

  // Get offers only
  if (
    filters.price.filter((f) => f.name === 'Special Offers' && f.check === FilterCheckType.Included)
      .length > 0
  ) {
    searchData.offers = true;
  }

  // Get platforms
  if (filters.os.filter((f) => f.check === FilterCheckType.Included).length > 0) {
    const platforms = filters.os
      .filter((f) => f.check === FilterCheckType.Included)
      .map((f) => f.name);
    const convertedPlatforms: ('win' | 'mac')[] = platforms
      .map((platform) => {
        if (platform === 'macOS') {
          return 'mac';
        }
        if (platform === 'Windows') {
          return 'win';
        }
      })
      .filter((platform) => platform !== undefined);

    searchData.platforms = convertedPlatforms;
  }

  // Get publishers
  if (filters.publishers.filter((f) => f.check === FilterCheckType.Included).length > 0) {
    searchData.publishers = filters.publishers
      .filter((f) => f.check === FilterCheckType.Included)
      .map((f) => f.id);
  }

  // Get developers
  if (filters.developers.filter((f) => f.check === FilterCheckType.Included).length > 0) {
    searchData.developers = filters.developers
      .filter((f) => f.check === FilterCheckType.Included)
      .map((f) => f.id);
  }

  // Get features
  if (filters.features.filter((f) => f.check === FilterCheckType.Included).length > 0) {
    searchData.features = filters.features
      .filter((f) => f.check === FilterCheckType.Included)
      .map((f) => f.id);
  }

  // Get languages
  if (filters.languages.filter((f) => f.check === FilterCheckType.Included).length > 0) {
    searchData.languages = filters.languages
      .filter((f) => f.check === FilterCheckType.Included)
      .map((f) => f.id);
  }

  // Get featured only
  if (
    filters.preferences.filter(
      (f) => f.name === 'Featured only' && f.check === FilterCheckType.Included
    ).length > 0
  ) {
    searchData.featured = true;
  }

  // Get exclude mature
  if (
    filters.preferences.filter(
      (f) => f.name === 'Exclude mature' && f.check === FilterCheckType.Included
    ).length > 0
  ) {
    searchData.excludeMature = true;
  }

  // Get exclude upcoming
  if (
    filters.preferences.filter(
      (f) => f.name === 'Exclude upcoming games' && f.check === FilterCheckType.Included
    ).length > 0
  ) {
    searchData.upcomingMode = SearchDataUpcomingMode.ExcludeUpcoming;
  }

  // Get excluded games ids
  if (currentUserData) {
    const newExcludedIds = new Set<number>();

    const wishlistFilter = filters.preferences.find((f) => f.name === 'Hide items in my wishlist');
    const cartFilter = filters.preferences.find((f) => f.name === 'Hide items in my cart');
    const libraryFilter = filters.preferences.find((f) => f.name === 'Hide items in my library');

    if (wishlistFilter && wishlistFilter.check === FilterCheckType.Included) {
      currentUserData.wishlist.forEach((item) => newExcludedIds.add(item.id));
    }
    if (cartFilter && cartFilter.check === FilterCheckType.Included) {
      currentUserData.cart.forEach((item) => newExcludedIds.add(item.id));
    }
    if (libraryFilter && libraryFilter.check === FilterCheckType.Included) {
      currentUserData.library.forEach((item) => newExcludedIds.add(item.id));
    }

    // Update searchData with the newly computed excluded game IDs.
    searchData.excludedGames = Array.from(newExcludedIds);
  }

  return searchData;
};
