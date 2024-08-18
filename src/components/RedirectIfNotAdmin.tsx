'use client';

// React
import { useContext, useEffect } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Toast notifications
import { toast } from 'react-toastify';

// Types
import type { FC } from 'react';

const RedirectIfNotAdmin: FC = (): null => {
  const { userData } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!userData?.isAdmin) {
      toast.warn('You are not authorized to access this page!');
      router.push('/');
    }
  }, [userData, router]);

  return null;
};

export default RedirectIfNotAdmin;
