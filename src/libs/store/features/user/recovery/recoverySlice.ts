// Redux
import { createAction, createSlice } from '@reduxjs/toolkit';

// Thunks
import { forgotPassword, resetPassword } from './recoveryThunks';

// Types
import type { PayloadAction } from '@reduxjs/toolkit';

interface RecoveryState {
  // UI states
  readonly resetPasswordLoadingState: boolean;
  readonly showResetPasswordInterface: boolean;
  readonly isResetButtonDisabled: boolean;

  // Password page visibility
  readonly isPasswordPage: boolean;

  // Forgot password email
  readonly resetEmail: string;

  // Reset password credentials
  readonly newPassword: string;
  readonly confirmNewPassword: string;

  // Recaptcha
  readonly recaptchaValue: string | null;

  // Password strength and matching
  readonly passwordStrengthError: boolean;
  readonly passwordStrengthWarning: boolean;
  readonly passwordsDoNotMatch: boolean;

  // Error handling
  readonly resetPasswordErrorMessage: string;

  // Reset password token
  readonly resetToken: string;
}

// Initial state
const recoveryState: RecoveryState = {
  resetPasswordLoadingState: false,
  showResetPasswordInterface: false,
  isResetButtonDisabled: true,
  isPasswordPage: false,
  resetEmail: '',
  newPassword: '',
  confirmNewPassword: '',
  recaptchaValue: null,
  passwordStrengthError: false,
  passwordStrengthWarning: false,
  passwordsDoNotMatch: false,
  resetPasswordErrorMessage: '',
  resetToken: '',
};

const recoverySlice = createSlice({
  name: 'user/recovery',
  initialState: recoveryState,

  reducers: {
    setResetLoadingState: (state, action: PayloadAction<boolean>) => {
      state.resetPasswordLoadingState = action.payload;
    },
    setResetPasswordInterfaceVisibility: (state, action: PayloadAction<boolean>) => {
      state.showResetPasswordInterface = action.payload;
    },
    setResetButtonDisabled: (state, action: PayloadAction<boolean>) => {
      state.isResetButtonDisabled = action.payload;
    },
    setPasswordPageVisibility: (state, action: PayloadAction<boolean>) => {
      state.isPasswordPage = action.payload;
    },
    updateResetEmail: (state, action: PayloadAction<string>) => {
      state.resetEmail = action.payload;
    },
    updateNewPassword: (state, action: PayloadAction<string>) => {
      state.newPassword = action.payload;
    },
    updateConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmNewPassword = action.payload;
    },
    updateRecaptchaToken: (state, action: PayloadAction<string | null>) => {
      state.recaptchaValue = action.payload;
    },
    setPasswordStrengthError: (state, action: PayloadAction<boolean>) => {
      state.passwordStrengthError = action.payload;
    },
    setPasswordStrengthWarning: (state, action: PayloadAction<boolean>) => {
      state.passwordStrengthWarning = action.payload;
    },
    setPasswordsDoNotMatch: (state, action: PayloadAction<boolean>) => {
      state.passwordsDoNotMatch = action.payload;
    },
    updateResetErrorMessage: (state, action: PayloadAction<string>) => {
      state.resetPasswordErrorMessage = action.payload;
    },
    updateResetToken: (state, action: PayloadAction<string>) => {
      state.resetToken = action.payload;
    },
    loginInstead: (state) => {
      state.isPasswordPage = false;
      state.showResetPasswordInterface = false;
      state.passwordStrengthError = false;
      state.passwordStrengthWarning = false;
      state.newPassword = '';
      state.confirmNewPassword = '';
      state.passwordsDoNotMatch = false;
      state.resetPasswordErrorMessage = '';
      state.resetEmail = '';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.resetPasswordLoadingState = true;
        state.resetPasswordErrorMessage = '';
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.resetPasswordLoadingState = false;
        state.resetPasswordErrorMessage = '';
        state.resetEmail = '';
      })
      .addCase(forgotPassword.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.resetPasswordErrorMessage = action.payload ?? 'An unknown error occurred';
        state.resetPasswordLoadingState = false;
      })

      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordLoadingState = true;
        state.resetPasswordErrorMessage = '';
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetPasswordLoadingState = false;
        state.resetPasswordErrorMessage = '';
        state.newPassword = '';
        state.confirmNewPassword = '';
        state.recaptchaValue = null;
        state.passwordStrengthError = false;
        state.passwordStrengthWarning = false;
        state.passwordsDoNotMatch = false;
        state.resetToken = '';
      })
      .addCase(resetPassword.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.resetPasswordErrorMessage = action.payload ?? 'An unknown error occurred';
        state.resetPasswordLoadingState = false;
      });
  },
});

// Listener actions
export const checkPageType = createAction<string>('user/recovery/checkPageType');

export const {
  setResetLoadingState,
  setResetPasswordInterfaceVisibility,
  setResetButtonDisabled,
  setPasswordPageVisibility,
  updateResetEmail,
  updateNewPassword,
  updateConfirmPassword,
  updateRecaptchaToken,
  setPasswordStrengthError,
  setPasswordStrengthWarning,
  setPasswordsDoNotMatch,
  updateResetErrorMessage,
  updateResetToken,
  loginInstead,
} = recoverySlice.actions;
export default recoverySlice;
