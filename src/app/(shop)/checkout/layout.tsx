// Providers
import CartProvider from '@providers/CartProvider';

// Styles
import '@styles/shop/Checkout.scss';

// Types
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

interface CheckoutLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Purchase games',
};

export default function CheckoutLayout({ children }: CheckoutLayoutProps) {
  return <CartProvider>{children}</CartProvider>;
}
