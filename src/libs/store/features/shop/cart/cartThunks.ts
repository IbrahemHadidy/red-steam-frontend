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

const refreshCart = async (dispatch: AppDispatch, getState: () => RootState) => {
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
};

export const removeCartItem = createAppAsyncThunk<void, number, { rejectValue: string }>(
  'shop/cart/removeCartItem',
  async (id, { dispatch, getState }) => {
    try {
      const response = await dispatch(
        userInteractionApi.endpoints.removeFromCart.initiate([id])
      ).unwrap();

      toast.success(response.message);

      // Refresh cart
      await refreshCart(dispatch, getState);
    } catch (err: unknown) {
      const error = err as { data: { message: string } };
      if (error.data && error.data.message) {
        toast.error(error.data.message);
      }
    }
  }
);

export const clearCart = createAppAsyncThunk<void, void, { rejectValue: string }>(
  'shop/cart/clearCart',
  async (_, { dispatch, getState }) => {
    try {
      const response = await dispatch(userInteractionApi.endpoints.clearCart.initiate()).unwrap();

      toast.success(response.message);

      // Refresh cart
      await refreshCart(dispatch, getState);
    } catch (err: unknown) {
      const error = err as { data: { message: string } };
      if (error.data && error.data.message) {
        toast.error(error.data.message);
      }
    }
  }
);
