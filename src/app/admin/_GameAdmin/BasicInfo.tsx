// Types
import type { ChangeEvent, Dispatch, FC, JSX, RefObject, SetStateAction } from 'react';
interface BasicInfoProps {
  name: string;
  category: string;
  description: string;
  releaseDate: Date;
  featured: boolean;
  setName: Dispatch<SetStateAction<string>>;
  setCategory: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setReleaseDate: Dispatch<SetStateAction<Date>>;
  setFeatured: Dispatch<SetStateAction<boolean>>;
  nameRef: RefObject<HTMLInputElement>;
  categoryRef: RefObject<HTMLInputElement>;
  descriptionRef: RefObject<HTMLTextAreaElement>;
  releaseDateRef: RefObject<HTMLInputElement>;
}

const BasicInfo: FC<BasicInfoProps> = ({
  name,
  category,
  description,
  releaseDate,
  featured,
  setName,
  setCategory,
  setDescription,
  setReleaseDate,
  setFeatured,
  nameRef,
  categoryRef,
  descriptionRef,
  releaseDateRef,
}): JSX.Element => {
  // Event Handlers
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value.trim());
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCategory(e.target.value.trim());
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(e.target.value.trim());
  };

  const handleReleaseDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const dateValue: Date = new Date(e.target.value);
    if (!isNaN(dateValue.getTime())) {
      setReleaseDate(dateValue);
    }
  };

  const handleFeaturedChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFeatured(e.target.checked);
  };

  return (
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
          value={releaseDate.toISOString().split('T')[0]}
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
  );
};

export default BasicInfo;
