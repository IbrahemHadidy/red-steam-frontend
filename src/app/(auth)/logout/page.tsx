'use client';

// React
import { useContext, useEffect } from 'react';

// Contexts
import { AuthContext } from '@contexts/AuthContext';

// Types
import type { FC } from 'react';

const LogoutPage: FC = (): null => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      logout();
    }
  }, [isLoggedIn, logout]);

  return null;
};

export default LogoutPage;
