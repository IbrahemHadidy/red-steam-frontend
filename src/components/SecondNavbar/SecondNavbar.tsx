'use client';

// Next.js
import dynamic from 'next/dynamic';

// Hooks
import useResponsiveViewport from 'hooks/useResponsiveViewport';

// Styles
import 'components/SecondNavbar/SecondNavbar.scss';

// Types
import type { FC } from 'react';

const DesktopSecondNav = dynamic(() => import('./Desktop/DesktopSecondNav'), { ssr: false });
const MobileSecondNav = dynamic(() => import('./Mobile/MobileSecondNav'), { ssr: false });

const SecondNavbar: FC = () => {
  const isViewport960 = useResponsiveViewport(960);

  return <>{isViewport960 ? <MobileSecondNav /> : <DesktopSecondNav />}</>;
};

export default SecondNavbar;
