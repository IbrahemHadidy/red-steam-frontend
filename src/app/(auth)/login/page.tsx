'use client';

// React
import { useEffect } from 'react';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Actions
import { setType } from '@store/features/user/login/loginSlice';

// NextJS
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Components
import SignIn from '../_SignInAndRecovery/SignInAndRecovery';

export default function SignInPage() {
  // Init
  const router = useRouter();
  const dispatch = useAppDispatch();

  // States
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isUserLoggedIn) {
      router.back();
    } else {
      dispatch(setType('Sign In'));
    }
  }, [dispatch, isUserLoggedIn, router]);

  return <SignIn />;
}
