// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { setName, setWebsite } from '@store/features/admin/adminSlice';

// Types
import type { ChangeEvent, RefObject } from 'react';

interface CreateCompanyFormProps {
  nameRef: RefObject<HTMLInputElement | null>;
  websiteRef: RefObject<HTMLInputElement | null>;
}

export default function CreateCompanyForm({ nameRef, websiteRef }: CreateCompanyFormProps) {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { name, website } = useAppSelector((state) => state.admin.common);

  //--------------------------- Event Handlers ----------------------------//
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setName(e.target.value));
  };

  const handleWebsiteChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setWebsite(e.target.value));
  };

  //------------------------------- Render --------------------------------//
  return (
    <>
      <div className="form-area">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-input"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
          ref={nameRef}
        />
      </div>
      <div className="form-area">
        <label className="form-label">Website</label>
        <input
          type="text"
          className="form-input"
          value={website}
          onChange={handleWebsiteChange}
          placeholder="Website"
          ref={websiteRef}
        />
      </div>
    </>
  );
}
