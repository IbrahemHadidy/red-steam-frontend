// Toast Notifications
import { toast } from 'react-toastify';

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

export const addToCart = createAppAsyncThunk<void, number, { rejectValue: string }>(
  'shop/wishlist/addToCart',
  async (id, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    await toast
      .promise(dispatch(userInteractionApi.endpoints.addToCart.initiate([id])).unwrap(), {
        pending: 'Adding to cart...',
        success: 'Added to cart',
        error: 'Error adding to cart',
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
        return rejectWithValue('Failed to add to cart');
      });

    await refreshWishlist(dispatch, getState, rejectWithValue);
    return fulfillWithValue(undefined);
  }
);

export const addToLibrary = createAppAsyncThunk<void, number, { rejectValue: string }>(
  'shop/wishlist/addToLibrary',
  async (id, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    await toast
      .promise(dispatch(userInteractionApi.endpoints.addToLibrary.initiate([id])).unwrap(), {
        pending: 'Adding to library...',
        success: 'Added to library',
        error: 'Error adding to library',
      })
      .catch((error) => {
        console.error('Error adding to library:', error);
        return rejectWithValue('Failed to add to library');
      });

    await refreshWishlist(dispatch, getState, rejectWithValue);
    return fulfillWithValue(undefined);
  }
);

export const removeFromWishlist = createAppAsyncThunk<void, number, { rejectValue: string }>(
  'shop/wishlist/removeFromWishlist',
  async (id, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    await toast
      .promise(dispatch(userInteractionApi.endpoints.removeFromWishlist.initiate([id])).unwrap(), {
        pending: 'Removing from wishlist...',
        success: 'Removed from wishlist',
        error: 'Error removing from wishlist',
      })
      .catch((error) => {
        console.error('Error removing from wishlist:', error);
        return rejectWithValue('Failed to remove from wishlist');
      });

    await refreshWishlist(dispatch, getState, rejectWithValue);
    return fulfillWithValue(undefined);
  }
);
