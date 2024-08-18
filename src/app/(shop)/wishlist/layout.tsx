// Components
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import SecondNavbar from 'components/SecondNavbar/SecondNavbar';

// Styles
import 'styles/shop/Wishlist.scss';

// Types
import type { Metadata } from 'next';
import type { FC, JSX, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "User's wishlist",
  description: 'View your wishlist',
};

const WishlistLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <>
      <Header />
      <SecondNavbar />
      {children}
      <Footer />
    </>
  );
};

export default WishlistLayout;
