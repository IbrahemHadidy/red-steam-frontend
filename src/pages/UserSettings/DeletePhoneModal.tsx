import { AuthContext } from 'contexts/AuthContext';
import { FC, useContext } from 'react';
import { removePhoneNumber } from 'services/user/phone';

const DeletePhoneModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { userData } = useContext(AuthContext);
  const handleDelete = async () => {
    userData && await removePhoneNumber(userData._id, onClose);
  };

  return (
    <div className="delete-modal">
      <div className="modal-content">
        <h2>Are you sure you want to delete your phone number?</h2>
        <div className="modal-buttons">
          <button
            className="delete-button"
            onClick={handleDelete}
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

export default DeletePhoneModal;
