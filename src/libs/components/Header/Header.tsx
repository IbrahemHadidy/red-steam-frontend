'use client';

// NextJS
import dynamic from 'next/dynamic';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Components
import LoadingSkeleton from './Skeleton';
const DefaultDesktopComponent = dynamic(() => import('./Desktop/DefaultDesktopComponent'), {
  loading: () => <LoadingSkeleton />,
});
const CustomMobileComponent = dynamic(() => import('./Mobile/CustomMobileComponent'), {
  loading: () => <LoadingSkeleton />,
});

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Styles
import '@styles/components/Header.scss';

export default function Header() {
  const { isAuthInitialized, authOnLoadIntialized } = useAppSelector((state) => state.auth);

  if (!isAuthInitialized || !authOnLoadIntialized) {
    return <LoadingSkeleton />;
  } else {
    return <HeaderComponent />;
  }
}

function HeaderComponent() {
  const isViewport960OrLess = useResponsiveViewport(960);
  return <>{isViewport960OrLess ? <CustomMobileComponent /> : <DefaultDesktopComponent />}</>;
}
