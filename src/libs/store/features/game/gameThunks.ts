// Toast notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { createAppAsyncThunk } from '@store/hooks';

// Redux Handlers
import { resetReviews } from './gameSlice';

// Redux Thunks
import { fetchUserData } from '@store/features/auth/authThunks';

// APIs
import gameDataApi from '@store/apis/game/data';
import userInteractionApi from '@store/apis/user/interaction';

// Types
import type { Review } from '@interfaces/review';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const addToWishlist = createAppAsyncThunk<void, void, { rejectValue: string }>(
  'game/addToWishlist',
  async (_, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    const { currentGame } = getState().game;
    const gameId = currentGame?.id;

    if (!gameId) return rejectWithValue('Error adding game to wishlist');

    await toast
      .promise(dispatch(userInteractionApi.endpoints.addToWishlist.initiate([gameId])).unwrap(), {
        pending: 'Adding to wishlist...',
        success: 'Added to wishlist',
        error: 'Error adding to wishlist',
      })
      .catch((error) => {
        console.error('Error adding to wishlist:', error);
        return rejectWithValue('Error adding to wishlist');
      });

    await dispatch(fetchUserData());

    return fulfillWithValue(undefined);
  }
);

export const removeFromWishlist = createAppAsyncThunk<void, void, { rejectValue: string }>(
  'game/removeFromWishlist',
  async (_, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    const { currentGame } = getState().game;
    const gameId = currentGame?.id;

    if (!gameId) return rejectWithValue('Error removing game from wishlist');

    await toast
      .promise(
        dispatch(userInteractionApi.endpoints.removeFromWishlist.initiate([gameId])).unwrap(),
        {
          pending: 'Removing from wishlist...',
          success: 'Removed from wishlist',
          error: 'Error removing from wishlist',
        }
      )
      .catch((error) => {
        console.error('Error removing from wishlist:', error);
        return rejectWithValue('Error removing from wishlist');
      });

    await dispatch(fetchUserData());

    return fulfillWithValue(undefined);
  }
);

export const addToCart = createAppAsyncThunk<void, AppRouterInstance, { rejectValue: string }>(
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

    await toast
      .promise(dispatch(userInteractionApi.endpoints.addToCart.initiate([gameId])).unwrap(), {
        pending: 'Adding to cart...',
        success: 'Added to cart',
        error: 'Error adding to cart',
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
        return rejectWithValue('Error adding to cart');
      });

    await dispatch(fetchUserData());

    return fulfillWithValue(undefined);
  }
);

export const addToLibrary = createAppAsyncThunk<void, AppRouterInstance, { rejectValue: string }>(
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

    await toast
      .promise(dispatch(userInteractionApi.endpoints.addToLibrary.initiate([gameId])).unwrap(), {
        pending: 'Adding to library...',
        success: 'Added to library',
        error: 'Error adding to library',
      })
      .catch((error) => {
        console.error('Error adding to library:', error);
        return rejectWithValue('Error adding to library');
      });

    await dispatch(fetchUserData());

    return fulfillWithValue(undefined);
  }
);

export const submitReview = createAppAsyncThunk<void, void, { rejectValue: string }>(
  'game/submitReview',
  async (_, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    const { currentGame, positive, content, reviewId, hasReviewed } = getState().game;
    const gameId = currentGame?.id;

    if (!gameId || positive === null) return rejectWithValue('Error submitting review');

    if (!hasReviewed) {
      await toast
        .promise(
          dispatch(
            userInteractionApi.endpoints.reviewGame.initiate({ gameId, positive, content })
          ).unwrap(),
          {
            pending: 'Submitting review...',
            success: 'Submitted review',
            error: 'Error submitting review',
          }
        )
        .catch((error) => {
          console.error('Error submitting review:', error);
          return rejectWithValue('Error submitting review');
        });
    } else {
      if (reviewId === null) return rejectWithValue('Error updating review');

      await toast
        .promise(
          dispatch(
            userInteractionApi.endpoints.updateReview.initiate({ reviewId, positive, content })
          ).unwrap(),
          {
            pending: 'Updating review...',
            success: 'Updated review',
            error: 'Error updating review',
          }
        )
        .catch((error) => {
          console.error('Error updating review:', error);
          return rejectWithValue('Error updating review');
        });
    }

    await dispatch(fetchUserData());

    dispatch(resetReviews());
    return fulfillWithValue(undefined);
  }
);

export const getReviews = createAppAsyncThunk<Review[] | undefined, void, { rejectValue: string }>(
  'game/getReviews',
  async (_, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    const { currentGame, filter, sort, currentPage } = getState().game;
    const gameId = currentGame?.id;

    if (!gameId) return rejectWithValue('Error getting reviews');

    const newReviews = await toast
      .promise<Review[]>(
        dispatch(
          gameDataApi.endpoints.getReviews.initiate({
            gameId,
            filter,
            sort,
            offset: currentPage,
            limit: 5,
          })
        ).unwrap(),
        {
          error: 'Error getting reviews',
        }
      )
      .catch((error) => {
        console.error('Error getting reviews:', error);
      });

    if (!newReviews) return rejectWithValue('Error getting reviews');

    if (Array.isArray(newReviews) && newReviews.length === 0) {
      return fulfillWithValue(undefined);
    } else {
      return fulfillWithValue(newReviews);
    }
  }
);
