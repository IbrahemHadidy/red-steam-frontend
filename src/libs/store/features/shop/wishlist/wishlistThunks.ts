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

const refreshWishlist = async (dispatch: AppDispatch, getState: () => RootState) => {
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
};

export const addToCart = createAppAsyncThunk<void, number, { rejectValue: string }>(
  'shop/wishlist/addToCart',
  async (id, { dispatch, rejectWithValue, getState }) => {
    try {
      await dispatch(userInteractionApi.endpoints.addToCart.initiate([id])).unwrap();
      await refreshWishlist(dispatch, getState);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
      return rejectWithValue('Failed to add to cart');
    }
  }
);

export const addToLibrary = createAppAsyncThunk<void, number, { rejectValue: string }>(
  'shop/wishlist/addToLibrary',
  async (id, { dispatch, rejectWithValue, getState }) => {
    try {
      await dispatch(userInteractionApi.endpoints.addToLibrary.initiate([id])).unwrap();
      await refreshWishlist(dispatch, getState);
    } catch (error) {
      console.error('Error adding to library:', error);
      toast.error('Failed to add to library');
      return rejectWithValue('Failed to add to library');
    }
  }
);

export const removeFromWishlist = createAppAsyncThunk<void, number, { rejectValue: string }>(
  'shop/wishlist/removeFromWishlist',
  async (id, { dispatch, rejectWithValue, getState }) => {
    try {
      await dispatch(userInteractionApi.endpoints.removeFromWishlist.initiate([id])).unwrap();
      await refreshWishlist(dispatch, getState);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove from wishlist');
      return rejectWithValue('Failed to remove from wishlist');
    }
  }
);
