// React

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  removeVideo,
  restoreVideo,
  updateVideoOrder,
} from '@store/features/admin/game/gameAdminSlice';

// Utils
import getFileUrl from '@utils/getFileUrl';

// Types
import type { ChangeEvent } from 'react';
import type { Video } from './game-admin.types';

interface MediaVideoProps {
  item: Video;
}

export default function MediaVideo({ item }: MediaVideoProps) {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //--------------------------- State Selectors ---------------------------//
  const { duplicateOrders } = useAppSelector((state) => state.admin.game);

  //---------------------------- Event Handlers ---------------------------//
  const handleRemoveVideo = (order: number): void => {
    dispatch(removeVideo(order));
  };

  const handleRestoreVideo = (order: number): void => {
    dispatch(restoreVideo(order));
  };

  const handleVideoOrderChange = (e: ChangeEvent<HTMLInputElement>, id: number): void => {
    const newOrder = Number(e.target.value.trim());
    dispatch(updateVideoOrder({ from: id, to: newOrder }));
  };

  //-------------------------- Render UI Section --------------------------//
  return (
    <div className="media-video">
      <video controls poster={getFileUrl(item.poster)} className="media-preview">
        <source src={getFileUrl(item.video)} type="video/mp4" />
      </video>
      <div className="media-details">
        <label>Order:</label>
        <input
          type="number"
          value={item.order}
          onChange={(e) => handleVideoOrderChange(e, item.baseOrder)}
          className={duplicateOrders.includes(item.order) ? 'input-error' : ''}
        />
        <button
          className={`remove-button ${item.change === 'deleted' ? 'restore' : ''}`}
          onClick={() =>
            item.change === 'deleted'
              ? handleRestoreVideo(item.baseOrder)
              : handleRemoveVideo(item.baseOrder)
          }
        >
          {item.change === 'deleted' ? 'Restore' : 'Remove'}
        </button>
      </div>
    </div>
  );
}
