import { ChangeEvent, Dispatch, FC, Fragment, JSX, RefObject, SetStateAction, useRef } from 'react';
import type { Thumbnails } from '../create.types';

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
  const fileInputRefs = useRef<{ [key in keyof Thumbnails]?: HTMLInputElement }>({});

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>, key: keyof Thumbnails): void => {
    if (e.target.files?.length) {
      const file: File = e.target.files[0];
      const reader: FileReader = new FileReader();
      reader.onloadend = () => {
        setThumbnails((prev) => ({ ...prev, [key]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = (key: keyof Thumbnails): void => {
    fileInputRefs.current[key]?.click();
  };

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
        {Object.entries(thumbnails).map(([key, src], idx) => {
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
                    accept="image/png, image/jpeg, image/jpg, image/webp"
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
                    {src ? 'Change Image' : 'Add Image'}
                  </button>
                </div>
                {src && <img src={src} alt={key} className="thumbnail-image" />}
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
