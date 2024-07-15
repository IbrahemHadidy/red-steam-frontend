'use client';

// Next.js
import dynamic from 'next/dynamic';

// Components
const DefaultDesktopComponent = dynamic(() => import('./Desktop/DefaultDesktopComponent'), {
  ssr: false,
});
const CustomMobileComponent = dynamic(() => import('./Mobile/CustomMobileComponent'), {
  ssr: false,
});

// Hooks
import useResponsiveViewport from 'hooks/useResponsiveViewport';

// Styles
import './Header.scss';

// Types
import type { FC } from 'react';

const Header: FC = () => {
  const isViewport960 = useResponsiveViewport(960);

  return <>{isViewport960 ? <CustomMobileComponent /> : <DefaultDesktopComponent />}</>;
};

export default Header;
