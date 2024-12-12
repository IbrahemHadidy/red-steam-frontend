import { FilterTitle, SortOption } from '@enums/search';

export const PRICE_RANGES: { label: string; value: number | null }[] = [
  { label: 'Free', value: 0 },
  { label: 'Under $5.00', value: 5 },
  { label: 'Under $10.00', value: 10 },
  { label: 'Under $15.00', value: 15 },
  { label: 'Under $20.00', value: 20 },
  { label: 'Under $25.00', value: 25 },
  { label: 'Under $30.00', value: 30 },
  { label: 'Under $35.00', value: 35 },
  { label: 'Under $40.00', value: 40 },
  { label: 'Under $45.00', value: 45 },
  { label: 'Under $50.00', value: 50 },
  { label: 'Under $55.00', value: 55 },
  { label: 'Under $60.00', value: 60 },
  { label: 'Any Price', value: null },
];

export const SORT_OPTIONS: SortOption[] = [
  SortOption.RELEVANCE,
  SortOption.NAME,
  SortOption.RELEASE_DATE,
  SortOption.LOWEST_PRICE,
  SortOption.HIGHEST_PRICE,
  SortOption.USER_REVIEWS,
  SortOption.TOP_SALES,
];

export const EXCLUDABLE_FILTER_TITLES: FilterTitle[] = [FilterTitle.TAG];

export const DEFAULT_OPEN_DROPDOWNS: FilterTitle[] = [FilterTitle.FEATURE, FilterTitle.TAG];

export const DROPDOWN_HEIGHTS_BY_CHILD_COUNT: { [key: number]: number } = {
  0: 40,
  1: 70,
  2: 100,
  3: 130,
  4: 160,
  5: 190,
  6: 220,
  7: 250,
  8: 280,
  9: 310,
  10: 340,
};
