// Components
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import SecondNavbar from '@components/SecondNavbar/SecondNavbar';

// Styles
import '@styles/shop/Cart.scss';

// Types
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Shopping cart',
  description: 'View your shopping cart',
};

const CartLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <>
      <Header />
      <SecondNavbar />
      {children}
      <Footer />
    </>
  );
};

export default CartLayout;
