import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { OnApproveData } from '@paypal/paypal-js';
import { toast } from 'react-toastify';
import { AuthContext } from 'contexts/AuthContext';
import { captureOrder, createOrder } from 'services/payment';
import gameData, { gamesData } from 'services/gameData';
import useDynamicMetaTags from 'hooks/useDynamicMetaTags';
import useSoftNavigate from 'hooks/useSoftNavigate';
import './Checkout.scss';

const env = import.meta.env;

const Checkout: FC = () => {
  const navigate = useSoftNavigate();
  const { userData, fetchData } = useContext(AuthContext);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [isReviewSelected, setIsReviewSelected] = useState(false);
  const [checkboxSelected, setCheckboxSelected] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [finalPrice, setFinalPrice] = useState('0.00');

  useDynamicMetaTags({
    title: 'Checkout',
    description: 'Purchase games',
  });

  const userCart = useMemo(() => {
    return (
      userData?.cart
        ?.map(item => {
          return gameData.find(game => game.id === item);
        })
        .filter((game): game is gamesData => game !== undefined) ?? []
    );
  }, [userData?.cart]);

  const totalPrice = userCart
    .reduce((total: number, game: gamesData) => {
      return total + Number(game.discount ? game.discountPrice : game.price);
    }, 0)
    .toFixed(2);

  useEffect(() => {
    if (userData?.cart?.length === 0 && !isPaymentConfirmed) {
      toast.warning('Cart is empty');
      navigate('/cart');
    }
  }, [isPaymentConfirmed, navigate, userData]);

  const initialOptions = {
    disableFunding: 'card',
    clientId: env.VITE_PAYPAL_CLIENT_ID,
    currency: 'USD',
    intent: 'capture',
  };

  const onCreateOrder = async () => {
    setFinalPrice(totalPrice);

    try {
      if (!userData) {
        throw new Error('User data not found');
      }

      const result = await createOrder(
        userData._id,
        totalPrice,
        userData.cart || [],
      );
      
      return result.orderId;
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      throw error;
    }
  };

  const onApproveOrder = async (data: OnApproveData) => {
    try {
      if (!userData) {
        throw new Error('User data not found');
      }

      const response = await captureOrder(
        data.orderID,
        userData._id,
        userData.cart || [],
      );

      if (response.status !== 200) {
        throw new Error('Failed to capture PayPal order');
      }

      const orderInfo = await response.data;

      setOrderId(orderInfo.orderId);
      setIsPaymentConfirmed(true);
      fetchData();
    } catch (error) {
      console.error('Error capturing PayPal order:', error);
      throw error;
    }
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="checkout-header">
        <div className="checkout-header-content">
          <div className="steam-logo">
            <a href="/" onClick={e => navigate('/', e)}>
              <img src="/images/logo_steam.svg" />
            </a>
          </div>
          {!isPaymentConfirmed ? (
            <div id="checkout-pipeline" className="pipeline">
              <div
                id="payment-select"
                className={`cart-tab ${!isReviewSelected ? 'selected' : ''}`}
              >
                <div className="tab-indicator" />
                <div id="payment-info-select" className="tab-select">
                  Payment Info
                </div>
              </div>
              <div className="cart-tab-spacer" />
              <div
                id="review-select"
                className={`cart-tab ${isReviewSelected ? 'selected' : ''}`}
              >
                <div className="tab-indicator" />
                <div className="tab-select"> Review + Purchase</div>
              </div>
            </div>
          ) : (
            <div id="receipt-pipeline" className="pipeline">
              <div id="payment-select" className="cart-tab selected">
                <div className="tab-indicator" />
                <div id="payment-info-select" className="tab-select">
                  THANK YOU
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="checkout-page-content">
        <div className="checkout-content">
          <div className="checkout-content-box">
            <h3
              className="tab-header"
              style={
                isPaymentConfirmed || !isReviewSelected
                  ? {
                      color: 'transparent',
                      userSelect: 'none',
                    }
                  : {}
              }
            >
              Payment Info
            </h3>
            {isReviewSelected && !isPaymentConfirmed && (
              <>
                {userCart.map((game, index) => (
                  <div className="review-checkout-item" key={index}>
                    <div className="checkout-item-img">
                      <img src={game.searchImage} />
                    </div>
                    <div className="checkout-item-price">
                      <div>
                        ${game.discount ? game.discountPrice : game.price} USD
                      </div>
                    </div>
                    <div className="checkout-item-desc">
                      <div className="checkout-item-platform">
                        {game.win && <span className="platform-img win" />}
                        {game.mac && <span className="platform-img mac" />}
                      </div>
                      &nbsp;{game.name}
                    </div>
                  </div>
                ))}
                <div className="review-checkout-total">
                  Total Price: <span>${totalPrice} USD</span>
                </div>
              </>
            )}
            {isPaymentConfirmed && (
              <>
                <h2>Thank you for your purchase!</h2>
                <div className="summary-purchase-area">
                  <p>An email confirmation has been sent to you.</p>
                  <span>
                    Any digital items in this order are now registered to your
                    account on Steam. To access your items, simply visit
                    your&nbsp;
                    <a href="/library" onClick={e => navigate('/library', e)}>
                      library
                    </a>
                    &nbsp;in Steam whenever you're ready.
                  </span>
                  <br />
                </div>
                <div className="rule" />
                <h2>YOUR PURCHASE RECEIPT</h2>
                <div className="reciept-body">
                  <p className="confirm-message">
                    Confirmation of your purchase is provided below. This
                    information will also be emailed to you shortly.
                  </p>
                  <div className="reciept-confirmation-row">
                    <div className="receipt-confirmation-label">
                      Account Name
                    </div>
                    <div className="receipt-confirmation-data">
                      {userData?.username}
                    </div>
                  </div>
                  <div className="reciept-confirmation-row">
                    <div className="receipt-confirmation-label">Total</div>
                    <div className="receipt-confirmation-data">
                      ${finalPrice} USD
                    </div>
                  </div>
                  <div className="reciept-confirmation-row">
                    <div className="receipt-confirmation-label">
                      Confirmation code
                    </div>
                    <div className="receipt-confirmation-data">{orderId}</div>
                  </div>
                  <div className="print-row">
                    <a onClick={() => window.print()}>
                      <div>Print</div>
                    </a>
                  </div>
                </div>
              </>
            )}
            {!isPaymentConfirmed && (
              <div className="payment-form-area">
                {!isReviewSelected && (
                  <>
                    <div className="form-row">
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>Please select a payment method:</label>
                        <div className="payment-options">
                          We only support Paypal at the moment
                        </div>
                      </div>
                    </div>
                    <p>
                      You'll have the chance to review your order before it's
                      placed.
                    </p>
                  </>
                )}
                {isReviewSelected && !isPaymentConfirmed && (
                  <>
                    <div className="review-row">
                      <div className="review-row-label">Payment method:</div>
                      <div className="review-row-value">
                        <div>PayPal</div>
                      </div>
                    </div>
                    <div className="review-row">
                      <div className="review-row-label">Red Steam account:</div>
                      <div className="review-row-value">
                        {userData?.username}
                      </div>
                    </div>
                    <div className="rule" />
                    <div className="checkout-checkbox">
                      <input
                        type="checkbox"
                        onChange={() => setCheckboxSelected(!checkboxSelected)}
                      />
                      &nbsp;
                      <span>
                        I acknowledge that this site is for educational purposes
                        only and no sensitive or real billing information will
                        be entered. (only paypal sandbox works)
                      </span>
                    </div>
                  </>
                )}
                {!isReviewSelected && (
                  <div
                    className="continue-button"
                    onClick={() => setIsReviewSelected(true)}
                  >
                    <span>Continue</span>
                  </div>
                )}
                {isReviewSelected && (
                  <div
                    style={{
                      float: 'right',
                      display: checkboxSelected ? 'block' : 'none',
                    }}
                  >
                    <PayPalButtons
                      style={{
                        color: 'silver',
                        label: 'checkout',
                        tagline: false,
                        shape: 'rect',
                        layout: 'vertical',
                        height: 32,
                      }}
                      createOrder={onCreateOrder}
                      onApprove={onApproveOrder}
                    />
                  </div>
                )}
                {isReviewSelected && (
                  <div
                    className="back-button"
                    onClick={() => setIsReviewSelected(false)}
                  >
                    <span>Back</span>
                  </div>
                )}
              </div>
            )}
            {isReviewSelected && !isPaymentConfirmed && (
              <div className="checkout-footer-note">
                Confirmation will be emailed to {userData?.email}
              </div>
            )}
            {isPaymentConfirmed && (
              <>
                <br />
                <div className="back-button" onClick={() => navigate('/')}>
                  <span>Return to the Store</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default Checkout;
