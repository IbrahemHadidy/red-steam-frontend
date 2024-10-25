// NextJS
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Actions
import { setLoginFormVisibility } from '@store/features/user/login/loginSlice';
import {
  loginInstead,
  setPasswordStrengthError,
  setPasswordStrengthWarning,
  updateConfirmPassword,
  updateNewPassword,
} from '@store/features/user/recovery/recoverySlice';

// Redux Thunks
import { resetPassword } from '@store/features/user/recovery/recoveryThunks';

// Utils
import validatePasswordStrength from '@utils/passwordValidator';

// Types
import type { ChangeEvent, FormEvent } from 'react';

export default function ResetPasswordForm() {
  // Init
  const router = useRouter();
  const dispatch = useAppDispatch();

  // States
  const {
    resetPasswordLoadingState,
    isResetButtonDisabled,
    isPasswordPage,
    newPassword,
    passwordStrengthError,
    passwordStrengthWarning,
    passwordsDoNotMatch,
  } = useAppSelector((state) => state.recovery);

  // Event Handlers
  const handleResetPasswordFormSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    await dispatch(resetPassword());
  };

  const handleResetPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    // Update new password
    dispatch(updateNewPassword(value));

    // Validate password strength and update error and warning states
    const { error, warning } = validatePasswordStrength(value);
    dispatch(setPasswordStrengthError(error));
    dispatch(setPasswordStrengthWarning(warning));
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    dispatch(updateConfirmPassword(value));
  };

  const handleLoginInsteadBtnClick = (): void => {
    dispatch(setLoginFormVisibility(true));
    dispatch(loginInstead());
    router.push('/login');
  };

  return (
    <form className="login-form" onSubmit={handleResetPasswordFormSubmit}>
      <div className="help-title">Password reset</div>
      <div className="login-dialog-field">
        <div className="field-label account">Choose Password</div>
        <input
          type="password"
          id="reset-password"
          name="reset-password"
          className="field-input"
          maxLength={64}
          value={newPassword}
          onChange={handleResetPasswordChange}
        />

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

      <div className="login-dialog-field">
        <div className="field-label account">Confirm Password</div>
        <input
          type="password"
          id="reenter-password"
          name="reenter-password"
          className="field-input"
          maxLength={64}
          onChange={handleConfirmPasswordChange}
        />

        <div className="form-notes">
          <div className={`password-tag ${passwordsDoNotMatch ? 'error' : ''}`}>
            {passwordsDoNotMatch && 'Passwords do not match'}
          </div>
        </div>
      </div>

      <button
        className={`submit-button change-password ${resetPasswordLoadingState ? 'loading' : ''}`}
        type="submit"
        disabled={isResetButtonDisabled}
      >
        Change Password
        {resetPasswordLoadingState && (
          <div className="loading-container">
            <div className="loading-spinner" />
          </div>
        )}
      </button>

      {isPasswordPage && (
        <button className="login-instead" onClick={handleLoginInsteadBtnClick}>
          Login instead
        </button>
      )}
    </form>
  );
}
