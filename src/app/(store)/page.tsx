'use client';

// React
import { Suspense, useContext } from 'react';

// NextJS
import dynamic from 'next/dynamic';

// Contexts
import { AuthContext } from '@contexts/AuthContext';

// Components
const BrowseSteam = dynamic(() => import('./_BrowseSteam/BrowseSteam'));
const Categories = dynamic(() => import('./_Categories/Categories'));
const Featured = dynamic(() => import('./_Featured/Featured'));
const HomeTabs = dynamic(() => import('./_HomeTabs/HomeTabs'));
const LoginQueue = dynamic(() => import('./_Recommended/LoginQueue'));
const Queue = dynamic(() => import('./_Recommended/Queue'));
const Recommended = dynamic(() => import('./_Recommended/Recommended'));
const Offers = dynamic(() => import('./_Offers/Offers'));

// Skeletons
const OffersSkeleton = dynamic(() => import('./_Offers/Skeleton'));

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';

// Types
import type { FC, JSX } from 'react';

const StorePage: FC = (): JSX.Element => {
  const { isLoggedIn } = useContext(AuthContext);
  useDynamicBackground("url('/images/colored_body_top.png') center top no-repeat #1b2838");

  return (
    <div className="store">
      <Featured />
      <Suspense fallback={<OffersSkeleton />}>
        <Offers />
      </Suspense>
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
      <HomeTabs />
    </div>
  );
};

export default StorePage;
