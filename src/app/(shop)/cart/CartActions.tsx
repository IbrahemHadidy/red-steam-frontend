// NextJS
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Thunks
import { clearCart } from '@store/features/shop/cart/cartThunks';

export default function CartActions() {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { removeAllBtnLoading } = useAppSelector((state) => state.shop.cart);

  //--------------------------- Event Handlers ----------------------------//
  const handleRemoveAllClick = async (): Promise<void> => {
    await dispatch(clearCart());
  };

  const handleContinueShoppingClick = (): void => {
    router.push('/');
  };

  //------------------------------- Render --------------------------------//
  return (
    <div className="cart-actions">
      <div>
        <button className="continue-shopping-btn" onClick={handleContinueShoppingClick}>
          Continue shopping
        </button>
      </div>

      <div
        className={`cart-remove-all ${removeAllBtnLoading ? 'loading' : ''}`}
        onClick={handleRemoveAllClick}
      >
        Remove all items
      </div>
    </div>
  );
}
