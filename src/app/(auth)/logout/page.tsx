'use client';

// React
import { useEffect } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Thunks
import { logout } from '@store/features/auth/authThunks';

// Components
import Loading from '@app/loading';

export default function LogoutPage() {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      // Logout if user is logged in
      if (isUserLoggedIn) await dispatch(logout());
      router.push('/');
    })();
  }, [dispatch, isUserLoggedIn, router]);

  return <Loading />;
}
