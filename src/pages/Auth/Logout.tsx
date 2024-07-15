'use client';

// React
import { useContext } from 'react';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

const Logout = (): null => {
  const { logout } = useContext(AuthContext);
  logout();
  return null;
};

export default Logout;
