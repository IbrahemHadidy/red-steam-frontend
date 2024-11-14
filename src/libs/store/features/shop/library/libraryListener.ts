// Toast Notifications
import { toast } from 'react-toastify';

// Redux
import { createListenerMiddleware } from '@reduxjs/toolkit';

// Actions
import { initializeLibrary, setIsLibraryInitialized, updateLibrary } from './librarySlice';

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
      libraryItems = await toast
        .promise(
          dispatch(
            gameDataApi.endpoints.getByIds.initiate(userLibrary.map((item) => item.id))
          ).unwrap(),
          {
            pending: 'Fetching library items',
            error: 'Error fetching library items',
          }
        )
        .catch((error) => {
          console.error('Error fetching library items:', error);
          return [];
        });
    }

    // Update library
    dispatch(updateLibrary(libraryItems));
    dispatch(setIsLibraryInitialized(true));
  },
});

// Export the listener
export default libraryListener;
