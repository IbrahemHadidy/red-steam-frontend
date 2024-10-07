'use client';

// React
import { Suspense, useEffect, useState } from 'react';

// NextJS
import dynamic from 'next/dynamic';

// Components
const FeaturedDesktop = dynamic(() => import('./Desktop/FeaturedDesktop'), { ssr: false });
const FeaturedMobile = dynamic(() => import('./Mobile/FeaturedMobile'), { ssr: false });

// Skeletons
const LoadingSkeleton = dynamic(() => import('./Desktop/Skeleton'), { ssr: false });

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Services
import { getFeatured } from '@services/game/data';

// Types
import type { Game } from '@entities/game.entity';
import type { JSX } from 'react';

export default function Featured(): JSX.Element {
  // Init
  const isViewport960 = useResponsiveViewport(960);

  // States
  const { userData } = useAppSelector((state) => state.auth);
  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);

  // Get featured games
  useEffect(() => {
    const fetchFeatured = async (): Promise<void> => {
      const data = await getFeatured(
        (userData && userData.library.map((game) => game.id)) || [],
        12
      );
      setFeaturedGames(data);
    };
    fetchFeatured();
  }, [userData]);

  return (
    <>
      {isViewport960 ? (
        <FeaturedMobile featuredGames={featuredGames} />
      ) : (
        <Suspense fallback={<LoadingSkeleton />}>
          <FeaturedDesktop featuredGames={featuredGames} />
        </Suspense>
      )}
    </>
  );
}
