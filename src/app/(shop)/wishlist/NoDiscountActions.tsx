// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Thunks
import { addToCart, addToLibrary } from '@store/features/shop/wishlist/wishlistThunks';

// Types
import type { Game } from '@interfaces/game';

interface NoDiscountActionsProps {
  game: Game;
}

export default function DiscountActions({ game }: NoDiscountActionsProps) {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { isCartBtnLoading } = useAppSelector((state) => state.shop.wishlist);

  //---------------------------- Event Handlers ----------------------------//
  const handleAddToCartBtn1Click = async (game: Game): Promise<void> => {
    if (game?.pricing?.free) {
      await dispatch(addToLibrary(game?.id));
    } else {
      await dispatch(addToCart(game?.id));
    }
  };

  //-------------------------- Render UI Section --------------------------//
  return (
    <div className="game-purchase-action">
      <div className="game-purchase-action-background">
        <div className="game-purchase-price">
          {game?.pricing?.free ? 'Free to Play' : `${game?.pricing?.price} USD`}
        </div>

        <div className={`addtocart-btn ${isCartBtnLoading ? 'loading' : ''}`}>
          <a className="green-btn" onClick={() => handleAddToCartBtn1Click(game)}>
            <span className="medium-btn">
              {game?.pricing?.free ? 'Add to Library' : 'Add to Cart'}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
