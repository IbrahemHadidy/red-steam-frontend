// NextJS
import dynamic from 'next/dynamic';

// Components
const FeaturedDesktop = dynamic(() => import('./Desktop/FeaturedDesktop'), {
  loading: () => <LoadingSkeleton />,
});
const FeaturedMobile = dynamic(() => import('./Mobile/FeaturedMobile'));

// Skeletons
import LoadingSkeleton from './Skeleton';

// Redux Hooks
import { useGetFeaturedQuery } from '@store/apis/game/data';
import { useAppSelector } from '@store/hooks';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

export default function Featured() {
  //--------------------------- Initializations ---------------------------//
  const isViewport960OrLess = useResponsiveViewport(960);

  //------------------------------- States --------------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);

  // Queries
  const { data: featuredGames, isLoading } = useGetFeaturedQuery({
    excludedGames: currentUserData?.library.map((game) => game.id) ?? [],
    limit: 12,
  });

  return (
    <>
      {isLoading ? (
        <LoadingSkeleton />
      ) : isViewport960OrLess ? (
        <FeaturedMobile featuredGames={featuredGames ?? []} />
      ) : (
        <FeaturedDesktop featuredGames={featuredGames ?? []} />
      )}
    </>
  );
}
