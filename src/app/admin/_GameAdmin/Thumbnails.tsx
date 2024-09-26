// React
import { Fragment, useRef } from 'react';

// Types
import type { ChangeEvent, Dispatch, FC, JSX, RefObject, SetStateAction } from 'react';
import type { Thumbnails } from './game-admin.types';
interface ThumbnailsProps {
  thumbnails: Thumbnails;
  setThumbnails: Dispatch<SetStateAction<Thumbnails>>;
  mainImageRef: RefObject<HTMLDivElement>;
  backgroundImageRef: RefObject<HTMLDivElement>;
  menuImageRef: RefObject<HTMLDivElement>;
  horizontalHeaderImageRef: RefObject<HTMLDivElement>;
  verticalHeaderImageRef: RefObject<HTMLDivElement>;
  smallHeaderImageRef: RefObject<HTMLDivElement>;
  searchImageRef: RefObject<HTMLDivElement>;
  tabImageRef: RefObject<HTMLDivElement>;
}

const Thumbnails: FC<ThumbnailsProps> = ({
  thumbnails,
  setThumbnails,
  mainImageRef,
  backgroundImageRef,
  menuImageRef,
  horizontalHeaderImageRef,
  verticalHeaderImageRef,
  smallHeaderImageRef,
  searchImageRef,
  tabImageRef,
}): JSX.Element => {
  // Refs
  const fileInputRefs = useRef<{ [key in keyof Thumbnails]?: HTMLInputElement }>({});

  // Event handlers
  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>, key: keyof Thumbnails): void => {
    if (e.target.files?.length) {
      const file: File = e.target.files[0];
      if (
        thumbnails[key].file &&
        thumbnails[key].file instanceof File &&
        (thumbnails[key].file.size !== file.size || thumbnails[key].file.type !== file.type)
      ) {
        setThumbnails((prev) => ({ ...prev, [key]: { file, changed: true } }));
      } else {
        setThumbnails((prev) => ({ ...prev, [key]: { file, changed: false } }));
      }
    }
  };

  const triggerFileInput = (key: keyof Thumbnails): void => {
    fileInputRefs.current[key]?.click();
  };

  // Utils
  const getDimensions = (key: keyof Thumbnails): string => {
    const dimensions: { [key in keyof Thumbnails]: string } = {
      mainImage: '616 x 353',
      backgroundImage: '1438 x 810',
      menuImg: '231 x 87',
      horizontalHeaderImage: '460 x 215',
      verticalHeaderImage: '374 x 448',
      smallHeaderImage: '292 x 136',
      searchImage: '120 x 45',
      tabImage: '184 x 69',
    };
    return dimensions[key];
  };

  return (
    <section className="section-thumbnails">
      <h2>Thumbnails</h2>
      <div>
        {Object.entries(thumbnails).map(([key, { file }], idx) => {
          const ref = {
            mainImage: mainImageRef,
            backgroundImage: backgroundImageRef,
            menuImg: menuImageRef,
            horizontalHeaderImage: horizontalHeaderImageRef,
            verticalHeaderImage: verticalHeaderImageRef,
            smallHeaderImage: smallHeaderImageRef,
            searchImage: searchImageRef,
            tabImage: tabImageRef,
          };

          const imageUrl =
            file instanceof File
              ? URL.createObjectURL(file)
              : typeof file === 'string'
                ? file
                : undefined;

          return (
            <Fragment key={idx}>
              <div className="form-field" ref={ref[key as keyof Thumbnails]}>
                <div className="btn-container">
                  <div className="form-row">
                    <label className="field-label">
                      {`${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} `}
                      <span>({getDimensions(key as keyof Thumbnails)})</span>
                    </label>
                    <p>*Required</p>
                  </div>
                  <input
                    type="file"
                    accept="image/jpeg"
                    className="field-input"
                    ref={(el) => {
                      el && (fileInputRefs.current[key as keyof Thumbnails] = el);
                    }}
                    onChange={(e) => handleThumbnailChange(e, key as keyof Thumbnails)}
                    hidden
                  />
                  <button
                    type="button"
                    className="upload-button"
                    onClick={() => triggerFileInput(key as keyof Thumbnails)}
                  >
                    {file ? 'Change Image' : 'Add Image'}
                  </button>
                </div>
                {file && <img src={imageUrl} alt={key} className="thumbnail-image" />}
              </div>
              {idx < Object.keys(thumbnails).length - 1 && <hr />}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default Thumbnails;
