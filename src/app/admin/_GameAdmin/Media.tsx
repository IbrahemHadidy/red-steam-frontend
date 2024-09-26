// React
import { useCallback, useEffect, useRef, useState } from 'react';

// Toast notifications
import { toast } from 'react-toastify';

// Types
import type { Game } from '@entities/game.entity';
import type { ChangeEvent, Dispatch, FC, JSX, RefObject, SetStateAction } from 'react';
import type { Screenshot, Video } from './game-admin.types';
interface MediaProps {
  type: 'create' | 'update';
  game?: Game | null;
  screenshots: Screenshot[];
  setScreenshots: Dispatch<SetStateAction<Screenshot[]>>;
  videos: Video[];
  setVideos: Dispatch<SetStateAction<Video[]>>;
  mediaRef: RefObject<HTMLDivElement>;
  setHasDuplicateError: Dispatch<SetStateAction<boolean>>;
}

const Media: FC<MediaProps> = ({
  type,
  game,
  screenshots,
  setScreenshots,
  videos,
  setVideos,
  mediaRef,
  setHasDuplicateError,
}): JSX.Element => {
  // States
  const [changes, setChanges] = useState<(Screenshot | Video)[]>([]);
  const [duplicateOrders, setDuplicateOrders] = useState<Set<number>>(new Set());
  const [selectPosterModalOpen, setSelectPosterModalOpen] = useState<boolean>(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  // Refs
  const screenshotInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const posterInputRef = useRef<HTMLInputElement>(null);

  // Helpers
  const media: (Screenshot | Video)[] = [...screenshots, ...videos];

  const getId = (entry: Screenshot | Video): number => Number(entry.id.split(':')[0]);

  const getNextOrder = (): number => {
    const allItems = [...screenshots, ...videos];
    return allItems.length > 0 ? Math.max(...allItems.map((item) => item.order)) + 1 : 1;
  };

  const resetMedia = (): void => {
    if (type === 'create') {
      setScreenshots([]);
      setVideos([]);
    } else if (type === 'update') {
      setScreenshots(
        (game &&
          game.imageEntries.map((image) => ({
            id: `${image.order}:${Date.now()}`,
            image: image.link,
            featured: image.featured,
            order: image.order,
            change: 'unchanged',
          }))) ||
          []
      );
      setVideos(
        (game &&
          game.videoEntries.map((video) => ({
            id: `${video.order}:${Date.now()}`,
            video: video.link,
            poster: video.posterLink,
            order: video.order,
            change: 'unchanged',
          }))) ||
          []
      );
    }
  };

  const findDuplicateOrders = useCallback((items: (Screenshot | Video)[]): Set<number> => {
    const orders: number[] = items.map((item) => item.order);
    const duplicateOrders: number[] = orders.filter((order, idx) => orders.indexOf(order) !== idx);
    return new Set(duplicateOrders);
  }, []);

  const checkDuplicateEntries = (
    file: File | string,
    item: 'screenshot' | 'video' | 'poster'
  ): boolean => {
    if (file instanceof File) {
      if (item === 'screenshot') {
        return screenshots.some(
          (screenshot) =>
            screenshot.image instanceof File &&
            screenshot.image.name === file.name &&
            screenshot.image.size === file.size &&
            screenshot.image.type === file.type
        );
      } else if (item === 'video') {
        return videos.some(
          (video) =>
            video.video instanceof File &&
            video.video.name === file.name &&
            video.video.size === file.size &&
            video.video.type === file.type
        );
      } else if (item === 'poster') {
        return videos.some(
          (video) =>
            video.poster instanceof File &&
            video.poster.name === file.name &&
            video.poster.size === file.size &&
            video.poster.type === file.type
        );
      }
    }
    return false;
  };

  useEffect(() => {
    const allItems: (Screenshot | Video)[] = [...screenshots, ...videos];
    const duplicates: Set<number> = findDuplicateOrders(allItems);
    setDuplicateOrders(duplicates);
    setHasDuplicateError(duplicates.size > 0);
  }, [screenshots, videos, findDuplicateOrders, setHasDuplicateError]);

  // Event Handlers
  const handleAddScreenshotClick = (): void => {
    screenshotInputRef.current?.click();
  };

  const handleAddVideoClick = (): void => {
    videoInputRef.current?.click();
  };

  const handleAddPosterClick = (): void => {
    posterInputRef.current?.click();
  };

  const handleAddScreenshot = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const isDuplicate = checkDuplicateEntries(e.target.files[0], 'screenshot');
      if (isDuplicate) {
        toast.error('This screenshot is already added.');
        return;
      }

      const newOrder: number = getNextOrder();
      const newScreenshot: Screenshot = {
        id: `${newOrder}:${Date.now()}`,
        image: e.target.files[0],
        order: newOrder,
        featured: false,
        change: 'added',
      };
      setScreenshots((prev) => [...prev, newScreenshot]);
    }
  };

  const handleAddVideo = (videoFile: File | null, posterFile: File | null): void => {
    if (videoFile && posterFile) {
      const newOrder: number = getNextOrder();
      const newVideo: Video = {
        id: `${newOrder}:${Date.now()}`,
        video: videoFile,
        poster: posterFile,
        order: newOrder,
        change: 'added',
      };
      setVideos((prev) => [...prev, newVideo]);
    }
  };

  const handleRemoveScreenshot = (id: number): void => {
    setScreenshots((prev) => {
      if (type === 'update') {
        const screenshot: Screenshot | undefined = prev.find(
          (screenshot) => getId(screenshot) === id
        );
        if (screenshot?.change === 'added') {
          return prev.filter((screenshot) => getId(screenshot) !== id);
        } else {
          screenshot && setChanges((prev) => [...prev, screenshot]);
          return prev.map((screenshot) =>
            getId(screenshot) === id ? { ...screenshot, change: 'deleted' } : screenshot
          );
        }
      } else {
        return prev.filter((screenshot) => getId(screenshot) !== id);
      }
    });
  };

  const handleRemoveVideo = (id: number): void => {
    setVideos((prev) => {
      if (type === 'update') {
        const video: Video | undefined = prev.find((video) => getId(video) === id);
        if (video?.change === 'added') {
          return prev.filter((video) => getId(video) !== id);
        } else {
          video && setChanges((prev) => [...prev, video]);
          return prev.map((video) =>
            getId(video) === id ? { ...video, change: 'deleted' } : video
          );
        }
      } else {
        return prev.filter((video) => getId(video) !== id);
      }
    });
  };

  const handleRestoreScreenshot = (id: number): void => {
    const previousChange = changes.find((change) => getId(change) === id)?.change;
    previousChange &&
      setScreenshots((prev) => {
        return prev.map((screenshot) =>
          getId(screenshot) === id ? { ...screenshot, change: previousChange } : screenshot
        );
      });
  };

  const handleRestoreVideo = (id: number): void => {
    const previousChange = changes.find((change) => getId(change) === id)?.change;
    previousChange &&
      setVideos((prev) => {
        return prev.map((video) =>
          getId(video) === id ? { ...video, change: previousChange } : video
        );
      });
  };

  const handleVideoInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const isDuplicate = checkDuplicateEntries(e.target.files[0], 'video');
      if (isDuplicate) {
        toast.error('This video is already added.');
        return;
      }

      setVideoFile(e.target.files[0]);
      setSelectPosterModalOpen(true);
    }
  };

  const handlePosterInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const isDuplicate = checkDuplicateEntries(e.target.files[0], 'poster');
      if (isDuplicate) {
        toast.error('This poster is already added.');
        return;
      }

      handleAddVideo(videoFile, e.target.files[0]);
    }
  };

  const handlePosterModalClose = (): void => {
    setSelectPosterModalOpen(false);
    handleAddPosterClick();
  };

  const handleScreenshotOrderChange = (e: ChangeEvent<HTMLInputElement>, id: number): void => {
    setScreenshots((prev: Screenshot[]): Screenshot[] => {
      return prev
        .map((item) => (getId(item) === id ? { ...item, order: Number(e.target.value) } : item))
        .sort((a, b) => a.order - b.order);
    });
  };

  const handleVideoOrderChange = (e: ChangeEvent<HTMLInputElement>, id: number): void => {
    setVideos((prev: Video[]): Video[] => {
      return prev
        .map((item) => (getId(item) === id ? { ...item, order: Number(e.target.value) } : item))
        .sort((a, b) => a.order - b.order);
    });
  };

  const handleFeaturedChange = (e: ChangeEvent<HTMLInputElement>, id: number): void => {
    const isFeatured: boolean = e.target.checked;
    if (isFeatured) {
      const featuredCount: number = screenshots.filter((s) => s.featured).length;
      if (featuredCount >= 4) {
        toast.warning('You can only feature up to 4 screenshots.');
        return;
      }
    }
    setScreenshots((prev) =>
      prev.map((screenshot) =>
        getId(screenshot) === id
          ? {
              ...screenshot,
              image: screenshot.image,
              featured: isFeatured,
            }
          : screenshot
      )
    );
  };

  // Calculate the number of featured screenshots
  const featuredCount: number = screenshots.filter((s) => s.featured).length;

  const getChangeStyle = (media: Screenshot | Video): string => {
    if (type === 'update') {
      if (media.change === 'added') {
        return 'added';
      } else if (media.change === 'deleted') {
        return 'deleted';
      } else if (media.order !== getId(media) && media.change === 'unchanged') {
        return 'edited';
      } else {
        return '';
      }
    } else {
      return '';
    }
  };

  return (
    <>
      <section className="section-media" ref={mediaRef}>
        <h2>Media</h2>

        <button className="add-button" onClick={handleAddScreenshotClick}>
          Add Screenshot
        </button>
        <input
          type="file"
          accept="image/jpeg"
          ref={screenshotInputRef}
          onClick={(e) => ((e.target as HTMLInputElement).value = '')}
          onChange={handleAddScreenshot}
          hidden
        />

        <button className="add-button" onClick={handleAddVideoClick}>
          Add Video
        </button>
        <input
          type="file"
          accept="video/webm"
          ref={videoInputRef}
          onClick={(e) => ((e.target as HTMLInputElement).value = '')}
          onChange={handleVideoInputChange}
          hidden
        />
        <input
          type="file"
          accept=" image/jpeg"
          ref={posterInputRef}
          onClick={(e) => ((e.target as HTMLInputElement).value = '')}
          onChange={handlePosterInputChange}
          hidden
        />

        <button className="reset-button" onClick={resetMedia}>
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
          {media
            .sort((a, b) => {
              // Move 'deleted' items to the end
              if (a.change === 'deleted') return 1;
              if (b.change === 'deleted') return -1;

              // Sort remaining items by 'order'
              return a.order - b.order;
            })
            .map((item) => (
              <div
                key={item.id}
                className={`media-item ${getChangeStyle(item)} ${duplicateOrders.has(item.order) ? 'duplicate' : ''}`}
              >
                {'image' in item ? (
                  <div className="media-screenshot">
                    <img
                      src={
                        item.image instanceof File ? URL.createObjectURL(item.image) : item.image
                      }
                      alt={`Screenshot ${item.order}`}
                      className="media-preview"
                    />
                    <div className="media-details">
                      <label>Order:</label>
                      <input
                        type="number"
                        value={item.order}
                        onChange={(e) => handleScreenshotOrderChange(e, getId(item))}
                        className={duplicateOrders.has(item.order) ? 'input-error' : ''}
                      />
                      <button
                        className={`remove-button ${item.change === 'deleted' ? 'restore' : ''}`}
                        onClick={() =>
                          item.change === 'deleted'
                            ? handleRestoreScreenshot(getId(item))
                            : handleRemoveScreenshot(getId(item))
                        }
                      >
                        {item.change === 'deleted' ? 'Restore' : 'Remove'}
                      </button>
                      <label>Featured:</label>
                      <input
                        type="checkbox"
                        checked={item.featured || false}
                        onChange={(e) => handleFeaturedChange(e, getId(item))}
                        disabled={featuredCount >= 4 && !item.featured}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="media-video">
                    <video
                      controls
                      poster={
                        item.poster instanceof File ? URL.createObjectURL(item.poster) : item.poster
                      }
                      className="media-preview"
                    >
                      <source
                        src={
                          item.video instanceof File ? URL.createObjectURL(item.video) : item.video
                        }
                        type="video/mp4"
                      />
                    </video>
                    <div className="media-details">
                      <label>Order:</label>
                      <input
                        type="number"
                        value={item.order}
                        onChange={(e) => handleVideoOrderChange(e, getId(item))}
                        className={duplicateOrders.has(item.order) ? 'input-error' : ''}
                      />
                      <button
                        className={`remove-button ${item.change === 'deleted' ? 'restore' : ''}`}
                        onClick={() =>
                          item.change === 'deleted'
                            ? handleRestoreVideo(getId(item))
                            : handleRemoveVideo(getId(item))
                        }
                      >
                        {item.change === 'deleted' ? 'Restore' : 'Remove'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </section>
      {selectPosterModalOpen && (
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
};

export default Media;
