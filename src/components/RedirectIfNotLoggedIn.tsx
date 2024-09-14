'use client';

// React
import { useContext, useEffect } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Contexts
import { AuthContext } from '@contexts/AuthContext';

// Toast notifications
import { toast } from 'react-toastify';

// Types
import type { FC } from 'react';

const RedirectIfNotLoggedIn: FC = (): null => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.info('Please log in first to access this page!');
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  return null;
};

export default RedirectIfNotLoggedIn;
