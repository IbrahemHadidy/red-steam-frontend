import { FC, useCallback, useContext, useEffect, useState } from 'react';
import useSoftNavigate from 'hooks/useSoftNavigate';
import useResponsiveViewport from 'hooks/useResponsiveViewport';
import useDynamicMetaTags from 'hooks/useDynamicMetaTags';
import { AuthContext } from 'contexts/AuthContext';
import { clearCart, removeFromCart } from 'services/user/userInteractions';
import gameData, { gamesData } from 'services/gameData';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import SecondNavbar from 'components/SecondNavbar/SecondNavbar';
import './Cart.scss';
import $ from 'tools/$selector';

const Cart: FC = () => {
  const navigate = useSoftNavigate();
  const isViewport840 = useResponsiveViewport(840);
  const { userData, fetchData } = useContext(AuthContext);
  const [userCart, setUserCart] = useState<gamesData[]>([]);

  useDynamicMetaTags({
    title: 'Shopping cart',
    background: '#1b2838',
    description: 'View your shopping cart',
  });

  const updateCart = useCallback(async () => {
    setUserCart(
      userData?.cart
        ?.map(item => {
          return gameData.find(game => game.id === item);
        })
        .filter((game): game is gamesData => game !== undefined) ?? [],
    );
  }, [userData?.cart]);

  useEffect(() => {
    if (userData) {
      updateCart();
    }
  }, [updateCart, userData]);

  const handleRemove = async (userId: string, itemId: string) => {
    $('.remove-btn')?.classList?.add('loading');
    ($('.remove-btn') as HTMLElement).style.pointerEvents = 'none';
    const response = await removeFromCart(userId, itemId);
    if (response?.status === 200) {
      fetchData();
      updateCart();
    }
    $('.remove-btn')?.classList?.remove('loading');
    ($('.remove-btn') as HTMLElement).style.pointerEvents = 'auto';
  };

  const handleRemoveAll = async (userId: string) => {
    $('.cart-remove-all')?.classList?.add('loading');
    ($('.cart-remove-all') as HTMLElement).style.pointerEvents = 'none';
    const response = await clearCart(userId);
    if (response?.status === 200) {
      fetchData();
      updateCart();
    }
    $('.cart-remove-all')?.classList?.remove('loading');
    ($('.cart-remove-all') as HTMLElement).style.pointerEvents = 'auto';
  };

  const totalPrice = userCart
    .reduce((total: number, game: gamesData) => {
      return total + Number(game.discount ? game.discountPrice : game.price);
    }, 0)
    .toFixed(2);

  const cartSummary = (
    <div className="cart-summary-container">
      <div className="cart-summary">
        <div className="estimated-total-price">
          <div className="estimated-total">Estimated total</div>
          <div className="estimated-price">{`$${totalPrice}`}</div>
        </div>
        <div className="taxes-info">
          Sales tax will be calculated during checkout where applicable
        </div>
        <button
          className="cart-checkout-btn"
          onClick={() => navigate('/checkout')}
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
          <a
            onClick={e => {
              navigate(`/`, e);
            }}
          >
            Home{' '}
          </a>
          <span>&gt;&nbsp; Your Shopping Cart</span>
        </div>
        <div className="cart-title">Your Shopping Cart</div>

        <div className="cart-main">
          <div className="cart-content">
            {userCart.length === 0 ? (
              <div className="cart-empty">Your cart is empty.</div>
            ) : (
              <div className="cart-items">
                {userCart.map(game => (
                  <div className="cart-item" key={game.id}>
                    <div className="cart-item-content">
                      <div className="cart-img">
                        <a
                          onClick={e => {
                            navigate(`/game/${game.id}`, e);
                          }}
                        >
                          <img
                            src={game.horizontalHeaderImage}
                            alt={game.name}
                          />
                        </a>
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
                                    <div className="original-price">
                                      ${game.price}
                                    </div>
                                    <div className="discount-price">
                                      ${game.discountPrice}
                                    </div>
                                  </div>
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="remove-item">
                          <div className="gifting">
                            GIFTING OPTIONS ARE NOT AVAILABLE
                          </div>
                          <div
                            className="remove-btn"
                            onClick={() =>
                              handleRemove(userData?._id || '', game?.id || '')
                            }
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
                  <button
                    className="continue-shopping-btn"
                    onClick={e => {
                      navigate(`/`, e);
                    }}
                  >
                    Continue shopping
                  </button>
                </div>
                <div
                  className="cart-remove-all"
                  onClick={() => handleRemoveAll(userData?._id || '')}
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
