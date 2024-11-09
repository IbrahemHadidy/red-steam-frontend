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
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Styles
import '@styles/components/Header.scss';

export default function Header() {
  const isViewport960 = useResponsiveViewport(960);

  return <>{isViewport960 ? <CustomMobileComponent /> : <DefaultDesktopComponent />}</>;
}
