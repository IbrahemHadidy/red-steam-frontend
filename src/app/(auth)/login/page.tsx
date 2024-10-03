'use client';

// React
import { useContext, useEffect } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Contexts
import { AuthContext } from '@contexts/AuthContext';

// Components
import SignIn from '../_SignInAndRecovery/SignInAndRecovery';

// Types
import type { JSX } from 'react';

export default function SignInPage(): JSX.Element {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  return <SignIn />;
}
