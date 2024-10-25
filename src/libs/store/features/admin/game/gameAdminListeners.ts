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
import gameDataApi from '@store/apis/game/data';

// Types
import type { Screenshot, Video } from '@app/admin/_GameAdmin/game-admin.types';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '@store/store';

// Create listener middleware
const gameAdminListener = createListenerMiddleware();
const listen = gameAdminListener.startListening.withTypes<RootState, AppDispatch>();

// Listen for screenshots and videos changes and update the duplicate orders if exists
listen({
  predicate: (_action, currentState, previousState) => {
    return (
      currentState.gameAdmin.screenshots !== previousState.gameAdmin.screenshots ||
      currentState.gameAdmin.videos !== previousState.gameAdmin.videos
    );
  },
  effect: (_action, listenerApi) => {
    const { dispatch } = listenerApi;
    const { screenshots, videos } = listenerApi.getState().gameAdmin;

    const findDuplicateOrders = (items: (Screenshot | Video)[]): Set<number> => {
      const orders: number[] = items.map((item) => item.order);
      const duplicateOrders: number[] = orders.filter(
        (order, idx) => orders.indexOf(order) !== idx
      );
      return new Set(duplicateOrders);
    };

    const allItems: (Screenshot | Video)[] = [...screenshots, ...videos];
    const duplicates: Set<number> = findDuplicateOrders(allItems);
    dispatch(updateDuplicateOrders(Array.from(duplicates)));
    dispatch(setDuplicateError(duplicates.size > 0));
  },
});

// Listen for game update initialization
listen({
  actionCreator: initializeGameUpdate,
  effect: async (action: PayloadAction<number>, listenerApi) => {
    const { dispatch } = listenerApi;
    const gameId = action.payload;

    const gameData = await dispatch(gameDataApi.endpoints.getById.initiate(gameId)).unwrap();

    // Set initial values for game update form
    dispatch(setGameToUpdate(gameData));
    dispatch(setUpdateFormInitialValues(gameData));

    // Set cart initialized
    dispatch(setIsUpdateFetching(false));
    dispatch(setIsGameUpdateInitialized(true));
  },
});

// Export the listener
export default gameAdminListener;
