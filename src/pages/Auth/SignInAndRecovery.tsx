import {
  FC,
  useEffect,
  useState,
  FormEvent,
  useRef,
  useContext,
  ChangeEvent,
} from 'react';
import useSoftNavigate from 'hooks/useSoftNavigate';
import { useSpring, animated } from 'react-spring';
import { toast } from 'react-toastify';
import { AuthContext } from 'contexts/AuthContext';
import { checkEmailExists } from 'services/user/auth';
import { forgotPassword, resetPassword } from 'services/user/password';
import ReCAPTCHA from 'react-google-recaptcha';
import $ from 'tools/$selector';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import useResponsiveViewport from 'hooks/useResponsiveViewport';
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from 'tools/inputValidations';
import './SignInUp.scss';
const env = import.meta.env;

const SignInAndRecovery: FC = () => {
  const navigate = useSoftNavigate();
  const { login } = useContext(AuthContext);
  const isViewport740 = useResponsiveViewport(740);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [title, setTitle] = useState('Sign In');
  const [passwordPage, setPasswordPage] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resetErrorMessage, setResetErrorMessage] = useState('');
  const [accountName, setAccountName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState(false);
  const [noMatch, setNoMatch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [resetToken, setResetToken] = useState('');

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

  // Handle redirect to password reset page and forgot password page
  useEffect(() => {
    if (
      window.location.pathname.includes('/reset-password') ||
      window.location.pathname.includes('/forgot-password')
    ) {
      setPasswordPage(true);
      $('.signin-form')?.remove();
      $('.forgot-my-password')?.classList.add('active');
      ($('.signin-title .title') as HTMLElement).style.margin = 'auto';
      isViewport740 &&
        (($('.login-form-container') as HTMLElement).style.width =
          'max-content');
      const formErrorElement = $('.form-error') as HTMLElement | null;
      formErrorElement &&
        (formErrorElement.style.transform = 'translateY(-6px)');
    } else {
      ($('.forgot-my-password') as HTMLElement).style.minWidth = 'unset';
    }
    if (window.location.pathname.includes('/forgot-password')) {
      document.title = `Name / Password Recovery`;
      setTitle('Name / Password Recovery');
    }
    if (window.location.pathname.includes('/reset-password')) {
      document.title = `Password Reset`;
      if (
        window.location.pathname.endsWith('/reset-password/') ||
        window.location.pathname.endsWith('/reset-password')
      ) {
        toast.error('Reset token not found', { autoClose: 2000 });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
      const path = window.location.pathname;
      const pathParts = path.split('/');
      const resetToken = pathParts[pathParts.length - 1];
      // if token is invalid then redirect to home
      if (resetToken.length < 64) {
        toast.error('Invalid reset token', { autoClose: 2000 });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
      setResetToken(resetToken);
      setTitle('Password Reset');
      setShowResetPassword(true);
    }
  }, [isViewport740, navigate]);

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
      login(accountName, password, rememberMeValue, token as string);
    } catch (error) {
      console.error('Error during authentication:', error);
      setErrorMessage('Error during authentication, Please try again later');
    } finally {
      setIsLoading(false);
      captchaRef.current?.reset();
      setRecaptchaValue(null);
    }
  };

  const handleForgotPasswordFormSubmit = async (
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

    // Check if the user didn't write anything
    if (!forgotEmail && !recaptchaValue) {
      setResetErrorMessage(
        `Please provide a valid email or phone number<br>Please verify that you're not a robot.`,
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
        $('.change-password')?.setAttribute('disabled', 'true');
      } else {
        setNoMatch(password !== confirmPassword);
        if (password !== confirmPassword) {
          $('.change-password')?.setAttribute('disabled', 'true');
        } else {
          $('.change-password')?.removeAttribute('disabled');
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
                    value={accountName}
                    onChange={e => setAccountName(e.target.value)}
                  />
                </div>
                <div className="login-dialog-field">
                  <div className="field-label">Password</div>
                  <input
                    className="field-input"
                    id="field-input-password"
                    type="password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
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
                {!showResetPassword ? (
                  <form
                    className="login-form"
                    action=""
                    onSubmit={handleForgotPasswordFormSubmit}
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
                        value={forgotEmail}
                        onChange={e => setForgotEmail(e.target.value)}
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
                      <a
                        href="/login"
                        onClick={e => {
                          navigate('/login', e);
                        }}
                        className="forgot-password"
                      >
                        Login instead
                      </a>
                    )}
                  </form>
                ) : (
                  <form
                    className="login-form"
                    action=""
                    onSubmit={handleResetPasswordFormSubmit}
                  >
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
                        onChange={e => {
                          setPassword(e.target.value);
                          checkPassword(e);
                        }}
                      />
                      <div className="form-notes">
                        <div
                          className={`password-tag ${
                            passwordError
                              ? 'error'
                              : passwordWarning
                                ? 'warning'
                                : ''
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
                            : passwordError &&
                              'Password must be at least 8 characters long'}
                        </div>
                      </div>
                    </div>
                    <div className="login-dialog-field">
                      <div className="field-label account">
                        Confirm Password
                      </div>
                      <input
                        type="password"
                        id="reenter-password"
                        name="reenter-password"
                        className="field-input"
                        maxLength={64}
                        onChange={e => {
                          setConfirmPassword(e.target.value);
                        }}
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
                      className={`submit-button change-password ${
                        isSearching && 'loading'
                      }`}
                      style={isSearching ? { color: 'transparent' } : {}}
                      type="submit"
                      disabled={isSearching}
                    >
                      Change Password
                      {isSearching && (
                        <div className="loading-container">
                          <div className="loading-spinner" />
                        </div>
                      )}
                    </button>
                    {passwordPage && (
                      <a
                        href="/login"
                        onClick={e => {
                          navigate('/login', e);
                        }}
                        className="forgot-password"
                      >
                        Login instead
                      </a>
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
            <a
              className="signup-btn"
              target="_top"
              href="/join"
              onClick={e => {
                navigate('/join', e);
              }}
            >
              <span>Create an account</span>
            </a>
          </div>
          <div className="new-user-item">
            <div className="subtext">
              It's free and easy. Discover thousands of
              <br />
              games to play with millions of new friends.
              <br />
              <a
                className="join-desc"
                href="https://github.com/IbrahemHadidy/red-steam"
              >
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
