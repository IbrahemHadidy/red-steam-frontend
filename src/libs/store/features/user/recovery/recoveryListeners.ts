// Redux
import { createListenerMiddleware } from '@reduxjs/toolkit';

// Actions
import { setLoginFormVisibility } from '../login/loginSlice';
import {
  checkPageType,
  setPasswordPageVisibility,
  setPasswordsDoNotMatch,
  setResetButtonDisabled,
} from './recoverySlice';

// Constants
import { MIN_PASSWORD_LENGTH } from '@constants/passwords';

// Utils
import { validatePassword } from '@utils/inputValidations';

// Types
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '@store/store';

// Create listener middleware
const recoveryListener = createListenerMiddleware();
const listen = recoveryListener.startListening.withTypes<RootState, AppDispatch>();

// Listen for new password and confirm new password changes and update the reset button state
listen({
  predicate: (_action, currentState, previousState) => {
    return (
      currentState.recovery.newPassword !== previousState.recovery.newPassword ||
      currentState.recovery.confirmNewPassword !== previousState.recovery.confirmNewPassword
    );
  },
  effect: (_action, listenerApi) => {
    const { dispatch } = listenerApi;
    const { newPassword, confirmNewPassword } = listenerApi.getState().recovery;

    if (confirmNewPassword.length === 0) {
      dispatch(setPasswordsDoNotMatch(false));
      dispatch(setResetButtonDisabled(true));
    } else if (
      newPassword.length < MIN_PASSWORD_LENGTH ||
      validatePassword(newPassword) === false
    ) {
      dispatch(setResetButtonDisabled(true));
    } else {
      const passwordsMatch = newPassword === confirmNewPassword;
      dispatch(setPasswordsDoNotMatch(!passwordsMatch));
      dispatch(setResetButtonDisabled(!passwordsMatch));
    }
  },
});

// Listen for page type changes and update the password page visibility based on the new type
listen({
  actionCreator: checkPageType,
  effect: async (action: PayloadAction<string>, listenerApi) => {
    const { dispatch } = listenerApi;
    const type = action.payload;

    if (type !== 'Sign In') {
      dispatch(setPasswordPageVisibility(true));
      dispatch(setLoginFormVisibility(false));
    } else {
      dispatch(setPasswordPageVisibility(false));
      dispatch(setLoginFormVisibility(true));
    }
  },
});

// Export the listener
export default recoveryListener;
