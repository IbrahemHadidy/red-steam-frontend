// Toast Notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { createAppAsyncThunk } from '@store/hooks';

// Thunks
import { fetchUserData } from '@store/features/auth/authThunks';

// Utils
import { getFileFromIndexedDB } from '@utils/filesStorageUtils';
import { validateEmail, validatePassword, validatePhone } from '@utils/inputValidations';
import promiseToast from '@utils/promiseToast';

// Apis
import userManagementApi from '@store/apis/user/management';
import userPhoneApi from '@store/apis/user/phone';

// Channels
import { authChannel } from '@store/features/auth/authChannel';

export const changeUsername = createAppAsyncThunk<string>(
  'user/settings/changeUsername',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { newUsername, currentPassword } = getState().user.settings;

    try {
      // Change username
      await dispatch(
        userManagementApi.endpoints.changeUsername.initiate({
          newUsername,
          currentPassword,
        })
      ).unwrap();

      // Update user data
      await dispatch(fetchUserData());

      toast.success('Username updated successfully');
      return fulfillWithValue('Username updated successfully');
    } catch (error) {
      console.error('Error updating username:', error);
      toast.error('An error occurred while updating username. Please try again.');
      return rejectWithValue('An error occurred while updating username. Please try again.');
    }
  }
);

export const changeEmail = createAppAsyncThunk<void | string>(
  'user/settings/changeEmail',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { currentChangeStep, currentEmail, currentPassword, email } = getState().user.settings;

    // Validate email format
    const isEmailValid = validateEmail(email);
    const isCurrentEmailValid = validateEmail(currentEmail);

    if (currentChangeStep === 1) {
      // First step: validate email format and move to next step
      if (isEmailValid && isCurrentEmailValid) {
        if (email !== currentEmail) {
          return fulfillWithValue(undefined);
        } else {
          return rejectWithValue('The new email is the same as the current one');
        }
      } else {
        return rejectWithValue('Invalid email format');
      }
    } else {
      // Second step: change email
      const response = await promiseToast(
        dispatch(
          userManagementApi.endpoints.changeEmail.initiate({
            currentEmail,
            currentPassword,
            newEmail: email,
          })
        ).unwrap(),
        {
          pending: 'Changing email',
          success: 'Email changed successfully',
          fallbackError: 'An error occurred while changing email. Please try again.',
        }
      );
      if (!response) return rejectWithValue('Error changing email');

      // Update user data
      await dispatch(fetchUserData());

      // Resolve with success message
      return fulfillWithValue('Email changed successfully');
    }
  }
);

export const changeCountry = createAppAsyncThunk<string, string>(
  'user/settings/changeCountry',
  async (newCountry, { rejectWithValue, fulfillWithValue, dispatch }) => {
    const response = await promiseToast(
      dispatch(userManagementApi.endpoints.changeCountry.initiate({ newCountry })).unwrap(),
      {
        pending: 'Changing country',
        success: 'Country changed successfully',
        fallbackError: 'An error occurred while changing country. Please try again.',
      }
    );
    if (!response) return rejectWithValue('Error changing country');

    // Resolve with value
    return fulfillWithValue(newCountry);
  }
);

export const changePhone = createAppAsyncThunk<void | string>(
  'user/settings/changePhone',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { currentChangeStep, phone } = getState().user.settings;

    // Validate phone format
    const isPhoneValid = validatePhone(phone);

    if (currentChangeStep === 1) {
      // First step: validate phone format and move to next step
      if (isPhoneValid) {
        return fulfillWithValue(undefined);
      } else {
        return rejectWithValue('Invalid phone number');
      }
    } else {
      // Second step: change phone
      const response = await promiseToast(
        dispatch(
          userPhoneApi.endpoints.changePhoneNumber.initiate({ newPhoneNumber: phone })
        ).unwrap(),
        {
          pending: 'Changing phone number...',
          success: 'Phone number changed successfully',
          fallbackError: 'An error occurred while changing phone number. Please try again.',
        }
      );
      if (!response) return rejectWithValue('Error changing phone');

      // Update user data
      await dispatch(fetchUserData());

      // Resolve with success message
      return fulfillWithValue('Phone number changed successfully');
    }
  }
);

export const changePassword = createAppAsyncThunk<string>(
  'user/settings/changePassword',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { newPassword, currentPassword, confirmNewPassword } = getState().user.settings;

    // Validate password format
    const isNewPasswordValid = validatePassword(newPassword);
    const isNewPasswordConfirmed = newPassword === confirmNewPassword;

    if (isNewPasswordValid && isNewPasswordConfirmed) {
      // Change password
      const response = await promiseToast(
        dispatch(
          userManagementApi.endpoints.changePassword.initiate({
            currentPassword: currentPassword,
            newPassword: confirmNewPassword,
          })
        ).unwrap(),
        {
          pending: 'Changing password...',
          success: 'Password changed successfully',
          fallbackError: 'Error changing password',
        }
      );
      if (!response?.message) return rejectWithValue('Error changing password');

      // Update user data
      await dispatch(fetchUserData());

      // Resolve with success message
      return fulfillWithValue('Password changed successfully');
    } else {
      return rejectWithValue(
        'New password should be at least 8 characters long and contain at least one letter, one number, and one special character.'
      );
    }
  }
);

export const deletePhone = createAppAsyncThunk<string>(
  'user/settings/deletePhone',
  async (_, { rejectWithValue, fulfillWithValue, dispatch }) => {
    // Delete phone
    const response = await promiseToast(
      dispatch(userPhoneApi.endpoints.removePhoneNumber.initiate()).unwrap(),
      {
        pending: 'Deleting phone number',
        success: 'Phone number deleted successfully',
        fallbackError: 'An error occurred while deleting phone number. Please try again.',
      }
    );
    if (!response) return rejectWithValue('Error deleting phone');

    // Update user data
    await dispatch(fetchUserData());

    // Resolve with success message
    return fulfillWithValue('Phone number deleted successfully');
  }
);

export const deleteAccount = createAppAsyncThunk<string>(
  'user/settings/deleteAccount',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { currentPassword } = getState().user.settings;

    // Delete account
    const response = await promiseToast(
      dispatch(userManagementApi.endpoints.deleteAccount.initiate(currentPassword)).unwrap(),
      {
        pending: 'Deleting account',
        success: 'Account deleted successfully',
        fallbackError: 'An error occurred while deleting your account. Please try again.',
      }
    );
    if (!response) return rejectWithValue('Error deleting account');

    // Logout user
    authChannel.postMessage({ isUserLoggedIn: false, currentUserData: null });
    sessionStorage.removeItem('verificationInProgress');
    localStorage.removeItem('recentGames');
    sessionStorage.removeItem('isSessionLogin');

    // Resolve with success message
    return fulfillWithValue('Account deleted successfully');
  }
);

export const changeAvatar = createAppAsyncThunk<string>(
  'user/settings/changeAvatar',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { avatarFile } = getState().user.settings;

    if (avatarFile) {
      // Change avatar
      const response = await promiseToast(
        dispatch(
          userManagementApi.endpoints.uploadAvatar.initiate(
            (await getFileFromIndexedDB(avatarFile.id)) as File
          )
        ).unwrap(),
        {
          pending: 'Uploading avatar...',
          success: 'Avatar uploaded successfully',
          fallbackError: 'An error occurred while uploading avatar. Please try again.',
        }
      );
      if (!response) return rejectWithValue('Error uploading avatar');

      // Update user data
      await dispatch(fetchUserData());

      // Resolve with success message
      return fulfillWithValue('Avatar changed successfully');
    } else {
      toast.error('No avatar file selected');
      return rejectWithValue('No avatar file selected');
    }
  }
);

export const deleteAvatar = createAppAsyncThunk<string>(
  'user/settings/deleteAvatar',
  async (_, { rejectWithValue, fulfillWithValue, dispatch }) => {
    const response = await promiseToast(
      dispatch(userManagementApi.endpoints.deleteAvatar.initiate()).unwrap(),
      {
        pending: 'Deleting avatar...',
        success: 'Avatar deleted successfully',
        fallbackError: 'An error occurred while deleting avatar. Please try again.',
      }
    );
    if (!response) return rejectWithValue('Error deleting avatar');

    // Update user data
    await dispatch(fetchUserData());

    // Resolve with success message
    return fulfillWithValue('Avatar deleted successfully');
  }
);
