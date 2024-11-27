// React
import { useRef } from 'react';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  addScreenshot,
  addVideo,
  resetMedia,
  setPosterModalOpen,
  updateCachedVideoFile,
} from '@store/features/admin/game/gameAdminSlice';

// Components
import FormButtons from '../../FormButtons';
import MediaScreenshot from './MediaScreenshot';
import MediaVideo from './MediaVideo';

// Form Validation
import { validateMedia } from '../../validations';

// Utils
import { saveFileToIndexedDB } from '@utils/filesStorageUtils';

// Types
import type { Screenshot, Video } from '@custom-types/game-admin';
import type { ChangeEvent } from 'react';

export default function Media() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const {
    type,
    videos,
    screenshots,
    cachedVideoFile,
    duplicateOrders,
    duplicateError,
    posterModalOpen,
  } = useAppSelector((state) => state.admin.game);

  //------------------------ Refs for File Inputs -------------------------//
  const screenshotInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const posterInputRef = useRef<HTMLInputElement>(null);

  //-------------------------- Utility Functions --------------------------//
  const getChangeStyle = (media: Screenshot | Video): string => {
    if (type === 'update') {
      if (media.change === 'added') return 'added';
      if (media.change === 'deleted') return 'deleted';
      if (media.order !== media.baseOrder && media.change === 'unchanged') return 'edited';
    }
    return '';
  };

  const sortedMedia = [...screenshots, ...videos].sort((a, b) => {
    if (a.change === 'deleted') return 1;
    if (b.change === 'deleted') return -1;
    return a.order - b.order;
  });

  //--------------------------- Event Handlers ----------------------------//
  const handleAddScreenshotClick = (): void => {
    screenshotInputRef.current?.click();
  };

  const handleAddVideoClick = (): void => {
    videoInputRef.current?.click();
  };

  const handleAddPosterClick = (): void => {
    posterInputRef.current?.click();
  };

  const handleAddScreenshot = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (file) {
      const fileId = await saveFileToIndexedDB(file);
      const fileReference = { id: fileId, name: file.name, size: file.size, type: file.type };
      dispatch(addScreenshot(fileReference));
    }
  };

  const handleAddVideo = async (video: File, poster: File): Promise<void> => {
    if (video && poster) {
      const videoId = await saveFileToIndexedDB(video);
      const posterId = await saveFileToIndexedDB(poster);
      dispatch(
        addVideo({
          video: { id: videoId, name: video.name, size: video.size, type: video.type },
          poster: { id: posterId, name: poster.name, size: poster.size, type: poster.type },
        })
      );
    }
  };

  const handleVideoInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch(updateCachedVideoFile(file));
      dispatch(setPosterModalOpen(true));
    }
  };

  const handlePosterInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const posterFile = e.target.files?.[0];
    if (posterFile && cachedVideoFile) handleAddVideo(cachedVideoFile, posterFile);
  };

  const handlePosterModalClose = (): void => {
    dispatch(setPosterModalOpen(false));
    handleAddPosterClick();
  };

  const handleResetMedia = (): void => {
    dispatch(resetMedia());
  };

  //------------------------------- Render --------------------------------//
  return (
    <>
      <section className="section-media">
        <h2>Media</h2>
        <button className="add-button" onClick={handleAddScreenshotClick}>
          Add Screenshot
        </button>
        <input
          type="file"
          accept="image/jpeg"
          ref={screenshotInputRef}
          onClick={(e) => ((e.target as HTMLInputElement).value = '//:0')}
          onChange={handleAddScreenshot}
          hidden
        />
        <button className="add-button" onClick={handleAddVideoClick}>
          Add Video
        </button>
        <input
          type="file"
          accept=".webm"
          ref={videoInputRef}
          onClick={(e) => ((e.target as HTMLInputElement).value = '//:0')}
          onChange={handleVideoInputChange}
          hidden
        />
        <input
          type="file"
          accept=".jpg"
          ref={posterInputRef}
          onClick={(e) => ((e.target as HTMLInputElement).value = '//:0')}
          onChange={handlePosterInputChange}
          hidden
        />
        <button className="reset-button" onClick={handleResetMedia}>
          Reset
        </button>
        {type === 'update' && (
          <div className="slides-color-info">
            <div>
              <div className="color-box unchanged" />
              <span>Unchanged</span>
            </div>
            <div>
              <div className="color-box added" />
              <span>Added</span>
            </div>
            <div>
              <div className="color-box edited" />
              <span>Edited</span>
            </div>
            <div>
              <div className="color-box deleted" />
              <span>Deleted</span>
            </div>
            <div>
              <div className="color-box duplicate" />
              <span>Duplicate order</span>
            </div>
          </div>
        )}
        <div className="media-container">
          {sortedMedia.map((item) => (
            <div
              key={item.id}
              className={`media-item ${getChangeStyle(item)} ${
                duplicateOrders.includes(item.order) ? 'duplicate' : ''
              }`}
            >
              {'image' in item ? <MediaScreenshot item={item} /> : <MediaVideo item={item} />}
            </div>
          ))}
        </div>
      </section>
      <br />
      <FormButtons validation={() => validateMedia(screenshots, duplicateError)} />
      {posterModalOpen && (
        <>
          <div className="modal-overlay" onClick={handlePosterModalClose} />
          <div className="poster-modal">
            <h4>Now, please select a poster image</h4>
            <button onClick={handlePosterModalClose}>Okay</button>
          </div>
        </>
      )}
    </>
  );
}
