'use client';

// Components
import RedirectIfLoggedIn from '@components/RedirectIfLoggedIn';
import ForgotPassword from '../_SignInAndRecovery/SignInAndRecovery';

// Types
import type { JSX } from 'react';

export default function ForgotPasswordPage(): JSX.Element {
  return (
    <>
      <RedirectIfLoggedIn />
      <ForgotPassword />
    </>
  );
}
