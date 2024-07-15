'use client';

// React
import { useContext, useEffect, useRef, useState } from 'react';

// Next.js
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// React Spring
import { animated, useSpring } from 'react-spring';

// Toast notifications
import { toast } from 'react-toastify';

// Google ReCAPTCHA
import ReCAPTCHA from 'react-google-recaptcha';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Components
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';

// Hooks
import useDynamicMetaTags from 'hooks/useDynamicMetaTags';
import useResponsiveViewport from 'hooks/useResponsiveViewport';

// Services
import { checkEmailExists, forgotPassword, resetPassword } from 'services/user/management';

// Utils
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from 'utils/inputValidations';

// Styles
import './SignInUp.scss';

// Types
import type { ChangeEvent, FC, FormEvent } from 'react';

// Images
import check from 'images/check.svg';

const SignInAndRecovery: FC = () => {
  // Initializtions
  const router = useRouter();
  const pathname = usePathname();
  const isViewport740 = useResponsiveViewport(740);

  // Contexts
  const { login } = useContext(AuthContext);

  // States
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('Sign In');
  const [passwordPage, setPasswordPage] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const [showResetPassword, setShowResetPassword] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [resetErrorMessage, setResetErrorMessage] = useState<string>('');
  const [accountName, setAccountName] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [forgotEmail, setForgotEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordWarning, setPasswordWarning] = useState<boolean>(false);
  const [noMatch, setNoMatch] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [resetToken, setResetToken] = useState<string>('');

  // Refs
  const signInFormContainerRef = useRef<HTMLDivElement>(null);
  const signInFormRef = useRef<HTMLFormElement>(null);
  const forgotPasswordRef = useRef<HTMLDivElement>(null);
  const signInTitleRef = useRef<HTMLDivElement>(null);
  const forgotPasswordErrorRef = useRef<HTMLDivElement>(null);
  const changePasswordSubmitButton = useRef<HTMLButtonElement>(null);
  const captchaRef = useRef<ReCAPTCHA | null>(null);

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  useDynamicMetaTags(
    {
      title: 'Sign In',
      background: !isViewport740
        ? "radial-gradient(rgba(24, 26, 33, 0) 0%, #181A21 100%) fixed no-repeat, url('/images/new_login_bg_strong_mask.jpg') center top no-repeat, #181A21"
        : "radial-gradient(rgba(24, 26, 33, 0) 0%, #181A21 100%) fixed no-repeat, url( '/images/new_login_bg_strong_mask_mobile.jpg' ) center top no-repeat, #181A21",
      description: 'Sign in to your account',
    },
    [isViewport740]
  );

  // Handle redirect to password reset page and forgot password page
  useEffect(() => {
    if (pathname?.includes('/reset-password') || pathname?.includes('/forgot-password')) {
      setPasswordPage(true);
      signInFormRef.current?.remove();
      forgotPasswordRef.current?.classList.add('active');
      signInTitleRef.current && (signInTitleRef.current.style.margin = 'auto');
      isViewport740 &&
        signInFormContainerRef.current &&
        (signInFormContainerRef.current.style.width = 'max-content');
      const formErrorElement = forgotPasswordErrorRef.current;
      formErrorElement && (formErrorElement.style.transform = 'translateY(-6px)');
    } else {
      forgotPasswordRef.current && (forgotPasswordRef.current.style.minWidth = 'unset');
    }
    if (pathname?.includes('/forgot-password')) {
      document.title = `Name / Password Recovery`;
      setTitle('Name / Password Recovery');
    }
    if (pathname?.includes('/reset-password')) {
      document.title = `Password Reset`;
      if (pathname?.endsWith('/reset-password/') || pathname?.endsWith('/reset-password')) {
        toast.error('Reset token not found', { autoClose: 2000 });
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
      const path = pathname;
      const pathParts = path?.split('/');
      const resetToken = pathParts[pathParts.length - 1];
      // if token is invalid then redirect to home
      if (resetToken.length < 64) {
        toast.error('Invalid reset token', { autoClose: 2000 });
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
      setResetToken(resetToken);
      setTitle('Password Reset');
      setShowResetPassword(true);
    }
  }, [isViewport740, pathname, router]);

  // Toggle the state when the div is clicked
  const handleRememberMeClick = () => {
    setIsChecked(!isChecked);
  };

  // amimation of the "forgot-my-password" section
  const springProps = useSpring({
    opacity: showForgotPassword ? 1 : 0,
    width: showForgotPassword ? '295px' : '0',
    paddingLeft: showForgotPassword ? '14px' : '0px',
    marginLeft: showForgotPassword ? '14px' : '0px',
    overflow: 'hidden',
  });
  const springProps740 = useSpring({
    opacity: showForgotPassword ? 1 : 0,
    height: showForgotPassword ? '280.5px' : '0',
    paddingTop: showForgotPassword ? '14px' : '0px',
    marginTop: showForgotPassword ? '14px' : '0px',
    overflow: 'hidden',
  });

  // Toggle the visibility of the "forgot-my-password" section
  const handleForgotPasswordClick = () => {
    setShowForgotPassword((prevShowForgotPassword) => !prevShowForgotPassword);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const token = captchaRef.current?.getValue();

    if (
      (!validateName(accountName) && !validateEmail(accountName)) ||
      !validatePassword(loginPassword)
    ) {
      setErrorMessage('Please provide a valid name or email and password');
      captchaRef.current?.reset();
      setRecaptchaValue(null);
      return;
    }

    const password = loginPassword;
    const rememberMeValue = isChecked;

    try {
      setErrorMessage('');
      setIsLoading(true);

      // Authenticate the user
      await login(accountName, password, rememberMeValue, token?.toString() || '');
    } catch (error) {
      console.error('Error during authentication:', error);
      setErrorMessage('Error during authentication, Please try again later');
    } finally {
      setIsLoading(false);
      captchaRef.current?.reset();
      setRecaptchaValue(null);
    }
  };

  const handleForgotPasswordFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = captchaRef.current?.getValue();

    // Access the selectedCountry state here and include it in your form data
    const formData = {
      email: '',
      phoneNumber: '',
      recaptchaToken: token,
    };

    // Check if the user didn't write anything
    if (!forgotEmail && !recaptchaValue) {
      setResetErrorMessage(
        `Please provide a valid email or phone number<br>Please verify that you're not a robot.`
      );
      setNotFound(true);
      captchaRef.current?.reset();
      setRecaptchaValue(null);
      return;
    }
    if (!forgotEmail) {
      setResetErrorMessage('Please provide a valid email or phone number');
      setNotFound(true);
      captchaRef.current?.reset();
      setRecaptchaValue(null);
      return;
    }
    if (!recaptchaValue) {
      setResetErrorMessage(`Please verify that you're not a robot.`);
      setNotFound(true);
      captchaRef.current?.reset();
      setRecaptchaValue(null);
      return;
    }

    // Determine whether the input is an email or a phone number
    if (validateEmail(forgotEmail)) {
      formData.email = forgotEmail;
    } else if (validatePhone(forgotEmail)) {
      formData.phoneNumber = forgotEmail;
    } else {
      setResetErrorMessage('Invalid email or phone number');
      setNotFound(true);
      captchaRef.current?.reset();
      setRecaptchaValue(null);
      return;
    }

    // Check if either email or phone number is provided before searching the database
    if (forgotEmail) {
      try {
        setIsSearching(true);

        // Simulate checking if the account exists in the database
        const accountExists = await checkEmailExists(forgotEmail);

        // Use recaptchaValue along with other form data for submission
        if (recaptchaValue) {
          // Check if the account was not found and set the appropriate message
          if (!accountExists) {
            setResetErrorMessage(
              'We were unable to find an account that matches the information you provided.'
            );
            setNotFound(true);
          } else {
            const status = await forgotPassword(formData.email);

            if (status === 200) {
              toast.success('Password reset email sent successfully. Please check your email.');
            } else {
              setResetErrorMessage('Internal server error, Please try again later');
            }
          }
        } else {
          // Show an error or take appropriate action if reCAPTCHA is not solved
          console.error('reCAPTCHA not solved');
          setResetErrorMessage('reCAPTCHA not solved');
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error checking account existence:', error);
        setResetErrorMessage('Internal server error, Please try again later.');
        setNotFound(true);
      } finally {
        setIsSearching(false);
        captchaRef.current?.reset();
        setRecaptchaValue(null);
      }
    } else {
      setResetErrorMessage('Please provide a valid email or phone number');
      setNotFound(true);
      captchaRef.current?.reset();
      setRecaptchaValue(null);
    }
  };

  // check password criteria
  const checkPassword = (event: ChangeEvent<HTMLInputElement>) => {
    const enteredPassword = (event.target as HTMLInputElement).value;

    // Reset previous states
    setPasswordError(false);
    setPasswordWarning(false);

    if (0 === enteredPassword.length) {
      setPasswordError(false);
    } else if (enteredPassword.length < 8 && 0 < enteredPassword.length) {
      setPasswordError(true);
    } else {
      // Check for more complex password criteria
      if (
        !/\d/.test(enteredPassword) ||
        !/[a-zA-Z]/.test(enteredPassword) ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(enteredPassword)
      ) {
        setPasswordWarning(true);
      }
    }
  };

  // chack password confirmation matching
  useEffect(() => {
    const confirmPasswordCheck = () => {
      if (confirmPassword.length === 0) {
        setNoMatch(false);
        changePasswordSubmitButton.current?.setAttribute('disabled', 'true');
      } else {
        setNoMatch(password !== confirmPassword);
        if (password !== confirmPassword) {
          changePasswordSubmitButton.current?.setAttribute('disabled', 'true');
        } else {
          changePasswordSubmitButton.current?.removeAttribute('disabled');
        }
      }
    };
    confirmPasswordCheck();
  }, [confirmPassword, password]);

  const handleResetPasswordFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    if (password !== confirmPassword) {
      setIsSearching(false);
      toast.error('Passwords do not match. Please try again.');
      return;
    }
    await resetPassword(resetToken, password);
    setIsSearching(false);
  };

  const handleAccountNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAccountName(e.target.value);
  };

  const handleForgotEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForgotEmail(e.target.value);
  };

  const handleLoginPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginPassword(e.target.value);
  };

  const handleResetPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    checkPassword(e);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="page-content-sign">
        <div className="login-container">
          <div className="new-login">
            <div className="signin-title">
              <div className="title" ref={signInTitleRef}>
                {title}
              </div>
            </div>
            <div className="login-form-container" ref={signInFormContainerRef}>
              <form
                className="login-form signin-form"
                ref={signInFormRef}
                onSubmit={handleFormSubmit}
              >
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
                    {isChecked && <Image src={check} alt="Checkmark" />}
                  </div>
                  <div className="check-label">Remember me</div>
                </div>
                <div className="login-dialog-field">
                  <button
                    className={`submit-button ${isLoading && 'loading'}`}
                    type="submit"
                    disabled={isLoading}
                  >
                    Sign in
                    {isLoading && (
                      <div className="loading-container">
                        <div className="loading-spinner" />
                      </div>
                    )}
                  </button>
                </div>
                <div
                  className="form-error"
                  style={errorMessage !== '' ? { display: 'block' } : undefined}
                >
                  {errorMessage}
                </div>
                <a className="forgot-password" onClick={handleForgotPasswordClick}>
                  {showForgotPassword
                    ? 'Hide Forgot Password / Username'
                    : 'Forgot Password / Username?'}
                </a>
              </form>
              <animated.div
                className="forgot-my-password"
                style={!isViewport740 ? springProps : springProps740}
                ref={forgotPasswordRef}
              >
                {!showResetPassword ? (
                  <form className="login-form" action="" onSubmit={handleForgotPasswordFormSubmit}>
                    <div className="help-title">I forgot my Steam Account name or password</div>
                    <div className="login-dialog-field">
                      <div className="field-label account">Enter your email address</div>
                      <input
                        id="field-input-forgot"
                        className="field-input"
                        type="text"
                        value={forgotEmail}
                        onChange={handleForgotEmailChange}
                      />
                    </div>
                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                      onChange={handleRecaptchaChange}
                      theme="dark"
                      ref={captchaRef}
                    />
                    <div className="recovery-submit">
                      <div
                        className="form-error"
                        style={notFound ? { display: 'block' } : undefined}
                        dangerouslySetInnerHTML={{ __html: resetErrorMessage }}
                        ref={forgotPasswordErrorRef}
                      />
                      <button
                        className={`submit-button search ${isSearching && 'loading'}`}
                        style={isSearching ? { color: 'transparent' } : {}}
                        type="submit"
                        disabled={isSearching}
                      >
                        Search
                        {isSearching && (
                          <div className="loading-container">
                            <div className="loading-spinner" />
                          </div>
                        )}
                      </button>
                    </div>
                    {passwordPage && (
                      <Link href="/login" className="forgot-password">
                        Login instead
                      </Link>
                    )}
                  </form>
                ) : (
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
                        value={password}
                        onChange={handleResetPasswordChange}
                      />
                      <div className="form-notes">
                        <div
                          className={`password-tag ${
                            passwordError ? 'error' : passwordWarning ? 'warning' : ''
                          }`}
                          style={
                            passwordWarning
                              ? { backgroundColor: '#b78124', opacity: '1' }
                              : passwordError
                                ? { backgroundColor: '#a0382b', opacity: '1' }
                                : { opacity: '0', display: 'none' }
                          }
                        >
                          {passwordWarning
                            ? 'Include lowercase and uppercase letters, numbers and symbols for a stronger password'
                            : passwordError && 'Password must be at least 8 characters long'}
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
                        <div
                          className={`password-tag ${noMatch ? 'error' : ''}`}
                          style={
                            noMatch
                              ? { backgroundColor: '#a0382b', opacity: '1' }
                              : { opacity: '0', display: 'none' }
                          }
                        >
                          {noMatch && 'Passwords do not match'}
                        </div>
                      </div>
                    </div>
                    <button
                      className={`submit-button change-password ${isSearching && 'loading'}`}
                      style={isSearching ? { color: 'transparent' } : {}}
                      type="submit"
                      disabled={isSearching}
                      ref={changePasswordSubmitButton}
                    >
                      Change Password
                      {isSearching && (
                        <div className="loading-container">
                          <div className="loading-spinner" />
                        </div>
                      )}
                    </button>
                    {passwordPage && (
                      <Link href="/login" className="forgot-password">
                        Login instead
                      </Link>
                    )}
                  </form>
                )}
              </animated.div>
            </div>
          </div>
        </div>
        <div className="new-user">
          <div className="new-user-item create-acc">
            <div className="headline">New to Steam?</div>
            <Link className="signup-btn" target="_top" href="/join">
              <span>Create an account</span>
            </Link>
          </div>
          <div className="new-user-item">
            <div className="subtext">
              It's free and easy. Discover thousands of
              <br />
              games to play with millions of new friends.
              <br />
              <a className="join-desc" href="https://github.com/IbrahemHadidy/red-steam">
                Learn more about Red Steam
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignInAndRecovery;
