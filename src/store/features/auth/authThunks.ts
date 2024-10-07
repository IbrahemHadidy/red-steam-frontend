// Toast notifications
import { toast } from 'react-toastify';

// Redux
import { createAsyncThunk } from '@reduxjs/toolkit';

// Channels
import { authChannel } from '@services/channels';

// Actions
import { setShowVerifyModal } from './authSlice';

// Services
import {
  autoLogin,
  getUserData,
  getWaitingTime,
  login as loginUser,
  logout as logoutUser,
  refreshToken,
  resendVerificationToken,
  verificationStatus,
} from '@services/user/auth';

// Types
import type { User } from '@entities/user.entity';
import type { AppDispatch, RootState } from '@store/store';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface LoginData {
  identifier: string;
  password: string;
  rememberMe: boolean;
}

export const login = createAsyncThunk<
  User,
  { data: LoginData; router: AppRouterInstance },
  { rejectValue: string }
>(
  'auth/login',
  async ({ data: { identifier, password, rememberMe }, router }, { rejectWithValue }) => {
    try {
      const response = await loginUser(identifier, password, rememberMe);

      if (response.status === 200) {
        const userData = response.data.userData;

        // Store session information
        if (response.data.isSessionLoggedIn) sessionStorage.setItem('isSessionLogin', 'true');

        // Notify other tabs about the login status
        authChannel.postMessage({ isLoggedIn: true, userData });

        // Redirect the user after a successful login
        router.push('/');

        return userData;
      }

      // Notify other tabs about the failed login
      authChannel.postMessage({ isLoggedIn: false, userData: null });
      return rejectWithValue('Login failed');
    } catch (error) {
      // Notify other tabs about the error
      authChannel.postMessage({ isLoggedIn: false, userData: null });
      console.error('Error during login:', error);
      return rejectWithValue('Error during login');
    }
  }
);

export const logout = createAsyncThunk<void, AppRouterInstance, { rejectValue: string }>(
  'auth/logout',
  async (router, { rejectWithValue }) => {
    try {
      // Notify other tabs about the logout status
      authChannel.postMessage({ isLoggedIn: false, userData: null });

      // Call the logout user service
      await logoutUser();

      // Perform any additional local state cleanup
      sessionStorage.removeItem('verificationInProgress');
      localStorage.removeItem('recentGames');
      sessionStorage.removeItem('isSessionLogin');

      // Redirect the user after logout
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
      return rejectWithValue('Logout failed');
    }
  }
);

export const fetchUserData = createAsyncThunk<
  User | null,
  AppRouterInstance,
  { rejectValue: string }
>('auth/fetchUserData', async (router, { dispatch, rejectWithValue }) => {
  try {
    const userData = await getUserData();

    // Notify other tabs about the login status
    if (!userData) authChannel.postMessage({ isLoggedIn: false, userData: null });
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    dispatch(logout(router));
    return rejectWithValue('Failed to fetch user data');
  }
});

export const autoLoginOnLoad = createAsyncThunk<
  { isLoggedIn: boolean; userData: User | null },
  void,
  { rejectValue: string }
>('auth/autoLogin', async (_, { rejectWithValue }) => {
  try {
    const userData = await autoLogin();
    if (userData === null) return { isLoggedIn: false, userData: null };
    return { isLoggedIn: true, userData };
  } catch (error) {
    console.error('Error auto-logging in:', error);
    return rejectWithValue('Auto-login failed');
  }
});

export const refreshAuthorizationToken = createAsyncThunk<
  void,
  AppRouterInstance,
  { state: RootState; dispatch: AppDispatch }
>('auth/refreshTokenThunk', async (router, { dispatch, getState }) => {
  const isLoggedIn = getState().auth.isLoggedIn;
  const isSessionLogin = sessionStorage.getItem('isSessionLogin') === 'true';

  if (isLoggedIn && !isSessionLogin) {
    try {
      // Refresh token logic
      await refreshToken();

      // Fetch data after token is refreshed
      await dispatch(fetchUserData(router));

      // Schedule next token refresh (1 hour interval)
      setTimeout(
        () => {
          dispatch(refreshAuthorizationToken(router));
        },
        60 * 60 * 1000
      );
    } catch (error) {
      console.error('Error refreshing access token:', error);
      toast.error('Your session has expired. Please login again.');
      dispatch(logout(router));
    }
  }
});

export const checkVerificationStatus = createAsyncThunk<
  void,
  { userData: User | null; router: AppRouterInstance }
>('auth/checkVerificationStatus', async ({ userData, router }, { dispatch }) => {
  if (sessionStorage.getItem('verificationInProgress') !== 'true') {
    sessionStorage.setItem('verificationInProgress', 'true');

    // Resend verification token
    if (userData) {
      await resendVerificationToken();
    }

    const waitingTime = await getWaitingTime();

    const intervalId = setInterval(async () => {
      try {
        const verificationResult = userData && (await verificationStatus());
        if (verificationResult) {
          clearInterval(intervalId);
          toast.success('Email verified successfully!');
          setTimeout(() => {
            router.push('/user/tags');
          });
          return;
        }
      } catch (error) {
        console.error('Error during verification check:', error);
      }
    }, 5000);

    // Handle timeout for verification
    setTimeout(() => {
      dispatch(setShowVerifyModal(false));
      clearInterval(intervalId);
      toast.error('Email verification took too long. Please try again later.');
      dispatch(logout(router));
    }, waitingTime);
  }
});

export const checkVerificationAndTagsStatus = createAsyncThunk<
  void,
  { userData: User | null; router: AppRouterInstance }
>('auth/checkUserStatus', async ({ userData, router }) => {
  if (userData) {
    // Check verification status
    if (!userData.isVerified) {
      await resendVerificationToken();
      toast.info('Verification email sent. Please check your inbox.');
    } else {
      const tags = userData.tags;

      // Check if the user has at least 3 tags
      if (!tags || tags.length < 3) {
        router.push('/user/tags');
        toast.warn('Please add at least 3 tags to continue!');
      }
    }
  }
});
