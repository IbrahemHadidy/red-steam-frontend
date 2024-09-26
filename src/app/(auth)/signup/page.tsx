'use client';

// React
import { useContext, useEffect, useRef, useState } from 'react';

// NextJS
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// React Spring
import { animated, useSpring } from 'react-spring';

// Toast notifications
import { toast } from 'react-toastify';

// Google ReCAPTCHA
import ReCAPTCHA from 'react-google-recaptcha';

// Contexts
import { AuthContext } from '@contexts/AuthContext';

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';

// Utils
import { validateEmail, validateName, validatePassword } from '@utils/inputValidations';

// Services
import { countries } from '@services/countries/countries';
import { fetchUserCountry } from '@services/countries/countryCode';
import { signup as registerUser } from '@services/user/auth';
import { checkEmailExists, checkUsernameExists } from '@services/user/management';

// Images
import checkIcon from '@images/icon_check.png';

// Types
import type { ChangeEvent, FC, FormEvent, JSX, KeyboardEvent } from 'react';

const SignUpPage: FC = (): JSX.Element => {
  // Initilizations
  const router = useRouter();
  useDynamicBackground(
    "radial-gradient(30% 40% at 40% 30%, rgba(33, 36, 41, .5) 0%, rgba(33, 36, 41, 0) 100%) no-repeat, url( '/images/acct_creation_bg.jpg' ) -45vw 0 no-repeat, #212429"
  );

  // Contexts
  const { login } = useContext(AuthContext);

  // States
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [resetKey, setResetKey] = useState<number>(0);
  const [selectedCountry, setSelectedCountry] = useState<string>('PS');
  const [email, setEmail] = useState<string>('');
  const [confirmedEmail, setConfirmedEmail] = useState<string>('');
  const [existingEmail, setExistingEmail] = useState<boolean>(false);
  const [firstStep, setFirstStep] = useState<boolean>(true);
  const [nameAvailable, setNameAvailable] = useState<boolean>(false);
  const [accountName, setAccountName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordWarning, setPasswordWarning] = useState<boolean>(false);
  const [noMatch, setNoMatch] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Refs
  const iAgreeCheckRef = useRef<HTMLInputElement | null>(null);
  const captchaRef = useRef<ReCAPTCHA | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const reenterEmailInputRef = useRef<HTMLInputElement | null>(null);
  const agreeLabelRef = useRef<HTMLLabelElement | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const accountNameInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement | null>(null);

  const handleRecaptchaChange = (value: string | null): void => {
    setRecaptchaValue(value);
  };

  const scrollToTop = (): void => window.scrollTo({ top: 0, behavior: 'smooth' });

  // handle storing error messages
  const addErrorMessage = (newErrorMessage: string): void => {
    setErrorMessages((prevErrorMessages: string[]) => [...prevErrorMessages, newErrorMessage]);
  };

  // fading animation for error message
  useEffect(() => {
    setResetKey((prevKey) => prevKey + 1);
  }, [errorMessages]);
  const springProps = useSpring({
    key: resetKey,
    from: { backgroundColor: 'rgba(244, 183, 134, 1)' },
    to: {
      backgroundColor: errorMessages.length !== 0 ? 'rgba(0, 0, 0, 0.5)' : 'rgba(244, 183, 134, 1)',
    },
    config: { duration: 1000 },
  });

  // Fetch the user's current location
  const fetchCountry = async (): Promise<void> => {
    const country = await fetchUserCountry();
    if (country) {
      setSelectedCountry(country);
    }
  };
  useEffect(() => {
    fetchCountry();
  }, []);

  // handle country change
  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const selectedValue = e.target.value;
    setSelectedCountry(selectedValue);
  };

  // Function to check for an existing email
  const checkExistingEmail = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrorMessages([]);

    const isEmailValid: boolean = validateEmail(email);
    const isCheckboxChecked: boolean | undefined = iAgreeCheckRef.current?.checked;

    if (!isEmailValid) {
      emailInputRef.current?.classList.add('error');
      reenterEmailInputRef.current?.classList.add('error');
      addErrorMessage('- Please enter a valid email address.');
      scrollToTop();
    }
    if (confirmedEmail !== email) {
      reenterEmailInputRef.current?.classList.add('error');
      addErrorMessage('- Please enter the same address in both email address fields.');
      scrollToTop();
    }
    if (!recaptchaValue) {
      addErrorMessage("- Please verify that you're not a robot.");
      scrollToTop();
    }
    if (!isCheckboxChecked) {
      agreeLabelRef.current?.classList.add('error');
      addErrorMessage('- Please agree to the terms and conditions.');
      scrollToTop();
    }
    if (!isEmailValid || confirmedEmail !== email || !isCheckboxChecked || !recaptchaValue) {
      captchaRef.current?.reset();
      setRecaptchaValue(null);
      return;
    }

    try {
      submitButtonRef.current?.setAttribute('disabled', 'true');
      const exists = await checkEmailExists(email);

      if (exists) {
        // Email already exists
        setExistingEmail(true);
      } else {
        // Email does not exist, proceed with the form submission
        setExistingEmail(false);
        firstStepForm(e);
      }

      submitButtonRef.current?.removeAttribute('disabled');
    } catch (error) {
      console.error('Error checking existing email:', error);
      addErrorMessage(
        '- An error occurred while trying to connect to the server. Please check your internet connection and try again.'
      );
      scrollToTop();
      submitButtonRef.current?.removeAttribute('disabled');
    } finally {
      captchaRef.current?.reset();
      setRecaptchaValue(null);
    }
  };

  const checkNameAndPassword = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrorMessages([]);

    const isNameValid: boolean = validateName(accountName);
    const isPasswordValid: boolean = validatePassword(password);

    if (!isNameValid) {
      accountNameInputRef.current?.classList.add('error');
      addErrorMessage(
        '- Please enter an account name that is at least 3 characters long and uses only a-z, A-Z, 0-9 or _ characters.'
      );
      scrollToTop();
    }
    if (!isPasswordValid) {
      passwordInputRef.current?.classList.add('error');
      confirmPasswordInputRef.current?.classList.add('error');
      addErrorMessage(
        '- Password must contain at least one digit, one letter, and one special character.'
      );
      scrollToTop();
    }
    if (password !== confirmPassword) {
      confirmPasswordInputRef.current?.classList.add('error');
      addErrorMessage('- Please enter the same address in both email address fields.');
      scrollToTop();
    }
    if (!isNameValid || !isPasswordValid || password !== confirmPassword) {
      return;
    }

    try {
      setIsSearching(true);
      const isExisting = await checkEmailExists(email);

      if (isExisting) {
        // Email already exists
        setExistingEmail(true);
      } else {
        // Email does not exist, proceed with the form submission
        setExistingEmail(false);
        submitSecondStep(e);
      }
    } catch (error) {
      console.error('Error checking existing email:', error);
      addErrorMessage(
        '- Internal server error while checking account existence. Please try again later.'
      );
      scrollToTop();
    }
  };

  // handle existing account button
  const handleCreateAccountClick = (): void => {
    setExistingEmail(false);
    setErrorMessages([]);
    setFirstStep(true);
  };

  // Check name availability
  useEffect(() => {
    const checkAvailability = async (): Promise<void> => {
      if (accountName.length === 0) {
        return;
      } else {
        try {
          const exists = await checkUsernameExists(accountName);

          if (!exists) {
            setNameAvailable(true);
            setErrorMessages([]);
          } else {
            setNameAvailable(false);
            setErrorMessages([]);
          }
        } catch (error) {
          console.error('Error checking account availability:', error);
          setErrorMessages([]);
          addErrorMessage(
            '- Internal server error while checking account availability. Please try again later.'
          );
          scrollToTop();
        }
      }
    };
    checkAvailability();
  }, [accountName]);

  // check password criteria
  const checkPassword = (
    event: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>
  ): void => {
    const enteredPassword: string = (event.target as HTMLInputElement).value;

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
    const confirmPasswordCheck = (): void => {
      if (confirmPassword.length === 0) {
        setNoMatch(false);
      } else {
        setNoMatch(password !== confirmPassword);
      }
    };
    confirmPasswordCheck();
  }, [confirmPassword, password]);

  // first step
  const firstStepForm = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrorMessages([]);

    // Check if reCAPTCHA is solved
    if (!recaptchaValue) {
      toast.error('reCAPTCHA not solved');
      addErrorMessage('- You must verify your humanity before you can create a Red Steam account.');
      scrollToTop();
      return;
    }

    // Move to next step
    setFirstStep(false);
  };

  // submit second form
  const submitSecondStep = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await registerUser(accountName, email, password, selectedCountry);

      if (response && response.status === 201) {
        toast.success('Account created successfully!');

        await login(email, password, false, recaptchaValue?.toString() || '');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      addErrorMessage('An error occurred while creating your account. Please try again later.');
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleConfirmEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setConfirmedEmail(e.target.value);
  };

  const handleAccountNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAccountName(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    checkPassword(e);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setConfirmPassword(e.target.value);
  };

  const handleUseExistingClick = (): void => {
    router.push('/login');
  };

  return (
    <>
      <div className="page-content-sign" style={{ width: '940px' }}>
        <div className="joinsteam-content">
          <animated.div
            className="error-display"
            style={{
              ...springProps,
              display: errorMessages.length !== 0 ? 'block' : 'none',
            }}
          >
            {errorMessages.map((message, idx) => (
              <div key={idx}>{message}</div>
            ))}
          </animated.div>
          {!existingEmail ? (
            <div className="create-account-container">
              <form action="" onSubmit={firstStep ? checkExistingEmail : checkNameAndPassword}>
                <div className="join-form">
                  <div className="section-title">Create Your Account</div>
                  {firstStep ? (
                    <>
                      <div className="form-row-flex">
                        <div className="form-area">
                          <label htmlFor="email">Email Address</label>
                          <input
                            type="text"
                            maxLength={225}
                            name="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            ref={emailInputRef}
                          />
                        </div>
                      </div>
                      <div className="form-row-flex">
                        <div className="form-area">
                          <label className="reenter" htmlFor="reenter-email">
                            Confirm your Address
                          </label>
                          <input
                            type="text"
                            className="reenter-email"
                            autoComplete=""
                            name="reenter-email"
                            id="reenter-email"
                            value={confirmedEmail}
                            onChange={handleConfirmEmailChange}
                            ref={reenterEmailInputRef}
                          />
                        </div>
                      </div>
                      <div className="form-row-flex">
                        <div className="form-area">
                          <label className="country-select" htmlFor="country">
                            Country of Residence
                          </label>
                          <select
                            name="country"
                            id="country"
                            className="country-selector"
                            onChange={handleCountryChange}
                            value={selectedCountry}
                          >
                            {countries.map(([countryCode, countryName]) => (
                              <option key={countryCode} value={countryCode}>
                                {countryName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-row">
                        <ReCAPTCHA
                          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                          onChange={handleRecaptchaChange}
                          theme="dark"
                          ref={captchaRef}
                        />
                      </div>
                      <div className="form-row">
                        <label
                          htmlFor="i-agree-check"
                          id="agree-label"
                          className="agree-label"
                          ref={agreeLabelRef}
                        >
                          <input
                            type="checkbox"
                            name="i-agree-check"
                            id="i-agree-check"
                            ref={iAgreeCheckRef}
                          />
                          &nbsp; By checking this box, I confirm that I understand this website is
                          for educational purposes only. I certify that I have not provided any
                          personal or sensitive information during registration and acknowledge that
                          this site is not affiliated with the official Steam platform or its parent
                          company, Valve Corporation.
                        </label>
                        <button
                          id="submit-button"
                          className="joinsteam-btn"
                          type="submit"
                          ref={submitButtonRef}
                        >
                          <span>Continue</span>
                        </button>
                      </div>
                    </>
                  ) : (
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
                            ref={accountNameInputRef}
                          />
                        </div>
                        <div
                          className="availability-container"
                          style={{
                            display: accountName !== '' ? 'block' : 'none',
                          }}
                        >
                          <div
                            className="availability"
                            style={{
                              background: nameAvailable ? 'rgb(92, 126, 16)' : 'rgb(160, 56, 43)',
                              display: accountName !== '' ? 'inline-block' : 'none',
                            }}
                          >
                            {nameAvailable ? (
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
                            ref={passwordInputRef}
                          />
                        </div>
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
                      <div className="form-row-flex row-flex-end" style={{ clear: 'left' }}>
                        <div className="form-area">
                          <label htmlFor="reenter-password">Confirm Password</label>
                          <input
                            type="password"
                            id="reenter-password"
                            maxLength={64}
                            onChange={handleConfirmPasswordChange}
                            ref={confirmPasswordInputRef}
                          />
                        </div>
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
                      <div className="form-row" style={{ clear: 'left' }}>
                        <div className="submit-btn-container">
                          <button className="joinsteam-btn" type="submit" disabled={isSearching}>
                            <span>Done</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          ) : (
            <div className="existing-account">
              <div className="section-title">Email in use</div>
              <div className="existing-account-text">
                &nbsp;Looks like your email address is already associated with another Steam
                account.
                <br />
                <br />
                You can use your existing account or recover it if you've forgotten your login.
              </div>
              <div className="use-existing-account">
                <button className="use-existing-btn" onClick={handleUseExistingClick}>
                  <span>Use existing account</span>
                </button>
                <Link href="/forgot-password">Recover my account</Link>
              </div>
              <div className="existingacc-ruler" />
              <div className="create-newaccount-instead">
                If you prefer, you can make a new, separate Steam account.
              </div>
              <button
                className="use-existing-btn"
                onClick={handleCreateAccountClick}
                disabled={isSearching}
              >
                <span>Continue</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
