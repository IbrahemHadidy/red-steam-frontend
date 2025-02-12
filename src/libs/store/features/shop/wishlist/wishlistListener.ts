// Redux
import { createListenerMiddleware } from '@reduxjs/toolkit';

// Actions
import { initializeWishlist, setIsWishlistInitialized, updateWishlist } from './wishlistSlice';

// APIs
import { getByIdsService } from '@store/apis/game/data';

// Utils
import promiseToast from '@utils/promiseToast';

// Types
import type { Game } from '@interfaces/game';
import type { AppDispatch, RootState } from '@store/store';

// Create listener middleware
const wishlistListener = createListenerMiddleware();
const listen = wishlistListener.startListening.withTypes<RootState, AppDispatch>();

// Listen for wishlist initialization
listen({
  actionCreator: initializeWishlist,

  effect: async (_action, listenerApi) => {
    const { dispatch, getState } = listenerApi;

    const userWishlist = getState().auth.currentUserData?.wishlist ?? [];
    let wishlistItems: Game[] = [];

    if (userWishlist.length > 0) {
      wishlistItems =
        (await promiseToast(
          dispatch(getByIdsService.initiate(userWishlist.map((item) => item.id))).unwrap(),
          {
            pending: 'Fetching wishlist items',
            fallbackError: 'Error fetching wishlist items',
          }
        )) ?? [];
    }

    // Update wishlist
    dispatch(updateWishlist(wishlistItems));
    dispatch(setIsWishlistInitialized(true));
  },
});

// Export the listener
export default wishlistListener;
