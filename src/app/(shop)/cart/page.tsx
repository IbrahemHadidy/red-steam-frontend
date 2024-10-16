'use client';

// React
import { useEffect } from 'react';

// NextJS
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Actions
import { initializeCart } from '@store/features/shop/cart/cartSlice';

// Components
const CartSummary = dynamic(() => import('./CartSummary'));
const CartItem = dynamic(() => import('./CartItem'));
const CartActions = dynamic(() => import('./CartActions'));

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

export default function CartPage() {
  // Intializations
  const dispatch = useAppDispatch();
  const isViewport840 = useResponsiveViewport(840);

  // States
  const { userCart } = useAppSelector((state) => state.cart);

  // Fetch cart data
  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

  return (
    <div className="cart-content-container">
      <div className="cart-path">
        <Link href="/">Home </Link>
        <span>&gt;&nbsp; Your Shopping Cart</span>
      </div>

      <h2 className="cart-title">Your Shopping Cart</h2>

      <div className="cart-main">
        <div className="cart-content">
          {userCart.length === 0 ? (
            <div className="cart-empty">Your cart is empty.</div>
          ) : (
            <div className="cart-items">
              {userCart.map((game) => (
                <CartItem key={game.id} game={game} />
              ))}
            </div>
          )}

          {isViewport840 && <CartSummary />}

          {userCart.length !== 0 && <CartActions />}
        </div>

        {!isViewport840 && <CartSummary />}
      </div>
    </div>
  );
}
