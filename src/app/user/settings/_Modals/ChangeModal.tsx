'use client';

// React
import { useRef, useState } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Thunks
import { fetchUserData } from '@store/features/auth/authThunks';

// Services
import { changeEmail, changePassword } from '@services/user/management';
import { changePhoneNumber } from '@services/user/phone';

// Utils
import { validateEmail, validatePassword, validatePhone } from '@utils/inputValidations';

// Types
import type { ChangeEvent, JSX } from 'react';
import type { ChangeModalProps } from './Modals.types';

export default function ChangeModal({ onClose, type }: ChangeModalProps): JSX.Element {
  // Init
  const router = useRouter();
  const dispatch = useAppDispatch();

  // States
  const { userData } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [currentEmail, setCurrentEmail] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [step, setStep] = useState<number>(1);

  // Refs
  const nextBtn1Ref = useRef<HTMLButtonElement>(null);
  const nextBtn2Ref = useRef<HTMLButtonElement>(null);

  // Validations
  const isPasswordValid: boolean = currentPassword.length >= 8;
  const isNewPasswordValid: boolean = validatePassword(newPassword);
  const isEmailValid: boolean = validateEmail(email);
  const isCurrentEmailValid: boolean = validateEmail(currentEmail);
  const isPhoneValid: boolean = validatePhone(phone);
  const isNewPasswordConfirmed: boolean = newPassword === confirmNewPassword;

  const handleEmailChange = async (): Promise<void> => {
    nextBtn1Ref.current?.setAttribute('disabled', 'true');
    nextBtn2Ref.current?.setAttribute('disabled', 'true');
    if (step === 1) {
      // First step: validate email format and move to next step
      if (isEmailValid && isCurrentEmailValid) {
        if (email !== currentEmail) {
          setStep(2);
          setErrorMessage('');
        } else {
          setErrorMessage('The new email is the same as the current one');
        }
      } else {
        setErrorMessage('Invalid email format');
      }
    } else {
      // Second step: change email
      userData &&
        (await changeEmail(currentEmail, currentPassword, email, onClose, setErrorMessage));
      await dispatch(fetchUserData(router));
    }
    nextBtn1Ref.current?.removeAttribute('disabled');
    nextBtn2Ref.current?.removeAttribute('disabled');
  };

  const handlePhoneChange = async (): Promise<void> => {
    nextBtn1Ref.current?.setAttribute('disabled', 'true');
    nextBtn2Ref.current?.setAttribute('disabled', 'true');
    if (step === 1) {
      // First step: validate phone format and move to next step
      if (isPhoneValid) {
        setStep(2);
        setErrorMessage('');
      } else {
        setErrorMessage('Invalid phone number');
      }
    } else {
      // Second step: change phone
      userData && (await changePhoneNumber(userData.id, phone));
      await dispatch(fetchUserData(router));
      onClose();
    }
    nextBtn1Ref.current?.removeAttribute('disabled');
    nextBtn2Ref.current?.removeAttribute('disabled');
  };

  const handlePasswordChange = async (): Promise<void> => {
    if (isNewPasswordValid && isNewPasswordConfirmed) {
      userData && (await changePassword(currentPassword, newPassword, onClose, setErrorMessage));
      await dispatch(fetchUserData(router));
      setErrorMessage('');
    } else {
      setErrorMessage(
        'New password should be at least 8 characters long and contain at least one letter, one number, and one special character.'
      );
    }
  };

  const handleCurrentEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCurrentEmail(e.target.value);
  };

  const handleEmailPhoneChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (type === 'email') {
      setEmail(e.target.value);
    } else {
      setPhone(e.target.value);
    }
  };

  const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setConfirmNewPassword(e.target.value);
  };

  const handleNextBtnClick = (): void => {
    if (type !== 'password' && step === 1) {
      if (type === 'email') {
        handleEmailChange();
      } else if (type === 'phone') {
        handlePhoneChange();
      } else {
        handlePasswordChange();
      }
    } else {
      if (type === 'password') {
        handlePasswordChange();
      } else if (type === 'email') {
        handleEmailChange();
      } else {
        handlePhoneChange();
      }
    }
  };

  const handleNextBtnDisabled = (): boolean => {
    if (type !== 'password' && step === 1) {
      if (type === 'email') {
        return !isEmailValid || !isCurrentEmailValid;
      } else if (type === 'phone') {
        return !isPhoneValid;
      } else {
        return !(isNewPasswordValid && isNewPasswordConfirmed);
      }
    } else {
      if (type === 'password') {
        return !isPasswordValid || !newPassword;
      } else {
        return !isPasswordValid;
      }
    }
  };

  return (
    <div className="change-modal">
      <div className="modal-content">
        <h2>
          {type === 'email'
            ? 'Change Email'
            : type === 'phone'
              ? 'Change Phone Number'
              : 'Change Password'}
        </h2>
        {type !== 'password' && step === 1 && (
          <>
            {type === 'email' && (
              <input
                className="password-input"
                type={type === 'email' ? 'email' : 'text'}
                placeholder="Enter your current email"
                value={currentEmail}
                onChange={handleCurrentEmailChange}
              />
            )}
            <input
              className="password-input"
              type={type === 'email' ? 'email' : 'text'}
              placeholder={
                type === 'email' ? 'Enter your new email' : 'Enter your new phone number'
              }
              value={type === 'email' ? email : phone}
              onChange={handleEmailPhoneChange}
            />
          </>
        )}

        {step === 2 && (
          <input
            className="password-input"
            type="password"
            placeholder="Enter your password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
          />
        )}
        {type === 'password' && (
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
          {step === 1 && type !== 'password' ? (
            <button
              className="next-button"
              onClick={handleNextBtnClick}
              disabled={handleNextBtnDisabled()}
              ref={nextBtn1Ref}
            >
              Next
            </button>
          ) : (
            <button
              className="next-button"
              onClick={handleNextBtnClick}
              disabled={handleNextBtnDisabled()}
              ref={nextBtn2Ref}
            >
              Change
            </button>
          )}
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
