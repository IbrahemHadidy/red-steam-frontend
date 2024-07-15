'use client';

// React
import { useContext, useRef, useState } from 'react';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Services
import { deleteAccount } from 'services/user/management';

// Types
import type { ChangeEvent, FC } from 'react';
import type { DeleteAccountModalProps } from './User.types';

const DeleteAccountModal: FC<DeleteAccountModalProps> = ({ onClose }) => {
  // Contexts
  const { userData, logout } = useContext(AuthContext);

  // States
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Refs
  const deleteBtnRef = useRef<HTMLButtonElement>(null);

  // Validations
  const isPasswordValid = password.length >= 8;

  const handleDelete = async () => {
    deleteBtnRef.current?.setAttribute('disabled', 'true');
    if (userData?.id) {
      const response = await deleteAccount(password, setErrorMessage);

      if (response && response.status === 204) {
        onClose();
        logout();
      }
    } else {
      setErrorMessage('Something went wrong. Please try again.');
    }
    deleteBtnRef.current?.removeAttribute('disabled');
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="delete-modal">
      <div className="modal-content">
        <h2>Are you sure you want to delete your account?</h2>
        <p>This action cannot be undone.</p>
        <input
          className="password-input"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
        />
        <div className="error-message">{errorMessage}</div>
        <div className="modal-buttons">
          <button
            className="delete-button"
            onClick={handleDelete}
            disabled={!isPasswordValid}
            ref={deleteBtnRef}
          >
            Delete
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
