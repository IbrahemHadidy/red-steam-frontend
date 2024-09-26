'use client';

// React
import { useEffect } from 'react';

// NextJS
import { useRouter, useSearchParams } from 'next/navigation';

// Components
import LoadingPage from '@app/loading';

// Services
import { verifyEmail } from '@services/user/auth';

// Types
import type { FC, JSX } from 'react';

const VerifyAccount: FC = (): JSX.Element => {
  // Init
  const router = useRouter();
  const searchParams = useSearchParams();

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
        if (response.success) {
          router.push('/');
        }
      };
      verifyEmailAsync();
    }
  }, [router, token, username]);

  return <LoadingPage />;
};

export default VerifyAccount;
