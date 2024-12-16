// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Thunks
import { addToLibrary } from '@store/features/shop/wishlist/wishlistThunks';

// Types
import type { Game } from '@interfaces/game';

interface FreeDiscountActionsProps {
  game: Game;
}

export default function FreeDiscountActions({ game }: FreeDiscountActionsProps) {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { isCartBtnLoading } = useAppSelector((state) => state.shop.wishlist);

  //---------------------------- Event Handlers ----------------------------//
  const handleAddToLibraryBtnClick = async (itemId: number): Promise<void> => {
    await dispatch(addToLibrary(itemId));
  };

  //------------------------------- Render --------------------------------//
  return (
    <div className="game-purchase-action">
      <div className="game-purchase-action-background">
        <div className="game-purchase-discount">
          <div className="discount-precentage">-{game?.pricing?.discountPercentage}%</div>

          <div className="discount-prices">
            <div className="discount-original-price">${game?.pricing?.basePrice}</div>
            <div className="discount-final-price">${game?.pricing?.discountPrice} USD</div>
          </div>
        </div>

        <div className={`addtocart-btn ${isCartBtnLoading ? 'loading' : ''}`}>
          <a className="green-btn" onClick={() => handleAddToLibraryBtnClick(game?.id)}>
            <span className="medium-btn">Add to Library</span>
          </a>
        </div>
      </div>
    </div>
  );
}
