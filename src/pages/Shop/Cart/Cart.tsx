'use client';

// React
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

// Next.js
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Components
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import SecondNavbar from 'components/SecondNavbar/SecondNavbar';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Hooks
import useDynamicMetaTags from 'hooks/useDynamicMetaTags';
import useResponsiveViewport from 'hooks/useResponsiveViewport';

// Services
import gameData from 'services/gameData/gameData';
import { clearCart, removeFromCart } from 'services/user/interaction';

// Styles
import './Cart.scss';

// Types
import type { FC } from 'react';
import type { gamesData } from 'services/gameData/gameData';

const Cart: FC = () => {
  // Intializations
  const router = useRouter();
  const isViewport840 = useResponsiveViewport(840);

  // Contexts
  const { userData, fetchData } = useContext(AuthContext);

  // States
  const [userCart, setUserCart] = useState<gamesData[]>([]);

  // Refs
  const removeBtnRef = useRef<HTMLDivElement>(null);
  const removeAllBtnRef = useRef<HTMLDivElement>(null);

  useDynamicMetaTags({
    title: 'Shopping cart',
    background: '#1b2838',
    description: 'View your shopping cart',
  });

  const updateCart = useCallback(async () => {
    setUserCart(
      userData?.cart
        ?.map((item) => {
          return gameData.find((game) => game.id === item.id);
        })
        .filter((game): game is gamesData => game !== undefined) ?? []
    );
  }, [userData?.cart]);

  useEffect(() => {
    if (userData) {
      updateCart();
    }
  }, [updateCart, userData]);

  const handleRemove = async (itemId: number) => {
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

  const handleRemoveAll = async () => {
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
    .reduce((total: number, game: gamesData) => {
      return total + Number(game.discount ? game.discountPrice : game.price);
    }, 0)
    .toFixed(2);

  const handleCartCheckoutClick = () => {
    router.push('/checkout');
  };

  const handleRemoveClick = (game: gamesData) => {
    handleRemove(game.id);
  };

  const handleRemoveAllClick = () => {
    handleRemoveAll();
  };

  const handleContinueShoppingClick = () => {
    router.push('/');
  };

  const cartSummary = (
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
    <>
      <Header />
      <SecondNavbar />
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
                          <img src={game.horizontalHeaderImage} alt={game.name} />
                        </Link>
                      </div>
                      <div className="cart-info">
                        <div className="cart-item-title">
                          <div>{game.name}</div>
                        </div>
                        <div className="cart-platform-price">
                          <div className="cart-platform">
                            {game.win && <span className="platform-img win" />}
                            {game.mac && <span className="platform-img mac" />}
                          </div>
                          <div className="cart-price-container">
                            <span className="cart-price">
                              {!game.discount && (
                                <div className="no-discount-price">
                                  {!game.free && '$'}
                                  {game.price}
                                </div>
                              )}
                              {game.discount && (
                                <>
                                  <span className="discount-percentage">
                                    -{game.discountPercentage}%
                                  </span>
                                  <div className="discount-price-container">
                                    <div className="original-price">${game.price}</div>
                                    <div className="discount-price">${game.discountPrice}</div>
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
                <div
                  className="cart-remove-all"
                  onClick={handleRemoveAllClick}
                  ref={removeAllBtnRef}
                >
                  Remove all items
                </div>
              </div>
            )}
          </div>
          {!isViewport840 && cartSummary}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
