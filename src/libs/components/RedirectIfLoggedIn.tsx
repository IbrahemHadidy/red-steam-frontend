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
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isUserLoggedIn) {
      toast.info('You are already logged in, redirecting to home page...');
      router.push('/');
    }
  }, [isUserLoggedIn, router]);

  return null;
}
