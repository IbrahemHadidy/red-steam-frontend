'use client';

// React
import { useContext, useRef } from 'react';

// Contexts
import { AuthContext } from '@contexts/AuthContext';

// Services
import { removePhoneNumber } from '@services/user/phone';

// Types
import type { FC, JSX } from 'react';
import type { DeletePhoneModalProps } from './Modals.types';

const DeletePhoneModal: FC<DeletePhoneModalProps> = ({ onClose }): JSX.Element => {
  // Contexts
  const { userData, fetchData } = useContext(AuthContext);

  // Refs
  const deleteBtnRef = useRef<HTMLButtonElement>(null);

  const handleDelete = async (): Promise<void> => {
    deleteBtnRef.current?.setAttribute('disabled', 'true');
    if (userData) {
      const response = await removePhoneNumber(userData.id);
      if (response && response.status === 200) {
        onClose();
        fetchData();
      }
    }
    deleteBtnRef.current?.removeAttribute('disabled');
  };

  return (
    <div className="delete-modal">
      <div className="modal-content">
        <h2>Are you sure you want to delete your phone number?</h2>
        <div className="modal-buttons">
          <button className="delete-button" onClick={handleDelete} ref={deleteBtnRef}>
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
