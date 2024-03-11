import { FC, useEffect, useState, FormEvent, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';
import { checkEmailExists } from 'services/user/auth';
import ReCAPTCHA from 'react-google-recaptcha';
import $ from 'tools/$selector';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import useResponsiveViewports from 'hooks/useResponsiveViewports';
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from 'tools/inputValidations';
import { useSpring, animated } from 'react-spring';
import './SignInUp.scss';
import { toast } from 'react-toastify';
import { forgotPassword } from 'services/user/password';
const env = import.meta.env;

const SignInAndRecovery: FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const isViewport740 = useResponsiveViewports(740);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [title, setTitle] = useState('Sign In');
  const [passwordPage, setPasswordPage] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resetErrorMessage, setResetErrorMessage] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const captchaRef = useRef<ReCAPTCHA | null>(null);

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  useEffect(() => {
    // this is responsible for the page background
    {
      !isViewport740
        ? (document.body.style.background =
            "radial-gradient(rgba(24, 26, 33, 0) 0%, #181A21 100%) fixed no-repeat, url('/images/new_login_bg_strong_mask.jpg') center top no-repeat, #181A21")
        : (document.body.style.background =
            "radial-gradient(rgba(24, 26, 33, 0) 0%, #181A21 100%) fixed no-repeat, url( '/images/new_login_bg_strong_mask_mobile.jpg' ) center top no-repeat, #181A21");
    }

    // this is responsible for the tab title
    document.title = `Sign In`;
  }, [isViewport740]);

  // Handle redirect to password reset page
  useEffect(() => {
    if (window.location.pathname.includes('/reset-password')) {
      setPasswordPage(true);
      setTitle('Name / Password Recovery');
      $('.signin-form')?.remove();
      $('.forgot-my-password')?.classList.add('active');
      ($('.signin-title .title') as HTMLElement).style.margin = 'auto';
      isViewport740 &&
        (($('.login-form-container') as HTMLElement).style.width =
          'max-content');
      const formErrorElement = $('.form-error') as HTMLElement | null;
      formErrorElement &&
        (formErrorElement.style.transform = 'translateY(-6px)');
    }
  }, [isViewport740]);

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
    setShowForgotPassword(prevShowForgotPassword => !prevShowForgotPassword);
  };

  const handleFormSubmit = async (event: {
    preventDefault: () => void;
    currentTarget: { querySelector: (arg0: string) => HTMLInputElement };
  }) => {
    event.preventDefault();

    const token = captchaRef.current?.getValue();

    const accountNameInput = event.currentTarget.querySelector(
      '#field-input-account',
    ) as HTMLInputElement;
    const passwordInput = event.currentTarget.querySelector(
      '#field-input-password',
    ) as HTMLInputElement;

    if (
      (!validateName(accountNameInput.value) &&
      !validateEmail(accountNameInput.value)) ||
      !validatePassword(passwordInput.value)
    ) {
      setErrorMessage('Please provide a valid name or email and password');
      captchaRef.current?.reset();
      setRecaptchaValue(null);
      return;
    }

    const accountName = accountNameInput.value;
    const password = passwordInput.value;
    const rememberMeValue = isChecked;

    try {
      setErrorMessage('');
      setIsLoading(true);
      console.log('Authentication successful');

      // Authenticate the user
      login(accountName, password, rememberMeValue, token as string)
      
      navigate('/');
      console.log('Form submitted successfully');

    } catch (error) {
      console.error('Error during authentication:', error);
      setErrorMessage('Error during authentication, Please try again later');
    } finally {
      setIsLoading(false);
      captchaRef.current?.reset();
      setRecaptchaValue(null);
    }
  };

  const handleResetPasswordFormSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const token = captchaRef.current?.getValue();

    // Access the selectedCountry state here and include it in your form data
    const formData = {
      email: '',
      phoneNumber: '',
      recaptchaToken: token,
    };

    // Get the input value for email or phone number
    const inputElement = event.currentTarget.querySelector(
      '#field-input-forgot',
    ) as HTMLInputElement;
    const inputValue = inputElement ? inputElement.value : '';

    // Check if the user didn't write anything
    if (!inputValue && !recaptchaValue) {
      setResetErrorMessage(
        `Please provide a valid email or phone number<br>Please verify that you're not a robot.`,
      );
      setNotFound(true);
      captchaRef.current?.reset();
      setRecaptchaValue(null);
      return;
    }
    if (!inputValue) {
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
    if (validateEmail(inputValue)) {
      formData.email = inputValue;
    } else if (validatePhone(inputValue)) {
      formData.phoneNumber = inputValue;
    } else {
      setResetErrorMessage('Invalid email or phone number');
      setNotFound(true);
      captchaRef.current?.reset();
      setRecaptchaValue(null);
      return;
    }

    // Check if either email or phone number is provided before searching the database
    if (inputValue) {
      try {
        setIsSearching(true);

        // Simulate checking if the account exists in the database
        console.log(inputValue);
        const accountExists = await checkEmailExists(inputValue);

        // Use recaptchaValue along with other form data for submission
        if (recaptchaValue) {
          console.log('Form data:', formData);
          console.log('Form submitted with reCAPTCHA value:', recaptchaValue);

          // Check if the account was not found and set the appropriate message
          if (!accountExists) {
            setResetErrorMessage(
              'We were unable to find an account that matches the information you provided.',
            );
            setNotFound(true);
          } else {
            const status = await forgotPassword(formData.email);

            if (status === 200) {
              toast.success(
                'Password reset email sent successfully. Please check your email.',
              );
            } else {
              setResetErrorMessage(
                'Internal server error, Please try again later',
              );
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

  return (
    <>
      <Header />
      <div className="page-content-sign">
        <div className="login-container">
          <div className="new-login">
            <div className="signin-title">
              <div className="title">{title}</div>
            </div>
            <div className="login-form-container">
              <form
                className="login-form signin-form"
                action=""
                onSubmit={handleFormSubmit}
              >
                <div className="login-dialog-field">
                  <div className="field-label account">
                    Sign in with account name or email
                  </div>
                  <input
                    className="field-input"
                    id="field-input-account"
                    type="text"
                  />
                </div>
                <div className="login-dialog-field">
                  <div className="field-label">Password</div>
                  <input
                    className="field-input"
                    id="field-input-password"
                    type="password"
                  />
                </div>
                <div className="remember-me" onClick={handleRememberMeClick}>
                  <div className="check" tabIndex={0}>
                    {isChecked && (
                      <img src="images/check.svg" alt="Checkmark" />
                    )}
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
                <a
                  className="forgot-password"
                  onClick={handleForgotPasswordClick}
                >
                  {showForgotPassword
                    ? 'Hide Forgot Password / Username'
                    : 'Forgot Password / Username?'}
                </a>
              </form>
              <animated.div
                className="forgot-my-password "
                style={!isViewport740 ? springProps : springProps740}
              >
                <form
                  className="login-form"
                  action=""
                  onSubmit={handleResetPasswordFormSubmit}
                >
                  <div className="help-title">
                    I forgot my Steam Account name or password
                  </div>
                  <div className="login-dialog-field">
                    <div className="field-label account">
                      Enter your email address
                    </div>
                    <input
                      id="field-input-forgot"
                      className="field-input"
                      type="text"
                    />
                  </div>
                  <ReCAPTCHA
                    sitekey={env.VITE_RECAPTCHA_SITE_KEY}
                    onChange={handleRecaptchaChange}
                    theme="dark"
                    ref={captchaRef}
                  />
                  <div className="recovery-submit">
                    <div
                      className="form-error"
                      style={notFound ? { display: 'block' } : undefined}
                      dangerouslySetInnerHTML={{ __html: resetErrorMessage }}
                    />
                    <button
                      className={`submit-button search ${
                        isSearching && 'loading'
                      }`}
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
                    <a href="/login" className="forgot-password">
                      Login instead
                    </a>
                  )}
                </form>
              </animated.div>
            </div>
          </div>
        </div>
        <div className="new-user">
          <div className="new-user-item create-acc">
            <div className="headline">New to Steam?</div>
            <a className="signup-btn" target="_top" href="/join">
              <span>Create an account</span>
            </a>
          </div>
          <div className="new-user-item">
            <div className="subtext">
              It's free and easy. Discover thousands of
              <br />
              games to play with millions of new friends.
              <br />
              <a className="join-desc" href="#">
                Learn more about Steam
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
