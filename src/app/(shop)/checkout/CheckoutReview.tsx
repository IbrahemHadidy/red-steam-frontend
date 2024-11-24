// PayPal
import { PayPalButtons } from '@paypal/react-paypal-js';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  setReviewSelected,
  toggleCheckboxChecked,
} from '@store/features/shop/checkout/checkoutSlice';

// Redux Thunks
import { captureOrder, createOrder } from '@store/features/shop/checkout/checkoutThunks';

// Components
import CheckoutItem from './CheckoutItem';

// Types
import type { OnApproveData, PayPalButtonStyle } from '@paypal/paypal-js';

export default function CheckoutReview() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);
  const { userCart, totalPrice } = useAppSelector((state) => state.shop.cart);
  const { isCheckboxChecked } = useAppSelector((state) => state.shop.checkout);

  //---------------------------- PayPal Config ----------------------------//
  const buttonStyles: PayPalButtonStyle = {
    color: 'silver',
    label: 'checkout',
    tagline: false,
    shape: 'rect',
    layout: 'vertical',
    height: 32,
  };

  //---------------------------- PayPal Handlers ---------------------------//
  const onCreateOrder = async (): Promise<string> => {
    return await dispatch(createOrder()).unwrap();
  };

  const onApproveOrder = async (data: OnApproveData): Promise<void> => {
    // Capture order
    await dispatch(captureOrder(data));
  };

  //---------------------------- Event Handlers ----------------------------//
  const handleCheckboxClick = (): void => {
    dispatch(toggleCheckboxChecked());
  };

  const handleBackClick = (): void => {
    dispatch(setReviewSelected(false));
  };

  //------------------------------- Render --------------------------------//
  return (
    <>
      {userCart.map((game) => (
        <CheckoutItem game={game} key={game.id} />
      ))}

      <div className="review-checkout-total">
        Total Price: <span>${totalPrice.toString()} USD</span>
      </div>

      <div className="review-row">
        <div className="review-row-label">Payment method:</div>
        <div className="review-row-value">
          <div>PayPal</div>
        </div>
      </div>

      <div className="review-row">
        <div className="review-row-label">Red Steam account:</div>
        <div className="review-row-value">{currentUserData?.username ?? ''}</div>
      </div>

      <div className="rule" />

      <div className="checkout-checkbox">
        <input type="checkbox" onChange={handleCheckboxClick} />
        &nbsp;
        <span>
          I acknowledge that this site is for educational purposes only and no sensitive or real
          billing information will be entered. (only paypal sandbox works)
        </span>
      </div>

      <div className={`checkout-btn-container ${!isCheckboxChecked ? 'hidden' : ''}`}>
        <PayPalButtons
          style={buttonStyles}
          createOrder={onCreateOrder}
          onApprove={onApproveOrder}
        />
      </div>

      <div className="back-button" onClick={handleBackClick}>
        <span>Back</span>
      </div>
    </>
  );
}
