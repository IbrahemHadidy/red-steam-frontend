import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import type { ChangeEvent, Dispatch, FC, JSX, RefObject, SetStateAction } from 'react';
import type { Screenshot, Video } from '../create.types';

interface MediaProps {
  screenshots: Screenshot[];
  setScreenshots: Dispatch<SetStateAction<Screenshot[]>>;
  videos: Video[];
  setVideos: Dispatch<SetStateAction<Video[]>>;
  mediaRef: RefObject<HTMLDivElement>;
  setHasDuplicateError: Dispatch<SetStateAction<boolean>>;
}

const Media: FC<MediaProps> = ({
  screenshots,
  setScreenshots,
  videos,
  setVideos,
  mediaRef,
  setHasDuplicateError,
}): JSX.Element => {
  // State to track duplicates
  const [duplicateOrders, setDuplicateOrders] = useState<Set<number>>(new Set());

  // Refs
  const screenshotInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Helpers
  const media: (Screenshot | Video)[] = [...screenshots, ...videos];

  const getNextOrder = (): number => {
    const allItems = [...screenshots, ...videos];
    return allItems.length > 0 ? Math.max(...allItems.map((item) => item.order)) + 1 : 1;
  };

  const updateScreenshotOrder = (
    id: number,
    newOrder: number,
    setState: Dispatch<SetStateAction<Screenshot[]>>
  ): void => {
    setState((prev: Screenshot[]): Screenshot[] => {
      return prev
        .map((item) => (item.id === id ? { ...item, order: newOrder } : item))
        .sort((a, b) => a.order - b.order);
    });
  };

  const updateVideoOrder = (
    id: number,
    newOrder: number,
    setState: Dispatch<SetStateAction<Video[]>>
  ): void => {
    setState((prev: Video[]): Video[] => {
      return prev
        .map((item) => (item.id === id ? { ...item, order: newOrder } : item))
        .sort((a, b) => a.order - b.order);
    });
  };

  const resetMedia = (): void => {
    setScreenshots([]);
    setVideos([]);
  };

  const findDuplicateOrders = useCallback((items: (Screenshot | Video)[]): Set<number> => {
    const orders: number[] = items.map((item) => item.order);
    const duplicateOrders: number[] = orders.filter((order, idx) => orders.indexOf(order) !== idx);
    return new Set(duplicateOrders);
  }, []);

  useEffect(() => {
    const allItems: (Screenshot | Video)[] = [...screenshots, ...videos];
    const duplicates: Set<number> = findDuplicateOrders(allItems);
    setDuplicateOrders(duplicates);
    setHasDuplicateError(duplicates.size > 0);
    if (duplicates.size > 0) {
      toast.error('Duplicate orders detected. Please correct them.');
    }
  }, [screenshots, videos, findDuplicateOrders, setHasDuplicateError]);

  // Event Handlers
  const handleAddScreenshot = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const newOrder: number = getNextOrder();
      const newScreenshot: Screenshot = {
        id: Date.now(),
        image: e.target.files[0],
        order: newOrder,
        featured: false,
      };
      setScreenshots((prev) => [...prev, newScreenshot]);
    }
  };

  const handleAddVideo = (e: ChangeEvent<HTMLInputElement>, posterFile: File | null): void => {
    if (e.target.files && e.target.files[0] && posterFile) {
      const newOrder: number = getNextOrder();
      const newVideo: Video = {
        id: Date.now(),
        video: e.target.files[0],
        poster: posterFile,
        order: newOrder,
      };
      setVideos((prev) => [...prev, newVideo]);
    }
  };

  const handleAddScreenshotClick = (): void => {
    screenshotInputRef.current?.click();
  };

  const handleAddVideoClick = (): void => {
    videoInputRef.current?.click();
  };

  const handleRemoveScreenshot = (id: number): void => {
    setScreenshots((prev) => {
      const updatedScreenshots: Screenshot[] = prev.filter((screenshot) => screenshot.id !== id);
      return updatedScreenshots.map((screenshot, idx) => ({ ...screenshot, order: idx + 1 }));
    });
  };

  const handleRemoveVideo = (id: number): void => {
    setVideos((prev) => {
      const updatedVideos: Video[] = prev.filter((video) => video.id !== id);
      return updatedVideos.map((video, idx) => ({ ...video, order: idx + 1 }));
    });
  };

  const handleVideoInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files || e.target.files.length === 0) return;
    toast.info('Now, please select a poster image for the video.');
    let posterFile: File | null = null;

    const posterInput: HTMLInputElement = document.createElement('input');
    posterInput.type = 'file';
    posterInput.accept = 'image/png, image/jpeg, image/jpg, image/webp';
    posterInput.onchange = () => {
      if (posterInput.files && posterInput.files[0]) {
        posterFile = posterInput.files[0];
        handleAddVideo(e, posterFile);
      }
    };

    posterInput.click();
  };

  const handleScreenshotOrderChange = (e: ChangeEvent<HTMLInputElement>, id: number): void => {
    updateScreenshotOrder(id, Number(e.target.value), setScreenshots);
  };

  const handleVideoOrderChange = (e: ChangeEvent<HTMLInputElement>, id: number): void => {
    updateVideoOrder(id, Number(e.target.value), setVideos);
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
        screenshot.id === id ? { ...screenshot, featured: isFeatured } : screenshot
      )
    );
  };

  // Calculate the number of featured screenshots
  const featuredCount: number = screenshots.filter((s) => s.featured).length;

  return (
    <section className="section-media" ref={mediaRef}>
      <h2>Media</h2>
      <button className="add-button" onClick={handleAddScreenshotClick}>
        Add Screenshot
      </button>
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        className="field-input"
        ref={screenshotInputRef}
        onChange={handleAddScreenshot}
        hidden
      />

      <button className="add-button" onClick={handleAddVideoClick}>
        Add Video
      </button>

      <button className="reset-button" onClick={resetMedia}>
        Reset
      </button>

      <input
        type="file"
        accept="video/mp4, video/ogg, video/webm"
        className="field-input"
        ref={videoInputRef}
        onChange={handleVideoInputChange}
        hidden
      />

      <div className="media-container">
        {media
          .sort((a, b) => a.order - b.order)
          .map((item) => (
            <div key={item.id} className="media-item">
              {'image' in item ? (
                <div
                  className={`media-screenshot ${duplicateOrders.has(item.order) ? 'duplicate' : ''}`}
                >
                  <img
                    src={URL.createObjectURL(item.image)}
                    alt={`Screenshot ${item.order}`}
                    className="media-preview"
                  />
                  <div className="media-details">
                    <label>Order:</label>
                    <input
                      type="number"
                      value={item.order}
                      onChange={(e) => handleScreenshotOrderChange(e, item.id)}
                      className={duplicateOrders.has(item.order) ? 'input-error' : ''}
                    />
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveScreenshot(item.id)}
                    >
                      Remove
                    </button>
                    <label>Featured:</label>
                    <input
                      type="checkbox"
                      checked={item.featured || false}
                      onChange={(e) => handleFeaturedChange(e, item.id)}
                      disabled={featuredCount >= 4 && !item.featured}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={`media-video ${duplicateOrders.has(item.order) ? 'duplicate' : ''}`}
                >
                  <video
                    controls
                    poster={URL.createObjectURL(item.poster)}
                    className="media-preview"
                  >
                    <source src={URL.createObjectURL(item.video)} type="video/mp4" />
                  </video>
                  <div className="media-details">
                    <label>Order:</label>
                    <input
                      type="number"
                      value={item.order}
                      onChange={(e) => handleVideoOrderChange(e, item.id)}
                      className={duplicateOrders.has(item.order) ? 'input-error' : ''}
                    />
                    <button className="remove-button" onClick={() => handleRemoveVideo(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </section>
  );
};

export default Media;
