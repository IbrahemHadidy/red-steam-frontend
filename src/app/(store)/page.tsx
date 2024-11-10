'use client';

// React
import { useState } from 'react';

// NextJS
import dynamic from 'next/dynamic';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';

// Constants
import { HOME_DESKTOP_BG } from '@config/constants/backgrounds';

// Components
import RenderOnViewportEntry from '@components/RenderOnViewportEntry';

const Featured = dynamic(() => import('./_Featured/Featured'), {
  loading: () => <FeaturedSkeleton />,
});
const Offers = dynamic(() => import('./_Offers/Offers'), {
  loading: () => <OffersSkeleton />,
});
const Categories = dynamic(() => import('./_Categories/Categories'));
const Queue = dynamic(() => import('./_Recommended/Queue'));
const Recommended = dynamic(() => import('./_Recommended/Recommended'), {
  loading: () => <RecommendedSkeleton />,
});
const LoginQueue = dynamic(() => import('./_Recommended/LoginQueue'));
const BrowseSteam = dynamic(() => import('./_BrowseSteam/BrowseSteam'));
const HomeTabs = dynamic(() => import('./_HomeTabs/HomeTabs'), {
  loading: () => <TabsSkeleton />,
});

// Skeletons
import FeaturedSkeleton from './_Featured/Skeleton';
import TabsSkeleton from './_HomeTabs/Skeleton';
import OffersSkeleton from './_Offers/Skeleton';
import RecommendedSkeleton from './_Recommended/Skeleton';

export default function StorePage() {
  //--------------------------- State Selectors ---------------------------//
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);
  const { isAuthInitialized, authOnLoadIntialized } = useAppSelector((state) => state.auth);

  //----------------------------- State Hooks -----------------------------//
  const [offersLoaded, setOffersLoaded] = useState<boolean>(false);
  const [categoriesLoaded, setCategoriesLoaded] = useState<boolean>(false);
  const [userSectionLoaded, setUserSectionLoaded] = useState<boolean>(false);
  const [browseSteamLoaded, setBrowseSteamLoaded] = useState<boolean>(false);

  //-------------------------- Render UI Section --------------------------//
  useDynamicBackground(HOME_DESKTOP_BG);

  if (!isAuthInitialized || !authOnLoadIntialized) {
    return (
      <>
        <FeaturedSkeleton />
        <OffersSkeleton />
      </>
    );
  } else {
    return (
      <div className="store">
        <Featured />

        <RenderOnViewportEntry
          loader={<OffersSkeleton />}
          onLoadComplete={() => setOffersLoaded(true)}
        >
          <Offers />
        </RenderOnViewportEntry>

        <RenderOnViewportEntry
          shouldLoad={offersLoaded}
          onLoadComplete={() => setCategoriesLoaded(true)}
        >
          <Categories />
        </RenderOnViewportEntry>

        <RenderOnViewportEntry
          shouldLoad={categoriesLoaded}
          onLoadComplete={() => setUserSectionLoaded(true)}
        >
          {isUserLoggedIn ? (
            <>
              <Queue />
              <Recommended />
            </>
          ) : (
            <LoginQueue />
          )}
        </RenderOnViewportEntry>

        <RenderOnViewportEntry
          shouldLoad={userSectionLoaded}
          onLoadComplete={() => setBrowseSteamLoaded(true)}
        >
          <BrowseSteam />
        </RenderOnViewportEntry>

        <RenderOnViewportEntry loader={<TabsSkeleton />} shouldLoad={browseSteamLoaded}>
          <HomeTabs />
        </RenderOnViewportEntry>
      </div>
    );
  }
}
