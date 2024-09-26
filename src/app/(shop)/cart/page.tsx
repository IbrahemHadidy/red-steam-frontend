'use client';

// React
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

// NextJS
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Contexts
import { AuthContext } from '@contexts/AuthContext';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Services
import { getByIds } from '@services/game/data';
import { clearCart, removeFromCart } from '@services/user/interaction';

// Types
import type { Game } from '@entities/game.entity';
import type { FC, JSX } from 'react';

const CartPage: FC = (): JSX.Element => {
  // Intializations
  const router = useRouter();
  const isViewport840 = useResponsiveViewport(840);

  // Contexts
  const { userData, fetchData } = useContext(AuthContext);

  // States
  const [userCart, setUserCart] = useState<Game[]>([]);

  // Refs
  const removeBtnRef = useRef<HTMLDivElement>(null);
  const removeAllBtnRef = useRef<HTMLDivElement>(null);

  const updateCart = useCallback(async (): Promise<void> => {
    const fetchCartData = async (): Promise<void> => {
      if (userData) {
        const response = await getByIds(userData.cart.map((item) => item.id));
        setUserCart(response);
      }
    };
    fetchCartData();
  }, [userData]);

  useEffect(() => {
    if (userData) {
      updateCart();
    }
  }, [updateCart, userData]);

  const handleRemove = async (itemId: number): Promise<void> => {
    if (removeBtnRef.current) {
      removeBtnRef.current.classList.add('loading');
      removeBtnRef.current.style.pointerEvents = 'none';
      const response = await removeFromCart([itemId]);
      if (response?.status === 200) {
        fetchData();
        updateCart();
      }
      removeBtnRef.current.classList.remove('loading');
      removeBtnRef.current.style.pointerEvents = 'auto';
    }
  };

  const handleRemoveAll = async (): Promise<void> => {
    if (removeAllBtnRef.current) {
      removeAllBtnRef.current.classList.add('loading');
      removeAllBtnRef.current.style.pointerEvents = 'none';
      const response = await clearCart();
      if (response?.status === 200) {
        fetchData();
        updateCart();
      }
      removeAllBtnRef.current.classList.remove('loading');
      removeAllBtnRef.current.style.pointerEvents = 'auto';
    }
  };

  const totalPrice = userCart
    .reduce((total: number, game: Game) => {
      return total + Number(game.pricing?.price);
    }, 0)
    .toFixed(2);

  const handleCartCheckoutClick = (): void => {
    router.push('/checkout');
  };

  const handleRemoveClick = (game: Game): void => {
    handleRemove(game.id);
  };

  const handleRemoveAllClick = (): void => {
    handleRemoveAll();
  };

  const handleContinueShoppingClick = (): void => {
    router.push('/');
  };

  const cartSummary: JSX.Element = (
    <div className="cart-summary-container">
      <div className="cart-summary">
        <div className="estimated-total-price">
          <div className="estimated-total">Estimated total</div>
          <div className="estimated-price">{`$${totalPrice}`}</div>
        </div>
        <div className="taxes-info">
          <s>Sales tax will be calculated during checkout where applicable</s>
        </div>
        <button
          className="cart-checkout-btn"
          onClick={handleCartCheckoutClick}
          disabled={userCart.length === 0}
        >
          Continue to payment
        </button>
      </div>
    </div>
  );

  return (
    <div className="cart-content-container">
      <div className="cart-path">
        <Link href="/">Home </Link>
        <span>&gt;&nbsp; Your Shopping Cart</span>
      </div>
      <div className="cart-title">Your Shopping Cart</div>
      <div className="cart-main">
        <div className="cart-content">
          {userCart.length === 0 ? (
            <div className="cart-empty">Your cart is empty.</div>
          ) : (
            <div className="cart-items">
              {userCart.map((game) => (
                <div className="cart-item" key={game.id}>
                  <div className="cart-item-content">
                    <div className="cart-img">
                      <Link href={`/game/${game.id}`}>
                        <img src={game.thumbnailEntries.horizontalHeaderImage} alt={game.name} />
                      </Link>
                    </div>
                    <div className="cart-info">
                      <div className="cart-item-title">
                        <div>{game.name}</div>
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
                                {game.pricing?.free
                                  ? 'Free to Play'
                                  : `$${game.pricing?.basePrice}`}
                              </div>
                            )}
                            {game.pricing?.discount && (
                              <>
                                <span className="discount-percentage">
                                  -{game.pricing.discountPercentage}%
                                </span>
                                <div className="discount-price-container">
                                  <div className="original-price">${game.pricing.basePrice}</div>
                                  <div className="discount-price">
                                    ${game.pricing.discountPrice}
                                  </div>
                                </div>
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="remove-item">
                        <div className="gifting">GIFTING OPTIONS ARE NOT AVAILABLE</div>
                        <div
                          className="remove-btn"
                          onClick={() => handleRemoveClick(game)}
                          ref={removeBtnRef}
                        >
                          Remove
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {isViewport840 && cartSummary}
          {userCart.length !== 0 && (
            <div className="cart-actions">
              <div>
                <button className="continue-shopping-btn" onClick={handleContinueShoppingClick}>
                  Continue shopping
                </button>
              </div>
              <div className="cart-remove-all" onClick={handleRemoveAllClick} ref={removeAllBtnRef}>
                Remove all items
              </div>
            </div>
          )}
        </div>
        {!isViewport840 && cartSummary}
      </div>
    </div>
  );
};

export default CartPage;
