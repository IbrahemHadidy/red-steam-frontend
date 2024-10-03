'use client';

// React
import { useContext, useEffect } from 'react';

// Contexts
import { AuthContext } from '@contexts/AuthContext';

export default function LogoutPage(): null {
  const { isLoggedIn, logout } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      logout();
    }
  }, [isLoggedIn, logout]);

  return null;
}
