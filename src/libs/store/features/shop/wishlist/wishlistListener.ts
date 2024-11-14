// Toast Notifications
import { toast } from 'react-toastify';
// Redux
import { createListenerMiddleware } from '@reduxjs/toolkit';

// Actions
import { initializeWishlist, setIsWishlistInitialized, updateWishlist } from './wishlistSlice';

// APIs
import gameDataApi from '@store/apis/game/data';

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
      wishlistItems = await toast
        .promise(
          dispatch(
            gameDataApi.endpoints.getByIds.initiate(userWishlist.map((item) => item.id))
          ).unwrap(),
          {
            pending: 'Fetching wishlist items',
            error: 'Error fetching wishlist items',
          }
        )
        .catch((error) => {
          console.error('Error fetching wishlist items:', error);
          return [];
        });
    }

    // Update wishlist
    dispatch(updateWishlist(wishlistItems));
    dispatch(setIsWishlistInitialized(true));
  },
});

// Export the listener
export default wishlistListener;
