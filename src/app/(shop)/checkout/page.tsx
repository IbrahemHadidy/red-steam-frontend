'use client';

// React
import { useEffect } from 'react';

// NextJS
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Toast notifications
import { toast } from 'react-toastify';

// PayPal
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Actions
import { initializeCart } from '@store/features/shop/cart/cartSlice';

// Components
const CheckoutConfirmed = dynamic(() => import('./CheckoutConfirmed'));
const CheckoutHeader = dynamic(() => import('./CheckoutHeader'));
const CheckoutReview = dynamic(() => import('./CheckoutReview'));
const PaymentMethod = dynamic(() => import('./PaymentMethod'));

// Types
import type { ReactPayPalScriptOptions } from '@paypal/react-paypal-js';

export default function CheckoutPage() {
  // Init
  const router = useRouter();
  const dispatch = useAppDispatch();

  // States
  const { currentUserData } = useAppSelector((state) => state.auth);
  const { userCart } = useAppSelector((state) => state.cart);
  const { isPaymentConfirmed, isReviewSelected, isCartInitialized } = useAppSelector(
    (state) => state.checkout
  );

  // Fetch cart data
  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

  // Redirect if cart is empty
  useEffect(() => {
    if (userCart.length === 0 && !isPaymentConfirmed && isCartInitialized) {
      toast.warning('Cart is empty, please add items to your cart to proceed');
      router.push('/');
    }
  }, [isCartInitialized, isPaymentConfirmed, router, userCart]);

  // PayPal options
  const initialOptions: ReactPayPalScriptOptions = {
    disableFunding: 'card',
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
    currency: 'USD',
    intent: 'capture',
  };

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
