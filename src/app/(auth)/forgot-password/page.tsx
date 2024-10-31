'use client';

// React
import { useEffect } from 'react';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Handlers
import { setType } from '@store/features/user/login/loginSlice';

// Components
import RedirectIfLoggedIn from '@components/RedirectIfLoggedIn';
import ForgotPassword from '../_SignInAndRecovery/SignInAndRecovery';

export default function ForgotPasswordPage() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setType('Name / Password Recovery'));
  }, [dispatch]);

  return (
    <>
      <RedirectIfLoggedIn />
      <ForgotPassword />
    </>
  );
}
