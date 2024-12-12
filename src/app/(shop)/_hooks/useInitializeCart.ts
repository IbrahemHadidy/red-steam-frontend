'use client';

// React
import { useEffect } from 'react';

// NextJS
import { usePathname, useRouter } from 'next/navigation';

// Toast notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { initializeCart, reset as resetCart } from '@store/features/shop/cart/cartSlice';
import { reset as resetCheckout } from '@store/features/shop/checkout/checkoutSlice';

export default function useInitializeCart() {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { isAuthInitialized } = useAppSelector((state) => state.auth);
  const { userCart, isCartInitialized } = useAppSelector((state) => state.shop.cart);
  const { isPaymentConfirmed } = useAppSelector((state) => state.shop.checkout);

  // Fetch cart data
  useEffect(() => {
    if (isAuthInitialized) dispatch(initializeCart());

    return () => {
      dispatch(resetCart());
      dispatch(resetCheckout());
    };
  }, [dispatch, isAuthInitialized]);

  // Redirect if in checkout page and cart is empty
  useEffect(() => {
    if (
      userCart.length === 0 &&
      !isPaymentConfirmed &&
      isCartInitialized &&
      pathname.includes('/checkout')
    ) {
      toast.warning('Cart is empty, please add items to your cart to proceed');
      router.push('/');
    }
  }, [isCartInitialized, isPaymentConfirmed, pathname, router, userCart]);
}
