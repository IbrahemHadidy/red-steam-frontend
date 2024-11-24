// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { setCurrentEditUser, setIsEditModalOpen } from '@store/features/admin/user/userAdminSlice';

// Redux Thunks
import { updateUser } from '@store/features/admin/user/userAdminThunks';

// Types
import type { ChangeEvent, FormEvent } from 'react';

export default function EditModal() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //--------------------------- State Selectors ---------------------------//
  const { currentEditUser, isFetching } = useAppSelector((state) => state.admin.user);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await dispatch(updateUser());
  };

  const handleVerifiedChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (currentEditUser)
      dispatch(setCurrentEditUser({ ...currentEditUser, isVerified: e.target.checked }));
  };

  const handleAdminChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (currentEditUser)
      dispatch(setCurrentEditUser({ ...currentEditUser, isAdmin: e.target.checked }));
  };

  const closeModal = (): void => {
    dispatch(setIsEditModalOpen(false));
  };

  //---------------------------- Render -----------------------------------//
  return (
    <>
      <div className="modal-overlay" onClick={closeModal} />

      <div className="edit-modal">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={currentEditUser?.username}
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input id="email" name="email" type="text" value={currentEditUser?.email} disabled />
          </div>

          <div className="form-group checkbox">
            <label htmlFor="username">Verified:</label>
            <input
              id="verified"
              name="verified"
              type="checkbox"
              checked={currentEditUser?.isVerified}
              onChange={handleVerifiedChange}
            />
          </div>

          <div className="form-group checkbox">
            <label htmlFor="username">Admin:</label>
            <input
              id="admin"
              name="admin"
              type="checkbox"
              checked={currentEditUser?.isAdmin}
              onChange={handleAdminChange}
            />
          </div>

          <button type="submit" disabled={isFetching}>
            Save
          </button>
        </form>
      </div>
    </>
  );
}
