// React
import { Fragment, useRef } from 'react';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { updateThumbnails } from '@store/features/admin/game/gameAdminSlice';

// Components
import FormButtons from '../FormButtons';

// Form Validation
import { validateThumbnails } from '../validations';

// Utils
import { saveFileToLocalStorage } from '@utils/filesStorageUtils';
import getFileUrl from '@utils/getFileUrl';

// Types
import type { Thumbnails } from '@custom-types/game-admin';
import type { ChangeEvent } from 'react';

export default function Thumbnails() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //--------------------------- State Selectors ---------------------------//
  const { thumbnails } = useAppSelector((state) => state.admin.game);

  //------------------------ Refs for File Inputs -------------------------//
  const fileInputRefs = useRef<{ [key in keyof Thumbnails]?: HTMLInputElement }>({});

  //---------------------- Refs for Image Containers-----------------------//
  const mainImageRef = useRef<HTMLDivElement>(null);
  const backgroundImageRef = useRef<HTMLDivElement>(null);
  const menuImageRef = useRef<HTMLDivElement>(null);
  const horizontalHeaderImageRef = useRef<HTMLDivElement>(null);
  const verticalHeaderImageRef = useRef<HTMLDivElement>(null);
  const smallHeaderImageRef = useRef<HTMLDivElement>(null);
  const searchImageRef = useRef<HTMLDivElement>(null);
  const tabImageRef = useRef<HTMLDivElement>(null);

  //-------------------------- Utility Functions --------------------------//
  const getThumbnailDimensions = (key: keyof Thumbnails): string => {
    const dimensions: { [key in keyof Thumbnails]: string } = {
      backgroundImage: '1438 x 810',
      mainImage: '616 x 353',
      menuImg: '231 x 87',
      horizontalHeaderImage: '460 x 215',
      verticalHeaderImage: '374 x 448',
      smallHeaderImage: '292 x 136',
      searchImage: '120 x 45',
      tabImage: '184 x 69',
    };
    return dimensions[key];
  };

  //--------------------------- Event Handlers ----------------------------//
  const handleThumbnailChange = async (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof Thumbnails
  ): Promise<void> => {
    const file = e.target.files?.[0];

    if (file) {
      const fileId = await saveFileToLocalStorage(file);
      const fileMetadata = { id: fileId, name: file.name, size: file.size, type: file.type };
      if (
        thumbnails[key].file &&
        thumbnails[key].file instanceof File &&
        (thumbnails[key].file.size !== file.size || thumbnails[key].file.type !== file.type)
      ) {
        dispatch(updateThumbnails({ key, file: fileMetadata, changed: true }));
      } else {
        dispatch(updateThumbnails({ key, file: fileMetadata, changed: false }));
      }
    }
  };

  const triggerFileInput = (key: keyof Thumbnails): void => {
    fileInputRefs.current[key]?.click();
  };

  //-------------------------- Render UI Section --------------------------//
  return (
    <>
      <section className="section-thumbnails">
        <h2>Thumbnails</h2>
        <div>
          {Object.entries(thumbnails).map(([key, { file }], idx) => {
            const ref = {
              backgroundImage: backgroundImageRef,
              mainImage: mainImageRef,
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
                        <span>({getThumbnailDimensions(key as keyof Thumbnails)})</span>
                      </label>
                      <p>*Required</p>
                    </div>

                    <input
                      type="file"
                      accept=".jpg"
                      className="field-input"
                      ref={(el) => {
                        fileInputRefs.current[key as keyof Thumbnails] = el ?? undefined;
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

                  {file && <img src={getFileUrl(file)} alt={key} className="thumbnail-image" />}
                </div>
                {idx < Object.keys(thumbnails).length - 1 && <hr />}
              </Fragment>
            );
          })}
        </div>
      </section>
      <br />
      <FormButtons
        validation={() =>
          validateThumbnails(thumbnails, {
            mainImageRef,
            backgroundImageRef,
            menuImageRef,
            horizontalHeaderImageRef,
            verticalHeaderImageRef,
            smallHeaderImageRef,
            searchImageRef,
            tabImageRef,
          })
        }
      />
    </>
  );
}
