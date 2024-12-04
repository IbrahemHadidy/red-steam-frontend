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
import promiseToast from '@utils/promiseToast';

export default function VerifyAccount() {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  //---------------------------- Search Params ----------------------------//
  const username = searchParams?.get('username');
  const token = searchParams?.get('token');

  //------------------------------- Effects -------------------------------//
  // Set Page Title
  useEffect(() => {
    document.title = 'Verifying...';
  }, []);

  // Handle Email Verification
  useEffect(() => {
    if (username && token) {
      (async (): Promise<void> => {
        const response = await promiseToast(
          dispatch(userAuthApi.endpoints.verifyEmail.initiate({ token, username })).unwrap(),
          {
            pending: 'Verifying email',
            success: 'Email verified successfully',
            fallbackError: 'Error verifying email',
          }
        );

        if (response) {
          toast.success(response.message);
          await dispatch(fetchUserData());
        }
        router.push('/');
      })();
    }
  }, [dispatch, router, token, username]);

  return <LoadingPage />;
}
