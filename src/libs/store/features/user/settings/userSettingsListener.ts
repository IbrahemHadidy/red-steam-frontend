// Redux
import { createListenerMiddleware } from '@reduxjs/toolkit';

// Actions
import {
  setAvatarPreview,
  setInitialSettings,
  setUsernameAvailability,
  updateSelectedCountry,
} from './userSettingsSlice';

// Utils
import debounce from '@utils/debounce';

// APIs
import userManagementApi from '@store/apis/user/management';

// Types
import type { AppDispatch, RootState } from '@store/store';

// Create listener middleware
const userSettingsListener = createListenerMiddleware();
const listen = userSettingsListener.startListening.withTypes<RootState, AppDispatch>();

// Listen for country initialization
listen({
  actionCreator: setInitialSettings,
  effect: async (_action, listenerApi) => {
    const { dispatch, getState } = listenerApi;

    // Get current user country and profile picture
    const country = getState().auth.currentUserData?.country;
    const profilePicture = getState().auth.currentUserData?.profilePicture;

    // Set fetched country
    dispatch(updateSelectedCountry(country ?? 'PS'));
    dispatch(setAvatarPreview(profilePicture ?? null));
  },
});

// Debounced version of the username check function
const debouncedCheckUsernameExists = debounce<
  (accountName: string, dispatch: AppDispatch) => Promise<void>
>(async (accountName: string, dispatch: AppDispatch) => {
  try {
    const exists = (
      await dispatch(userManagementApi.endpoints.checkUsernameExists.initiate(accountName)).unwrap()
    ).exists;

    if (!exists) {
      dispatch(setUsernameAvailability(true));
    } else {
      dispatch(setUsernameAvailability(false));
    }
  } catch (error) {
    console.error('Error checking account availability:', error);
    dispatch(setUsernameAvailability(false));
  }
}, 400);

// Listen for username changes and check if it is available
listen({
  predicate: (_action, currentState, previousState) =>
    currentState.user.settings.newUsername !== previousState.user.settings.newUsername,
  effect: (_action, listenerApi) => {
    const { dispatch } = listenerApi;
    const { newUsername } = listenerApi.getState().user.settings;

    if (newUsername.length !== 0) {
      // Cancel any pending debounced calls
      debouncedCheckUsernameExists.cancel();
      // Call the debounced function for username check
      debouncedCheckUsernameExists(newUsername, dispatch);
    }
  },
});

// Export the listener
export default userSettingsListener;
