'use client';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  resetChangeModal,
  setChangeModalVisiblity,
  updateConfirmNewPassword,
  updateCurrentEmail,
  updateCurrentPassword,
  updateEmail,
  updateNewPassword,
  updatePhone,
} from '@store/features/user/settings/userSettingsSlice';

// Redux Thunks
import {
  changeEmail,
  changePassword,
  changePhone,
} from '@store/features/user/settings/userSettingsThunks';

// Utils
import {
  getInputType,
  getModalHeader,
  getNewInputPlaceholder,
  getNextBtnDisabled,
} from './modals-utils';

// Types
import type { ChangeEvent } from 'react';

export default function ChangeModal() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //--------------------------- State Selectors ---------------------------//
  const {
    changeModalType,
    currentChangeStep,
    errorMessage,
    email,
    currentEmail,
    phone,
    currentPassword,
    newPassword,
    confirmNewPassword,
    nextStepButtonDisabled,
  } = useAppSelector((state) => state.user.settings);

  //---------------------------- Event Handlers ---------------------------//
  const closeChangeModal = (): void => {
    dispatch(setChangeModalVisiblity(false));
    dispatch(resetChangeModal());
    document.body.style.overflow = 'unset';
  };

  const handleCurrentEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    dispatch(updateCurrentEmail(value));
  };

  const handleEmailPhoneChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (changeModalType === 'email') {
      dispatch(updateEmail(value));
    } else {
      dispatch(updatePhone(value));
    }
  };

  const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    dispatch(updateCurrentPassword(value));
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    dispatch(updateNewPassword(value));
  };

  const handleConfirmNewPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    dispatch(updateConfirmNewPassword(value));
  };

  const handleNextBtnClick = async (): Promise<void> => {
    if (changeModalType === 'email') {
      await dispatch(changeEmail());
    } else if (changeModalType === 'phone') {
      await dispatch(changePhone());
    } else if (changeModalType === 'password') {
      await dispatch(changePassword());
    }
  };

  //---------------------------- UI Helpers --------------------------------//
  const isNextButtonDisabled = getNextBtnDisabled({
    nextStepButtonDisabled,
    changeModalType,
    currentChangeStep,
    email,
    currentEmail,
    phone,
    currentPassword,
    newPassword,
    confirmNewPassword,
  });

  const modalHeader = getModalHeader(changeModalType);

  const inputType = getInputType(changeModalType);

  const newInputPlaceholder = getNewInputPlaceholder(changeModalType);

  //-------------------------- Render UI Section ---------------------------//
  return (
    <div className="change-modal">
      <div className="modal-content">
        <h2>{modalHeader}</h2>

        {changeModalType !== 'password' && currentChangeStep === 1 && (
          <>
            {changeModalType === 'email' && (
              <input
                className="password-input"
                type={inputType}
                placeholder="Enter your current email"
                value={currentEmail}
                onChange={handleCurrentEmailChange}
              />
            )}
            <input
              className="password-input"
              type={inputType}
              placeholder={newInputPlaceholder}
              value={changeModalType === 'email' ? email : phone}
              onChange={handleEmailPhoneChange}
            />
          </>
        )}

        {currentChangeStep === 2 && (
          <input
            className="password-input"
            type="password"
            placeholder="Enter your password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
          />
        )}

        {changeModalType === 'password' && (
          <>
            <input
              className="password-input"
              type="password"
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
            />

            <input
              className="password-input"
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />

            <input
              className="password-input"
              type="password"
              placeholder="Confirm your new password"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
            />
          </>
        )}

        <div className="error-message">{errorMessage}</div>

        <div className="modal-buttons">
          {currentChangeStep === 1 && changeModalType !== 'password' ? (
            <button
              className="next-button"
              onClick={handleNextBtnClick}
              disabled={isNextButtonDisabled}
            >
              Next
            </button>
          ) : (
            <button
              className="next-button"
              onClick={handleNextBtnClick}
              disabled={isNextButtonDisabled}
            >
              Change
            </button>
          )}

          <button className="cancel-button" onClick={closeChangeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
