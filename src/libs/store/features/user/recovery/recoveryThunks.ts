// Toast Notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { createAppAsyncThunk } from '@store/hooks';

// Utils
import { validateEmail } from '@utils/inputValidations';

// APIs
import userManagementApi from '@store/apis/user/management';

// Types
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
      const accountExists = await dispatch(
        userManagementApi.endpoints.checkEmailExists.initiate(resetEmail)
      ).unwrap();

      // Handle account not found case
      if (!accountExists) {
        resetRecaptcha();
        return rejectWithValue(
          'We were unable to find an account that matches the information you provided.'
        );
      }

      // Proceed with password reset if account exists
      const status = await dispatch(
        userManagementApi.endpoints.forgotPassword.initiate({
          email: resetEmail,
          recaptchaToken: recaptchaValue ?? '',
        })
      ).unwrap();

      if (status === 200) {
        resetRecaptcha();
        toast.success('Password reset email sent successfully. Please check your email.');
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

export const resetPassword = createAppAsyncThunk(
  'user/recovery/resetPassword',
  async (_, { rejectWithValue, getState, dispatch }) => {
    const { newPassword, confirmNewPassword, resetToken } = getState().user.recovery;
    // Check if passwords match
    if (newPassword !== confirmNewPassword) {
      return rejectWithValue('Passwords do not match. Please try again.');
    }

    try {
      // Reset the password using the reset token
      await dispatch(
        userManagementApi.endpoints.resetPassword.initiate({ token: resetToken, newPassword })
      ).unwrap();
    } catch (error) {
      // Return an error message if the request fails
      console.error('Error during password reset:', error);
      return rejectWithValue('Internal server error, please try again later.');
    }
  }
);
