// Redux Hooks
import { createAppAsyncThunk } from '@store/hooks';

// Utils
import { validateEmail } from '@utils/inputValidations';
import promiseToast from '@utils/promiseToast';

// APIs
import {
  checkEmailExistsService,
  forgotPasswordService,
  resetPasswordService,
} from '@store/apis/user/management';

// Types
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type { RefObject } from 'react';
import type ReCAPTCHA from 'react-google-recaptcha';

export const forgotPassword = createAppAsyncThunk<
  void,
  {
    recaptchaRef: RefObject<ReCAPTCHA | null>;
  }
>(
  'user/recovery/forgotPassword',
  async ({ recaptchaRef }, { rejectWithValue, getState, dispatch }) => {
    const { resetEmail } = getState().user.recovery;

    const recaptchaValue = recaptchaRef.current?.getValue();
    const resetRecaptcha = () => recaptchaRef.current?.reset();

    // Validate input and ReCAPTCHA token
    if (!resetEmail && !recaptchaValue) {
      resetRecaptcha();
      return rejectWithValue(
        `Please provide a valid email<br>Please verify that you're not a robot.`
      );
    }
    if (!resetEmail) {
      resetRecaptcha();
      return rejectWithValue('Please provide a valid email');
    }
    if (!recaptchaValue) {
      resetRecaptcha();
      return rejectWithValue("Please verify that you're not a robot.");
    }

    // Validate email or phone format
    if (!validateEmail(resetEmail)) {
      resetRecaptcha();
      return rejectWithValue('Invalid email or phone number');
    }

    try {
      // Check if the account exists
      const accountExists = await dispatch(checkEmailExistsService.initiate(resetEmail)).unwrap();

      // Handle account not found case
      if (!accountExists) {
        resetRecaptcha();
        return rejectWithValue(
          'We were unable to find an account that matches the information you provided.'
        );
      }

      // Proceed with password reset if account exists
      const response = await promiseToast(
        dispatch(
          forgotPasswordService.initiate({
            email: resetEmail,
            recaptchaToken: recaptchaValue ?? '',
          })
        ).unwrap(),
        {
          pending: 'Sending password reset email',
          success: 'Password reset email sent successfully',
          fallbackError: 'An error occurred while sending password reset email. Please try again.',
        }
      );

      if (response) {
        resetRecaptcha();
      } else {
        resetRecaptcha();
        return rejectWithValue('Internal server error, please try again later.');
      }
    } catch (error) {
      resetRecaptcha();
      console.error('Error during forgot password process:', error);
      return rejectWithValue('Internal server error, please try again later.');
    }
  }
);

export const resetPassword = createAppAsyncThunk<void, AppRouterInstance>(
  'user/recovery/resetPassword',
  async (router, { rejectWithValue, getState, dispatch }) => {
    const { newPassword, confirmNewPassword, resetToken } = getState().user.recovery;
    // Check if passwords match
    if (newPassword !== confirmNewPassword) {
      return rejectWithValue('Passwords do not match. Please try again.');
    }

    const response = await promiseToast(
      dispatch(resetPasswordService.initiate({ token: resetToken, newPassword })).unwrap(),
      {
        pending: 'Resetting password',
        success: 'Password reset successfully',
        fallbackError: 'An error occurred while resetting password. Please try again.',
      }
    );

    if (!response) {
      return rejectWithValue('Internal server error, please try again later.');
    } else {
      router.replace('/login');
    }
  }
);
