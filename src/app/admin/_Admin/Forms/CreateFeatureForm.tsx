// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { setIcon, setName } from '@store/features/admin/adminSlice';

// Utils
import getBase64FromFile from '@utils/getBase64FromFile';

// Types
import type { ChangeEvent, RefObject } from 'react';

interface CreateFeatureFormProps {
  nameRef: RefObject<HTMLInputElement | null>;
  iconRef: RefObject<HTMLInputElement | null>;
}

export default function CreateFeatureForm({ nameRef, iconRef }: CreateFeatureFormProps) {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { name } = useAppSelector((state) => state.admin.common);

  //--------------------------- Event Handlers ----------------------------//
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setName(e.target.value));
  };

  const handleIconChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (file) {
      const base64String = await getBase64FromFile(file);
      dispatch(setIcon(base64String));
    } else {
      dispatch(setIcon(''));
    }
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
        <label className="form-label">Feature Icon</label>
        <input
          type="file"
          className="form-input"
          accept="image/*"
          onClick={(e) => ((e.target as HTMLInputElement).value = '')}
          onChange={handleIconChange}
          placeholder="Feature Icon"
          ref={iconRef}
        />
      </div>
    </>
  );
}
