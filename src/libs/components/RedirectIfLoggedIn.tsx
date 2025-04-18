'use client';

// React
import { useEffect } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

export default function RedirectIfLoggedIn(): null {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();

  //------------------------------- States --------------------------------//
  const { isUserLoggedIn, isAuthInitialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isUserLoggedIn && isAuthInitialized) {
      router.push('/');
    }
  }, [isAuthInitialized, isUserLoggedIn, router]);

  return null;
}
