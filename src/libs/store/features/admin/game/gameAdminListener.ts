// Toast Notifications
import { toast } from 'react-toastify';

// Redux
import { createListenerMiddleware } from '@reduxjs/toolkit';

// Actions
import {
  initializeGameUpdate,
  setDuplicateError,
  setGameToUpdate,
  setIsGameUpdateInitialized,
  setIsUpdateFetching,
  setUpdateFormInitialValues,
  updateDuplicateOrders,
} from './gameAdminSlice';

// APIs
import { getByIdService } from '@store/apis/game/data';

// Types
import type { Screenshot, Video } from '@custom-types/game-admin';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '@store/store';

// Create listener middleware
const gameAdminListener = createListenerMiddleware();
const listen = gameAdminListener.startListening.withTypes<RootState, AppDispatch>();

// Listen for screenshots and videos changes and update the duplicate orders if exists
listen({
  predicate: (_action, currentState, previousState) =>
    currentState.admin.game.screenshots !== previousState.admin.game.screenshots ||
    currentState.admin.game.videos !== previousState.admin.game.videos,

  effect: (_action, listenerApi) => {
    const { dispatch } = listenerApi;
    const { screenshots, videos } = listenerApi.getState().admin.game;

    const findDuplicateOrders = (items: (Screenshot | Video)[]): Set<number> => {
      const orders = items.map((item) => item.order);
      const duplicateOrders = orders.filter((order, idx) => orders.indexOf(order) !== idx);
      return new Set<number>(duplicateOrders);
    };

    const allItems = [...screenshots, ...videos];
    const duplicates = findDuplicateOrders(allItems);
    dispatch(updateDuplicateOrders(Array.from(duplicates)));
    dispatch(setDuplicateError(duplicates.size > 0));
  },
});

// Listen for game update initialization
listen({
  actionCreator: initializeGameUpdate,

  effect: async (action: PayloadAction<number>, listenerApi) => {
    const { dispatch, getState } = listenerApi;
    const { isGameUpdateInitialized } = getState().admin.game;
    const gameId = action.payload;

    if (isGameUpdateInitialized) return;

    try {
      const gameData = await dispatch(getByIdService.initiate(gameId)).unwrap();

      // Set initial values for game update form
      dispatch(setGameToUpdate(gameData));
      dispatch(setUpdateFormInitialValues(gameData));

      // Set game initialized
      dispatch(setIsUpdateFetching(false));
      dispatch(setIsGameUpdateInitialized(true));
    } catch (error) {
      console.error('Error initializing game update:', error);
      toast.error('An error occurred while initializing game update. Please try again.');
      dispatch(setIsUpdateFetching(false));
      dispatch(setIsGameUpdateInitialized(false));
    }
  },
});

// Export the listener
export default gameAdminListener;
