// Redux
import { createAction, createSlice } from '@reduxjs/toolkit';

// Thunks
import { checkExistingEmail, checkNameAndPassword } from './signupThunks';

// Types
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  CheckExistingEmailRejectValue,
  CheckNameAndPasswordRejectValue,
} from './signupThunks';

interface SignupState {
  // UI states
  readonly isSecondPage: boolean;
  readonly isCheckingAvailability: boolean;
  readonly emailInputError: boolean;
  readonly confirmEmailInputError: boolean;
  readonly accountNameInputError: boolean;
  readonly passwordInputError: boolean;
  readonly confirmPasswordInputError: boolean;
  readonly agreeCheckboxError: boolean;
  readonly submitButtonDisabled: boolean;

  // Signup credentials
  readonly email: string;
  readonly confirmEmail: string;
  readonly accountName: string;
  readonly country: string;
  readonly password: string;
  readonly confirmPassword: string;
  readonly recaptchaToken: string;
  readonly isAgreeChecked: boolean;

  // Email and username availability
  readonly isEmailAvailable: boolean;
  readonly isUsernameAvailable: boolean;

  // Password strength and matching
  readonly passwordStrengthError: boolean;
  readonly passwordStrengthWarning: boolean;
  readonly passwordsDoNotMatch: boolean;

  // Error handling
  readonly errorMessages: string[];
}

// Initial state
const signupState: SignupState = {
  isSecondPage: false,
  isCheckingAvailability: false,
  emailInputError: false,
  confirmEmailInputError: false,
  accountNameInputError: false,
  passwordInputError: false,
  confirmPasswordInputError: false,
  agreeCheckboxError: false,
  submitButtonDisabled: false,
  email: '',
  confirmEmail: '',
  accountName: '',
  country: 'PS',
  password: '',
  confirmPassword: '',
  recaptchaToken: '',
  isAgreeChecked: false,
  isEmailAvailable: true,
  isUsernameAvailable: false,
  passwordStrengthError: false,
  passwordStrengthWarning: false,
  passwordsDoNotMatch: false,
  errorMessages: [],
};

const signupSlice = createSlice({
  name: 'user/signup',
  initialState: signupState,

  reducers: {
    setSecondPage: (state, action: PayloadAction<boolean>) => {
      state.isSecondPage = action.payload;
    },
    setCheckingAvailability: (state, action: PayloadAction<boolean>) => {
      state.isCheckingAvailability = action.payload;
    },
    setEmailInputError: (state, action: PayloadAction<boolean>) => {
      state.emailInputError = action.payload;
    },
    setConfirmEmailInputError: (state, action: PayloadAction<boolean>) => {
      state.confirmEmailInputError = action.payload;
    },
    setAccountNameInputError: (state, action: PayloadAction<boolean>) => {
      state.accountNameInputError = action.payload;
    },
    setPasswordInputError: (state, action: PayloadAction<boolean>) => {
      state.passwordInputError = action.payload;
    },
    setConfirmPasswordInputError: (state, action: PayloadAction<boolean>) => {
      state.confirmPasswordInputError = action.payload;
    },
    setAgreeCheckboxError: (state, action: PayloadAction<boolean>) => {
      state.agreeCheckboxError = action.payload;
    },
    setSubmitButtonDisabled: (state, action: PayloadAction<boolean>) => {
      state.submitButtonDisabled = action.payload;
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updateConfirmEmail: (state, action: PayloadAction<string>) => {
      state.confirmEmail = action.payload;
    },
    updateAccountName: (state, action: PayloadAction<string>) => {
      state.accountName = action.payload;
    },
    updateCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    updateConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    toggleAgreeCheck: (state) => {
      state.isAgreeChecked = !state.isAgreeChecked;
    },
    setIsEmailAvailable: (state, action: PayloadAction<boolean>) => {
      state.isEmailAvailable = action.payload;
    },
    setIsUsernameAvailable: (state, action: PayloadAction<boolean>) => {
      state.isUsernameAvailable = action.payload;
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
    addErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessages.push(action.payload);
    },
    addErrorMessages: (state, action: PayloadAction<string[]>) => {
      state.errorMessages.push(...action.payload);
    },
    cleanErrorMessages: (state) => {
      state.errorMessages = [];
    },
    reset: (state) => {
      return { ...signupState, country: state.country };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkExistingEmail.pending, (state) => {
        state.errorMessages = [];
        state.isCheckingAvailability = true;
        state.submitButtonDisabled = true;
      })
      .addCase(checkExistingEmail.fulfilled, (state, action: PayloadAction<string>) => {
        state.isCheckingAvailability = false;
        state.isEmailAvailable = true;
        state.submitButtonDisabled = false;
        state.isSecondPage = true;
        state.recaptchaToken = action.payload;
      })
      .addCase(
        checkExistingEmail.rejected,
        (state, action: PayloadAction<CheckExistingEmailRejectValue | undefined>) => {
          const {
            emailInputError,
            isEmailAvailable,
            confirmEmailInputError,
            agreeCheckboxError,
            errors,
          } = action.payload ?? {};

          state.isCheckingAvailability = false;
          state.submitButtonDisabled = false;
          state.emailInputError = emailInputError ?? state.emailInputError;
          state.confirmEmailInputError = confirmEmailInputError ?? state.confirmEmailInputError;
          state.isEmailAvailable = isEmailAvailable ?? state.isEmailAvailable;
          state.agreeCheckboxError = agreeCheckboxError ?? state.agreeCheckboxError;
          state.errorMessages = errors ?? state.errorMessages;
        }
      )

      .addCase(checkNameAndPassword.pending, (state) => {
        state.errorMessages = [];
        state.isCheckingAvailability = true;
        state.submitButtonDisabled = true;
      })
      .addCase(checkNameAndPassword.fulfilled, (state) => {
        state.isCheckingAvailability = false;
        state.isUsernameAvailable = true;
        state.submitButtonDisabled = false;
      })
      .addCase(
        checkNameAndPassword.rejected,
        (state, action: PayloadAction<CheckNameAndPasswordRejectValue | undefined>) => {
          const {
            agreeCheckboxError,
            accountNameInputError,
            passwordInputError,
            confirmPasswordInputError,
            errors,
          } = action.payload || {};

          state.isCheckingAvailability = false;
          state.submitButtonDisabled = false;
          state.accountNameInputError = accountNameInputError ?? state.accountNameInputError;
          state.passwordInputError = passwordInputError ?? state.passwordInputError;
          state.confirmPasswordInputError =
            confirmPasswordInputError ?? state.confirmPasswordInputError;
          state.agreeCheckboxError = agreeCheckboxError ?? state.agreeCheckboxError;
          state.errorMessages = errors ?? state.errorMessages;
        }
      );
  },
});

// Listener actions
export const fetchCountry = createAction('user/signup/fetchCountry');

export const {
  setSecondPage,
  setCheckingAvailability,
  setEmailInputError,
  setConfirmEmailInputError,
  setAccountNameInputError,
  setPasswordInputError,
  setConfirmPasswordInputError,
  setAgreeCheckboxError,
  setSubmitButtonDisabled,
  updateEmail,
  updateConfirmEmail,
  updateAccountName,
  updateCountry,
  updatePassword,
  updateConfirmPassword,
  toggleAgreeCheck,
  setIsEmailAvailable,
  setIsUsernameAvailable,
  setPasswordStrengthError,
  setPasswordStrengthWarning,
  setPasswordsDoNotMatch,
  addErrorMessage,
  addErrorMessages,
  cleanErrorMessages,
  reset,
} = signupSlice.actions;
export default signupSlice;
