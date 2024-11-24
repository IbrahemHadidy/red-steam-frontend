// NextJS
import Link from 'next/link';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Type
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface CheckoutConfirmedProps {
  router: AppRouterInstance;
}

export default function CheckoutConfirmed({ router }: CheckoutConfirmedProps) {
  //------------------------------- States --------------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);
  const { totalPrice } = useAppSelector((state) => state.shop.cart);
  const { orderId } = useAppSelector((state) => state.shop.checkout);

  //--------------------------- Event Handlers ----------------------------//
  const handleReturnToStoreClick = (): void => {
    router.push('/');
  };

  //------------------------------- Render --------------------------------//
  return (
    <>
      <h2>Thank you for your purchase!</h2>
      <div className="summary-purchase-area">
        <p>An email confirmation has been sent to you.</p>

        <span>
          Any digital items in this order are now registered to your account on Steam. To access
          your items, simply visit your&nbsp;
          <Link href="/library">library</Link>
          &nbsp;in Steam whenever you're ready.
        </span>
        <br />
      </div>

      <div className="rule" />

      <h2>YOUR PURCHASE RECEIPT</h2>

      <div className="reciept-body">
        <p className="confirm-message">
          Confirmation of your purchase is provided below. This information will also be emailed to
          you shortly.
        </p>

        <div className="reciept-confirmation-row">
          <div className="receipt-confirmation-label">Account Name</div>
          <div className="receipt-confirmation-data">{currentUserData?.username}</div>
        </div>

        <div className="reciept-confirmation-row">
          <div className="receipt-confirmation-label">Total</div>
          <div className="receipt-confirmation-data">${totalPrice.toString()} USD</div>
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

      <br />

      <div className="back-button" onClick={handleReturnToStoreClick}>
        <span>Return to the Store</span>
      </div>
    </>
  );
}
