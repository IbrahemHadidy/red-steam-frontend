'use client';
import { AuthContext } from 'contexts/AuthContext';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

const SignIn = dynamic(() => import('pages/Auth/SignInAndRecovery'), { ssr: false });

const SignInPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  return !isLoggedIn ? <SignIn /> : null;
};

export default SignInPage;
