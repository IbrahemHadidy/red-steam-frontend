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

// Services
import { verifyEmail } from '@services/user/auth';

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
      const verifyEmailAsync = async (): Promise<void> => {
        const response = await verifyEmail(token, username);
        if (response.message) {
          toast.success(response.message);
          await dispatch(fetchUserData());
          router.push('/');
        }
      };
      verifyEmailAsync();
    }
  }, [dispatch, router, token, username]);

  return <LoadingPage />;
}
