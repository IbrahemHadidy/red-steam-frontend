// React
import { useEffect, useState } from 'react';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  removeScreenshot,
  restoreScreenshot,
  toggleScreenshotFeatured,
  updateScreenshotOrder,
} from '@store/features/admin/game/gameAdminSlice';

// Utils
import getFileUrl from '@utils/getFileUrl';

// Enums
import { GameMediaChangeStatus } from '@enums/admin';

// Types
import type { Screenshot } from '@custom-types/game-admin';
import type { ChangeEvent } from 'react';

interface MediaScreenshotProps {
  item: Screenshot;
}

export default function MediaScreenshot({ item }: MediaScreenshotProps) {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { screenshots, duplicateOrders } = useAppSelector((state) => state.admin.game);
  const [imageUrl, setImageUrl] = useState<string>('//:0');

  //------------------------------ Effects -------------------------------//
  useEffect(() => {
    (async () => {
      setImageUrl(await getFileUrl(item.image));
    })();
  }, [item.image]);

  //-------------------------- Utility Functions --------------------------//
  const isFeaturedDisabled = (): boolean => {
    const featuredCount = screenshots.filter((s) => s.featured).length;
    if (featuredCount >= 4) {
      return true;
    } else {
      return false;
    }
  };

  //---------------------------- Event Handlers ---------------------------//
  const handleRemoveScreenshot = (order: number): void => {
    dispatch(removeScreenshot(order));
  };

  const handleRestoreScreenshot = (order: number): void => {
    dispatch(restoreScreenshot(order));
  };

  const handleScreenshotOrderChange = (
    e: ChangeEvent<HTMLInputElement>,
    baseOrder: number
  ): void => {
    const newOrder = Number(e.target.value.trim());
    dispatch(updateScreenshotOrder({ baseOrder, newOrder }));
    const screenshotElement = document.querySelector(`img[alt="Screenshot ${newOrder}"]`);
    screenshotElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFeaturedChange = (id: number): void => {
    dispatch(toggleScreenshotFeatured(id));
  };

  //------------------------------- Render --------------------------------//
  return (
    <div className="media-screenshot">
      <img
        src={imageUrl}
        alt={`Screenshot ${item.order}`}
        className="media-preview"
        loading="lazy"
      />
      <div className="media-details">
        <label>Order:</label>
        <input
          type="number"
          value={item.order}
          onChange={(e) => handleScreenshotOrderChange(e, item.baseOrder)}
          className={duplicateOrders.includes(item.order) ? 'input-error' : ''}
        />
        <button
          className={`remove-button ${item.change === GameMediaChangeStatus.DELETED ? 'restore' : ''}`}
          onClick={() =>
            item.change === GameMediaChangeStatus.DELETED
              ? handleRestoreScreenshot(item.baseOrder)
              : handleRemoveScreenshot(item.baseOrder)
          }
        >
          {item.change === GameMediaChangeStatus.DELETED ? 'Restore' : 'Remove'}
        </button>
        <label>Featured:</label>
        <input
          type="checkbox"
          checked={item.featured ?? false}
          onChange={() => handleFeaturedChange(item.baseOrder)}
          disabled={isFeaturedDisabled() && !item.featured}
        />
      </div>
    </div>
  );
}
