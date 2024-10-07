'use client';

// React
import { useEffect } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Components
import SignIn from '../_SignInAndRecovery/SignInAndRecovery';

// Types
import type { JSX } from 'react';

export default function SignInPage(): JSX.Element {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  return <SignIn />;
}
