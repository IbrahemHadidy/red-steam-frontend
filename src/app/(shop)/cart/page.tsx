'use client';

// NextJS
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Utils
import getRandomArrayItem from '@utils/getRandomArrayItem';

// Constants
import { DEFAULT_BG } from '@config/constants/backgrounds';

// Components
const CartSummary = dynamic(() => import('./CartSummary'));
const CartItem = dynamic(() => import('./CartItem'));
const CartActions = dynamic(() => import('./CartActions'));

// Types
import type { Game } from '@interfaces/game';

export default function CartPage() {
  //--------------------------- Initializations ---------------------------//
  const isViewport840 = useResponsiveViewport(840);

  //--------------------------- State Selectors ---------------------------//
  const { userCart } = useAppSelector((state) => state.shop.cart);

  //-------------------------- Render UI Section --------------------------//
  useDynamicBackground(
    userCart.length === 0
      ? DEFAULT_BG
      : `url(${getRandomArrayItem<Game>(userCart).thumbnailEntries.backgroundImage}) center top no-repeat #1b2838`,
    [userCart]
  );

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
            <div className="cart-empty">
              <p>Your cart is empty.</p>
            </div>
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
