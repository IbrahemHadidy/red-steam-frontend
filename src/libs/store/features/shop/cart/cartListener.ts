// Redux
import { createListenerMiddleware } from '@reduxjs/toolkit';

// Actions
import { initializeCart, setCartInitialized, setTotalPrice, updateCart } from './cartSlice';

// APIs
import gameDataApi from '@store/apis/game/data';

// Utils
import promiseToast from '@utils/promiseToast';
import Decimal from 'decimal.js';

// Types
import type { Game } from '@interfaces/game';
import type { AppDispatch, RootState } from '@store/store';

// Create listener middleware
const cartListener = createListenerMiddleware();
const listen = cartListener.startListening.withTypes<RootState, AppDispatch>();

// Listen for cart initialization
listen({
  actionCreator: initializeCart,

  effect: async (_action, listenerApi) => {
    const { dispatch, getState } = listenerApi;

    const userCart = getState().auth.currentUserData?.cart ?? [];
    let cartItems: Game[] = [];

    if (userCart.length > 0) {
      cartItems =
        (await promiseToast(
          dispatch(
            gameDataApi.endpoints.getByIds.initiate(userCart.map((item) => item.id))
          ).unwrap(),
          {
            pending: 'Fetching cart items',
            fallbackError: 'Error fetching cart items',
          }
        )) ?? [];
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

    // Set cart initialized
    dispatch(setCartInitialized(true));
  },
});

// Export the listener
export default cartListener;
