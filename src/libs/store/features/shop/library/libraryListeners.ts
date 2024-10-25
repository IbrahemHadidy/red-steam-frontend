// Redux
import { createListenerMiddleware } from '@reduxjs/toolkit';

// Actions
import { initializeLibrary, updateLibrary } from './librarySlice';

// APIs
import gameDataApi from '@store/apis/game/data';

// Types
import type { Game } from '@interfaces/game';
import type { AppDispatch, RootState } from '@store/store';

// Create listener middleware
const libraryListener = createListenerMiddleware();
const listen = libraryListener.startListening.withTypes<RootState, AppDispatch>();

// Listen for library initialization
listen({
  actionCreator: initializeLibrary,
  effect: async (_action, listenerApi) => {
    const { dispatch, getState } = listenerApi;

    const userLibrary = getState().auth.currentUserData?.library ?? [];
    let libraryItems: Game[] = [];

    if (userLibrary.length > 0) {
      libraryItems = await dispatch(
        gameDataApi.endpoints.getByIds.initiate(userLibrary.map((item) => item.id))
      ).unwrap();
    }

    // Update library
    dispatch(updateLibrary(libraryItems));
  },
});

// Export the listener
export default libraryListener;
