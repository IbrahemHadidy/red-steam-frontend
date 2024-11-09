// Toast Notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { createAppAsyncThunk } from '@store/hooks';

// Actions
import { setTotalPrice, updateCart } from './cartSlice';

// Thunks
import { fetchUserData } from '@store/features/auth/authThunks';

// Utils
import Decimal from 'decimal.js';

// APIs
import gameDataApi from '@store/apis/game/data';
import userInteractionApi from '@store/apis/user/interaction';

// Types
import type { Game } from '@interfaces/game';
import type { AppDispatch, RootState } from '@store/store';

const refreshCart = async (
  dispatch: AppDispatch,
  getState: () => RootState,
  rejectWithValue: (value: string) => unknown
) => {
  try {
    await dispatch(fetchUserData());

    const userCart = getState().auth.currentUserData?.cart ?? [];

    let cartItems: Game[] = [];

    if (userCart.length > 0) {
      cartItems = await dispatch(
        gameDataApi.endpoints.getByIds.initiate(userCart.map((item) => item.id))
      ).unwrap();
    }

    // Update cart
    dispatch(updateCart(cartItems));

    // Update total price
    dispatch(
      setTotalPrice(
        cartItems
          .reduce((total: Decimal, game: Game) => {
            const gamePrice = new Decimal(game.pricing?.price ?? '0.00');
            return total.plus(gamePrice);
          }, new Decimal('0.00'))
          .toFixed(2)
      )
    );
  } catch (err: unknown) {
    console.error('Error refreshing cart:', err);
    return rejectWithValue('Error refreshing cart');
  }
};

export const removeCartItem = createAppAsyncThunk<void, number, { rejectValue: string }>(
  'shop/cart/removeCartItem',
  async (id, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    await toast
      .promise(dispatch(userInteractionApi.endpoints.removeFromCart.initiate([id])).unwrap(), {
        pending: 'Removing item from cart...',
        success: 'Removed from cart',
        error: 'Error removing from cart',
      })
      .catch((error) => {
        console.error('Error removing item from cart:', error);
        return rejectWithValue('Error removing item from cart');
      });

    // Refresh cart
    await refreshCart(dispatch, getState, rejectWithValue);
    return fulfillWithValue(undefined);
  }
);

export const clearCart = createAppAsyncThunk<void, void, { rejectValue: string }>(
  'shop/cart/clearCart',
  async (_, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    await toast
      .promise(dispatch(userInteractionApi.endpoints.clearCart.initiate()).unwrap(), {
        pending: 'Clearing cart...',
        success: 'Cart cleared',
        error: 'Error clearing cart',
      })
      .catch((error) => {
        console.error('Error clearing cart:', error);
        return rejectWithValue('Error clearing cart');
      });

    // Refresh cart
    await refreshCart(dispatch, getState, rejectWithValue);
    return fulfillWithValue(undefined);
  }
);
