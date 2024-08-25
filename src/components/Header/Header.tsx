'use client';

// NextJS
import dynamic from 'next/dynamic';

// Components
const DefaultDesktopComponent = dynamic(() => import('./Desktop/DefaultDesktopComponent'), {
  ssr: false,
});
const CustomMobileComponent = dynamic(() => import('./Mobile/CustomMobileComponent'), {
  ssr: false,
});

// Custom Hooks
import useResponsiveViewport from 'hooks/useResponsiveViewport';

// Styles
import 'styles/components/Header.scss';

// Types
import type { FC, JSX } from 'react';

const Header: FC = (): JSX.Element => {
  const isViewport960 = useResponsiveViewport(960);

  return <>{isViewport960 ? <CustomMobileComponent /> : <DefaultDesktopComponent />}</>;
};

export default Header;
