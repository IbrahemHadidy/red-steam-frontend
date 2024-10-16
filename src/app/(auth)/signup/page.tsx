'use client';

// React
import { useEffect, useRef } from 'react';

// NextJS
import Image from 'next/image';

// React Spring
import { animated, useSpring } from 'react-spring';

// Google ReCAPTCHA
import ReCAPTCHA from 'react-google-recaptcha';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Thunks
import { checkExistingEmail, checkNameAndPassword } from '@store/features/user/signup/signupThunks';

// Redux Actions
import { setSecondPage, updateCountry } from '@store/features/user/signup/signupSlice';

// Redux Queries
import { useFetchUserCountryQuery } from '@store/apis/countries/countryCode';

// Components
import ExistingAccount from './ExistingAccount';
import FirstForm from './FirstForm';
import SecondForm from './SecondForm';

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';

// Images
import back from '@images/back.png';

// Types
import type { FormEvent } from 'react';

// Custom hook for fetching and setting country
function useFetchAndSetCountry() {
  const dispatch = useAppDispatch();
  const { data: fetchedCountry } = useFetchUserCountryQuery();

  useEffect(() => {
    if (fetchedCountry) {
      dispatch(updateCountry(fetchedCountry));
    }
  }, [fetchedCountry, dispatch]);
}

export default function SignUpPage() {
  // Initilizations
  const dispatch = useAppDispatch();
  useDynamicBackground(
    "radial-gradient(30% 40% at 40% 30%, rgba(33, 36, 41, .5) 0%, rgba(33, 36, 41, 0) 100%) no-repeat, url( '/images/acct_creation_bg.jpg' ) -45vw 0 no-repeat, #212429"
  );

  // States
  const { isSecondPage, isEmailAvailable, errorMessages } = useAppSelector((state) => state.signup);

  // Fetch User Country
  useFetchAndSetCountry();

  // Refs
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  // Spring Animations
  const springProps = useSpring({
    from: { backgroundColor: 'rgba(244, 183, 134, 1)' },
    to: {
      backgroundColor: errorMessages.length !== 0 ? 'rgba(0, 0, 0, 0.5)' : 'rgba(244, 183, 134, 1)',
      display: errorMessages.length !== 0 ? 'block' : 'none',
    },
    config: { duration: 1000 },
  });

  // Event Handlers
  const handleSubmitFirstForm = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    await dispatch(checkExistingEmail({ recaptchaRef }));
  };

  const handleSubmitSecondForm = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    await dispatch(checkNameAndPassword());
  };

  const handleBackButtonClick = (): void => {
    dispatch(setSecondPage(false));
  };

  return (
    <>
      <div className="page-content-sign signup">
        <div className="joinsteam-content">
          <animated.div className="error-display" style={springProps}>
            {errorMessages.map((message, idx) => (
              <div key={idx}>{message}</div>
            ))}
          </animated.div>
          {isEmailAvailable ? (
            <div className="create-account-container">
              <form
                action=""
                onSubmit={isSecondPage ? handleSubmitSecondForm : handleSubmitFirstForm}
              >
                <div className="join-form">
                  <div className="section-title">
                    {isSecondPage && (
                      <Image src={back} alt="Back Icon" onClick={handleBackButtonClick} />
                    )}
                    Create Your Account
                  </div>
                  {!isSecondPage ? <FirstForm /> : <SecondForm />}
                </div>
              </form>
            </div>
          ) : (
            <ExistingAccount />
          )}
        </div>
      </div>
    </>
  );
}
