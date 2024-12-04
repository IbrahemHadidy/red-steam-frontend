// Thunks

// Utils
import Decimal from 'decimal.js';

// Constants
import { PRICE_RANGES } from '@config/constants/search';

// Types
import type {
  FilterSearchParamKey,
  FilterState,
  RequestParams,
  SortOption,
} from '@custom-types/search';
import type { User } from '@interfaces/user';

//----------------------------- Initialize filters --------------------------------//
export const initializeFilterData = <T extends { id: number; name: string }>(
  items: T[]
): { id: number; name: string; check: 'unchecked' }[] =>
  items.map(({ id, name }) => ({ id, name, check: 'unchecked' }));

//----------------------- Update filters from search params -----------------------//
export const setFiltersFromSearchParams = (
  baseFilters: FilterState,
  searchParams: URLSearchParams
): Partial<FilterState> => {
  const updatedFilters: Partial<FilterState> = {};

  const fieldsToUpdate: {
    key: FilterSearchParamKey;
    field: keyof FilterState;
    status: 'included' | 'excluded';
  }[] = [
    { key: 'priceOptions', field: 'price', status: 'included' },
    { key: 'preferencesOptions', field: 'preferences', status: 'included' },
    { key: 'tags', field: 'tags', status: 'included' },
    { key: 'excludedTags', field: 'tags', status: 'excluded' },
    { key: 'features', field: 'features', status: 'included' },
    { key: 'developers', field: 'developers', status: 'included' },
    { key: 'publishers', field: 'publishers', status: 'included' },
    { key: 'os', field: 'os', status: 'included' },
    { key: 'languages', field: 'languages', status: 'included' },
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
      filters.price.filter((f) => f.check === 'included').map((f) => f.id)
    ),
    createQueryString(
      'preferencesOptions',
      filters.preferences.filter((f) => f.check === 'included').map((f) => f.id)
    ),
    createQueryString(
      'tags',
      filters.tags.filter((f) => f.check === 'included').map((f) => f.id)
    ),
    createQueryString(
      'os',
      filters.os.filter((f) => f.check === 'included').map((f) => f.id)
    ),
    createQueryString(
      'excludedTags',
      filters.tags.filter((f) => f.check === 'excluded').map((f) => f.id)
    ),
    createQueryString(
      'features',
      filters.features.filter((f) => f.check === 'included').map((f) => f.id)
    ),
    createQueryString(
      'developers',
      filters.developers.filter((f) => f.check === 'included').map((f) => f.id)
    ),
    createQueryString(
      'publishers',
      filters.publishers.filter((f) => f.check === 'included').map((f) => f.id)
    ),
    createQueryString(
      'languages',
      filters.languages.filter((f) => f.check === 'included').map((f) => f.id)
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
  if (sortOption === 'Relevance') {
    searchData.sort = 'relevance';
  } else if (sortOption === 'Name') {
    searchData.sort = 'name';
  } else if (sortOption === 'Lowest Price') {
    searchData.sort = 'lowestPrice';
  } else if (sortOption === 'Highest Price') {
    searchData.sort = 'highestPrice';
  } else if (sortOption === 'Release Date') {
    searchData.sort = 'releaseDate';
  } else if (sortOption === 'User Reviews') {
    searchData.sort = 'reviews';
  } else if (sortOption === 'Top Sales') {
    searchData.sort = 'totalSales';
  }

  // Get price range
  if (PRICE_RANGES[rangeValue].value !== null) {
    searchData.maxPrice = new Decimal(PRICE_RANGES[rangeValue].value).toDecimalPlaces(2).toString();
  }

  // Get tags
  if (filters.tags.filter((f) => f.check === 'included').length > 0) {
    searchData.tags = filters.tags.filter((f) => f.check === 'included').map((f) => f.id);
  }

  // Get excluded tags
  if (filters.tags.filter((f) => f.check === 'excluded').length > 0) {
    searchData.excludeTags = filters.tags.filter((f) => f.check === 'excluded').map((f) => f.id);
  }

  // Get paid only
  if (
    filters.price.filter((f) => f.name === 'Hide free to play games' && f.check === 'included')
      .length > 0
  ) {
    searchData.paid = true;
  }

  // Get offers only
  if (
    filters.price.filter((f) => f.name === 'Special Offers' && f.check === 'included').length > 0
  ) {
    searchData.offers = true;
  }

  // Get platforms
  if (filters.os.filter((f) => f.check === 'included').length > 0) {
    const platforms = filters.os.filter((f) => f.check === 'included').map((f) => f.name);
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
  if (filters.publishers.filter((f) => f.check === 'included').length > 0) {
    searchData.publishers = filters.publishers
      .filter((f) => f.check === 'included')
      .map((f) => f.id);
  }

  // Get developers
  if (filters.developers.filter((f) => f.check === 'included').length > 0) {
    searchData.developers = filters.developers
      .filter((f) => f.check === 'included')
      .map((f) => f.id);
  }

  // Get features
  if (filters.features.filter((f) => f.check === 'included').length > 0) {
    searchData.features = filters.features.filter((f) => f.check === 'included').map((f) => f.id);
  }

  // Get languages
  if (filters.languages.filter((f) => f.check === 'included').length > 0) {
    searchData.languages = filters.languages.filter((f) => f.check === 'included').map((f) => f.id);
  }

  // Get featured only
  if (
    filters.preferences.filter((f) => f.name === 'Featured only' && f.check === 'included').length >
    0
  ) {
    searchData.featured = true;
  }

  // Get exclude mature
  if (
    filters.preferences.filter((f) => f.name === 'Exclude mature' && f.check === 'included')
      .length > 0
  ) {
    searchData.excludeMature = true;
  }

  // Get exclude upcoming
  if (
    filters.preferences.filter((f) => f.name === 'Exclude upcoming games' && f.check === 'included')
      .length > 0
  ) {
    searchData.upcomingMode = 'exclude';
  }

  // Get excluded games ids
  if (currentUserData) {
    const newExcludedIds = new Set<number>();

    const wishlistFilter = filters.preferences.find((f) => f.name === 'Hide items in my wishlist');
    const cartFilter = filters.preferences.find((f) => f.name === 'Hide items in my cart');
    const libraryFilter = filters.preferences.find((f) => f.name === 'Hide items in my library');

    if (wishlistFilter && wishlistFilter.check === 'included') {
      currentUserData.wishlist.forEach((item) => newExcludedIds.add(item.id));
    }
    if (cartFilter && cartFilter.check === 'included') {
      currentUserData.cart.forEach((item) => newExcludedIds.add(item.id));
    }
    if (libraryFilter && libraryFilter.check === 'included') {
      currentUserData.library.forEach((item) => newExcludedIds.add(item.id));
    }

    // Update searchData with the newly computed excluded game IDs.
    searchData.excludedGames = Array.from(newExcludedIds);
  }

  return searchData;
};
