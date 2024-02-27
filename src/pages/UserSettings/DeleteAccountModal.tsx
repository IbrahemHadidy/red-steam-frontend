import { FC, useState } from 'react';
import { deleteAccount } from 'services/userSettings';

const DeleteAccountModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isPasswordValid = password.length >= 8;

  const handleDelete = async () => {
    await deleteAccount(password, onClose, setErrorMessage);
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
          onChange={e => setPassword(e.target.value)}
        />
        <div className="error-message">{errorMessage}</div>
        <div className="modal-buttons">
          <button
            className="delete-button"
            onClick={handleDelete}
            disabled={!isPasswordValid}
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
