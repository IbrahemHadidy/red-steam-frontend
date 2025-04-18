// Redux
import { createListenerMiddleware } from '@reduxjs/toolkit';

// Thunks
import {
  debouncedFetchPaginatedDevelopers,
  debouncedFetchPaginatedFeatures,
  debouncedFetchPaginatedLanguages,
  debouncedFetchPaginatedOffers,
  debouncedFetchPaginatedPublishers,
  debouncedFetchPaginatedReviews,
  debouncedFetchPaginatedTags,
} from './adminThunks';

// Handlers
import {
  initializeCreateOfferAdmin,
  initializeDevelopersAdmin,
  initializeFeaturesAdmin,
  initializeLanguagesAdmin,
  initializeOffersAdmin,
  initializePublishersAdmin,
  initializeReviewsAdmin,
  initializeTagsAdmin,
  reset,
  setAdminType,
  setDiscountPrice,
  setIsInitialized,
  setOfferGame,
} from './adminSlice';

// APIs
import { getByIdService } from '@store/apis/game/data';

// Utils
import promiseToast from '@utils/promiseToast';

// Enums
import { AdminType } from '@enums/admin';

// Types
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '@store/store';

// Create listener middleware
const adminListener = createListenerMiddleware();
const listen = adminListener.startListening.withTypes<RootState, AppDispatch>();

// Listen for developers admin initialization and fetch developers
listen({
  actionCreator: initializeDevelopersAdmin,

  effect: (_action, listenerApi) => {
    const { dispatch } = listenerApi;

    dispatch(reset());
    dispatch(setAdminType(AdminType.Developer));
    dispatch(setIsInitialized(true));
    debouncedFetchPaginatedDevelopers(dispatch);
  },
});

// Listen for publishers admin initialization and fetch publishers
listen({
  actionCreator: initializePublishersAdmin,

  effect: (_action, listenerApi) => {
    const { dispatch } = listenerApi;

    dispatch(reset());
    dispatch(setAdminType(AdminType.Publisher));
    dispatch(setIsInitialized(true));
    debouncedFetchPaginatedPublishers(dispatch);
  },
});

// Listen for features admin initialization and fetch features
listen({
  actionCreator: initializeFeaturesAdmin,

  effect: (_action, listenerApi) => {
    const { dispatch } = listenerApi;

    dispatch(reset());
    dispatch(setAdminType(AdminType.Feature));
    dispatch(setIsInitialized(true));
    debouncedFetchPaginatedFeatures(dispatch);
  },
});

// Listen for tags admin initialization and fetch tags
listen({
  actionCreator: initializeTagsAdmin,

  effect: (_action, listenerApi) => {
    const { dispatch } = listenerApi;

    dispatch(reset());
    dispatch(setAdminType(AdminType.Tag));
    dispatch(setIsInitialized(true));
    debouncedFetchPaginatedTags(dispatch);
  },
});

// Listen for languages admin initialization and fetch languages
listen({
  actionCreator: initializeLanguagesAdmin,

  effect: (_action, listenerApi) => {
    const { dispatch } = listenerApi;

    dispatch(reset());
    dispatch(setAdminType(AdminType.Language));
    dispatch(setIsInitialized(true));
    debouncedFetchPaginatedLanguages(dispatch);
  },
});

// Listen for reviews admin initialization and fetch reviews
listen({
  actionCreator: initializeReviewsAdmin,

  effect: (_action, listenerApi) => {
    const { dispatch } = listenerApi;

    dispatch(reset());
    dispatch(setAdminType(AdminType.Review));
    dispatch(setIsInitialized(true));
    debouncedFetchPaginatedReviews(dispatch);
  },
});

// Listen for offers admin initialization and fetch offers
listen({
  actionCreator: initializeOffersAdmin,

  effect: (_action, listenerApi) => {
    const { dispatch } = listenerApi;

    dispatch(reset());
    dispatch(setAdminType(AdminType.Offer));
    dispatch(setIsInitialized(true));
    debouncedFetchPaginatedOffers(dispatch);
  },
});

// Listen for create offer admin initialization
listen({
  actionCreator: initializeCreateOfferAdmin,

  effect: async (action: PayloadAction<number>, listenerApi) => {
    const { dispatch } = listenerApi;
    const gameId = action.payload;

    dispatch(reset());
    dispatch(setAdminType(AdminType.CreateOffer));

    const offerGame = await promiseToast(dispatch(getByIdService.initiate(gameId)).unwrap(), {
      pending: 'Fetching game data...',
      success: 'Game data fetched successfully',
      fallbackError: 'Error fetching game data',
    });

    dispatch(setOfferGame(offerGame ?? null));
    dispatch(setDiscountPrice(offerGame?.pricing?.discountPrice ?? '0.00'));
    dispatch(setIsInitialized(true));

    debouncedFetchPaginatedOffers(dispatch);
  },
});

// Listen for search or pagination changes and fetch new results
listen({
  predicate: (_action, currentState, previousState) =>
    currentState.admin.common.currentPage !== previousState.admin.common.currentPage ||
    currentState.admin.common.itemsPerPage !== previousState.admin.common.itemsPerPage ||
    currentState.admin.common.sortConfig !== previousState.admin.common.sortConfig ||
    currentState.admin.common.searchQuery !== previousState.admin.common.searchQuery ||
    (!currentState.admin.common.isSubmitting && previousState.admin.common.isSubmitting) ||
    (!currentState.admin.common.isEditModalOpen && previousState.admin.common.isEditModalOpen) ||
    (!currentState.admin.common.isDeleteModalOpen && previousState.admin.common.isDeleteModalOpen),

  effect: (_action, listenerApi) => {
    const { dispatch, getState } = listenerApi;
    const { adminType } = getState().admin.common;

    if (adminType === AdminType.Developer) debouncedFetchPaginatedDevelopers(dispatch);
    else if (adminType === AdminType.Publisher) debouncedFetchPaginatedPublishers(dispatch);
    else if (adminType === AdminType.Feature) debouncedFetchPaginatedFeatures(dispatch);
    else if (adminType === AdminType.Tag) debouncedFetchPaginatedTags(dispatch);
    else if (adminType === AdminType.Language) debouncedFetchPaginatedLanguages(dispatch);
    else if (adminType === AdminType.Review) debouncedFetchPaginatedReviews(dispatch);
    else if (adminType === AdminType.Offer || adminType === AdminType.CreateOffer)
      debouncedFetchPaginatedOffers(dispatch);
  },
});

// Export the listener
export default adminListener;
