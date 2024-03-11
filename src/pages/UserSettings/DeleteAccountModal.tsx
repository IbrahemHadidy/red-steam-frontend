import { FC, useContext, useState } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { deleteAccount } from 'services/user/auth';

const DeleteAccountModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { userData } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isPasswordValid = password.length >= 8;

  const handleDelete = async () => {
    if (userData?.userId) {
      await deleteAccount(userData?.userId, password, onClose, setErrorMessage);
    } else {
      setErrorMessage('Something went wrong. Please try again.');
    }
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
