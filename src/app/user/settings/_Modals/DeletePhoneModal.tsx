'use client';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { setDeletePhoneModalVisiblity } from '@store/features/user/settings/userSettingsSlice';

// Redux Thunks
import { deletePhone } from '@store/features/user/settings/userSettingsThunks';

export default function DeletePhoneModal() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { isDeletePhoneModalVisible } = useAppSelector((state) => state.user.settings);

  //---------------------------- Event Handlers ---------------------------//
  const closeDeleteModal = (): void => {
    dispatch(setDeletePhoneModalVisiblity(false));
    document.body.style.overflow = 'unset';
  };

  const handleDeleteClick = async (): Promise<void> => {
    await dispatch(deletePhone());
  };

  //-------------------------- Render UI Section --------------------------//
  return (
    <div className="delete-modal">
      <div className="modal-content">
        <h2>Are you sure you want to delete your phone number?</h2>

        <div className="modal-buttons">
          <button
            className="delete-button"
            onClick={handleDeleteClick}
            disabled={isDeletePhoneModalVisible}
          >
            Delete
          </button>

          <button className="cancel-button" onClick={closeDeleteModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
