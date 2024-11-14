'use client';

// React
import { use, useEffect } from 'react';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Handlers
import { setType } from '@store/features/user/login/loginSlice';

// Custom Hooks
import useInitializePasswordReset from './_hooks/useInitializePasswordReset';

// Components
import ResetPassword from '@app/(auth)/_SignInAndRecovery/SignInAndRecovery';
import RedirectIfLoggedIn from '@components/RedirectIfLoggedIn';

interface ResetPasswordPageProps {
  params: Promise<{
    token: string;
  }>;
}

export default function ResetPasswordPage(props: ResetPasswordPageProps) {
  //--------------------------- Initializations ---------------------------//
  const params = use(props.params);
  const { token } = params;
  const dispatch = useAppDispatch();

  // Set the state "type" to 'Password Reset'
  useEffect(() => {
    dispatch(setType('Password Reset'));
  }, [dispatch]);

  // Initialize password reset
  useInitializePasswordReset({ token });

  return (
    <>
      <RedirectIfLoggedIn />
      <ResetPassword />
    </>
  );
}
