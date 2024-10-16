// NextJS
import Image from 'next/image';
import Link from 'next/link';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Images
import steamLogo from '@images/logo_steam.svg';

export default function CheckoutHeader() {
  // States
  const { isPaymentConfirmed, isReviewSelected } = useAppSelector((state) => state.checkout);

  return (
    <div className="checkout-header">
      <div className="checkout-header-content">
        <div className="steam-logo">
          <Link href="/">
            <Image src={steamLogo} alt="Steam Logo" priority />
          </Link>
        </div>
        {!isPaymentConfirmed ? (
          <div id="checkout-pipeline" className="pipeline">
            <div id="payment-select" className={`cart-tab ${!isReviewSelected ? 'selected' : ''}`}>
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
  );
}
