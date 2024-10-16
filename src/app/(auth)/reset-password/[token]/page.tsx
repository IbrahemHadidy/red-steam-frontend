'use client';

// React
import { useEffect } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Actions
import { checkResetToken } from '@store/features/user/recovery/recoverySlice';

// Components
import ResetPassword from '@app/(auth)/_SignInAndRecovery/SignInAndRecovery';
import RedirectIfLoggedIn from '@components/RedirectIfLoggedIn';

interface ResetPasswordPageProps {
  params: {
    token: string;
  };
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps): JSX.Element {
  const { token } = params;
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Handle reset token on password reset page
  useEffect(() => {
    dispatch(checkResetToken({ token, router }));
  }, [dispatch, router, token]);

  return (
    <>
      <RedirectIfLoggedIn />
      <ResetPassword type="Password Reset" />
    </>
  );
}
