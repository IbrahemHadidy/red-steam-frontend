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

// Types
import type { ChangeEvent } from 'react';
import type { Screenshot } from './game-admin.types';

interface MediaScreenshotProps {
  item: Screenshot;
}

export default function MediaScreenshot({ item }: MediaScreenshotProps) {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //--------------------------- State Selectors ---------------------------//
  const { screenshots, duplicateOrders } = useAppSelector((state) => state.admin.game);

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

  const handleScreenshotOrderChange = (e: ChangeEvent<HTMLInputElement>, id: number): void => {
    const newOrder = Number(e.target.value.trim());
    dispatch(updateScreenshotOrder({ from: id, to: newOrder }));
  };

  const handleFeaturedChange = (id: number): void => {
    dispatch(toggleScreenshotFeatured(id));
  };

  //-------------------------- Render UI Section --------------------------//
  return (
    <div className="media-screenshot">
      <img
        src={getFileUrl(item.image)}
        alt={`Screenshot ${item.order}`}
        className="media-preview"
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
          className={`remove-button ${item.change === 'deleted' ? 'restore' : ''}`}
          onClick={() =>
            item.change === 'deleted'
              ? handleRestoreScreenshot(item.baseOrder)
              : handleRemoveScreenshot(item.baseOrder)
          }
        >
          {item.change === 'deleted' ? 'Restore' : 'Remove'}
        </button>
        <label>Featured:</label>
        <input
          type="checkbox"
          checked={item.featured || false}
          onChange={() => handleFeaturedChange(item.baseOrder)}
          disabled={isFeaturedDisabled() && !item.featured}
        />
      </div>
    </div>
  );
}
