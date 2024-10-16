'use client';

// NextJS
import Image from 'next/image';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Actions
import {
  setPasswordStrengthError,
  setPasswordStrengthWarning,
  updateAccountName,
  updateConfirmPassword,
  updatePassword,
} from '@store/features/user/signup/signupSlice';

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';

// Utils
import debounce from '@utils/debounce';
import validatePasswordStrength from '@utils/passwordValidator';

// Images
import checkIcon from '@images/icon_check.png';

// Types
import type { ChangeEvent } from 'react';

export default function SecondForm() {
  // Initilizations
  const dispatch = useAppDispatch();
  useDynamicBackground(
    "radial-gradient(30% 40% at 40% 30%, rgba(33, 36, 41, .5) 0%, rgba(33, 36, 41, 0) 100%) no-repeat, url( '/images/acct_creation_bg.jpg' ) -45vw 0 no-repeat, #212429"
  );

  // States
  const {
    isCheckingAvailability,
    accountNameInputError,
    passwordInputError,
    confirmPasswordInputError,
    accountName,
    password,
    isUsernameAvailable,
    passwordStrengthError,
    passwordStrengthWarning,
    passwordsDoNotMatch,
  } = useAppSelector((state) => state.signup);

  // Debounced inputs
  const debouncedUpdateAccountName = debounce((value: string) => {
    dispatch(updateAccountName(value));
  }, 500);

  const debouncedUpdatePassword = debounce((value: string) => {
    dispatch(updatePassword(value));
  }, 500);

  const debouncedUpdateConfirmPassword = debounce((value: string) => {
    dispatch(updateConfirmPassword(value));
  }, 500);

  // Event Handlers
  const handleAccountNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    debouncedUpdateAccountName.cancel();
    debouncedUpdateAccountName(value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    // Update new password
    debouncedUpdatePassword.cancel();
    debouncedUpdatePassword(value);

    // Validate password strength and update error and warning states
    const { error, warning } = validatePasswordStrength(value);
    dispatch(setPasswordStrengthError(error));
    dispatch(setPasswordStrengthWarning(warning));
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    debouncedUpdateConfirmPassword.cancel();
    debouncedUpdateConfirmPassword(value);
  };

  return (
    <>
      <div className="form-row-flex">
        <div className="form-area">
          <label htmlFor="accountname">Steam Account Name</label>
          <input
            type="text"
            maxLength={64}
            id="accountname"
            name="accountname"
            value={accountName}
            onChange={handleAccountNameChange}
            className={accountNameInputError ? 'error' : ''}
          />
        </div>
        <div className={`availability-container ${accountName !== '' ? 'show' : ''}`}>
          <div
            className={`availability ${isUsernameAvailable ? 'available' : ''} ${accountName !== '' ? 'show' : ''}`}
          >
            {isUsernameAvailable ? (
              <>
                <Image className="green-check" src={checkIcon} alt="check" />
                &nbsp;Available
              </>
            ) : (
              'Not Available'
            )}
          </div>
        </div>
      </div>
      <div className="form-row-flex">
        <div className="form-area">
          <label htmlFor="password">Choose Password</label>
          <input
            type="password"
            id="password"
            name="password"
            maxLength={64}
            value={password}
            onChange={handlePasswordChange}
            className={passwordInputError ? 'error' : ''}
          />
        </div>
        <div className="form-notes">
          <div
            className={`password-tag ${
              passwordStrengthError ? 'error' : passwordStrengthWarning ? 'warning' : ''
            }`}
          >
            {passwordStrengthWarning
              ? 'Include lowercase and uppercase letters, numbers and symbols for a stronger password'
              : passwordStrengthError && 'Password must be at least 8 characters long'}
          </div>
        </div>
      </div>
      <div className="form-row-flex row-flex-end" style={{ clear: 'left' }}>
        <div className="form-area">
          <label htmlFor="reenter-password">Confirm Password</label>
          <input
            type="password"
            id="reenter-password"
            maxLength={64}
            onChange={handleConfirmPasswordChange}
            className={confirmPasswordInputError ? 'error' : ''}
          />
        </div>
        <div className="form-notes">
          <div className={`password-tag ${passwordsDoNotMatch ? 'error' : ''}`}>
            {passwordsDoNotMatch && 'Passwords do not match'}
          </div>
        </div>
      </div>
      <div className="form-row submit-btn-ctn">
        <div className="submit-btn-container">
          <button className="joinsteam-btn" type="submit" disabled={isCheckingAvailability}>
            <span>Done</span>
          </button>
        </div>
      </div>
    </>
  );
}
