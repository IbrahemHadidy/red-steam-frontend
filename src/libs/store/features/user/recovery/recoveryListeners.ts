// Toast Notifications
import { toast } from 'react-toastify';

// Redux
import { createListenerMiddleware } from '@reduxjs/toolkit';

// Actions
import { setLoginFormVisibility } from '../login/loginSlice';
import {
  checkPageType,
  checkResetToken,
  setPasswordPageVisibility,
  setPasswordsDoNotMatch,
  setResetButtonDisabled,
  setResetPasswordInterfaceVisibility,
  updateResetToken,
} from './recoverySlice';

// Utils
import { validatePassword } from '@utils/inputValidations';

// Types
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
    const MIN_PASSWORD_LENGTH = 8;

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
  effect: async (action, listenerApi) => {
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

// Listen for reset token changes and update the reset interface state
listen({
  actionCreator: checkResetToken,
  effect: async (action, listenerApi) => {
    const { dispatch } = listenerApi;
    const { token, router } = action.payload;

    if (!token || token.length < 64) {
      router.push('/');
      toast.error('Invalid or missing reset token', { autoClose: 2000 });
    } else {
      dispatch(updateResetToken(token));
      dispatch(setResetPasswordInterfaceVisibility(true));
    }
  },
});

// Export the listener
export default recoveryListener;
