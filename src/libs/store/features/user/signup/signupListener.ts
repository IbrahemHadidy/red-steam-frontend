// Redux
import { createListenerMiddleware } from '@reduxjs/toolkit';

// Actions
import {
  addErrorMessage,
  cleanErrorMessages,
  fetchCountry,
  setIsUsernameAvailable,
  setPasswordsDoNotMatch,
  setSubmitButtonDisabled,
  updateCountry,
} from './signupSlice';

// Utils
import debounce from '@utils/debounce';
import scrollToTop from '@utils/scrollToTop';

// APIs
import ipBaseApi from '@store/apis/countries/countryCode';
import userManagementApi from '@store/apis/user/management';

// Types
import type { AppDispatch, RootState } from '@store/store';

// Create listener middleware
const signupListener = createListenerMiddleware();
const listen = signupListener.startListening.withTypes<RootState, AppDispatch>();

// Listen for fetch country call
listen({
  actionCreator: fetchCountry,
  effect: async (_action, listenerApi) => {
    const { dispatch } = listenerApi;

    try {
      // Fetch country
      const fetchedCountry = await dispatch(
        ipBaseApi.endpoints.fetchUserCountry.initiate()
      ).unwrap();

      // Set fetched country
      dispatch(updateCountry(fetchedCountry ?? 'PS'));
    } catch (error) {
      console.error('Error fetching country:', error);
    }
  },
});

// Debounced version of the username check function
const debouncedCheckUsernameExists = debounce<
  (accountName: string, dispatch: AppDispatch) => Promise<void>
>(async (accountName: string, dispatch: AppDispatch) => {
  try {
    dispatch(setSubmitButtonDisabled(true));
    const exists = (
      await dispatch(
        userManagementApi.endpoints.checkUsernameExists.initiate(accountName.trim())
      ).unwrap()
    ).exists;

    if (!exists) {
      dispatch(setIsUsernameAvailable(true));
      dispatch(cleanErrorMessages());
    } else {
      dispatch(setIsUsernameAvailable(false));
      dispatch(cleanErrorMessages());
    }
  } catch (error) {
    console.error('Error checking account availability:', error);
    dispatch(cleanErrorMessages());
    dispatch(
      addErrorMessage(
        '- Internal server error while checking account availability. Please try again later.'
      )
    );
    scrollToTop();
  } finally {
    dispatch(setSubmitButtonDisabled(false));
  }
}, 400);

// Listen for username changes and check if it is available
listen({
  predicate: (_action, currentState, previousState) =>
    currentState.user.signup.accountName !== previousState.user.signup.accountName,

  effect: (_action, listenerApi) => {
    const { dispatch } = listenerApi;
    const { accountName } = listenerApi.getState().user.signup;

    if (accountName.length !== 0) {
      // Cancel any pending debounced calls
      debouncedCheckUsernameExists.cancel();
      // Call the debounced function for username check
      debouncedCheckUsernameExists(accountName, dispatch);
    } else {
      dispatch(setIsUsernameAvailable(false));
      dispatch(cleanErrorMessages());
    }
  },
});

// Listen for password and confirm password changes and update the passwords do not match state
listen({
  predicate: (_action, currentState, previousState) =>
    currentState.user.signup.password !== previousState.user.signup.password ||
    currentState.user.signup.confirmPassword !== previousState.user.signup.confirmPassword,

  effect: (_action, listenerApi) => {
    const { dispatch } = listenerApi;
    const { password, confirmPassword } = listenerApi.getState().user.signup;

    if (confirmPassword.length === 0) {
      dispatch(setPasswordsDoNotMatch(false));
    } else {
      dispatch(setPasswordsDoNotMatch(password !== confirmPassword));
    }
  },
});

// Export the listener
export default signupListener;
