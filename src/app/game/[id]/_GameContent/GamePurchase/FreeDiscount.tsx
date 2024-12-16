// NextJS
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Thunks
import { addToLibrary } from '@store/features/game/gameThunks';

// Utils
import formatDate from '@utils/formatDate';

// Types
import type { MouseEvent } from 'react';

export default function HasDiscount() {
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

      {!isGameInLibrary && (
        <p className="dicount-countdown">
          {currentGame?.pricing?.offerType}! Offer ends{' '}
          {formatDate(currentGame?.pricing?.discountEndDate)}
        </p>
      )}

      <div className="game-purchase-action">
        <div className="game-purchase-action-background">
          {!isGameInLibrary && (
            <div className="game-purchase-discount">
              <div className="discount-precentage">
                -{currentGame?.pricing?.discountPercentage}%
              </div>
              <div className="discount-prices">
                <div className="discount-original-price">${currentGame?.pricing?.basePrice}</div>
                <div className="discount-final-price">
                  ${currentGame?.pricing?.discountPrice} USD
                </div>
              </div>
            </div>
          )}

          {isGameInLibrary ? (
            <div className="play-game-btn">
              <Link href="/library" className="green-btn">
                <span className="medium-btn">Play Game</span>
              </Link>
            </div>
          ) : (
            <div className={`addtocart-btn ${isLibraryBtnLoading ? 'loading' : ''}`}>
              <div className="green-btn">
                <span className="medium-btn" onClick={handleAddToLibraryClick}>
                  Add to Library
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
