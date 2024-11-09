'use client';

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
const BrowseSteam = dynamic(() => import('./_BrowseSteam/BrowseSteam'));
const Categories = dynamic(() => import('./_Categories/Categories'));
const Featured = dynamic(() => import('./_Featured/Featured'), {
  loading: () => <FeaturedSkeleton />,
});
const HomeTabs = dynamic(() => import('./_HomeTabs/HomeTabs'), {
  loading: () => <TabsSkeleton />,
});
const LoginQueue = dynamic(() => import('./_Recommended/LoginQueue'));
const Queue = dynamic(() => import('./_Recommended/Queue'));
const Recommended = dynamic(() => import('./_Recommended/Recommended'), {
  loading: () => <RecommendedSkeleton />,
});
const Offers = dynamic(() => import('./_Offers/Offers'), {
  loading: () => <OffersSkeleton />,
});

// Skeletons
const FeaturedSkeleton = dynamic(() => import('./_Featured/Skeleton'));
const OffersSkeleton = dynamic(() => import('./_Offers/Skeleton'));
const RecommendedSkeleton = dynamic(() => import('./_Recommended/Skeleton'));
const TabsSkeleton = dynamic(() => import('./_HomeTabs/Skeleton'));

export default function StorePage() {
  //--------------------------- State Selectors ---------------------------//
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);

  //-------------------------- Render UI Section --------------------------//
  useDynamicBackground(HOME_DESKTOP_BG);

  return (
    <div className="store">
      <Featured />

      <RenderOnViewportEntry loader={<OffersSkeleton />}>
        <Offers />
      </RenderOnViewportEntry>

      <RenderOnViewportEntry>
        <Categories />
      </RenderOnViewportEntry>

      <RenderOnViewportEntry>
        {isUserLoggedIn ? (
          <>
            <Queue />
            <Recommended />
          </>
        ) : (
          <LoginQueue />
        )}
      </RenderOnViewportEntry>

      <RenderOnViewportEntry>
        <BrowseSteam />
      </RenderOnViewportEntry>

      <RenderOnViewportEntry loader={<TabsSkeleton />}>
        <HomeTabs />
      </RenderOnViewportEntry>
    </div>
  );
}
