'use client';

// Components
import RedirectIfLoggedIn from '@components/RedirectIfLoggedIn';
import ResetPassword from '../_SignInAndRecovery/SignInAndRecovery';

// Types
import type { JSX } from 'react';

export default function ResetPasswordPage(): JSX.Element {
  return (
    <>
      <RedirectIfLoggedIn />
      <ResetPassword />
    </>
  );
}
