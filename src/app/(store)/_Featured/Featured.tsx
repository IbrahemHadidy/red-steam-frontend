'use client';

// React
import { Suspense } from 'react';

// NextJS
import dynamic from 'next/dynamic';

// Components
const FeaturedDesktop = dynamic(() => import('./Desktop/FeaturedDesktop'), { ssr: false });
const FeaturedMobile = dynamic(() => import('./Mobile/FeaturedMobile'), { ssr: false });

// Skeletons
const LoadingSkeleton = dynamic(() => import('./Desktop/Skeleton'), { ssr: false });

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Types
import type { FC, JSX } from 'react';

const Featured: FC = (): JSX.Element => {
  // Init
  const isViewport960 = useResponsiveViewport(960);

  return (
    <>
      {isViewport960 ? (
        <FeaturedMobile />
      ) : (
        <Suspense fallback={<LoadingSkeleton />}>
          <FeaturedDesktop />
        </Suspense>
      )}
    </>
  );
};

export default Featured;
