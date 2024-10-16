'use client';

// NextJS
import dynamic from 'next/dynamic';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Components
const BrowseSteam = dynamic(() => import('./_BrowseSteam/BrowseSteam'));
const Categories = dynamic(() => import('./_Categories/Categories'));
const Featured = dynamic(() => import('./_Featured/Featured'));
const HomeTabs = dynamic(() => import('./_HomeTabs/HomeTabs'));
const LoginQueue = dynamic(() => import('./_Recommended/LoginQueue'));
const Queue = dynamic(() => import('./_Recommended/Queue'));
const Recommended = dynamic(() => import('./_Recommended/Recommended'));
const Offers = dynamic(() => import('./_Offers/Offers'), { loading: () => <OffersSkeleton /> });

// Skeletons
const OffersSkeleton = dynamic(() => import('./_Offers/Skeleton'));

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';

export default function StorePage() {
  // Init
  useDynamicBackground("url('/images/colored_body_top.png') center top no-repeat #1b2838");

  // States
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);

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
