'use client';

// React
import { useContext } from 'react';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Components
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import SecondNavbar from 'components/SecondNavbar/SecondNavbar';
import BrowseSteam from './BrowseSteam/BrowseSteam';
import Categories from './Categories/Categories';
import Featured from './Featured/Featured';
import HomeTabs from './HomeTabs/HomeTabs';
import Offers from './Offers/Offers';
import PopularVR from './PopularVR/PopularVR';
import LoginQueue from './Recommended/LoginQueue';
import Queue from './Recommended/Queue';
import Recommended from './Recommended/Recommended';
import Sidebar from './Sidebar/Sidebar';

// Hooks
import useDynamicMetaTags from 'hooks/useDynamicMetaTags';

// Styles
import './Store.scss';

// Types
import type { FC } from 'react';

const Store: FC = () => {
  const { isLoggedIn } = useContext(AuthContext);

  useDynamicMetaTags({
    title: 'Welcome to Red Steam',
    background: "url('/images/colored_body_top.png') center top no-repeat #1b2838",
    description: 'Browse Steam games and offers.',
  });

  return (
    <div className="store">
      <Header />
      <Sidebar />
      <SecondNavbar />
      <Featured />
      <Offers />
      <Categories />
      {isLoggedIn ? (
        <>
          <Queue />
          <Recommended />
        </>
      ) : (
        <LoginQueue />
      )}
      <BrowseSteam />
      <PopularVR />
      <HomeTabs />
      <Footer />
    </div>
  );
};

export default Store;
