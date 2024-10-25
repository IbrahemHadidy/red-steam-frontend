'use client';

// React
import { useEffect } from 'react';

// NextJS
import { useRouter, useSearchParams } from 'next/navigation';

// Toast Notification
import { toast } from 'react-toastify';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Thunks
import { fetchUserData } from '@store/features/auth/authThunks';

// Components
import LoadingPage from '@app/loading';

// APIs
import userAuthApi from '@store/apis/user/auth';

export default function VerifyAccount() {
  // Init
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  // Get params
  const username: string | null = searchParams?.get('username');
  const token: string | null = searchParams?.get('token');

  useEffect(() => {
    document.title = 'Verifying...';
  }, []);

  useEffect(() => {
    if (username && token) {
      (async (): Promise<void> => {
        const response = await dispatch(
          userAuthApi.endpoints.verifyEmail.initiate({ token, username })
        ).unwrap();

        if (response.message) {
          toast.success(response.message);
          await dispatch(fetchUserData());
          router.push('/');
        }
      })();
    }
  }, [dispatch, router, token, username]);

  return <LoadingPage />;
}
