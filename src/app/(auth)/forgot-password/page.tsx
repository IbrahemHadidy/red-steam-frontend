'use client';

// React
import { useEffect } from 'react';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Handlers
import { reset, setType } from '@store/features/user/login/loginSlice';

// Components
import RedirectIfLoggedIn from '@components/RedirectIfLoggedIn';
import ForgotPassword from '../_SignInAndRecovery/SignInAndRecovery';

// Enums
import { LoginFormType } from '@enums/login-form';

export default function ForgotPasswordPage() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setType(LoginFormType.FORGOT_PASSWORD));

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <>
      <RedirectIfLoggedIn />
      <ForgotPassword />
    </>
  );
}
