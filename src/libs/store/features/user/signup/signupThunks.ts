// Toast Notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { createAppAsyncThunk } from '@store/hooks';

// Channels
import { authChannel } from '@store/features/auth/authChannel';

// Utils
import { validateEmail, validateName, validatePassword } from '@utils/inputValidations';
import scrollToTop from '@utils/scrollToTop';

// Apis
import userAuthApi from '@store/apis/user/auth';
import userManagementApi from '@store/apis/user/management';

// Types
import type { User } from '@interfaces/user';
import type { RefObject } from 'react';
import type ReCAPTCHA from 'react-google-recaptcha';

export interface CheckExistingEmailRejectValue {
  emailInputError?: boolean;
  confirmEmailInputError?: boolean;
  isEmailAvailable?: boolean;
  agreeCheckboxError?: boolean;
  errors: string[];
}

export interface CheckNameAndPasswordRejectValue {
  accountNameInputError?: boolean;
  passwordInputError?: boolean;
  confirmPasswordInputError?: boolean;
  isEmailAvailable?: boolean;
  agreeCheckboxError?: boolean;
  errors: string[];
}

export const checkExistingEmail = createAppAsyncThunk<
  string,
  { recaptchaRef: RefObject<ReCAPTCHA | null> },
  { rejectValue: CheckExistingEmailRejectValue }
>(
  'user/signup/checkExistingEmail',
  async ({ recaptchaRef }, { rejectWithValue, getState, dispatch }) => {
    const { email, confirmEmail, isAgreeChecked } = getState().user.signup;
    const recaptchaValue = recaptchaRef.current?.getValue();
    const resetRecaptchaValue = () => recaptchaRef.current?.reset();

    const rejectValue: CheckExistingEmailRejectValue = { errors: [] };

    const isEmailValid = validateEmail(email);

    if (!isEmailValid) {
      rejectValue.emailInputError = true;
      rejectValue.confirmEmailInputError = true;
      rejectValue.errors.push('- Please enter a valid email address.');
      scrollToTop();
    }
    if (confirmEmail !== email) {
      rejectValue.confirmEmailInputError = true;
      rejectValue.errors.push('- Please enter the same address in both email address fields.');
      scrollToTop();
    }
    if (!recaptchaRef.current?.getValue()) {
      rejectValue.errors.push("- Please verify that you're not a robot.");
      scrollToTop();
    }
    if (!isAgreeChecked) {
      rejectValue.agreeCheckboxError = true;
      rejectValue.errors.push('- Please agree to the terms and conditions.');
      scrollToTop();
    }
    if (!isEmailValid || confirmEmail !== email || !isAgreeChecked || !recaptchaValue) {
      resetRecaptchaValue();
      return rejectWithValue(rejectValue);
    }

    try {
      const exists = await dispatch(
        userManagementApi.endpoints.checkEmailExists.initiate(email)
      ).unwrap();

      if (exists) {
        // Email already exists
        rejectValue.isEmailAvailable = false;
        return rejectWithValue(rejectValue);
      } else {
        // Email does not exist, proceed with the form submission
        rejectValue.isEmailAvailable = true;
        rejectValue.errors = [];

        // Check if reCAPTCHA is solved
        if (!recaptchaValue) {
          rejectValue.errors.push(
            '- You must verify your humanity before you can create a Red Steam account.'
          );
          scrollToTop();
          return rejectWithValue(rejectValue);
        }

        return recaptchaValue;
      }
    } catch (error) {
      console.error('Error checking existing email:', error);
      rejectValue.errors.push(
        '- An error occurred while trying to connect to the server. Please check your internet connection and try again.'
      );
      scrollToTop();
      return rejectWithValue(rejectValue);
    } finally {
      resetRecaptchaValue();
    }
  }
);

export const checkNameAndPassword = createAppAsyncThunk<
  User,
  void,
  { rejectValue: CheckNameAndPasswordRejectValue }
>(
  'user/signup/checkNameAndPassword',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { email, accountName, country, password, confirmPassword, recaptchaToken } =
      getState().user.signup;

    const rejectValue: CheckNameAndPasswordRejectValue = { errors: [] };

    const isNameValid: boolean = validateName(accountName);
    const isPasswordValid: boolean = validatePassword(password);

    if (!isNameValid) {
      rejectValue.accountNameInputError = true;
      rejectValue.errors.push(
        '- Please enter an account name that is at least 3 characters long and uses only a-z, A-Z, 0-9 or _ characters.'
      );
      scrollToTop();
    }
    if (!isPasswordValid) {
      rejectValue.passwordInputError = true;
      rejectValue.confirmPasswordInputError = true;
      rejectValue.errors.push(
        '- Password must contain at least one digit, one letter, and one special character.'
      );
      scrollToTop();
    }
    if (password !== confirmPassword) {
      rejectValue.confirmPasswordInputError = true;
      rejectValue.errors.push('- Please enter the same address in both email address fields.');
      scrollToTop();
    }
    if (!isNameValid || !isPasswordValid || password !== confirmPassword) {
      return rejectWithValue(rejectValue);
    }

    try {
      // Signup the user
      await dispatch(
        userAuthApi.endpoints.signup.initiate({
          username: accountName,
          email,
          password,
          country,
          recaptchaToken,
        })
      ).unwrap();

      // Show success toast
      toast.success('Account created successfully!');
    } catch (error) {
      console.error('Error creating account:', error);
      rejectValue.errors.push(
        '- An error occurred while trying to connect to the server. Please check your internet connection and try again.'
      );
      return rejectWithValue(rejectValue);
    }

    try {
      // Login the user
      const loginResult = await dispatch(
        userAuthApi.endpoints.login.initiate({ identifier: email, password, rememberMe: false })
      ).unwrap();
      const currentUserData = loginResult.userData;

      // Store session information
      if (loginResult.isSessionLoggedIn) sessionStorage.setItem('isSessionLogin', 'true');

      // Notify other tabs about the login status
      authChannel.postMessage({ isUserLoggedIn: true, currentUserData });

      return fulfillWithValue(currentUserData);
    } catch (error) {
      console.error('Error logging in:', error);
      rejectValue.errors.push(
        '- An error occurred while trying to connect to the server. Please check your internet connection and try again.'
      );
      return rejectWithValue(rejectValue);
    }
  }
);
