// Toast notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { createAppAsyncThunk } from '@store/hooks';

// Channels
import { authChannel } from '@store/features/auth/authChannel';

// Actions
import { setIsVerificationEmailSent, setIsVerifyModalVisible } from './authSlice';

// APIs
import userAuthApi from '@store/apis/user/auth';

// Utils
import { validateEmail, validateName, validatePassword } from '@utils/inputValidations';
import promiseToast from '@utils/promiseToast';

// Types
import type { User } from '@interfaces/user';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface LoginData {
  identifier: string;
  password: string;
  rememberMe: boolean;
}

export const login = createAppAsyncThunk<User, LoginData>(
  'auth/login',
  async ({ identifier, password, rememberMe }, { fulfillWithValue, rejectWithValue, dispatch }) => {
    // Validate input
    if ((!validateName(identifier) && !validateEmail(identifier)) || !validatePassword(password)) {
      return rejectWithValue('Please provide a valid name or email and password');
    }

    const loginResult = await promiseToast(
      dispatch(userAuthApi.endpoints.login.initiate({ identifier, password, rememberMe })).unwrap(),
      {
        pending: 'Logging in...',
        success: 'Logged in successfully!',
        fallbackError:
          'User not found or password is incorrect. Please check your credentials and try again.',
      }
    );
    if (!loginResult) return rejectWithValue('Invalid login credentials');

    const currentUserData = loginResult.userData;

    // Store session information
    if (loginResult.isSessionLoggedIn) sessionStorage.setItem('isSessionLogin', 'true');

    // Notify other tabs about the login status
    authChannel.postMessage({ isUserLoggedIn: true, currentUserData });

    // Schedule token refresh
    setTimeout(
      () => {
        dispatch(refreshAuthorizationToken());
      },
      60 * 60 * 1000
    );

    // Fulfill the promise with the user data
    return fulfillWithValue(currentUserData);
  }
);

export const logout = createAppAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, dispatch }) => {
    // Notify other tabs about the logout status
    authChannel.postMessage({ isUserLoggedIn: false, currentUserData: null });

    // Call the logout user service
    const result = await promiseToast(dispatch(userAuthApi.endpoints.logout.initiate()).unwrap(), {
      pending: 'Logging out...',
      success: 'Logged out successfully!',
      fallbackError:
        'An error occurred while trying to connect to the server. Please check your internet connection and try again.',
    });
    if (!result) return rejectWithValue('Logout failed');

    // Perform any additional local state cleanup
    sessionStorage.removeItem('verificationInProgress');
    localStorage.removeItem('recentGames');
    sessionStorage.removeItem('isSessionLogin');
  }
);

export const fetchUserData = createAppAsyncThunk<User | null>(
  'auth/fetchUserData',
  async (_, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      // Fetch fresh user data
      const currentUserData = (
        await dispatch(userAuthApi.endpoints.updateUserData.initiate()).unwrap()
      ).userData;

      // Notify other tabs about the login status
      if (!currentUserData)
        authChannel.postMessage({ isUserLoggedIn: false, currentUserData: null });
      return fulfillWithValue(currentUserData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      dispatch(logout());
      return rejectWithValue('Failed to fetch user data');
    }
  }
);

export const autoLoginOnLoad = createAppAsyncThunk<{
  isUserLoggedIn: boolean;
  currentUserData: User | null;
}>('auth/autoLogin', async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
  try {
    const data = await dispatch(userAuthApi.endpoints.autoLogin.initiate()).unwrap();
    if (data?.userData === null) return { isUserLoggedIn: false, currentUserData: null };

    // Schedule token refresh
    setTimeout(
      () => {
        dispatch(refreshAuthorizationToken());
      },
      60 * 60 * 1000
    );
    return fulfillWithValue({ isUserLoggedIn: true, currentUserData: data?.userData ?? null });
  } catch (error) {
    console.error('Error auto-logging in:', error);
    return rejectWithValue('Auto-login failed');
  }
});

export const refreshAuthorizationToken = createAppAsyncThunk(
  'auth/refreshTokenThunk',
  async (_, { dispatch, getState }) => {
    const isLoggedIn = getState().auth.isUserLoggedIn;
    const isSessionLogin = sessionStorage.getItem('isSessionLogin') === 'true';

    if (isLoggedIn && !isSessionLogin) {
      try {
        // Refresh token request
        await dispatch(userAuthApi.endpoints.refreshToken.initiate()).unwrap();

        // Fetch data after token is refreshed
        await dispatch(fetchUserData());

        // Schedule next token refresh (1 hour interval)
        setTimeout(
          () => {
            dispatch(refreshAuthorizationToken());
          },
          60 * 60 * 1000
        );
      } catch (error) {
        console.error('Error refreshing access token:', error);
        dispatch(logout());
      }
    }
  }
);

export const checkVerificationStatus = createAppAsyncThunk<void, AppRouterInstance>(
  'auth/checkVerificationStatus',
  async (router, { dispatch, getState }) => {
    const { currentUserData, isVerificationEmailSent } = getState().auth;
    dispatch(setIsVerifyModalVisible(true));

    // Resend verification token
    if (currentUserData && !isVerificationEmailSent) {
      await dispatch(userAuthApi.endpoints.resendVerificationToken.initiate()).unwrap();
      dispatch(setIsVerificationEmailSent(true));
      toast.info('Verification email sent. Please check your inbox.');
    }

    const waitingTime = (await dispatch(userAuthApi.endpoints.getWaitingTime.initiate()).unwrap())
      .waitingTime;

    const getVerificationStatus = async () =>
      (await dispatch(userAuthApi.endpoints.verificationStatus.initiate()).unwrap()).verified;

    const timeoutId = setTimeout(async () => {
      clearInterval(intervalId);
      toast.error('Email verification took too long. Please try again later.');
      dispatch(setIsVerifyModalVisible(false));
      dispatch(setIsVerificationEmailSent(false));
      await dispatch(logout());
    }, waitingTime);

    const intervalId = setInterval(async () => {
      try {
        const verificationResult = await getVerificationStatus();

        if (verificationResult === true) {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
          toast.success('Email verified successfully!');
          dispatch(setIsVerifyModalVisible(false));
          router.push('/user/tags');
          await dispatch(fetchUserData());
          return;
        }
      } catch (error) {
        console.error('Error during verification check:', error);
      }
    }, 5000);
  }
);

export const checkVerificationAndTagsStatus = createAppAsyncThunk<
  void,
  { router: AppRouterInstance }
>('auth/checkUserStatus', async ({ router }, { dispatch, getState }) => {
  const { currentUserData } = getState().auth;

  if (currentUserData) {
    // Check verification status
    if (!currentUserData.isVerified) {
      await dispatch(checkVerificationStatus(router));
    } else {
      const tags = currentUserData.tags;

      // Check if the user has at least 3 tags
      if (!tags || tags.length < 3) {
        router.push('/user/tags');
        toast.info('Please add at least 3 tags to continue!');
      }
    }
  }
});
