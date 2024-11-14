// NextJS
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Thunks
import { addToCart } from '@store/features/game/gameThunks';

export default function HasDiscount() {
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
      <div className="game-purchase-action">
        <div className="game-purchase-action-background">
          {!isGameInLibrary && (
            <div className="game-purchase-price"> ${currentGame?.pricing?.basePrice} USD </div>
          )}

          {isGameInLibrary ? (
            <div className="play-game-btn">
              <Link className="green-btn" href="/library">
                <span className="medium-btn">Play Game</span>
              </Link>
            </div>
          ) : (
            <div className={`addtocart-btn ${isCartBtnLoading ? 'loading' : ''}`}>
              {!isGameInCart ? (
                <div className="green-btn" onClick={handleAddToCartClick}>
                  <span className="medium-btn">Add to Cart</span>
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
