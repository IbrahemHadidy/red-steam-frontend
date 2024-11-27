// Redux
import { createListenerMiddleware } from '@reduxjs/toolkit';

// Actions
import {
  addUserPreferences,
  initializeSearch,
  removeUserPreferences,
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
import developerApi from '@store/apis/common/developers';
import featureApi from '@store/apis/common/features';
import languageApi from '@store/apis/common/languages';
import publisherApi from '@store/apis/common/publishers';
import tagApi from '@store/apis/common/tags';

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

// Types
import type { SortOption } from '@custom-types/search';
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

    // Check if Search is Already Initialized, If it is, do nothing
    if (isSearchInitialized) return;

    //--------------------- Get Initial Filters Data ---------------------//
    // Fetch initial data
    const [tags, features, publishers, developers, languages] =
      (await promiseToast(
        Promise.all([
          dispatch(tagApi.endpoints.getAllTags.initiate()).unwrap(),
          dispatch(featureApi.endpoints.getAllFeatures.initiate()).unwrap(),
          dispatch(publisherApi.endpoints.getAllPublishers.initiate()).unwrap(),
          dispatch(developerApi.endpoints.getAllDevelopers.initiate()).unwrap(),
          dispatch(languageApi.endpoints.getAllLanguages.initiate()).unwrap(),
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
    const searchTerm = searchParams?.get('term') ?? 'enter game name';
    dispatch(setSearchInputValue(decodeURIComponent(searchTerm)));
    if (searchTerm !== 'enter game name') dispatch(setSearchQuery(decodeURIComponent(searchTerm)));

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
