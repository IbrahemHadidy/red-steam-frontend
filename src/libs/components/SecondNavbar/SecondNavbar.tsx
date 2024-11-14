'use client';

// NextJS
import dynamic from 'next/dynamic';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Components
import LoadingSkeleton from './Skeleton';
const DesktopSecondNav = dynamic(() => import('./Desktop/DesktopSecondNav'), {
  loading: () => <LoadingSkeleton />,
});
const MobileSecondNav = dynamic(() => import('./Mobile/MobileSecondNav'), {
  loading: () => <LoadingSkeleton />,
});

// Styles
import '@styles/components/SecondNavbar.scss';

export default function SecondNavbar() {
  const isViewport960OrLess = useResponsiveViewport(960);
  const { isAuthInitialized, authOnLoadIntialized } = useAppSelector((state) => state.auth);

  if (!isAuthInitialized || !authOnLoadIntialized) {
    return <LoadingSkeleton />;
  } else {
    return <>{isViewport960OrLess ? <MobileSecondNav /> : <DesktopSecondNav />}</>;
  }
}
