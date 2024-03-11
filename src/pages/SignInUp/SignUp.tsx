import {
  FC,
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
  FormEvent,
  useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import {
  checkEmailExists,
  checkUsernameExists,
  registerUser,
  verificationStatus,
  waitingTimeResponse,
} from 'services/user/auth';
import ReCAPTCHA from 'react-google-recaptcha';
import $ from 'tools/$selector';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import useResponsiveViewports from 'hooks/useResponsiveViewports';
import {
  validateEmail,
  validateName,
  validatePassword,
} from 'tools/inputValidations';
import { countries } from 'services/countries';
import { VerifyModal } from './SignUpVerifyModal';
import { fetchUserCountry } from 'services/countryCode';
import { toast } from 'react-toastify';
import './SignInUp.scss';

const env = import.meta.env;

const SignUp: FC = () => {
  const isViewport740 = useResponsiveViewports(740);
  const navigate = useNavigate();
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [resetKey, setResetKey] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState('PS');
  const [email, setEmail] = useState('');
  const [confirmedEmail, setConfirmedEmail] = useState('');
  const [existingEmail, setExistingEmail] = useState(false);
  const [firstStep, setFirstStep] = useState(true);
  const [nameAvailable, setNameAvailable] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState(false);
  const [noMatch, setNoMatch] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const captchaRef = useRef<ReCAPTCHA | null>(null);

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    // this is responsible for the page background
    document.body.style.background =
      "radial-gradient(30% 40% at 40% 30%, rgba(33, 36, 41, .5) 0%, rgba(33, 36, 41, 0) 100%) no-repeat, url( '/images/acct_creation_bg.jpg' ) -45vw 0 no-repeat, #212429";
    // this is responsible for the tab title
    document.title = `Create Your Account`;
  }, [isViewport740]);

  // handle storing error messages
  const addErrorMessage = (newErrorMessage: string) => {
    setErrorMessages((prevErrorMessages: string[]) => [
      ...prevErrorMessages,
      newErrorMessage,
    ]);
  };

  // fading animation for error message
  useEffect(() => {
    setResetKey(prevKey => prevKey + 1);
  }, [errorMessages]);
  const springProps = useSpring({
    key: resetKey,
    from: { backgroundColor: 'rgba(244, 183, 134, 1)' },
    to: {
      backgroundColor:
        errorMessages.length !== 0
          ? 'rgba(0, 0, 0, 0.5)'
          : 'rgba(244, 183, 134, 1)',
    },
    config: { duration: 1000 },
  });

  // Fetch the user's current location
  useEffect(() => {
    const fetchData = async () => {
      const country = await fetchUserCountry();
      if (country) {
        setSelectedCountry(country);
      }
    };
    fetchData();
  }, []);

  // handle country change
  const onCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedCountry(selectedValue);
  };

  // Function to check for an existing email
  const checkExistingEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessages([]);

    const isEmailValid = validateEmail(email);
    const isCheckboxChecked = ($('#i-agree-check') as HTMLInputElement)
      ?.checked;

    if (!isEmailValid) {
      $('#email')?.classList.add('error');
      $('#reenter-email')?.classList.add('error');
      addErrorMessage('- Please enter a valid email address.');
      scrollToTop();
    }
    if (confirmedEmail !== email) {
      $('#reenter-email')?.classList.add('error');
      addErrorMessage(
        '- Please enter the same address in both email address fields.',
      );
      scrollToTop();
    }
    if (!recaptchaValue) {
      addErrorMessage("- Please verify that you're not a robot.");
      scrollToTop();
    }
    if (!isCheckboxChecked) {
      $('#agree-label')?.classList.add('error');
      addErrorMessage('- Please agree to the terms and conditions.');
      scrollToTop();
    }
    if (
      !isEmailValid ||
      confirmedEmail !== email ||
      !isCheckboxChecked ||
      !recaptchaValue
    ) {
      captchaRef.current?.reset();
      setRecaptchaValue(null);
      return;
    }

    try {
      const exists = await checkEmailExists(email);

      if (exists) {
        // Email already exists
        setExistingEmail(true);
      } else {
        // Email does not exist, proceed with the form submission
        setExistingEmail(false);
        firstStepForm(e);
      }
    } catch (error) {
      console.error('Error checking existing email:', error);
      addErrorMessage(
        '- An error occurred while trying to connect to the server. Please check your internet connection and try again.',
      );
      scrollToTop();
    } finally {
      captchaRef.current?.reset();
      setRecaptchaValue(null);
    }
  };

  const checkNameAndPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessages([]);

    const isNameValid = validateName(accountName);
    const isPasswordValid = validatePassword(password);

    if (!isNameValid) {
      $('#accountname')?.classList.add('error');
      addErrorMessage(
        '- Please enter an account name that is at least 3 characters long and uses only a-z, A-Z, 0-9 or _ characters.',
      );
      scrollToTop();
    }
    if (!isPasswordValid) {
      $('#password')?.classList.add('error');
      $('#reenter-password')?.classList.add('error');
      addErrorMessage(
        '- Password must contain at least one digit, one letter, and one special character.',
      );
      scrollToTop();
    }
    if (password !== confirmPassword) {
      $('#reenter-password')?.classList.add('error');
      addErrorMessage(
        '- Please enter the same address in both email address fields.',
      );
      scrollToTop();
    }
    if (!isNameValid || !isPasswordValid || password !== confirmPassword) {
      return;
    }

    try {
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
        '- Internal server error while checking account existence. Please try again later.',
      );
      scrollToTop();
    }
  };

  // handle existing account button
  const makeNewAccount = () => {
    setExistingEmail(false);
    setErrorMessages([]);
    setFirstStep(true);
  };

  // Check name availability
  useEffect(() => {
    const checkAvailability = async () => {
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
            '- Internal server error while checking account availability. Please try again later.',
          );
          scrollToTop();
        }
      }
    };
    checkAvailability();
  }, [accountName]);

  // check password criteria
  const checkPassword = (
    event: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>,
  ) => {
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
      } else {
        setNoMatch(password !== confirmPassword);
      }
    };
    confirmPasswordCheck();
  }, [confirmPassword, password]);

  // first step
  const firstStepForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessages([]);

    // Check if reCAPTCHA is solved
    if (!recaptchaValue) {
      toast.error('reCAPTCHA not solved');
      addErrorMessage(
        '- You must verify your humanity before you can create a Red Steam account.',
      );
      scrollToTop();
      return;
    }

    // Move to next step
    setFirstStep(false);
  };

  // submit second form
  const submitSecondStep = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Perform your second-step account creation logic here
      const response = await registerUser(accountName, email, password, selectedCountry);

      if (response.status === 201) {
        toast.success('Account created successfully!');

        // Display the verification modal
        setShowVerificationModal(true);

        // Function to close the modal and show an error if it takes too long
        const closeVerificationModal = () => {
          setShowVerificationModal(false);
          toast.error(
            'Email verification took too long. Please try again later.',
          );
          setErrorMessages(
            ["- You've waited too long to verify your email. Please try creating your account and verifying your email again."]
          );
          scrollToTop();
        };

        // Fetch waiting time from the backend
        const waitingTime = await waitingTimeResponse();

        const checkVerificationStatus = async () => {
          try {
            // Verify email
            const verificationResult = await verificationStatus(email);

            // If verification is successful, close the verification modal
            if (verificationResult) {
              clearInterval(intervalId);
              toast.success('Email verification successful!');
              setShowVerificationModal(false);
              // Redirect the user to login page
              navigate('/login');
            }
          } catch (error) {
            // If verification fails, display an error message
            console.error('Error during form submission:', error);
            addErrorMessage(
              '- An error occurred while verifying your email, Please try again later.',
            );
            scrollToTop();
          }
        };

        // Periodically check verification status and waiting time
        const intervalId = setInterval(checkVerificationStatus, 5000);

        setTimeout(() => {
          closeVerificationModal();
          clearInterval(intervalId);
        }, waitingTime);
      }
    } catch (error) {
      console.error('Error creating account:', error);
      addErrorMessage(
        'An error occurred while creating your account. Please try again later.',
      );
    }
  };

  return (
    <>
      <Header />
      <div className="page-content-sign" style={{ width: '940px' }}>
        <div className="joinsteam-content">
          <animated.div
            className="error-display"
            style={{
              ...springProps,
              display: errorMessages.length !== 0 ? 'block' : 'none',
            }}
          >
            {errorMessages.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
          </animated.div>
          {!existingEmail ? (
            <div className="create-account-container">
              <form
                action=""
                onSubmit={firstStep ? checkExistingEmail : checkNameAndPassword}
              >
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
                            onChange={e => setEmail(e.target.value)}
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
                            onChange={e => setConfirmedEmail(e.target.value)}
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
                            onChange={onCountryChange}
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
                          sitekey={env.VITE_RECAPTCHA_SITE_KEY}
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
                        >
                          <input
                            type="checkbox"
                            name="i-agree-check"
                            id="i-agree-check"
                          />
                          &nbsp; By checking this box, I confirm that I
                          understand this website is for educational purposes
                          only. I certify that I have not provided any personal
                          or sensitive information during registration and
                          acknowledge that this site is not affiliated with the
                          official Steam platform or its parent company, Valve
                          Corporation.
                        </label>
                        <button className="joinsteam-btn" type="submit">
                          <span>Continue</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="form-row-flex">
                        <div className="form-area">
                          <label htmlFor="accountname">
                            Steam Account Name
                          </label>
                          <input
                            type="text"
                            maxLength={64}
                            id="accountname"
                            name="accountname"
                            value={accountName}
                            onChange={e => setAccountName(e.target.value)}
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
                              background: nameAvailable
                                ? 'rgb(92, 126, 16)'
                                : 'rgb(160, 56, 43)',
                              display:
                                accountName !== '' ? 'inline-block' : 'none',
                            }}
                          >
                            {nameAvailable ? (
                              <>
                                <img
                                  className="green-check"
                                  src="/images/icon_check.png"
                                />
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
                            onChange={e => {
                              setPassword(e.target.value);
                              checkPassword(e);
                            }}
                          />
                        </div>
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
                      <div
                        className="form-row-flex row-flex-end"
                        style={{ clear: 'left' }}
                      >
                        <div className="form-area">
                          <label htmlFor="reenter-password">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            id="reenter-password"
                            maxLength={64}
                            onChange={e => {
                              setConfirmPassword(e.target.value);
                            }}
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
                          <button className="joinsteam-btn" type="submit">
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
                &nbsp;Looks like your email address is already associated with
                another Steam account.
                <br />
                <br />
                You can use your existing account or recover it if you've
                forgotten your login.
              </div>
              <div className="use-existing-account">
                <button
                  className="use-existing-btn"
                  onClick={() => navigate('/login')}
                >
                  <span>Use existing account</span>
                </button>
                <a href="/reset-password">Recover my account</a>
              </div>
              <div className="existingacc-ruler" />
              <div className="create-newaccount-instead">
                If you prefer, you can make a new, separate Steam account.
              </div>
              <button className="use-existing-btn" onClick={makeNewAccount}>
                <span>Continue</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {showVerificationModal && (
        <VerifyModal
          storedEmailAddress={email}
          setShowVerificationModal={setShowVerificationModal}
          setFirstStep={setFirstStep}
        />
      )}
      <Footer />
    </>
  );
};

export default SignUp;
