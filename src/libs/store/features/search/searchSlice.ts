// Redux
import { createAction, createSlice } from '@reduxjs/toolkit';

// Thunks
import { fetchSearchResults } from './searchThunks';

// Types
import type { FilterState, RequestParams, SortOption } from '@custom-types/search';
import type { Game } from '@interfaces/game';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { FetchSearchResultsFulfillValue } from './searchThunks';

interface SearchState {
  readonly isSearchInitialized: boolean;
  readonly isFetchDisabled: boolean;

  readonly sortOption: SortOption;
  readonly searchInputValue: string;
  readonly searchQuery: string;
  readonly priceRange: number;
  readonly hasMoreResults: boolean;
  readonly filters: FilterState;

  readonly requestParams: RequestParams;
  readonly searchUrl: string;

  readonly searchResults: Game[];
}

// Initial state
const searchState: SearchState = {
  isSearchInitialized: false,
  isFetchDisabled: false,

  sortOption: 'Relevance',
  searchInputValue: 'enter game name',
  searchQuery: '',
  priceRange: 13,
  hasMoreResults: true,
  filters: {
    price: [
      { id: 1, name: 'Special Offers', check: 'unchecked' },
      { id: 2, name: 'Hide free to play games', check: 'unchecked' },
    ],
    preferences: [
      { id: 1, name: 'Featured only', check: 'unchecked' },
      { id: 6, name: 'Exclude mature', check: 'unchecked' },
      { id: 7, name: 'Exclude upcoming', check: 'unchecked' },
    ],
    os: [
      { id: 1, name: 'Windows', check: 'unchecked' },
      { id: 2, name: 'macOS', check: 'unchecked' },
    ],
    tags: [],
    publishers: [],
    developers: [],
    features: [],
    languages: [],
  },

  requestParams: {
    searchData: {},
    pagination: { page: 1, limit: 20 },
  },
  searchUrl: '/search',

  searchResults: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState: searchState,

  reducers: {
    setIsSearchInitialized: (state, action: PayloadAction<boolean>) => {
      state.isSearchInitialized = action.payload;
    },
    setIsFetchDisabled: (state, action: PayloadAction<boolean>) => {
      state.isFetchDisabled = action.payload;
    },

    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortOption = action.payload;
    },
    setSearchInputValue: (state, action: PayloadAction<string>) => {
      state.searchInputValue = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
    setHasMoreResults: (state, action: PayloadAction<boolean>) => {
      state.hasMoreResults = action.payload;
    },

    updateFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    checkFilter: (
      state,
      action: PayloadAction<{
        filterType: keyof FilterState;
        check: 'included' | 'excluded';
        id: number;
      }>
    ) => {
      const { filterType, check, id } = action.payload;

      state.filters[filterType] = state.filters[filterType].map((filter) =>
        filter.id === id ? { ...filter, check } : filter
      );
    },
    uncheckFilter: (
      state,
      action: PayloadAction<{ filterType: keyof FilterState; id: number }>
    ) => {
      const { filterType, id } = action.payload;

      state.filters[filterType] = state.filters[filterType].map((filter) =>
        filter.id === id ? { ...filter, check: 'unchecked' } : filter
      );
    },
    uncheckHideFreeToPlay: (state) => {
      state.filters.price[0].check = 'unchecked';
    },
    addUserPreferences: (state) => {
      state.filters.preferences.push(
        { id: 2, name: 'Hide items in my library', check: 'unchecked' },
        { id: 3, name: 'Hide items in my wishlist', check: 'unchecked' },
        { id: 4, name: 'Hide items in my cart', check: 'unchecked' }
      );
    },
    removeUserPreferences: (state) => {
      state.filters.preferences = state.filters.preferences.filter(
        (item) => item.id !== 2 && item.id !== 3 && item.id !== 4
      );
    },

    setRequestParams: (state, action: PayloadAction<RequestParams>) => {
      state.requestParams = action.payload;
    },
    setSearchUrl: (state, action: PayloadAction<string>) => {
      state.searchUrl = action.payload;
    },

    setSearchResults: (state, action: PayloadAction<Game[]>) => {
      state.searchResults = action.payload;
    },
    resetSearchResults: (state) => {
      state.searchResults = [];
    },

    resetSearch: () => searchState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.isFetchDisabled = true;
      })
      .addCase(
        fetchSearchResults.fulfilled,
        (state, action: PayloadAction<FetchSearchResultsFulfillValue>) => {
          const { games, hasMoreResults } = action.payload;

          state.isFetchDisabled = false;
          state.searchResults = games;
          state.hasMoreResults = hasMoreResults;
        }
      )
      .addCase(fetchSearchResults.rejected, (state) => {
        state.isFetchDisabled = false;
      });
  },
});

// Listener actions
export const initializeSearch = createAction<string>('search/initializeSearch');

export const {
  setIsSearchInitialized,
  setIsFetchDisabled,
  setSortOption,
  setSearchInputValue,
  setSearchQuery,
  setPriceRange,
  setHasMoreResults,
  updateFilters,
  checkFilter,
  uncheckFilter,
  uncheckHideFreeToPlay,
  addUserPreferences,
  removeUserPreferences,
  setRequestParams,
  setSearchUrl,
  setSearchResults,
  resetSearchResults,
  resetSearch,
} = searchSlice.actions;
export default searchSlice;
