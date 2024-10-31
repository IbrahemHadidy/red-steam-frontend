// Toast Notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { createAppAsyncThunk } from '@store/hooks';

// Thunks
import { fetchUserData, logout } from '@store/features/auth/authThunks';

// Utils
import { validateEmail, validatePassword, validatePhone } from '@utils/inputValidations';

// Apis
import userManagementApi from '@store/apis/user/management';
import userPhoneApi from '@store/apis/user/phone';

export const changeUsername = createAppAsyncThunk<string, void, { rejectValue: string }>(
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

export const changeEmail = createAppAsyncThunk<string, void, { rejectValue: string }>(
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
          return fulfillWithValue('');
        } else {
          return rejectWithValue('The new email is the same as the current one');
        }
      } else {
        return rejectWithValue('Invalid email format');
      }
    } else {
      // Second step: change email
      try {
        // Change email
        const changeEmailResult = await dispatch(
          userManagementApi.endpoints.changeEmail.initiate({
            currentEmail,
            currentPassword,
            newEmail: email,
          })
        ).unwrap();

        if (changeEmailResult.message) toast.success(changeEmailResult.message);

        // Update user data
        await dispatch(fetchUserData());

        // Resolve with success message
        return fulfillWithValue('Email changed successfully');
      } catch (error) {
        console.error('Error changing email:', error);
        return rejectWithValue('Error changing email');
      }
    }
  }
);

export const changeCountry = createAppAsyncThunk<string, string, { rejectValue: string }>(
  'user/settings/changeCountry',
  async (newCountry, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      // Delete account
      await dispatch(userManagementApi.endpoints.changeCountry.initiate({ newCountry })).unwrap();

      // Resolve with value
      return fulfillWithValue(newCountry);
    } catch (error) {
      console.error('Error changing country:', error);
      toast.error('An error occurred while changing your country. Please try again.');
      return rejectWithValue('Error changing country');
    }
  }
);

export const changePhone = createAppAsyncThunk<string, void, { rejectValue: string }>(
  'user/settings/changePhone',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { currentChangeStep, phone } = getState().user.settings;

    // Validate phone format
    const isPhoneValid = validatePhone(phone);

    if (currentChangeStep === 1) {
      // First step: validate phone format and move to next step
      if (isPhoneValid) {
        return fulfillWithValue('');
      } else {
        return rejectWithValue('Invalid phone number');
      }
    } else {
      // Second step: change phone
      try {
        const changePhoneResult = await dispatch(
          userPhoneApi.endpoints.changePhoneNumber.initiate({ newPhoneNumber: phone })
        ).unwrap();

        if (changePhoneResult.message) toast.success(changePhoneResult.message);

        // Update user data
        await dispatch(fetchUserData());

        // Resolve with success message
        return fulfillWithValue('Phone number changed successfully');
      } catch (error) {
        console.error('Error changing phone:', error);
        return rejectWithValue('Error changing phone');
      }
    }
  }
);

export const changePassword = createAppAsyncThunk<string, void, { rejectValue: string }>(
  'user/settings/changePassword',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { newPassword, confirmNewPassword } = getState().user.settings;

    // Validate password format
    const isNewPasswordValid = validatePassword(newPassword);
    const isNewPasswordConfirmed = newPassword === confirmNewPassword;

    if (isNewPasswordValid && isNewPasswordConfirmed) {
      try {
        // Change password
        const changePasswordResult = await dispatch(
          userManagementApi.endpoints.changePassword.initiate({
            currentPassword: newPassword,
            newPassword: confirmNewPassword,
          })
        ).unwrap();

        if (changePasswordResult.message) toast.success(changePasswordResult.message);

        // Update user data
        await dispatch(fetchUserData());

        // Resolve with success message
        return fulfillWithValue('Password changed successfully');
      } catch (error) {
        console.error('Error changing password:', error);
        return rejectWithValue('Error changing password');
      }
    } else {
      return rejectWithValue(
        'New password should be at least 8 characters long and contain at least one letter, one number, and one special character.'
      );
    }
  }
);

export const deletePhone = createAppAsyncThunk<string, void, { rejectValue: string }>(
  'user/settings/deletePhone',
  async (_, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      // Delete phone
      const deletePhoneResult = await dispatch(
        userPhoneApi.endpoints.removePhoneNumber.initiate()
      ).unwrap();

      if (deletePhoneResult.message) toast.success(deletePhoneResult.message);

      // Update user data
      await dispatch(fetchUserData());

      // Resolve with success message
      return fulfillWithValue('Phone number deleted successfully');
    } catch (error) {
      console.error('Error deleting phone:', error);
      toast.error('An error occurred while deleting phone. Please try again.');
      return rejectWithValue('Error deleting phone');
    }
  }
);

export const deleteAccount = createAppAsyncThunk<string, void, { rejectValue: string }>(
  'user/settings/deleteAccount',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { currentPassword } = getState().user.settings;

    try {
      // Delete account
      await dispatch(userManagementApi.endpoints.deleteAccount.initiate(currentPassword)).unwrap();

      // logout
      await dispatch(logout());

      // Resolve with success message
      return fulfillWithValue('Account deleted successfully');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('An error occurred while deleting your account. Please try again.');
      return rejectWithValue('Error deleting account');
    }
  }
);

export const changeAvatar = createAppAsyncThunk<string, void, { rejectValue: string }>(
  'user/settings/changeAvatar',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { avatarFile } = getState().user.settings;

    if (avatarFile) {
      // Change avatar
      await toast
        .promise(dispatch(userManagementApi.endpoints.uploadAvatar.initiate(avatarFile)).unwrap(), {
          pending: 'Uploading avatar...',
          success: 'Avatar uploaded successfully',
          error: 'An error occurred while uploading avatar. Please try again.',
        })
        .catch((error) => {
          console.error('Error changing avatar:', error);
          return rejectWithValue('Error uploading avatar');
        });

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

export const deleteAvatar = createAppAsyncThunk<string, void, { rejectValue: string }>(
  'user/settings/deleteAvatar',
  async (_, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const deleteAvatarResult = await dispatch(
        userManagementApi.endpoints.deleteAvatar.initiate()
      ).unwrap();

      if (deleteAvatarResult.message) toast.success(deleteAvatarResult.message);

      // Update user data
      await dispatch(fetchUserData());

      // Resolve with success message
      return fulfillWithValue('Avatar deleted successfully');
    } catch (error) {
      console.error('Error deleting avatar:', error);
      toast.error('An error occurred while deleting avatar. Please try again.');
      return rejectWithValue('Error deleting avatar');
    }
  }
);
