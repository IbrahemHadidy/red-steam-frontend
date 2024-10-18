'use client';

// NextJS
import dynamic from 'next/dynamic';

// Components
const FeaturedDesktop = dynamic(() => import('./Desktop/FeaturedDesktop'), {
  loading: () => <LoadingSkeleton />,
});
const FeaturedMobile = dynamic(() => import('./Mobile/FeaturedMobile'));

// Skeletons
const LoadingSkeleton = dynamic(() => import('./Desktop/Skeleton'));

// Redux Hooks
import { useGetFeaturedQuery } from '@store/apis/game/data';
import { useAppSelector } from '@store/hooks';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

export default function Featured() {
  // Init
  const isViewport960 = useResponsiveViewport(960);

  // States
  const { currentUserData } = useAppSelector((state) => state.auth);

  // Queries
  const { data: featuredGames, isLoading } = useGetFeaturedQuery({
    excludedGames: currentUserData?.library.map((game) => game.id) ?? [],
    limit: 12,
  });

  return (
    <>
      {isViewport960 ? (
        isLoading ? (
          <LoadingSkeleton />
        ) : (
          <FeaturedMobile featuredGames={featuredGames ?? []} />
        )
      ) : (
        <FeaturedDesktop featuredGames={featuredGames ?? []} />
      )}
    </>
  );
}
