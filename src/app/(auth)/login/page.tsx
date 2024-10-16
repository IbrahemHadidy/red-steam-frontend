'use client';

// React
import { useEffect } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Components
import SignIn from '../_SignInAndRecovery/SignInAndRecovery';

export default function SignInPage() {
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (isUserLoggedIn) {
      router.back();
    }
  }, [isUserLoggedIn, router]);

  return <SignIn type="Sign In" />;
}
