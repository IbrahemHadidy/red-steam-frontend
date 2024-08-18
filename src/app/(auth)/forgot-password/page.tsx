'use client';

// Components
import RedirectIfLoggedIn from 'components/RedirectIfLoggedIn';
import ForgotPassword from '../_SignInAndRecovery/SignInAndRecovery';

// Types
import type { FC, JSX } from 'react';

const ForgotPasswordPage: FC = (): JSX.Element => {
  return (
    <>
      <RedirectIfLoggedIn />
      <ForgotPassword />
    </>
  );
};

export default ForgotPasswordPage;
