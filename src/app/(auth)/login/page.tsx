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
import type { FC, JSX } from 'react';

const SignInPage: FC = (): JSX.Element => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  return <SignIn />;
};

export default SignInPage;
