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
const Recommended = dynamic(() => import('./_Recommended/Recommended'), {
  loading: () => <RecommendedSkeleton />,
});
const Queue = dynamic(() => import('./_Recommended/Queue'));
const LoginFirst = dynamic(() => import('./_Recommended/LoginFirst'));
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
  //------------------------------- States --------------------------------//
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);
  const { isAuthInitialized, authOnLoadIntialized } = useAppSelector((state) => state.auth);

  const [offersLoaded, setOffersLoaded] = useState<boolean>(false);
  const [categoriesLoaded, setCategoriesLoaded] = useState<boolean>(false);
  const [userSectionLoaded, setUserSectionLoaded] = useState<boolean>(false);
  const [browseSteamLoaded, setBrowseSteamLoaded] = useState<boolean>(false);

  //------------------------------- Render --------------------------------//
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

        {offersLoaded && (
          <RenderOnViewportEntry onLoadComplete={() => setCategoriesLoaded(true)}>
            <Categories />
          </RenderOnViewportEntry>
        )}

        {categoriesLoaded && (
          <RenderOnViewportEntry onLoadComplete={() => setUserSectionLoaded(true)}>
            {isUserLoggedIn ? (
              <>
                <Queue />
                <Recommended />
              </>
            ) : (
              <LoginFirst />
            )}
          </RenderOnViewportEntry>
        )}

        {userSectionLoaded && (
          <RenderOnViewportEntry onLoadComplete={() => setBrowseSteamLoaded(true)}>
            <BrowseSteam />
          </RenderOnViewportEntry>
        )}

        {browseSteamLoaded && (
          <RenderOnViewportEntry loader={<TabsSkeleton />}>
            <HomeTabs />
          </RenderOnViewportEntry>
        )}
      </div>
    );
  }
}
