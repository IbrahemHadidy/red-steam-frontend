// Components
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import SecondNavbar from '@components/SecondNavbar/SecondNavbar';

// Providers
import CartProvider from '@providers/CartProvider';

// Styles
import '@styles/shop/Cart.scss';

// Types
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

interface CartLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Shopping cart',
  description: 'View your shopping cart',
};

export default function CartLayout({ children }: CartLayoutProps) {
  return (
    <>
      <Header />
      <SecondNavbar />
      <CartProvider>{children}</CartProvider>
      <Footer />
    </>
  );
}
