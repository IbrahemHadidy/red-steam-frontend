'use client';

// React
import { useEffect } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Toast notifications
import { toast } from 'react-toastify';

export default function RedirectIfLoggedIn(): null {
  // Init
  const router = useRouter();

  // States
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      toast.info('You are already logged in, redirecting to home page...');
      router.push('/');
    }
  }, [isLoggedIn, router]);

  return null;
}
