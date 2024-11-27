// Redux
import { createAction, createSlice } from '@reduxjs/toolkit';

// Thunks
import {
  changeAvatar,
  changeCountry,
  changeEmail,
  changePassword,
  changePhone,
  deleteAccount,
  deletePhone,
} from './userSettingsThunks';

// Types
import type FileMetadata from '@custom-types/file-metadata';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ChangeModalType = 'email' | 'password' | 'phone';

interface UserSettingsState {
  // UI States
  readonly isIdVisible: boolean;
  readonly isChangeModalVisible: boolean;
  readonly isDeleteAccountModalVisible: boolean;
  readonly isDeletePhoneModalVisible: boolean;
  readonly changeModalType: ChangeModalType;
  readonly currentChangeStep: number;
  readonly isUsernameAvailable: boolean;
  readonly submitAvatarButtonDisabled: boolean;
  readonly nextStepButtonDisabled: boolean;
  readonly deletePhoneButtonDisabled: boolean;

  // Input States
  readonly email: string;
  readonly phone: string;
  readonly newUsername: string;
  readonly currentEmail: string;
  readonly currentPassword: string;
  readonly newPassword: string;
  readonly confirmNewPassword: string;
  readonly selectedCountry: string;

  // Avatar States
  readonly avatarFile: FileMetadata | null;
  readonly avatarPreview: string | null;

  // Error Handling
  readonly errorMessage: string;
}

// Initial state
const userSettingsState: UserSettingsState = {
  isIdVisible: false,
  isChangeModalVisible: false,
  changeModalType: 'email',
  currentChangeStep: 1,
  isDeleteAccountModalVisible: false,
  isDeletePhoneModalVisible: false,
  isUsernameAvailable: true,
  submitAvatarButtonDisabled: true,
  nextStepButtonDisabled: false,
  deletePhoneButtonDisabled: false,

  email: '',
  phone: '',
  newUsername: '',
  currentEmail: '',
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
  selectedCountry: 'PS',

  avatarFile: null,
  avatarPreview: null,

  errorMessage: '',
};

const userSettingsSlice = createSlice({
  name: 'user/settings',
  initialState: userSettingsState,

  reducers: {
    toggleIdVisibility(state) {
      state.isIdVisible = !state.isIdVisible;
    },
    setChangeModalVisiblity(state, action: PayloadAction<boolean>) {
      state.isChangeModalVisible = action.payload;
    },
    setDeleteAccountModalVisiblity(state, action: PayloadAction<boolean>) {
      state.isDeleteAccountModalVisible = action.payload;
    },
    setDeletePhoneModalVisiblity(state, action: PayloadAction<boolean>) {
      state.isDeletePhoneModalVisible = action.payload;
    },
    setChangeModalType(state, action: PayloadAction<ChangeModalType>) {
      state.changeModalType = action.payload;
    },
    setUsernameAvailability(state, action: PayloadAction<boolean>) {
      state.isUsernameAvailable = action.payload;
    },
    setSubmitAvatarButtonDisabled(state, action: PayloadAction<boolean>) {
      state.submitAvatarButtonDisabled = action.payload;
    },
    setNextStepButtonDisabled(state, action: PayloadAction<boolean>) {
      state.nextStepButtonDisabled = action.payload;
    },
    setDeletePhoneButtonDisabled(state, action: PayloadAction<boolean>) {
      state.deletePhoneButtonDisabled = action.payload;
    },
    updateEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    updatePhone(state, action: PayloadAction<string>) {
      state.phone = action.payload;
    },
    updateNewUsername(state, action: PayloadAction<string>) {
      state.newUsername = action.payload;
    },
    updateCurrentEmail(state, action: PayloadAction<string>) {
      state.currentEmail = action.payload;
    },
    updateCurrentPassword(state, action: PayloadAction<string>) {
      state.currentPassword = action.payload;
    },
    updateNewPassword(state, action: PayloadAction<string>) {
      state.newPassword = action.payload;
    },
    updateConfirmNewPassword(state, action: PayloadAction<string>) {
      state.confirmNewPassword = action.payload;
    },
    updateSelectedCountry(state, action: PayloadAction<string>) {
      state.selectedCountry = action.payload;
    },
    updateAvatarFile(state, action: PayloadAction<FileMetadata | null>) {
      state.avatarFile = action.payload;
    },
    setAvatarPreview(state, action: PayloadAction<string | null>) {
      state.avatarPreview = action.payload;
    },
    setErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },

    resetChangeModal(state) {
      state.currentChangeStep = 1;
      state.email = '';
      state.phone = '';
      state.currentEmail = '';
      state.currentPassword = '';
      state.newPassword = '';
      state.confirmNewPassword = '';
      state.errorMessage = '';
      state.nextStepButtonDisabled = false;
    },

    resetAccountDeleteModal(state) {
      state.currentPassword = '';
      state.errorMessage = '';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(changeEmail.pending, (state) => {
        state.errorMessage = '';
        state.nextStepButtonDisabled = true;
      })
      .addCase(changeEmail.fulfilled, (state) => {
        state.errorMessage = '';
        state.nextStepButtonDisabled = false;
        state.email = '';
        state.currentEmail = '';
        state.currentPassword = '';
        if (state.currentChangeStep === 2) {
          state.isChangeModalVisible = false;
          document.body.style.overflow = 'unset';
        }
        state.currentChangeStep = 2;
      })
      .addCase(changeEmail.rejected, (state, action) => {
        state.errorMessage = action.payload ?? 'Failed to change email';
        state.nextStepButtonDisabled = false;
      })

      .addCase(changePhone.pending, (state) => {
        state.errorMessage = '';
        state.nextStepButtonDisabled = true;
      })
      .addCase(changePhone.fulfilled, (state) => {
        state.errorMessage = '';
        state.nextStepButtonDisabled = false;
        state.phone = '';
        state.currentPassword = '';
        if (state.currentChangeStep === 2) {
          state.isChangeModalVisible = false;
          document.body.style.overflow = 'unset';
        }
        state.currentChangeStep = 2;
      })
      .addCase(changePhone.rejected, (state, action) => {
        state.errorMessage = action.payload ?? 'Failed to change phone number';
        state.nextStepButtonDisabled = false;
      })

      .addCase(changePassword.pending, (state) => {
        state.errorMessage = '';
        state.nextStepButtonDisabled = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.errorMessage = '';
        state.nextStepButtonDisabled = false;
        state.currentPassword = '';
        state.newPassword = '';
        state.confirmNewPassword = '';
        state.isChangeModalVisible = false;
        document.body.style.overflow = 'unset';
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.errorMessage = action.payload ?? 'Failed to change password';
        state.nextStepButtonDisabled = false;
      })

      .addCase(deletePhone.pending, (state) => {
        state.deletePhoneButtonDisabled = true;
      })
      .addCase(deletePhone.fulfilled, (state) => {
        state.isDeletePhoneModalVisible = false;
        state.nextStepButtonDisabled = false;
      })
      .addCase(deletePhone.rejected, (state) => {
        state.deletePhoneButtonDisabled = false;
      })

      .addCase(deleteAccount.pending, (state) => {
        state.errorMessage = '';
        state.nextStepButtonDisabled = true;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.currentPassword = '';
        state.isDeleteAccountModalVisible = false;
        document.body.style.overflow = 'unset';
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.errorMessage = action.payload ?? 'Failed to delete account';
      })

      .addCase(changeCountry.fulfilled, (state, action) => {
        state.selectedCountry = action.payload;
      })

      .addCase(changeAvatar.pending, (state) => {
        state.submitAvatarButtonDisabled = true;
      });
  },
});

// Listener actions
export const setInitialSettings = createAction<void>('user/settings/setInitialSettings');

export const {
  toggleIdVisibility,
  setChangeModalVisiblity,
  setDeleteAccountModalVisiblity,
  setDeletePhoneModalVisiblity,
  setChangeModalType,
  setUsernameAvailability,
  setSubmitAvatarButtonDisabled,
  setNextStepButtonDisabled,
  setDeletePhoneButtonDisabled,
  updateEmail,
  updatePhone,
  updateNewUsername,
  updateCurrentEmail,
  updateCurrentPassword,
  updateNewPassword,
  updateConfirmNewPassword,
  updateSelectedCountry,
  updateAvatarFile,
  setAvatarPreview,
  setErrorMessage,
  resetChangeModal,
  resetAccountDeleteModal,
} = userSettingsSlice.actions;
export default userSettingsSlice;
