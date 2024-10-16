'use client';

// Components
import RedirectIfLoggedIn from '@components/RedirectIfLoggedIn';
import ForgotPassword from '../_SignInAndRecovery/SignInAndRecovery';

export default function ForgotPasswordPage() {
  return (
    <>
      <RedirectIfLoggedIn />
      <ForgotPassword type="Name / Password Recovery" />
    </>
  );
}
