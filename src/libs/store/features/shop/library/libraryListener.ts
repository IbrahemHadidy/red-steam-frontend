// Redux
import { createListenerMiddleware } from '@reduxjs/toolkit';

// Actions
import { initializeLibrary, setIsLibraryInitialized, updateLibrary } from './librarySlice';

// APIs
import gameDataApi from '@store/apis/game/data';

// Utils
import promiseToast from '@utils/promiseToast';

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
      libraryItems =
        (await promiseToast(
          dispatch(
            gameDataApi.endpoints.getByIds.initiate(userLibrary.map((item) => item.id))
          ).unwrap(),
          {
            pending: 'Fetching library items',
            fallbackError: 'Error fetching library items',
          }
        )) ?? [];
    }

    // Update library
    dispatch(updateLibrary(libraryItems));
    dispatch(setIsLibraryInitialized(true));
  },
});

// Export the listener
export default libraryListener;
