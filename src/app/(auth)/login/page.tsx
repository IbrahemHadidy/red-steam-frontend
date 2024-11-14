'use client';

// React
import { useCallback, useEffect } from 'react';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Handlers
import { setType } from '@store/features/user/login/loginSlice';

// NextJS
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Components
import SignIn from '../_SignInAndRecovery/SignInAndRecovery';

export default function SignInPage() {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);

  //-------------------------- Utility Functions --------------------------//
  const handleLoginRedirect = useCallback(() => {
    const previousPath = document.referrer; // Get the previous URL
    const isInternalLink = previousPath.startsWith(window.location.origin);

    if (isInternalLink) {
      router.push(previousPath);
    } else {
      router.push('/');
    }
  }, [router]);

  // Handle login redirect if user is already logged in
  useEffect(() => {
    if (isUserLoggedIn) {
      handleLoginRedirect();
    } else {
      // Otherwise, set the state "type" to 'Sign In'
      dispatch(setType('Sign In'));
    }
  }, [dispatch, handleLoginRedirect, isUserLoggedIn]);

  return <SignIn />;
}
