// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Utils
import getPlatform from '@utils/getPlatform';

// Components
import FreeToPlay from './FreeToPlay';
import HasDiscount from './HasDiscount';
import NoDiscount from './NoDiscount';

// Skeleton
import LoadingSkeleton from './Skeleton';

export default function GamePurchase() {
  //--------------------------- Initializations ---------------------------//
  const platform = getPlatform();

  //--------------------------- State Selectors ---------------------------//
  const { isAuthInitialized, authOnLoadIntialized } = useAppSelector((state) => state.auth);
  const { currentGame } = useAppSelector((state) => state.game);

  //------------------------- Render UI Section --------------------------//
  if (!isAuthInitialized || !authOnLoadIntialized) {
    return <LoadingSkeleton />;
  } else {
    return (
      <div className="game-purchase-wrapper">
        <div className="game-purchase">
          <div className="game-purchase-platform">
            {currentGame?.platformEntries.mac && platform === 'darwin' ? (
              <span className="platform-img mac" />
            ) : (
              <span className="platform-img win" />
            )}
          </div>

          {currentGame?.pricing?.free ? (
            <FreeToPlay />
          ) : !currentGame?.pricing?.discount ? (
            <HasDiscount />
          ) : (
            <NoDiscount />
          )}
        </div>
      </div>
    );
  }
}
