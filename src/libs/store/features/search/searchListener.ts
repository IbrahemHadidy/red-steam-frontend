// Redux
import { createListenerMiddleware } from '@reduxjs/toolkit';

// Actions
import {
  addUserPreferences,
  initializeSearch,
  removeUserPreferences,
  resetSearch,
  resetSearchResults,
  setHasMoreResults,
  setIsSearchInitialized,
  setPriceRange,
  setRequestParams,
  setSearchInputValue,
  setSearchQuery,
  setSearchUrl,
  setSortOption,
  uncheckHideFreeToPlay,
  updateFilters,
} from './searchSlice';

// Thunks
import { debouncedFetchSearchResults } from './searchThunks';

// APIs
import { getAllDevelopersService } from '@store/apis/common/developers';
import { getAllFeaturesService } from '@store/apis/common/features';
import { getAllLanguagesService } from '@store/apis/common/languages';
import { getAllPublishersService } from '@store/apis/common/publishers';
import { getAllTagsService } from '@store/apis/common/tags';

// Utils
import promiseToast from '@utils/promiseToast';
import {
  getNewRequestParams,
  getNewSearchUrl,
  initializeFilterData,
  setFiltersFromSearchParams,
} from './searchUtils';

// Constants
import { PRICE_RANGES } from '@config/constants/search';

// Enums
import type { SortOption } from '@enums/search';

// Types
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '@store/store';

// Create listener middleware
const searchListener = createListenerMiddleware();
const listen = searchListener.startListening.withTypes<RootState, AppDispatch>();

// Listen for search initialization
listen({
  actionCreator: initializeSearch,

  effect: async (action: PayloadAction<string>, listenerApi) => {
    const { dispatch, getState } = listenerApi;
    const { isUserLoggedIn } = getState().auth;
    const { isSearchInitialized, filters } = getState().search;

    const searchParams = new URLSearchParams(action.payload);

    // Check if Search is Already Initialized.
    if (isSearchInitialized) return;

    //--------------------- Get Initial Filters Data ---------------------//
    // Reset state
    dispatch(resetSearch());

    // Fetch initial data
    const [tags, features, publishers, developers, languages] =
      (await promiseToast(
        Promise.all([
          dispatch(getAllTagsService.initiate()).unwrap(),
          dispatch(getAllFeaturesService.initiate()).unwrap(),
          dispatch(getAllPublishersService.initiate()).unwrap(),
          dispatch(getAllDevelopersService.initiate()).unwrap(),
          dispatch(getAllLanguagesService.initiate()).unwrap(),
        ]),
        {
          pending: 'Initializing search',
          fallbackError: 'Failed to initialize search, please refresh the page to try again',
        }
      )) ?? [];

    // Initialize filters
    if (isUserLoggedIn) dispatch(addUserPreferences());

    const fetchedFilters = {
      tags: initializeFilterData(tags ?? []),
      features: initializeFilterData(features ?? []),
      publishers: initializeFilterData(publishers ?? []),
      developers: initializeFilterData(developers ?? []),
      languages: initializeFilterData(languages ?? []),
    };

    //---------------------- Set Initial Search Data ---------------------//
    const searchTerm = searchParams?.get('term') ?? '';
    dispatch(setSearchInputValue(decodeURIComponent(searchTerm)));
    if (searchTerm !== '') dispatch(setSearchQuery(decodeURIComponent(searchTerm)));

    const sortOption = searchParams?.get('sort') ?? 'Relevance';
    dispatch(setSortOption(decodeURIComponent(sortOption) as SortOption));

    const priceValue = searchParams?.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null;
    const priceIndex = PRICE_RANGES.findIndex((range) => range.value === priceValue);
    dispatch(setPriceRange(priceIndex));

    const newFilters = { ...filters, ...fetchedFilters };
    const updatedFilters = setFiltersFromSearchParams(newFilters, searchParams);
    dispatch(updateFilters(updatedFilters));

    //------------------------ Set Initialized State -----------------------//
    dispatch(setIsSearchInitialized(true));
  },
});

// Listen for price range changes, and set `Hide free to play games` to unchecked if price range is set to `Free`
listen({
  predicate: (_action, currentState, previousState) =>
    currentState.search.priceRange !== previousState.search.priceRange,

  effect: (_action, listenerApi) => {
    const { dispatch, getState } = listenerApi;
    const { priceRange } = getState().search;

    if (priceRange === 0) dispatch(uncheckHideFreeToPlay());
  },
});

// Listen for filters/inputs changes, and update search params and request params
listen({
  predicate: (_action, currentState, previousState) =>
    currentState.search.isSearchInitialized !== previousState.search.isSearchInitialized ||
    currentState.search.filters !== previousState.search.filters ||
    currentState.search.searchQuery !== previousState.search.searchQuery ||
    currentState.search.priceRange !== previousState.search.priceRange ||
    currentState.search.sortOption !== previousState.search.sortOption,

  effect: (_action, listenerApi) => {
    const { dispatch, getState } = listenerApi;
    const { currentUserData } = getState().auth;
    const { isSearchInitialized, filters, searchQuery, priceRange, sortOption } = getState().search;

    if (!isSearchInitialized) return;

    const newSearchUrl = getNewSearchUrl(filters, priceRange, sortOption, searchQuery);
    dispatch(setSearchUrl(newSearchUrl));

    const newRequestParams = getNewRequestParams(
      filters,
      priceRange,
      sortOption,
      searchQuery,
      currentUserData
    );
    dispatch(resetSearchResults());
    dispatch(setHasMoreResults(true));
    dispatch(
      setRequestParams({ searchData: newRequestParams, pagination: { page: 1, limit: 20 } })
    );
  },
});

// Listen for user login/logout, and add/remove user preferences
listen({
  predicate: (_action, currentState, previousState) =>
    currentState.auth.isUserLoggedIn !== previousState.auth.isUserLoggedIn,

  effect: (_action, listenerApi) => {
    const { dispatch, getState } = listenerApi;
    const { isUserLoggedIn } = getState().auth;

    if (isUserLoggedIn) {
      dispatch(addUserPreferences());
    } else {
      dispatch(removeUserPreferences());
    }
  },
});

// Listen for filters changes, and fetch new results
listen({
  predicate: (_action, currentState, previousState) =>
    currentState.search.isSearchInitialized !== previousState.search.isSearchInitialized ||
    currentState.search.filters !== previousState.search.filters ||
    currentState.search.searchQuery !== previousState.search.searchQuery ||
    currentState.search.priceRange !== previousState.search.priceRange ||
    currentState.search.sortOption !== previousState.search.sortOption,

  effect: (_action, listenerApi) => {
    const { dispatch, getState } = listenerApi;
    const { isSearchInitialized } = getState().search;

    if (!isSearchInitialized) return;

    debouncedFetchSearchResults(dispatch);
  },
});

// Export the listener
export default searchListener;
