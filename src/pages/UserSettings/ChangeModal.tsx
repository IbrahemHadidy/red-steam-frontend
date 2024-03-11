import { AuthContext } from 'contexts/AuthContext';
import { FC, useContext, useState } from 'react';
import { changeEmail } from 'services/user/auth';
import { changePassword } from 'services/user/password';
import { changePhoneNumber } from 'services/user/phone';
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from 'tools/inputValidations';

const ChangeModal: FC<{ onClose: () => void; type: string }> = ({
  onClose,
  type,
}) => {
  const { userData, fetchData } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [step, setStep] = useState(1);

  const isPasswordValid = currentPassword.length >= 8;
  const isNewPasswordValid = validatePassword(newPassword);
  const isNewPasswordConfirmed = newPassword === confirmNewPassword;
  const isEmailValid = validateEmail(email);
  const isPhoneValid = validatePhone(phone);

  const handleEmailChange = async () => {
    if (step === 1) {
      // First step: validate email format and move to next step
      if (isEmailValid) {
        setStep(2);
        setErrorMessage('');
      } else {
        setErrorMessage('Invalid email format');
      }
    } else {
      // Second step: change email
      userData &&
        (await changeEmail(
          userData?._id,
          currentPassword,
          email,
          onClose,
          setErrorMessage,
        ));
      fetchData();
    }
  };

  const handlePhoneChange = async () => {
    if (step === 1) {
      // First step: validate phone format and move to next step
      if (isPhoneValid) {
        setStep(2);
        setErrorMessage('');
      } else {
        setErrorMessage('Invalid phone number');
      }
    } else {
      // Second step: change phone
      userData && (await changePhoneNumber(userData._id, phone));
      fetchData();
    }
  };

  const handlePasswordChange = async () => {
    if (isNewPasswordValid && isNewPasswordConfirmed) {
      userData &&
        (await changePassword(
          userData?._id,
          currentPassword,
          newPassword,
          onClose,
          setErrorMessage,
        ));
      fetchData();
      setErrorMessage('');
    } else {
      setErrorMessage(
        'New password should be at least 8 characters long and contain at least one letter, one number, and one special character.',
      );
    }
  };

  return (
    <div className="change-modal">
      <div className="modal-content">
        <h2>
          {type === 'email'
            ? 'Change Email'
            : type === 'phone'
              ? 'Change Phone Number'
              : 'Change Password'}
        </h2>
        {type !== 'password' && step === 1 && (
          <>
            <input
              className="password-input"
              type={type === 'email' ? 'email' : 'text'}
              placeholder={
                type === 'email'
                  ? 'Enter your new email'
                  : 'Enter your new phone number'
              }
              value={type === 'email' ? email : phone}
              onChange={e =>
                type === 'email'
                  ? setEmail(e.target.value)
                  : setPhone(e.target.value)
              }
            />
          </>
        )}

        {step === 2 && (
          <input
            className="password-input"
            type="password"
            placeholder="Enter your password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
          />
        )}
        {type === 'password' && (
          <>
            <input
              className="password-input"
              type="password"
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
            />
            <input
              className="password-input"
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <input
              className="password-input"
              type="password"
              placeholder="Confirm your new password"
              value={confirmNewPassword}
              onChange={e => setConfirmNewPassword(e.target.value)}
            />
          </>
        )}

        <div className="error-message">{errorMessage}</div>
        <div className="modal-buttons">
          {step === 1 && type !== 'password' ? (
            <button
              className="next-button"
              onClick={
                type === 'email'
                  ? handleEmailChange
                  : type === 'phone'
                    ? handlePhoneChange
                    : handlePasswordChange
              }
              disabled={
                type === 'email'
                  ? !isEmailValid
                  : type === 'phone'
                    ? !isPhoneValid
                    : !(isNewPasswordValid && isNewPasswordConfirmed)
              }
            >
              Next
            </button>
          ) : (
            <button
              className="next-button"
              onClick={
                type === 'password'
                  ? handlePasswordChange
                  : type === 'email'
                    ? handleEmailChange
                    : handlePhoneChange
              }
              disabled={
                type === 'password'
                  ? !isPasswordValid || !newPassword
                  : !isPasswordValid
              }
            >
              Change
            </button>
          )}
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeModal;
