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
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();

  //------------------------------- States --------------------------------//
  const { isUserLoggedIn, isAuthInitialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isUserLoggedIn && isAuthInitialized) {
      toast.info('You are already logged in, redirecting to home page...');
      router.push('/');
    }
  }, [isAuthInitialized, isUserLoggedIn, router]);

  return null;
}
