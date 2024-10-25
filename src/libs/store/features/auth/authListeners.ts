// Redux
import { createListenerMiddleware } from '@reduxjs/toolkit';

// Actions
import {
  onLoadIntialization,
  setCurrentUserData,
  setIsUserLoggedIn,
  setOnLoadInitialized,
} from './authSlice';
import { autoLoginOnLoad, fetchUserData, refreshAuthorizationToken } from './authThunks';

// Channels
import { authChannel } from '@store/features/auth/authChannel';

// Types
import type { AuthChannelState } from '@store/features/auth/authChannel';
import type { AppDispatch, RootState } from '@store/store';

// Create listener middleware
const authListener = createListenerMiddleware();
const listen = authListener.startListening.withTypes<RootState, AppDispatch>();

// Listen for reset token changes and update the reset interface state
listen({
  actionCreator: onLoadIntialization,
  effect: async (_action, listenerApi) => {
    const { dispatch } = listenerApi;

    const { authOnLoadIntialized, isUserLoggedIn } = listenerApi.getState().auth;

    if (!authOnLoadIntialized) {
      await dispatch(autoLoginOnLoad());

      if (isUserLoggedIn) {
        await dispatch(fetchUserData());
        await dispatch(refreshAuthorizationToken());
      }

      dispatch(setOnLoadInitialized(true));
    }

    authChannel.onmessage = (e: MessageEvent<AuthChannelState>) => {
      if (e.data.isUserLoggedIn) {
        dispatch(setIsUserLoggedIn(true));
        dispatch(setCurrentUserData(e.data.currentUserData));
      } else {
        dispatch(setIsUserLoggedIn(false));
        dispatch(setCurrentUserData(null));
      }
    };
  },
});

// Export the listener
export default authListener;
