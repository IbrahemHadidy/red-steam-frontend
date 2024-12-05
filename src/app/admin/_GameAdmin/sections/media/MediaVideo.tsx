// React
import { useEffect, useState } from 'react';

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
import type { Video } from '@custom-types/game-admin';
import type { ChangeEvent } from 'react';

interface MediaVideoProps {
  item: Video;
}

export default function MediaVideo({ item }: MediaVideoProps) {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { duplicateOrders } = useAppSelector((state) => state.admin.game);
  const [videoUrl, setVideoUrl] = useState<string>('//:0');
  const [posterUrl, setPosterUrl] = useState<string>('//:0');

  //------------------------------- Effects -------------------------------//
  useEffect(() => {
    (async () => {
      setVideoUrl(await getFileUrl(item.video));
      setPosterUrl(await getFileUrl(item.poster));
    })();
  }, [item]);

  //---------------------------- Event Handlers ---------------------------//
  const handleRemoveVideo = (order: number): void => {
    dispatch(removeVideo(order));
  };

  const handleRestoreVideo = (order: number): void => {
    dispatch(restoreVideo(order));
  };

  const handleVideoOrderChange = (e: ChangeEvent<HTMLInputElement>, baseOrder: number): void => {
    const newOrder = Number(e.target.value.trim());
    dispatch(updateVideoOrder({ baseOrder, newOrder }));
  };

  //------------------------------- Render --------------------------------//
  return (
    <div className="media-video">
      <video
        controls
        src={videoUrl}
        poster={posterUrl}
        className="media-preview"
        preload="metadata"
      />
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
