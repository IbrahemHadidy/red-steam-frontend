'use client';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  resetAccountDeleteModal,
  setDeleteAccountModalVisiblity,
  updateCurrentPassword,
} from '@store/features/user/settings/userSettingsSlice';

// Redux Thunks
import { deleteAccount } from '@store/features/user/settings/userSettingsThunks';

// Types
import type { ChangeEvent } from 'react';

export default function DeleteAccountModal() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { errorMessage, currentPassword, deleteAccountButtonDisabled } = useAppSelector(
    (state) => state.user.settings
  );

  //----------------------------- Validations -----------------------------//
  const isPasswordValid = currentPassword.length >= 8;

  //--------------------------- Event Handlers ----------------------------//
  const closeDeleteModal = (): void => {
    dispatch(resetAccountDeleteModal());
    dispatch(setDeleteAccountModalVisiblity(false));
    document.body.style.overflow = 'unset';
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    dispatch(updateCurrentPassword(value));
  };

  const handleDelete = async (): Promise<void> => {
    await dispatch(deleteAccount());
  };

  //------------------------------- Render --------------------------------//
  return (
    <div className="delete-modal">
      <div className="modal-content">
        <h2>Are you sure you want to delete your account?</h2>
        <p>This action cannot be undone.</p>

        <input
          className="password-input"
          type="password"
          placeholder="Enter your password"
          value={currentPassword}
          onChange={handlePasswordChange}
        />

        <div className="error-message">{errorMessage}</div>

        <div className="modal-buttons">
          <button
            className="delete-button"
            onClick={handleDelete}
            disabled={!isPasswordValid || deleteAccountButtonDisabled}
          >
            Delete
          </button>

          <button className="cancel-button" onClick={closeDeleteModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
