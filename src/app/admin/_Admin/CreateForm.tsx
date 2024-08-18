// React
import { useRef } from 'react';

// Toast notifications
import { toast } from 'react-toastify';

// Types
import type { FC, FormEvent, JSX, RefObject } from 'react';
import type { CreateProps } from './admin.types';

const Create: FC<CreateProps> = ({
  type,
  name,
  setName,
  website,
  setWebsite,
  handleIconChange,
  icon,
  onSubmit,
}): JSX.Element => {
  // Refs
  const nameRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const iconRef = useRef<HTMLInputElement>(null);

  // Utils
  const errorStyle: string = 'border: 1px solid rgb(255, 82, 82);';
  const checkFormValidation = (): boolean => {
    if (type === 'developer' || type === 'publisher') {
      if (name === '' && nameRef.current) {
        nameRef.current.style.cssText += errorStyle;
      }
      if (website === '' && websiteRef.current) {
        websiteRef.current.style.cssText += errorStyle;
      }
      if (name === '' || website === '') {
        toast.error('Please fill in all required fields');
        return false;
      }
    } else if (type === 'feature') {
      if (name === '' && nameRef.current) {
        nameRef.current.style.cssText += errorStyle;
      }
      if (icon === '' && iconRef.current) {
        iconRef.current.style.cssText += errorStyle;
      }
      if (name === '' || icon === '') {
        toast.error('Please fill in all required fields');
        return false;
      }
    } else {
      if (name === '' && nameRef.current) {
        nameRef.current.style.cssText += errorStyle;
        toast.error('Please fill in all required fields');
        return false;
      }
    }

    return true;
  };

  const resetAllWarnings = (): void => {
    const removeErrorStyle = (refs: RefObject<HTMLInputElement>[]) => {
      refs.forEach((ref) => {
        if (ref.current) {
          ref.current.style.cssText = ref.current.style.cssText.replace(errorStyle, '');
        }
      });
    };

    removeErrorStyle([nameRef, websiteRef, iconRef]);
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (checkFormValidation()) {
      resetAllWarnings();
      onSubmit(e);
    }
  };

  return (
    <>
      <div className="creation-form">
        <h1 className="creation-form-title">Create {type}</h1>
        <section className="creation-section">
          <div className="form-row-flex">
            <div className="form-area">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                ref={nameRef}
              />
            </div>
            {type === ('developer' || 'publisher') && setWebsite && (
              <div className="form-area">
                <label className="form-label">Website</label>
                <input
                  type="text"
                  className="form-input"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Website"
                  ref={websiteRef}
                />
              </div>
            )}
            {type === 'feature' && handleIconChange && (
              <div className="form-area">
                <label className="form-label">Feature Icon</label>
                <input
                  type="file"
                  className="form-input"
                  accept="image/*"
                  onChange={handleIconChange}
                  placeholder="Feature Icon"
                  ref={iconRef}
                />
              </div>
            )}
          </div>
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </section>
      </div>
    </>
  );
};

export default Create;
