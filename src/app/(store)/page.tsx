'use client';

// NextJS
import dynamic from 'next/dynamic';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Constants
import { HOME_DESKTOP_BG } from '@config/constants/backgrounds';

// Components
const BrowseSteam = dynamic(() => import('./_BrowseSteam/BrowseSteam'));
const Categories = dynamic(() => import('./_Categories/Categories'));
const Featured = dynamic(() => import('./_Featured/Featured'));
const HomeTabs = dynamic(() => import('./_HomeTabs/HomeTabs'), { loading: () => <TabsSkeleton /> });
const LoginQueue = dynamic(() => import('./_Recommended/LoginQueue'));
const Queue = dynamic(() => import('./_Recommended/Queue'));
const Recommended = dynamic(() => import('./_Recommended/Recommended'));
const Offers = dynamic(() => import('./_Offers/Offers'), { loading: () => <OffersSkeleton /> });

// Skeletons
const OffersSkeleton = dynamic(() => import('./_Offers/Skeleton'));
const TabsSkeleton = dynamic(() => import('./_HomeTabs/Skeleton'));

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';

export default function StorePage() {
  //--------------------------- Initializations ---------------------------//
  useDynamicBackground(HOME_DESKTOP_BG);

  //--------------------------- State Selectors ---------------------------//
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);

  //-------------------------- Render UI Section --------------------------//
  return (
    <div className="store">
      <Featured />
      <Offers />
      <Categories />
      {isUserLoggedIn ? (
        <>
          <Queue />
          <Recommended />
        </>
      ) : (
        <LoginQueue />
      )}
      <BrowseSteam />
      <HomeTabs />
    </div>
  );
}
