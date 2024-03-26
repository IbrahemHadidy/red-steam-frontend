import { FC, useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import Header from 'components/Header/Header';
import SecondNavbar from 'components/SecondNavbar/SecondNavbar';
import Sidebar from './Sidebar/Sidebar';
import Featured from './Featured/Featured';
import Offers from './Offers/Offers';
import Categories from './Categories/Categories';
import Queue from './Recommended/Queue';
import Recommended from './Recommended/Recommended';
import LoginQueue from './Recommended/LoginQueue';
import PopularVR from './PopularVR/PopularVR';
import BrowseSteam from './BrowseSteam/BrowseSteam';
import HomeTabs from './HomeTabs/HomeTabs';
import Footer from 'components/Footer/Footer';
import useDynamicMetaTags from 'hooks/useDynamicMetaTags';
import './Store.scss';

const Store: FC = () => {
  const { isLoggedIn } = useContext(AuthContext);

	useDynamicMetaTags({
    title: 'Welcome to Red Steam',
    background:
      "url('/images/colored_body_top.png') center top no-repeat #1b2838",
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
