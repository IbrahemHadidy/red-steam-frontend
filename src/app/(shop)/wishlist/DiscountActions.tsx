// NextJS
import Link from 'next/link';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Thunks
import { addToCart } from '@store/features/shop/wishlist/wishlistThunks';

// Types
import type { Game } from '@interfaces/game';

interface DiscountActionsProps {
  game: Game;
}

export default function DiscountActions({ game }: DiscountActionsProps) {
  // Init
  const dispatch = useAppDispatch();

  // States
  const { currentUserData } = useAppSelector((state) => state.auth);
  const { isCartBtnLoading } = useAppSelector((state) => state.wishlist);

  // Utils
  const isInCart = (game: Game): boolean | undefined =>
    currentUserData?.cart?.some((item) => item.id === game.id);

  // Event Handlers
  const handleAddToCartBtn2Click = async (itemId: number): Promise<void> => {
    await dispatch(addToCart(itemId));
  };

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
          {!isInCart(game) ? (
            <a className="green-btn" onClick={() => handleAddToCartBtn2Click(game?.id)}>
              <span className="medium-btn">Add to Cart</span>
            </a>
          ) : (
            <Link href="/cart" className="green-btn">
              <span className="medium-btn">In Cart</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
