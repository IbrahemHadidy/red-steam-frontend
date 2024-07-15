'use client';
import { AuthContext } from 'contexts/AuthContext';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

const ResetPassword = dynamic(() => import('pages/Auth/SignInAndRecovery'), { ssr: false });

const ResetPasswordPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  return !isLoggedIn ? <ResetPassword /> : null;
};

export default ResetPasswordPage;
