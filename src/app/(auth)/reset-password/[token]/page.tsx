'use client';

// React
import { useEffect } from 'react';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Actions
import { setType } from '@store/features/user/login/loginSlice';

// Providers
import ResetPasswordProvider from '@providers/ResetPasswordProvider';

// Components
import ResetPassword from '@app/(auth)/_SignInAndRecovery/SignInAndRecovery';
import RedirectIfLoggedIn from '@components/RedirectIfLoggedIn';

interface ResetPasswordPageProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function ResetPasswordPage(props: ResetPasswordPageProps) {
  // Init
  const params = await props.params;
  const { token } = params;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setType('Password Reset'));
  }, [dispatch]);

  return (
    <ResetPasswordProvider token={token}>
      <RedirectIfLoggedIn />
      <ResetPassword />
    </ResetPasswordProvider>
  );
}
