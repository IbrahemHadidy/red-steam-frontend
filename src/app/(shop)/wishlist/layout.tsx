// Components
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import SecondNavbar from '@components/SecondNavbar/SecondNavbar';

// Styles
import '@styles/shop/Wishlist.scss';

// Types
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
interface WishlistLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "User's wishlist",
  description: 'View your wishlist',
};

export default function WishlistLayout({ children }: WishlistLayoutProps) {
  return (
    <>
      <Header />
      <SecondNavbar />
      {children}
      <Footer />
    </>
  );
}
