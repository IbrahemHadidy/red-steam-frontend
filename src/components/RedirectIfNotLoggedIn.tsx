'use client';
import { AuthContext } from 'contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

const RedirectIfNotLoggedIn = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth/login');
    }
  }, [isLoggedIn, router]);

  return null;
};

export default RedirectIfNotLoggedIn;
