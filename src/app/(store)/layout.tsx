// Components
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import SecondNavbar from '@components/SecondNavbar/SecondNavbar';

import Sidebar from './_Sidebar/Sidebar';

// Slick Styles
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

// Styles
import '@styles/store/BrowseSteam.scss';
import '@styles/store/Categories.scss';
import '@styles/store/Featured.scss';
import '@styles/store/HomeTabs.scss';
import '@styles/store/Offers.scss';
import '@styles/store/Queue.scss';
import '@styles/store/Sidebar.scss';
import '@styles/store/Store.scss';

// Types
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

interface StoreLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Welcome to Red Steam',
  description: 'Browse Steam games and offers.',
};

export default function StoreLayout({ children }: StoreLayoutProps) {
  return (
    <>
      <Header />
      <Sidebar />
      <SecondNavbar />
      {children}
      <Footer />
    </>
  );
}
