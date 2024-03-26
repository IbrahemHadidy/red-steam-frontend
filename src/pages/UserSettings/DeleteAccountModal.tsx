import { FC, useContext, useState } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { deleteAccount } from 'services/user/auth';
import $ from 'tools/$selector';

const DeleteAccountModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { userData, logout } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isPasswordValid = password.length >= 8;

  const handleDelete = async () => {
    $('.delete-button')?.setAttribute('disabled', 'true');
    if (userData?._id) {
      const response = await deleteAccount(
        userData?._id,
        password,
        setErrorMessage,
      );

      if (response && response.status === 200) {
        onClose();
        logout();
      }
      
    } else {
      setErrorMessage('Something went wrong. Please try again.');
    }
    $('.delete-button')?.removeAttribute('disabled');
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
