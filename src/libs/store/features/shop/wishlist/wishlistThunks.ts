// Redux Hooks
import { createAppAsyncThunk } from '@store/hooks';

// Actions
import { updateWishlist } from './wishlistSlice';

// Thunks
import { fetchUserData } from '@store/features/auth/authThunks';

// APIs
import gameDataApi from '@store/apis/game/data';
import userInteractionApi from '@store/apis/user/interaction';

// Types
import type { Game } from '@interfaces/game';
import type { AppDispatch, RootState } from '@store/store';
import promiseToast from '@utils/promiseToast';

const refreshWishlist = async (
  dispatch: AppDispatch,
  getState: () => RootState,
  rejectWithValue: (value: string) => unknown
) => {
  try {
    await dispatch(fetchUserData());

    const userWishlist = getState().auth.currentUserData?.wishlist ?? [];

    let wishlistItems: Game[] = [];

    if (userWishlist.length > 0) {
      wishlistItems = await dispatch(
        gameDataApi.endpoints.getByIds.initiate(userWishlist.map((item) => item.id))
      ).unwrap();
    }

    // Update wishlist
    dispatch(updateWishlist(wishlistItems));
  } catch (error) {
    console.error('Error refreshing wishlist:', error);
    return rejectWithValue('Error refreshing wishlist');
  }
};

export const addToCart = createAppAsyncThunk<void, number>(
  'shop/wishlist/addToCart',
  async (id, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    const result = await promiseToast(
      dispatch(userInteractionApi.endpoints.addToCart.initiate([id])).unwrap(),
      {
        pending: 'Adding to cart',
        success: 'Added to cart',
        fallbackError: 'Error adding to cart',
      }
    );
    if (!result) return rejectWithValue('Error adding to cart');

    await refreshWishlist(dispatch, getState, rejectWithValue);
    return fulfillWithValue(undefined);
  }
);

export const addToLibrary = createAppAsyncThunk<void, number>(
  'shop/wishlist/addToLibrary',
  async (id, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    const result = await promiseToast(
      dispatch(userInteractionApi.endpoints.addToLibrary.initiate([id])).unwrap(),
      {
        pending: 'Adding to library',
        success: 'Added to library',
        fallbackError: 'Error adding to library',
      }
    );
    if (!result) return rejectWithValue('Error adding to library');

    await refreshWishlist(dispatch, getState, rejectWithValue);
    return fulfillWithValue(undefined);
  }
);

export const removeFromWishlist = createAppAsyncThunk<void, number>(
  'shop/wishlist/removeFromWishlist',
  async (id, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    const result = await promiseToast(
      dispatch(userInteractionApi.endpoints.removeFromWishlist.initiate([id])).unwrap(),
      {
        pending: 'Removing from wishlist',
        success: 'Removed from wishlist',
        fallbackError: 'Error removing from wishlist',
      }
    );
    if (!result) return rejectWithValue('Error removing from wishlist');

    await refreshWishlist(dispatch, getState, rejectWithValue);
    return fulfillWithValue(undefined);
  }
);
