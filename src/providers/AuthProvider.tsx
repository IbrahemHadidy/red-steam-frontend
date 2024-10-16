'use client';

// React
import { useEffect } from 'react';

// NextJS
import { usePathname, useRouter } from 'next/navigation';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Actions
import { onLoadIntialization } from '@store/features/auth/authSlice';

// Redux Thunks
import { checkVerificationAndTagsStatus } from '@store/features/auth/authThunks';

// Components
import Loading from '@app/loading';
import VerifyModal from '@components/SignUpVerifyModal/SignUpVerifyModal';

// Types
import type { JSX, ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  // Init
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  // States
  const {
    authOnLoadIntialized,
    currentUserData,
    isUserLoggedIn,
    isVerifyModalVisible,
    isAuthInitialized,
  } = useAppSelector((state) => state.auth);

  const isNotVerifyPath = !pathname.includes('/verify-account');

  // Handle authentication on load
  useEffect(() => {
    dispatch(onLoadIntialization());
  }, [dispatch, router]);

  // Handle user authentication
  useEffect(() => {
    if (currentUserData && isUserLoggedIn && isNotVerifyPath) {
      (async () => {
        await dispatch(checkVerificationAndTagsStatus({ router }));
      })();
    }
  }, [currentUserData, dispatch, isNotVerifyPath, isUserLoggedIn, router]);

  return isAuthInitialized && authOnLoadIntialized ? (
    <>
      {isVerifyModalVisible && <VerifyModal />}
      {children}
    </>
  ) : (
    <Loading />
  );
}
