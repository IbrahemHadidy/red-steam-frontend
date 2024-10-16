// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Actions
import { setReviewSelected } from '@store/features/shop/checkout/checkoutSlice';

export default function PaymentMethod() {
  // Init
  const dispatch = useAppDispatch();

  // Event Handlers
  const handleContinueClick = (): void => {
    dispatch(setReviewSelected(true));
  };

  return (
    <>
      <div className="form-row">
        <div className="payment-options-container">
          <label>Please select a payment method:</label>
          <div className="payment-options">We only support Paypal at the moment</div>
        </div>
      </div>
      <p>You'll have the chance to review your order before it's placed.</p>

      <div className="continue-button" onClick={handleContinueClick}>
        <span>Continue</span>
      </div>
    </>
  );
}
