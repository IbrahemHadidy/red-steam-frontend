'use client';

// React
import { useRef } from 'react';

// Google ReCAPTCHA
import ReCAPTCHA from 'react-google-recaptcha';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Actions
import {
  toggleAgreeCheck,
  updateConfirmEmail,
  updateCountry,
  updateEmail,
} from '@store/features/user/signup/signupSlice';

// Utils
import { countries } from '@utils/countries';
import debounce from '@utils/debounce';

// Types
import type { ChangeEvent } from 'react';

export default function FirstForm() {
  // Initilizations
  const dispatch = useAppDispatch();

  // States
  const {
    emailInputError,
    confirmEmailInputError,
    agreeCheckboxError,
    submitButtonDisabled,
    email,
    confirmEmail,
    country,
    isAgreeChecked,
  } = useAppSelector((state) => state.signup);

  // Refs
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  // Debounced inputs
  const debouncedupdateEmail = debounce((value: string) => {
    dispatch(updateEmail(value));
  }, 500);

  const debouncedupdateConfirmEmail = debounce((value: string) => {
    dispatch(updateConfirmEmail(value));
  }, 500);

  // Event Handlers
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    debouncedupdateEmail.cancel();
    debouncedupdateEmail(value);
  };

  const handleConfirmEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    debouncedupdateConfirmEmail.cancel();
    debouncedupdateConfirmEmail(value);
  };

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const selectedValue = e.target.value;
    dispatch(updateCountry(selectedValue));
  };

  const handleAgreeClick = (): void => {
    dispatch(toggleAgreeCheck());
  };

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
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
          theme="dark"
          ref={recaptchaRef}
        />
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
