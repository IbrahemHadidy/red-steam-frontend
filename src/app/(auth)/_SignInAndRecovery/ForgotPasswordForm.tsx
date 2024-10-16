// React
import { useRef } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Google ReCAPTCHA
import ReCAPTCHA from 'react-google-recaptcha';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Actions
import { setLoginFormVisibility } from '@store/features/user/login/loginSlice';
import { loginInstead, updateResetEmail } from '@store/features/user/recovery/recoverySlice';

// Redux Thunks
import { forgotPassword } from '@store/features/user/recovery/recoveryThunks';

// Utils
import debounce from '@utils/debounce';

// Types
import type { ChangeEvent, FormEvent } from 'react';

export default function ForgotPasswordForm() {
  // Init
  const router = useRouter();
  const dispatch = useAppDispatch();

  // States
  const { resetPasswordLoadingState, isPasswordPage, resetEmail, resetPasswordErrorMessage } =
    useAppSelector((state) => state.recovery);

  // Refs
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  // Debounced inputs
  const debouncedUpdateResetEmail = debounce((value: string) => {
    dispatch(updateResetEmail(value));
  }, 500);

  // Event Handlers
  const handleForgotPasswordFormSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    await dispatch(forgotPassword({ recaptchaRef }));
  };

  const handleForgotEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    debouncedUpdateResetEmail.cancel();
    debouncedUpdateResetEmail(value);
  };

  const handleLoginInsteadBtnClick = (): void => {
    dispatch(setLoginFormVisibility(true));
    dispatch(loginInstead());
    router.push('/login');
  };

  return (
    <form className="login-form" onSubmit={handleForgotPasswordFormSubmit}>
      <div className="help-title">I forgot my Steam Account name or password</div>
      <div className="login-dialog-field">
        <div className="field-label account">Enter your email address</div>
        <input
          id="field-input-forgot"
          className="field-input"
          type="text"
          value={resetEmail}
          onChange={handleForgotEmailChange}
        />
      </div>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
        theme="dark"
        ref={recaptchaRef}
      />
      <div className="recovery-submit">
        <div
          className={`form-error ${resetPasswordErrorMessage !== '' ? 'error' : ''} ${isPasswordPage ? 'password-page' : ''}`}
          dangerouslySetInnerHTML={{ __html: resetPasswordErrorMessage }}
        />
        <button
          className={`submit-button search ${resetPasswordLoadingState && 'loading'}`}
          type="submit"
          disabled={resetPasswordLoadingState}
        >
          Search
          {resetPasswordLoadingState && (
            <div className="loading-container">
              <div className="loading-spinner" />
            </div>
          )}
        </button>
      </div>
      {isPasswordPage && (
        <button className="login-instead" onClick={handleLoginInsteadBtnClick}>
          Login instead
        </button>
      )}
    </form>
  );
}
