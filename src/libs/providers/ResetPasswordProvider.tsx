'use client';

// React
import { useEffect } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// Toast Notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Handlers
import {
  setResetPasswordInterfaceVisibility,
  updateResetToken,
} from '@store/features/user/recovery/recoverySlice';

// Constants
import { MIN_RECOVERY_TOKEN_LENGTH } from '@constants/recovery';

// Types
import type { ReactNode } from 'react';

interface ResetPasswordProviderProps {
  token: string;
  children: ReactNode;
}

export default function ResetPasswordProvider({ children, token }: ResetPasswordProviderProps) {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Handle reset token on password reset page
  useEffect(() => {
    if (!token || token.length < MIN_RECOVERY_TOKEN_LENGTH) {
      router.push('/');
      toast.error('Invalid or missing reset token', { autoClose: 2000 });
      return;
    } else {
      dispatch(updateResetToken(token));
      dispatch(setResetPasswordInterfaceVisibility(true));
    }
  }, [dispatch, router, token]);

  return token && token.length >= MIN_RECOVERY_TOKEN_LENGTH ? <>{children}</> : null;
}
