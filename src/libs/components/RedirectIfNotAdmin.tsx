'use client';

// React
import { useEffect } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Toast notifications
import { toast } from 'react-toastify';

export default function RedirectIfNotAdmin(): null {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();

  //------------------------------- States --------------------------------//
  const { currentUserData, isAuthInitialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUserData?.isAdmin && isAuthInitialized) {
      toast.warn('You are not authorized to access this page!');
      router.push('/');
    }
  }, [currentUserData, isAuthInitialized, router]);

  return null;
}
