'use client';

// NextJS
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

export default function CartSummary() {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();

  //------------------------------- States --------------------------------//
  const { userCart, totalPrice } = useAppSelector((state) => state.shop.cart);

  const handleCartCheckoutClick = (): void => {
    router.push('/checkout');
  };

  //-------------------------- Render UI Section --------------------------//
  return (
    <div className="cart-summary-container">
      <div className="cart-summary">
        <div className="estimated-total-price">
          <div className="estimated-total">Estimated total</div>
          <div className="estimated-price">${totalPrice}</div>
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
}
