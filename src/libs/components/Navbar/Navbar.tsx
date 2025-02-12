'use client';

// NextJS
import dynamic from 'next/dynamic';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Components
import LoadingSkeleton from './Skeleton';
const DesktopNav = dynamic(() => import('./Desktop/DesktopNav'), {
  loading: () => <LoadingSkeleton />,
});
const MobileNav = dynamic(() => import('./Mobile/MobileNav'), {
  loading: () => <LoadingSkeleton />,
});

// Styles
import '@styles/components/Navbar.scss';

export default function Navbar() {
  const { isAuthInitialized, authOnLoadIntialized } = useAppSelector((state) => state.auth);

  if (!isAuthInitialized || !authOnLoadIntialized) {
    return <LoadingSkeleton />;
  } else {
    return <NavbarComponent />;
  }
}

function NavbarComponent() {
  const isViewport960OrLess = useResponsiveViewport(960);
  return <>{isViewport960OrLess ? <MobileNav /> : <DesktopNav />}</>;
}
