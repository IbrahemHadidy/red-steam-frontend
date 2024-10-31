import { validateEmail, validatePassword, validatePhone } from '@utils/inputValidations';

type ChangeModalType = 'email' | 'phone' | 'password';

interface NextButtonDisabledProps {
  nextStepButtonDisabled: boolean;
  changeModalType: ChangeModalType;
  currentChangeStep: number;
  email: string;
  currentEmail: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const getNextBtnDisabled = ({
  nextStepButtonDisabled,
  changeModalType,
  currentChangeStep,
  email,
  currentEmail,
  phone,
  currentPassword,
  newPassword,
  confirmNewPassword,
}: NextButtonDisabledProps): boolean => {
  // Validations
  const isPasswordValid = currentPassword.length >= 8;
  const isNewPasswordValid = validatePassword(newPassword);
  const isEmailValid = validateEmail(email);
  const isCurrentEmailValid = validateEmail(currentEmail);
  const isPhoneValid = validatePhone(phone);
  const isNewPasswordConfirmed = newPassword === confirmNewPassword;

  if (nextStepButtonDisabled) return true;

  if (changeModalType === 'email') {
    return currentChangeStep === 1 ? !isEmailValid || !isCurrentEmailValid : !isPasswordValid;
  }

  if (changeModalType === 'phone') {
    return currentChangeStep === 1 ? !isPhoneValid : !isPasswordValid;
  }

  if (changeModalType === 'password') {
    return currentChangeStep === 1
      ? !(isNewPasswordValid && isNewPasswordConfirmed)
      : !isPasswordValid || !newPassword;
  }

  return false;
};

export const getModalHeader = (changeModalType: ChangeModalType): string => {
  if (changeModalType === 'email') {
    return 'Change Email';
  } else if (changeModalType === 'phone') {
    return 'Change Phone Number';
  } else if (changeModalType === 'password') {
    return 'Change Password';
  }

  return '';
};

export const getInputType = (changeModalType: ChangeModalType): string => {
  if (changeModalType === 'email') {
    return 'email';
  } else if (changeModalType === 'phone') {
    return 'text';
  }

  return '';
};

export const getNewInputPlaceholder = (changeModalType: ChangeModalType): string => {
  if (changeModalType === 'email') {
    return 'Enter your new email';
  } else if (changeModalType === 'phone') {
    return 'Enter your new phone number';
  }

  return '';
};
