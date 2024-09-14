'use client';

// React
import { useContext, useEffect } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Toast notifications
import { toast } from 'react-toastify';

// Contexts
import { AuthContext } from '@contexts/AuthContext';

// Types
import type { FC } from 'react';

const RedirectIfLoggedIn: FC = (): null => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      toast.info('You are already logged in, redirecting to home page...');
      router.push('/');
    }
  }, [isLoggedIn, router]);

  return null;
};

export default RedirectIfLoggedIn;
