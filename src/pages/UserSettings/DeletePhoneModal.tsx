import { FC } from 'react';
import { deletePhone } from 'services/userSettings';

const DeletePhoneModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const handleDelete = async () => {
    await deletePhone(onClose);
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
