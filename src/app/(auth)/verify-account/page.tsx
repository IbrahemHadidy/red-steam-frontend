'use client';

// React
import { useEffect, useState } from 'react';

// NextJS
import { useRouter, useSearchParams } from 'next/navigation';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Components
import LoadingPage from '@app/loading';
import VerifyModal from '@components/SignUpVerifyModal/SignUpVerifyModal';

// APIs
import userAuthApi from '@store/apis/user/auth';

// Utils
import promiseToast from '@utils/promiseToast';

export default function VerifyAccount() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const [isVerified, setIsVerified] = useState<boolean>(false);

  const username = searchParams?.get('username');
  const token = searchParams?.get('token');

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
          document.title = 'Account verified';
          setIsVerified(true);
        } else {
          router.push('/');
        }
      })();
    }
  }, [dispatch, router, token, username]);

  if (isVerified) {
    return <VerifyModal type="verified" />;
  } else {
    return <LoadingPage />;
  }
}
