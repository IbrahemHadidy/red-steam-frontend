// NextJS
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  setIsCompleteModalOpen,
  setIsGameModalOpen,
} from '@store/features/shop/library/librarySlice';

// Utils
import { gameMediaItem, isVideoEntry } from './library-utils';

export default function GameInfo() {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();
  const dispatch = useAppDispatch();

  //--------------------------- State Selectors ---------------------------//
  const { selectedGame } = useAppSelector((state) => state.shop.library);

  //---------------------------- Event Handlers ---------------------------//
  const handleCloseShowClick = (): void => {
    dispatch(setIsGameModalOpen(false));
  };

  const handlePlayClick = (): void => {
    dispatch(setIsCompleteModalOpen(true));
  };

  //-------------------------- Render UI Section --------------------------//
  return (
    selectedGame && (
      <>
        <div className="image-video">
          {isVideoEntry(gameMediaItem(selectedGame)) ? (
            <video
              src={gameMediaItem(selectedGame)?.link}
              autoPlay
              muted
              loop
              controlsList="nodownload"
            />
          ) : (
            <img src={gameMediaItem(selectedGame)?.link || ''} alt="Game" />
          )}
        </div>

        <div className="close-btn" onClick={handleCloseShowClick}>
          X
        </div>

        <div className="content-container">
          <div className="description">
            <div>
              <h1 onClick={() => router.push(`/game/${selectedGame.id}/`)}>{selectedGame.name}</h1>
              <p>{selectedGame.description}</p>
            </div>
            <div style={{ float: 'right' }}>
              <a className="blue-btn" onClick={handlePlayClick}>
                <span className="medium-btn">Play Game</span>
              </a>
            </div>
          </div>
        </div>
      </>
    )
  );
}
