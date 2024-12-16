// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { setName } from '@store/features/admin/adminSlice';

// Types
import type { ChangeEvent, RefObject } from 'react';

interface CreateLanguageFormProps {
  nameRef: RefObject<HTMLInputElement | null>;
}

export default function CreateLanguageForm({ nameRef }: CreateLanguageFormProps) {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { name, isEditModalOpen } = useAppSelector((state) => state.admin.common);

  //--------------------------- Event Handlers ----------------------------//
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setName(e.target.value));
  };

  //------------------------------- Render --------------------------------//
  return (
    <div className="form-area">
      <label className="form-label">Name</label>
      <input
        type="text"
        className="form-input"
        value={isEditModalOpen ? '' : name}
        onChange={handleNameChange}
        placeholder="Name"
        ref={nameRef}
      />
    </div>
  );
}
