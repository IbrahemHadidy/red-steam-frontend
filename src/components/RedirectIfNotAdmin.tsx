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
  // Init
  const router = useRouter();

  // States
  const { userData } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!userData?.isAdmin) {
      toast.warn('You are not authorized to access this page!');
      router.push('/');
    }
  }, [userData, router]);

  return null;
}
