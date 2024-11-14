'use client';

// Google ReCAPTCHA
import ReCAPTCHA from 'react-google-recaptcha';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  toggleAgreeCheck,
  updateConfirmEmail,
  updateCountry,
  updateEmail,
} from '@store/features/user/signup/signupSlice';

// Utils
import { countries } from '@utils/countries';

// Types
import type { ChangeEvent, RefObject } from 'react';

interface FirstFormProps {
  recaptchaRef: RefObject<ReCAPTCHA | null>;
}

export default function FirstForm({ recaptchaRef }: FirstFormProps) {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const {
    emailInputError,
    confirmEmailInputError,
    agreeCheckboxError,
    submitButtonDisabled,
    email,
    confirmEmail,
    country,
    isAgreeChecked,
  } = useAppSelector((state) => state.user.signup);

  //---------------------------- Event Handlers ----------------------------//
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    dispatch(updateEmail(value));
  };

  const handleConfirmEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    dispatch(updateConfirmEmail(value));
  };

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const selectedValue = e.target.value;
    dispatch(updateCountry(selectedValue));
  };

  const handleAgreeClick = (): void => {
    dispatch(toggleAgreeCheck());
  };

  //-------------------------- Render UI Section --------------------------//
  return (
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
            className={emailInputError ? 'error' : ''}
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
            className={`reenter-email ${confirmEmailInputError ? 'error' : ''}`}
            autoComplete=""
            id="reenter-email"
            value={confirmEmail}
            onChange={handleConfirmEmailChange}
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
            value={country}
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
        <div className="recaptcha-container">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
            theme="dark"
            ref={recaptchaRef}
          />
        </div>
      </div>

      <div className="form-row">
        <label
          htmlFor="i-agree-check"
          id="agree-label"
          className={`agree-label ${agreeCheckboxError ? 'error' : ''}`}
        >
          <input
            type="checkbox"
            name="i-agree-check"
            id="i-agree-check"
            checked={isAgreeChecked}
            onChange={handleAgreeClick}
          />
          &nbsp; By checking this box, I confirm that I understand this website is for educational
          purposes only. I certify that I have not provided any personal or sensitive information
          during registration and acknowledge that this site is not affiliated with the official
          Steam platform or its parent company, Valve Corporation.
        </label>

        <button
          id="submit-button"
          className="joinsteam-btn"
          type="submit"
          disabled={submitButtonDisabled}
        >
          <span>Continue</span>
        </button>
      </div>
    </>
  );
}
