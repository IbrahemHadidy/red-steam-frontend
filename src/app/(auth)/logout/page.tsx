'use client';

// React
import { useContext, useEffect } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Types
import type { FC } from 'react';

const LogoutPage: FC = (): null => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      logout();
    }
    router.push('/');
  }, [isLoggedIn, logout, router]);

  return null;
};

export default LogoutPage;
