'use client';

// Components
import RedirectIfLoggedIn from '@components/RedirectIfLoggedIn';
import ResetPassword from '../_SignInAndRecovery/SignInAndRecovery';

// Types
import type { FC, JSX } from 'react';

const ResetPasswordPage: FC = (): JSX.Element => {
  return (
    <>
      <RedirectIfLoggedIn />
      <ResetPassword />
    </>
  );
};

export default ResetPasswordPage;
