// NextJS
import Image from 'next/image';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Actions
import {
  toggleForgotPasswordForm,
  toggleRememberMePreference,
  updateAccountName,
  updateLoginPassword,
} from '@store/features/user/login/loginSlice';

// Redux Thunks
import { login } from '@store/features/auth/authThunks';

// Images
import check from '@images/check.svg';

// Types
import type { ChangeEvent, FormEvent } from 'react';

export default function LoginForm() {
  // Init
  const dispatch = useAppDispatch();

  // States
  const {
    isLoginLoading,
    rememberMePreference,
    isForgotPasswordVisible,
    loginErrorMessage,
    accountName,
    loginPassword,
  } = useAppSelector((state) => state.login);

  // Event Handlers
  const handleAccountNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    dispatch(updateAccountName(value));
  };

  const handleLoginPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    dispatch(updateLoginPassword(value));
  };

  const handleRememberMeClick = (): void => {
    dispatch(toggleRememberMePreference());
  };

  const handleForgotPasswordClick = (): void => {
    dispatch(toggleForgotPasswordForm());
  };

  const handleLoginFormSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    await dispatch(
      login({
        identifier: accountName,
        password: loginPassword,
        rememberMe: rememberMePreference,
      })
    );
  };

  return (
    <form className="login-form signin-form" onSubmit={handleLoginFormSubmit}>
      <div className="login-dialog-field">
        <div className="field-label account">Sign in with account name or email</div>
        <input
          className="field-input"
          id="field-input-account"
          type="text"
          value={accountName}
          onChange={handleAccountNameChange}
        />
      </div>

      <div className="login-dialog-field">
        <div className="field-label">Password</div>
        <input
          className="field-input"
          id="field-input-password"
          type="password"
          value={loginPassword}
          onChange={handleLoginPasswordChange}
        />
      </div>

      <div className="remember-me" onClick={handleRememberMeClick}>
        <div className="check" tabIndex={0}>
          {rememberMePreference && <Image src={check} alt="Checkmark" />}
        </div>

        <div className="check-label">Remember me</div>
      </div>
      <div className="login-dialog-field">
        <button
          className={`submit-button ${isLoginLoading && 'loading'}`}
          type="submit"
          disabled={isLoginLoading}
        >
          Sign in
          {isLoginLoading && (
            <div className="loading-container">
              <div className="loading-spinner" />
            </div>
          )}
        </button>
      </div>

      <div className={`form-error ${loginErrorMessage !== '' ? 'error' : ''}`}>
        {loginErrorMessage}
      </div>

      <a className="forgot-password" onClick={handleForgotPasswordClick}>
        {isForgotPasswordVisible
          ? 'Hide Forgot Password / Username'
          : 'Forgot Password / Username?'}
      </a>
    </form>
  );
}
