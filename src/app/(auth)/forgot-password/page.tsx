'use client';
import { AuthContext } from 'contexts/AuthContext';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

const ForgotPassword = dynamic(() => import('pages/Auth/SignInAndRecovery'), { ssr: false });

const ForgotPasswordPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  return !isLoggedIn ? <ForgotPassword /> : null;
};

export default ForgotPasswordPage;
