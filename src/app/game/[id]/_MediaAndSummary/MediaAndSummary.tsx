// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Utils
import { isInLibrary } from './media-utils';

// Skeletons
import Skeleton from './Skeleton';

// Components
import GameOwned from './GameOwned/GameOwned';
import GameTitleArea from './GameTitleArea/GameTitleArea';
import LeftGameSummary from './LeftGameSummary/LeftGameSummary';
import { ScreenshotModal } from './LeftGameSummary/Screenshot/Screenshot';
import QueueArea from './QueueArea/QueueArea';
import RightGameSummary from './RightGameSummary/RightGameSummary';

export default function MediaAndSummary() {
  //--------------------------- State Selectors ---------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);
  const { isGameFetching, currentGame, isScreenshotModalOpen } = useAppSelector(
    (state) => state.game
  );

  //-------------------------- Render UI Section --------------------------//
  if (isGameFetching || !currentGame) {
    return <Skeleton />;
  } else {
    return (
      <div className="MediaAndSummary">
        <GameTitleArea />

        <div className="game-background">
          <div className="game-page-content">
            <div className="media-summary-block">
              <RightGameSummary />
              <LeftGameSummary />
            </div>
          </div>
        </div>

        <QueueArea />

        {isInLibrary(currentGame, currentUserData) && <GameOwned />}

        {isScreenshotModalOpen && <ScreenshotModal />}
      </div>
    );
  }
}
