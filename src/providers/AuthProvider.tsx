'use client';

// React
import { useEffect, useState } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Actions
import { setIsLoggedIn, setIsReady, setUserData } from '@store/features/auth/authSlice';

// Redux Thunks
import {
  autoLoginOnLoad,
  checkVerificationAndTagsStatus,
  checkVerificationStatus,
  fetchUserData,
  refreshAuthorizationToken,
} from '@store/features/auth/authThunks';

// Channels
import { authChannel } from '@services/channels';

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
  const dispatch = useAppDispatch();

  // States
  const { isLoggedIn, userData, showVerifyModal, isReady } = useAppSelector((state) => state.auth);
  const [onLoadInitialized, setOnLoadInitialized] = useState<boolean>(false);

  // Handle authentication on load
  useEffect(() => {
    const onLoad = async () => {
      await dispatch(autoLoginOnLoad());

      if (isLoggedIn) {
        await dispatch(fetchUserData(router));
        await dispatch(refreshAuthorizationToken(router));
      }

      if (userData) {
        !userData.isVerified && (await dispatch(checkVerificationStatus({ userData, router })));
        await dispatch(checkVerificationAndTagsStatus({ userData, router }));
      }

      setOnLoadInitialized(true);
    };

    if (!onLoadInitialized) onLoad();
  }, [dispatch, isLoggedIn, onLoadInitialized, router, userData]);

  // Listen for login status updates accross tabs
  useEffect(() => {
    authChannel.onmessage = (event) => {
      if (event.data.isLoggedIn) {
        dispatch(setIsLoggedIn(true));
        dispatch(setUserData(event.data.userData));
        dispatch(setIsReady(true));
      } else {
        dispatch(setIsLoggedIn(false));
        dispatch(setUserData(null));
        dispatch(setIsReady(true));
      }
    };

    return () => {
      authChannel.close();
    };
  }, [dispatch]);

  return isReady ? (
    <>
      {children}
      {isLoggedIn && showVerifyModal && <VerifyModal />}
    </>
  ) : (
    <Loading />
  );
}
