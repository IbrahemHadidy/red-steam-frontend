// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Handlers
import { setIsDeleteModalOpen } from '@store/features/admin/user/userAdminSlice';

// Redux Thunks
import { deleteUser } from '@store/features/admin/user/userAdminThunks';

export default function DeleteModal() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //--------------------------- Event Handlers ----------------------------//
  const deleteItem = async (): Promise<void> => {
    await dispatch(deleteUser());
  };

  const closeModal = (): void => {
    dispatch(setIsDeleteModalOpen(false));
  };

  //---------------------------- Render -----------------------------------//
  return (
    <>
      <div className="modal-overlay" onClick={closeModal} />
      <div className="delete-modal">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to permanently delete this user?</p>
        <div className="modal-actions">
          <button onClick={deleteItem}>Confirm</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </>
  );
}
