// NextJS
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Thunks
import { addToLibrary } from '@store/features/game/gameThunks';

// Types
import type { MouseEvent } from 'react';

export default function FreeToPlay() {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { currentGame, isGameInLibrary, isLibraryBtnLoading } = useAppSelector(
    (state) => state.game
  );

  //--------------------------- Event Handlers ----------------------------//
  const handleAddToLibraryClick = async (e: MouseEvent<HTMLAnchorElement>): Promise<void> => {
    e.preventDefault();
    await dispatch(addToLibrary(router));
  };

  //------------------------------- Render --------------------------------//
  return (
    <>
      <h1>Play {currentGame?.name}</h1>
      <div className="game-purchase-action">
        <div className="game-purchase-action-background">
          {!isGameInLibrary && <div className="game-purchase-price"> Free to Play </div>}
          {isGameInLibrary ? (
            <div className="play-game-btn">
              <Link className="green-btn" href="/library">
                <span className="medium-btn">Play Game</span>
              </Link>
            </div>
          ) : (
            <div className={`addtocart-btn ${isLibraryBtnLoading ? 'loading' : ''}`}>
              <a className="blue-btn" onClick={handleAddToLibraryClick}>
                <span className="medium-btn">Add to Library</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
