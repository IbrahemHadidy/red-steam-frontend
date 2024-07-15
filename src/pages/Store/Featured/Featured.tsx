'use client';

// Next.js
import dynamic from 'next/dynamic';

// Components
const FeaturedDesktop = dynamic(() => import('./Desktop/FeaturedDesktop'), { ssr: false });
const FeaturedMobile = dynamic(() => import('./Mobile/FeaturedMobile'), { ssr: false });

// Hooks
import useResponsiveViewport from 'hooks/useResponsiveViewport';

// Styles
import './Featured.scss';

// Types
import { FC } from 'react';

const Featured: FC = () => {
  // Initializations
  const isViewport960 = useResponsiveViewport(960);

  return <div>{isViewport960 ? <FeaturedMobile /> : <FeaturedDesktop />}</div>;
};

export default Featured;
