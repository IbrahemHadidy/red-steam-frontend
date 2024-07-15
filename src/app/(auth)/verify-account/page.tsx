'use client';
import LoadingPage from 'components/LoadingPage/LoadingPage';
import useDynamicMetaTags from 'hooks/useDynamicMetaTags';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect } from 'react';
import { verifyEmail } from 'services/user/auth';

const VerifyAccount: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams?.get('username');
  const token = searchParams?.get('token');

  useDynamicMetaTags({
    title: 'Verifying...',
  });

  useEffect(() => {
    if (username && token) {
      const verifyEmailAsync = async () => {
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
