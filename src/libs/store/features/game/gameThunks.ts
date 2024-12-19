// Toast notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { createAppAsyncThunk } from '@store/hooks';

// Redux Handlers
import { resetReviews } from './gameSlice';

// Redux Thunks
import { fetchUserData } from '@store/features/auth/authThunks';

// APIs
import { getReviewsService } from '@store/apis/game/data';
import {
  addToCartService,
  addToLibraryService,
  addToWishlistService,
  removeFromWishlistService,
  reviewGameService,
  updateReviewService,
} from '@store/apis/user/interaction';

// Utils
import promiseToast from '@utils/promiseToast';

// Types
import type { Review } from '@interfaces/review';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface GetReviewsFulfillValue {
  reviews: Review[];
  hasMore: boolean;
}

export const addToWishlist = createAppAsyncThunk(
  'game/addToWishlist',
  async (_, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    const { currentGame } = getState().game;
    const gameId = currentGame?.id;

    if (!gameId) return rejectWithValue('Error adding game to wishlist');

    const result = await promiseToast(dispatch(addToWishlistService.initiate([gameId])).unwrap(), {
      pending: 'Adding to wishlist',
      success: 'Added to wishlist',
      fallbackError: 'Error adding to wishlist',
    });
    if (!result) return rejectWithValue('Error adding to wishlist');

    await dispatch(fetchUserData());

    return fulfillWithValue(undefined);
  }
);

export const removeFromWishlist = createAppAsyncThunk(
  'game/removeFromWishlist',
  async (_, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    const { currentGame } = getState().game;
    const gameId = currentGame?.id;

    if (!gameId) return rejectWithValue('Error removing game from wishlist');

    const result = await promiseToast(
      dispatch(removeFromWishlistService.initiate([gameId])).unwrap(),
      {
        pending: 'Removing from wishlist',
        success: 'Removed from wishlist',
        fallbackError: 'Error removing from wishlist',
      }
    );
    if (!result) return rejectWithValue('Error removing from wishlist');

    await dispatch(fetchUserData());

    return fulfillWithValue(undefined);
  }
);

export const addToCart = createAppAsyncThunk<void, AppRouterInstance>(
  'game/addToCart',
  async (router, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    const { isUserLoggedIn } = getState().auth;
    const { currentGame } = getState().game;
    const gameId = currentGame?.id;

    if (!isUserLoggedIn) {
      toast.warn('Please login to add items to your cart.');
      router.push('/login');
      return rejectWithValue('Please login to add items to your cart');
    }

    if (!gameId) return rejectWithValue('Error adding game to cart');

    const result = await promiseToast(dispatch(addToCartService.initiate([gameId])).unwrap(), {
      pending: 'Adding to cart',
      success: 'Added to cart',
      fallbackError: 'Error adding to cart',
    });
    if (!result) return rejectWithValue('Error adding to cart');

    await dispatch(fetchUserData());

    return fulfillWithValue(undefined);
  }
);

export const addToLibrary = createAppAsyncThunk<void, AppRouterInstance>(
  'game/addToLibrary',
  async (router, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    const { isUserLoggedIn } = getState().auth;
    const { currentGame } = getState().game;
    const gameId = currentGame?.id;

    if (!isUserLoggedIn) {
      toast.warn('Please login to add items to your library.');
      router.push('/login');
      return rejectWithValue('Please login to add items to your library');
    }

    if (!gameId) return rejectWithValue('Error adding game to library');

    const result = await promiseToast(dispatch(addToLibraryService.initiate([gameId])).unwrap(), {
      pending: 'Adding to library',
      success: 'Added to library',
      fallbackError: 'Error adding to library',
    });
    if (!result) return rejectWithValue('Error adding to library');

    await dispatch(fetchUserData());

    return fulfillWithValue(undefined);
  }
);

export const submitReview = createAppAsyncThunk<void, void>(
  'game/submitReview',
  async (_, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    const { currentGame, positive, content, reviewId, hasReviewed } = getState().game;
    const gameId = currentGame?.id;

    if (!gameId || positive === null) return rejectWithValue('Error submitting review');

    if (!hasReviewed) {
      const result = await promiseToast(
        dispatch(reviewGameService.initiate({ gameId, positive, content })).unwrap(),
        {
          pending: 'Submitting review',
          success: 'Submitted review',
          fallbackError: 'Error submitting review',
        }
      );
      if (!result) return rejectWithValue('Error submitting review');
    } else {
      if (reviewId === null) return rejectWithValue('Error updating review');

      const result = await promiseToast(
        dispatch(updateReviewService.initiate({ reviewId, positive, content })).unwrap(),
        {
          pending: 'Updating review',
          success: 'Updated review',
          fallbackError: 'Error updating review',
        }
      );
      if (!result) return rejectWithValue('Error updating review');
    }

    await dispatch(fetchUserData());

    dispatch(resetReviews());
    return fulfillWithValue(undefined);
  }
);

export const getReviews = createAppAsyncThunk<GetReviewsFulfillValue>(
  'game/getReviews',
  async (_, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    const { currentGame, filter, sort, currentPage, reviews } = getState().game;
    const gameId = currentGame?.id;

    if (!gameId) return rejectWithValue('Error getting reviews');

    const response = await promiseToast(
      dispatch(
        getReviewsService.initiate({
          gameId,
          filter,
          sort,
          offset: currentPage,
          limit: 5,
        })
      ).unwrap(),
      {
        pending: 'Getting reviews',
        fallbackError: 'Error getting reviews',
        onlyError: true,
      }
    );
    if (!response) return rejectWithValue('Error getting reviews');

    const newReviews: Review[] = [...reviews];
    newReviews.push(
      ...response.filter(
        (newReview) => !reviews.some((prevReview) => prevReview.id === newReview.id)
      )
    );

    const fullFillValue: GetReviewsFulfillValue = {
      reviews: newReviews,
      hasMore: response.length > 0,
    };

    return fulfillWithValue(fullFillValue);
  }
);
