'use client';

// NextJS
import Link from 'next/link';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Thunks
import { removeCartItem } from '@store/features/shop/cart/cartThunks';

// Types
import type { Game } from '@interfaces/game';

interface CartItemProps {
  game: Game;
}

export default function CartItem({ game }: CartItemProps) {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { removeBtnLoading } = useAppSelector((state) => state.shop.cart);

  //--------------------------- Event Handlers ----------------------------//
  const handleRemoveClick = async (id: number): Promise<void> => {
    await dispatch(removeCartItem(id));
  };

  //-------------------------- Render UI Section --------------------------//
  return (
    <div className="cart-item" key={game.id}>
      <div className="cart-item-content">
        <div className="cart-img">
          <Link href={`/game/${game.id}`}>
            <img src={game.thumbnailEntries.horizontalHeaderImage} alt={game.name} />
          </Link>
        </div>

        <div className="cart-info">
          <div className="cart-item-title">
            <Link href={`/game/${game.id}`}>
              <div>{game.name}</div>
            </Link>
          </div>

          <div className="cart-platform-price">
            <div className="cart-platform">
              {game.platformEntries.win && <span className="platform-img win" />}
              {game.platformEntries.mac && <span className="platform-img mac" />}
            </div>

            <div className="cart-price-container">
              <span className="cart-price">
                {!game.pricing?.discount && (
                  <div className="no-discount-price">
                    {game.pricing?.free ? 'Free to Play' : `$${game.pricing?.basePrice}`}
                  </div>
                )}
                {game.pricing?.discount && (
                  <>
                    <span className="discount-percentage">-{game.pricing.discountPercentage}%</span>
                    <div className="discount-price-container">
                      <div className="original-price">${game.pricing.basePrice}</div>
                      <div className="discount-price">${game.pricing.discountPrice}</div>
                    </div>
                  </>
                )}
              </span>
            </div>
          </div>

          <div className="remove-item">
            <div className="gifting">GIFTING OPTIONS ARE NOT AVAILABLE</div>

            <div
              className={`remove-btn ${removeBtnLoading ? 'loading' : ''}`}
              onClick={() => handleRemoveClick(game.id)}
            >
              Remove
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
