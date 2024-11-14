// React
import { useRef } from 'react';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  toggleFeatured,
  updateCategory,
  updateDescription,
  updateName,
  updateReleaseDate,
} from '@store/features/admin/game/gameAdminSlice';

// Components
import FormButtons from '../FormButtons';

// Form Validation
import { validateBasicInfo } from '../validations';

// Types
import type { ChangeEvent } from 'react';

export default function BasicInfo() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { name, category, description, releaseDate, featured } = useAppSelector(
    (state) => state.admin.game
  );

  //--------------------------- Refs for Inputs ---------------------------//
  const nameRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const releaseDateRef = useRef<HTMLInputElement>(null);

  //---------------------------- Event Handlers ----------------------------//
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    dispatch(updateName(value));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    dispatch(updateCategory(value));
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    dispatch(updateDescription(value));
  };

  const handleReleaseDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const dateValue: Date = new Date(e.target.value);
    if (!isNaN(dateValue.getTime())) {
      dispatch(updateReleaseDate(dateValue.toISOString()));
    }
  };

  const handleFeaturedChange = (): void => {
    dispatch(toggleFeatured());
  };

  //-------------------------- Render UI Section --------------------------//
  return (
    <>
      <section>
        <h2>Basic Information</h2>

        <div className="form-field">
          <div className="form-row">
            <label className="field-label">Game Name</label>
            <p>*Required</p>
          </div>
          <input
            type="text"
            className="field-input"
            value={name}
            onChange={handleNameChange}
            ref={nameRef}
          />
        </div>

        <div className="form-field">
          <div className="form-row">
            <label className="field-label">Category</label>
            <p>*Required</p>
          </div>
          <input
            type="text"
            className="field-input"
            value={category}
            onChange={handleCategoryChange}
            ref={categoryRef}
          />
        </div>

        <div className="form-field">
          <div className="form-row">
            <label className="field-label">Description</label>
            <p>*Required</p>
          </div>
          <textarea
            className="field-input"
            value={description}
            onChange={handleDescriptionChange}
            ref={descriptionRef}
          />
        </div>

        <div className="form-field">
          <div className="form-row">
            <label className="field-label">Release Date</label>
            <p>*Required</p>
          </div>
          <input
            type="date"
            className="field-input"
            value={releaseDate.split('T')[0]}
            style={{ colorScheme: 'dark' }}
            onChange={handleReleaseDateChange}
            ref={releaseDateRef}
          />
        </div>

        <div className="form-field form-field-checkbox">
          <label className="field-label-checkbox">Featured:</label>
          <input
            type="checkbox"
            className="field-checkbox"
            checked={featured}
            onChange={handleFeaturedChange}
          />
        </div>
      </section>

      <br />
      <FormButtons
        validation={() =>
          validateBasicInfo(
            { name, category, description, releaseDate },
            { nameRef, categoryRef, descriptionRef, releaseDateRef }
          )
        }
      />
    </>
  );
}
