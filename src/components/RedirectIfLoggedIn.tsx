'use client';

// React
import { useContext, useEffect } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Toast notifications
import { toast } from 'react-toastify';

// Contexts
import { AuthContext } from '@contexts/AuthContext';

export default function RedirectIfLoggedIn(): null {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      toast.info('You are already logged in, redirecting to home page...');
      router.push('/');
    }
  }, [isLoggedIn, router]);

  return null;
}
