'use client';

// NextJS
import dynamic from 'next/dynamic';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Styles
import '@styles/components/SecondNavbar.scss';

// Types
import type { JSX } from 'react';

const DesktopSecondNav = dynamic(() => import('./Desktop/DesktopSecondNav'), { ssr: false });
const MobileSecondNav = dynamic(() => import('./Mobile/MobileSecondNav'), { ssr: false });

export default function SecondNavbar(): JSX.Element {
  const isViewport960 = useResponsiveViewport(960);

  return <>{isViewport960 ? <MobileSecondNav /> : <DesktopSecondNav />}</>;
}
