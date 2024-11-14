// NextJS
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Thunks
import { addToCart } from '@store/features/game/gameThunks';

// Utils
import formatDate from '@utils/formatDate';

export default function NoDiscount() {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { currentGame, isGameInCart, isGameInLibrary, isCartBtnLoading } = useAppSelector(
    (state) => state.game
  );

  //--------------------------- Event Handlers ----------------------------//
  const handleAddToCartClick = async (): Promise<void> => {
    await dispatch(addToCart(router));
  };

  //------------------------- Render UI Section --------------------------//
  return (
    <>
      {!isGameInLibrary ? <h1>Buy {currentGame?.name}</h1> : <h1>Play {currentGame?.name}</h1>}

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
            <div className={`addtocart-btn ${isCartBtnLoading ? 'loading' : ''}`}>
              {!isGameInCart ? (
                <div className="green-btn">
                  <span className="medium-btn" onClick={handleAddToCartClick}>
                    Add to Cart
                  </span>
                </div>
              ) : (
                <Link href="/cart" className="green-btn">
                  <span className="medium-btn">In Cart</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
