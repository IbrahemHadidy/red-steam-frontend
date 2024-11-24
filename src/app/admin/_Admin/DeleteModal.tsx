// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { setIsDeleteModalOpen } from '@store/features/admin/adminSlice';

// Redux Thunks
import { deleteItem } from '@store/features/admin/adminThunks';

export default function DeleteModal() {
  //--------------------------- Initializations --------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States -------------------------------//
  const { adminType } = useAppSelector((state) => state.admin.common);

  //--------------------------- Event Handlers ----------------------------//
  const handleDeleteClick = async (): Promise<void> => {
    await dispatch(deleteItem());
  };

  const closeModal = (): void => {
    dispatch(setIsDeleteModalOpen(false));
  };

  //------------------------------- Render --------------------------------//
  return (
    <>
      <div className="modal-overlay" onClick={closeModal} />
      <div className="delete-modal">
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete this {adminType}? This action will permanently remove it
          from all games that use it.
        </p>

        <div className="modal-actions">
          <button onClick={handleDeleteClick}>Confirm</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </>
  );
}
