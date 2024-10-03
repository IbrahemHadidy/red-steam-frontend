'use client';

// React
import { useContext, useEffect, useState } from 'react';

// NextJS
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Toast notifications
import { toast } from 'react-toastify';

// PayPal
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

// Contexts
import { AuthContext } from '@contexts/AuthContext';

// Utils
import Decimal from 'decimal.js';

// Services
import { getByIds } from '@services/game/data';
import { captureOrder, createOrder } from '@services/user/payment';

// Images
import steamLogo from '@images/logo_steam.svg';

// Types
import type { Game } from '@entities/game.entity';
import type { OnApproveData } from '@paypal/paypal-js';
import type { JSX } from 'react';

export default function CheckoutPage(): JSX.Element {
  // Init
  const router = useRouter();

  // Contexts
  const { userData, fetchData } = useContext(AuthContext);

  // States
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState<boolean>(false);
  const [isReviewSelected, setIsReviewSelected] = useState<boolean>(false);
  const [checkboxSelected, setCheckboxSelected] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');
  const [userCart, setUserCart] = useState<Game[]>([]);
  const [totalPrice, setTotalPrice] = useState<Decimal>(new Decimal('0.00'));
  const [finalPrice, setFinalPrice] = useState<Decimal>(new Decimal('0.00'));

  useEffect(() => {
    const fetchCartData = async (): Promise<void> => {
      if (userData?.cart) {
        const response = await getByIds(userData.cart.map((item) => item.id));
        setUserCart(response);
        setTotalPrice(
          response.reduce((acc: Decimal, curr: Game) => {
            const price = new Decimal(curr.pricing?.price ?? '0.00');
            return acc.plus(price);
          }, new Decimal('0.00'))
        );
      }
    };
    fetchCartData();
  }, [fetchData, userData]);

  useEffect(() => {
    if (userData?.cart?.length === 0 && !isPaymentConfirmed) {
      toast.warning('Cart is empty');
      router.push('/cart');
    }
  }, [isPaymentConfirmed, router, userData]);

  const initialOptions = {
    disableFunding: 'card',
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
    currency: 'USD',
    intent: 'capture',
  };

  const onCreateOrder = async (): Promise<string> => {
    setFinalPrice(totalPrice);

    try {
      if (!userData) {
        toast.error('User data not found');
        router.push('/login');
      }

      const result = await createOrder(
        totalPrice.toString(),
        (userData && userData.cart.map((item) => item.id)) || []
      );

      return result.orderId;
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      throw error;
    }
  };

  const onApproveOrder = async (data: OnApproveData): Promise<void> => {
    try {
      if (!userData) {
        toast.error('User data not found');
        router.push('/login');
      }

      const response = await captureOrder(
        data.orderID,
        (userData && userData.cart.map((item) => item.id)) || []
      );

      if (response.status !== 200) {
        toast.error('Failed to capture PayPal order');
      }

      const orderInfo = response.data;

      setOrderId(orderInfo.orderId);
      setIsPaymentConfirmed(true);
      fetchData();
    } catch (error) {
      console.error('Error capturing PayPal order:', error);
      throw error;
    }
  };

  const handleCheckboxClick = (): void => {
    setCheckboxSelected(!checkboxSelected);
  };

  const handleContinueClick = (): void => {
    setIsReviewSelected(true);
  };

  const handleBackClick = (): void => {
    setIsReviewSelected(false);
  };

  const handleReturnToStoreClick = (): void => {
    router.push('/');
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="checkout-header">
        <div className="checkout-header-content">
          <div className="steam-logo">
            <Link href="/">
              <Image src={steamLogo} alt="Steam Logo" priority />
            </Link>
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
              <div id="review-select" className={`cart-tab ${isReviewSelected ? 'selected' : ''}`}>
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
                {userCart.map((game) => (
                  <div className="review-checkout-item" key={game.id}>
                    <div className="checkout-item-img">
                      <img src={game.thumbnailEntries.searchImage} alt={game.name} />
                    </div>
                    <div className="checkout-item-price">
                      <div>${game.pricing?.price} USD</div>
                    </div>
                    <div className="checkout-item-desc">
                      <div className="checkout-item-platform">
                        {game.platformEntries.win && <span className="platform-img win" />}
                        {game.platformEntries.mac && <span className="platform-img mac" />}
                      </div>
                      &nbsp;{game.name}
                    </div>
                  </div>
                ))}
                <div className="review-checkout-total">
                  Total Price: <span>${totalPrice.toString()} USD</span>
                </div>
              </>
            )}
            {isPaymentConfirmed && (
              <>
                <h2>Thank you for your purchase!</h2>
                <div className="summary-purchase-area">
                  <p>An email confirmation has been sent to you.</p>
                  <span>
                    Any digital items in this order are now registered to your account on Steam. To
                    access your items, simply visit your&nbsp;
                    <Link href="/library">library</Link>
                    &nbsp;in Steam whenever you're ready.
                  </span>
                  <br />
                </div>
                <div className="rule" />
                <h2>YOUR PURCHASE RECEIPT</h2>
                <div className="reciept-body">
                  <p className="confirm-message">
                    Confirmation of your purchase is provided below. This information will also be
                    emailed to you shortly.
                  </p>
                  <div className="reciept-confirmation-row">
                    <div className="receipt-confirmation-label">Account Name</div>
                    <div className="receipt-confirmation-data">{userData?.username}</div>
                  </div>
                  <div className="reciept-confirmation-row">
                    <div className="receipt-confirmation-label">Total</div>
                    <div className="receipt-confirmation-data">${finalPrice.toString()} USD</div>
                  </div>
                  <div className="reciept-confirmation-row">
                    <div className="receipt-confirmation-label">Confirmation code</div>
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
                        <div className="payment-options">We only support Paypal at the moment</div>
                      </div>
                    </div>
                    <p>You'll have the chance to review your order before it's placed.</p>
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
                      <div className="review-row-value">{userData?.username}</div>
                    </div>
                    <div className="rule" />
                    <div className="checkout-checkbox">
                      <input type="checkbox" onChange={handleCheckboxClick} />
                      &nbsp;
                      <span>
                        I acknowledge that this site is for educational purposes only and no
                        sensitive or real billing information will be entered. (only paypal sandbox
                        works)
                      </span>
                    </div>
                  </>
                )}
                {!isReviewSelected && (
                  <div className="continue-button" onClick={handleContinueClick}>
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
                  <div className="back-button" onClick={handleBackClick}>
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
                <div className="back-button" onClick={handleReturnToStoreClick}>
                  <span>Return to the Store</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}
