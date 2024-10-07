// Redux
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import authReducer from './features/auth/authSlice';

// Types
import type { Action, ThunkAction } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      // Add middlewares here
    ]),
});

// Broadcast state updates to other tabs
store.subscribe(() => {
  // Add listeners here
});

export const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
