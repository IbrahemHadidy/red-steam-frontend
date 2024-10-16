'use client';

// React
import { useRef } from 'react';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Thunks
import { fetchUserData } from '@store/features/auth/authThunks';

// Services
import { removePhoneNumber } from '@services/user/phone';

// Types
import type { JSX } from 'react';
import type { DeletePhoneModalProps } from './Modals.types';

export default function DeletePhoneModal({ onClose }: DeletePhoneModalProps): JSX.Element {
  // Init
  const dispatch = useAppDispatch();

  // States
  const { currentUserData } = useAppSelector((state) => state.auth);

  // Refs
  const deleteBtnRef = useRef<HTMLButtonElement>(null);

  const handleDelete = async (): Promise<void> => {
    deleteBtnRef.current?.setAttribute('disabled', 'true');
    if (currentUserData) {
      const response = await removePhoneNumber(currentUserData.id);
      if (response && response.status === 200) {
        onClose();
        await dispatch(fetchUserData());
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
}
