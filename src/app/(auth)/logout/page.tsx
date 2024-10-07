'use client';

// React
import { useEffect } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Thunks
import { logout } from '@store/features/auth/authThunks';

export default function LogoutPage(): null {
  // Init
  const router = useRouter();
  const dispatch = useAppDispatch();

  // States
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const handleLogout = async () => {
      if (isLoggedIn) {
        await dispatch(logout(router));
      }
    };

    handleLogout();
  }, [dispatch, isLoggedIn, router]);

  return null;
}
