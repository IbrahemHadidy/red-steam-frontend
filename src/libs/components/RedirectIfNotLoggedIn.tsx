'use client';

// React
import { useEffect } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Toast notifications
import { toast } from 'react-toastify';

export default function RedirectIfNotLoggedIn(): null {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();

  //------------------------------- States --------------------------------//
  const { isUserLoggedIn, isAuthInitialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isUserLoggedIn && isAuthInitialized) {
      toast.info('Please log in first to access this page!');
      router.push('/login');
    }
  }, [isAuthInitialized, isUserLoggedIn, router]);

  return null;
}
