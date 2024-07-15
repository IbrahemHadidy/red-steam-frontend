'use client';

// React
import { useEffect } from 'react';

// Next.js
import { useRouter, useSearchParams } from 'next/navigation';

// Hooks
import useDynamicMetaTags from 'hooks/useDynamicMetaTags';

// Services
import { verifyEmail } from 'services/user/auth';

// Components
import LoadingPage from '../loading';

export default function VerifyAccount(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams?.get('token');
  const username = searchParams?.get('username');

  useDynamicMetaTags({
    title: 'Verifying...',
  });

  useEffect(() => {
    if (username && token) {
      const verifyEmailAsync = async () => {
        const response = await verifyEmail(token, username);
        if (response.success) router.push('/');
      };
      verifyEmailAsync();
    }
  }, [router, token, username]);

  return <LoadingPage />;
}
