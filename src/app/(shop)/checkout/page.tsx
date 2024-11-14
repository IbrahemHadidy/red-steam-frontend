'use client';

// NextJS
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// PayPal
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Custom Hooks
import useInitializeCart from '../_hooks/useInitializeCart';

// Components
const CheckoutConfirmed = dynamic(() => import('./CheckoutConfirmed'));
const CheckoutHeader = dynamic(() => import('./CheckoutHeader'));
const CheckoutReview = dynamic(() => import('./CheckoutReview'));
const PaymentMethod = dynamic(() => import('./PaymentMethod'));

// Types
import type { ReactPayPalScriptOptions } from '@paypal/react-paypal-js';

export default function CheckoutPage() {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();

  //------------------------------- States --------------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);
  const { isCartInitialized } = useAppSelector((state) => state.shop.cart);
  const { isPaymentConfirmed, isReviewSelected } = useAppSelector((state) => state.shop.checkout);

  //------------------------------- Hooks ---------------------------------//
  useInitializeCart();

  //---------------------------- PayPal Config ----------------------------//
  const initialOptions: ReactPayPalScriptOptions = {
    disableFunding: 'card',
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
    currency: 'USD',
    intent: 'capture',
  };

  //-------------------------- Render UI Section --------------------------//
  if (!isCartInitialized) {
    // TODO: Add skeleton
    return <></>;
  } else {
    return (
      <PayPalScriptProvider options={initialOptions}>
        <CheckoutHeader />
        <div className="checkout-page-content">
          <div className="checkout-content">
            <div className="checkout-content-box">
              <h3
                className={`tab-header ${isPaymentConfirmed || !isReviewSelected ? 'transparent' : ''}`}
              >
                Payment Info
              </h3>

              {!isPaymentConfirmed ? (
                <div className="payment-form-area">
                  {!isReviewSelected ? <PaymentMethod /> : <CheckoutReview />}
                </div>
              ) : (
                <CheckoutConfirmed router={router} />
              )}
            </div>

            {!isPaymentConfirmed && isReviewSelected && (
              <div className="checkout-footer-note">
                Confirmation will be emailed to {currentUserData?.email ?? 'your email address'}
              </div>
            )}
          </div>
        </div>
      </PayPalScriptProvider>
    );
  }
}
