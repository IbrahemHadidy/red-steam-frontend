// Constants
import { MIN_PASSWORD_LENGTH } from '@constants/passwords';

/**
 * Validate password strength and return error and warning status
 * @param password password to validate
 * @returns {error: boolean; warning: boolean}
 */
export default function validatePasswordStrength(password: string): {
  error: boolean;
  warning: boolean;
} {
  let error = false;
  let warning = false;

  if (0 === password.length) {
    error = false;
  } else if (password.length < MIN_PASSWORD_LENGTH && 0 < password.length) {
    error = true;
  } else {
    if (
      !/\d/.test(password) || // at least one digit
      !/[a-zA-Z]/.test(password) || // at least one letter
      !/[!@#$%^&*(),.?":{}|<>]/.test(password) // at least one special character
    ) {
      warning = true;
    }
  }

  return { error, warning };
}
