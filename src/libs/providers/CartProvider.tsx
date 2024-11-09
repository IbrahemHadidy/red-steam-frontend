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
import { initializeCart } from '@store/features/shop/cart/cartSlice';

// Types
import type { ReactNode } from 'react';

interface CartProviderProps {
  children: ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  //--------------------------- State Selectors ---------------------------//
  const { userCart } = useAppSelector((state) => state.shop.cart);
  const { isPaymentConfirmed, isCartInitialized } = useAppSelector((state) => state.shop.checkout);

  // Fetch cart data
  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

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

  return <>{children}</>;
}
