// Styles
import '@styles/shop/Checkout.scss';

// Types
import type { Metadata } from 'next';
import type { JSX, ReactNode } from 'react';
interface CheckoutLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Purchase games',
};

export default function CheckoutLayout({ children }: CheckoutLayoutProps): JSX.Element {
  return <>{children}</>;
}
