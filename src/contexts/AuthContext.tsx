'use client';

// React
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

// NextJS
import { usePathname, useRouter } from 'next/navigation';

// Toast notifications
import { toast } from 'react-toastify';

// Components
import Loading from '@app/loading';
import { VerifyModal } from '@components/SignUpVerifyModal/SignUpVerifyModal';

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
import type { Tag } from '@entities/tag.entity';
import type { User } from '@entities/user.entity';
import type { JSX, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (identifier: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
  userData: User | null;
  fetchData: () => void;
  isReady: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: async () => {},
  logout: () => {},
  userData: null,
  fetchData: () => {},
  isReady: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  // Init
  const router = useRouter();
  const pathname = usePathname();

  // States
  const [showVerifyModal, setShowVerifyModal] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Global state
  const [userData, setUser] = useState<User | null>(null); // Global state
  const [isReady, setIsReady] = useState<boolean>(false); // Global state

  // Broadcasts
  const loginStatusChannel = useMemo(() => new BroadcastChannel('login-status'), []);

  useEffect(() => {
    // Listen for login status updates
    loginStatusChannel.onmessage = (event) => {
      if (event.data.isLoggedIn) {
        setIsLoggedIn(true);
        setUser(event.data.userData);
        setIsReady(true);
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setIsReady(true);
      }
    };

    return () => {
      loginStatusChannel.close();
    };
  }, [loginStatusChannel]);

  // Login (Global function)
  const login = async (
    identifier: string,
    password: string,
    rememberMe: boolean
  ): Promise<void> => {
    try {
      const response = await loginUser(identifier, password, rememberMe);
      const userData = response.data.userData;
      const isSessionLoggedIn = response.data.isSessionLoggedIn;
      if (response.status === 200) {
        loginStatusChannel.postMessage({ isLoggedIn: true, userData });
        router.push('/');
        setIsLoggedIn(true);
        setUser(userData);
        setIsReady(true);
        if (isSessionLoggedIn) {
          sessionStorage.setItem('isSessionLogin', 'true');
        }
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
      setIsReady(true);
      console.error('Error during login:', error);
    }
  };

  // Logout (Global function)
  const logout = useCallback(async (): Promise<void> => {
    loginStatusChannel.postMessage({ isLoggedIn: false });
    setIsLoggedIn(false);
    router.push('/');
    await logoutUser();
    setUser(null);
    sessionStorage.setItem('verificationInProgress', 'false');
    localStorage.removeItem('recentGames');
  }, [loginStatusChannel, router]);

  // Fetch user data (Global function)
  const fetchData = useCallback(async (): Promise<void> => {
    if (isLoggedIn) {
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        logout();
      } finally {
        setIsReady(true);
      }
    }
  }, [isLoggedIn, logout]);

  // Fetch data on load (If user is logged in)
  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [fetchData, isLoggedIn]);

  // Refresh authorization (If user is logged in)
  useEffect(() => {
    let refreshInterval: NodeJS.Timeout;

    const refreshAuthorization = async () => {
      try {
        await refreshToken();
        fetchData();
        refreshInterval = setInterval(refreshAuthorization, 60 * 60 * 1000);
      } catch (error) {
        console.error('Error refreshing access token:', error);
        toast.error('Your session has expired. Please login again.');
        logout();
      }
    };

    // Refresh authorization if isSessionLogin is not true
    if (isLoggedIn && sessionStorage.getItem('isSessionLogin') !== 'true') {
      refreshAuthorization();
    }

    // Cleanup function to clear interval
    return () => clearInterval(refreshInterval);
  }, [fetchData, isLoggedIn, logout]);

  // Auto login user on load
  useEffect(() => {
    const autoLoginUser = async (): Promise<void> => {
      try {
        const userData = await autoLogin();
        if (!userData) {
          setIsReady(true);
          return;
        }
        setUser(userData);
        setIsLoggedIn(true);
        fetchData();
      } catch (error) {
        console.error('Error auto-logging in:', error);
        setIsReady(true);
      }
    };

    autoLoginUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkVerificationStatus = useCallback(async (): Promise<void> => {
    if (sessionStorage.getItem('verificationInProgress') !== 'true') {
      sessionStorage.setItem('verificationInProgress', 'true');
      userData && (await resendVerificationToken());
      setShowVerifyModal(true);

      const waitingTime = await getWaitingTime();
      const intervalCheckVerificationStatus = async (): Promise<void> => {
        try {
          const verificationResult = userData && (await verificationStatus());
          if (verificationResult) {
            clearInterval(intervalId);
            setShowVerifyModal(false);
            toast.success('Email verified successfully!');
            setTimeout(() => {
              if (pathname !== '/user/tags') {
                router.push('/user/tags');
              }
            });
          }
        } catch (error) {
          console.error('Error during form submission:', error);
        }
      };

      const intervalId: NodeJS.Timeout = setInterval(intervalCheckVerificationStatus, 5000);
      setTimeout(() => {
        setShowVerifyModal(false);
        toast.error('Email verification took too long. Please try again later.');
        clearInterval(intervalId);
        logout();
      }, waitingTime);
    }
  }, [logout, pathname, router, userData]);

  useEffect(() => {
    if (isLoggedIn && userData) {
      const tags: Tag[] = userData.tags;

      if (userData && !userData.isVerified) {
        checkVerificationStatus();
      } else if (!(pathname === '/user/tags' || pathname === '/logout')) {
        if (!tags || tags.length < 3) {
          router.push('/user/tags');
          toast.warn('Please add at least 3 tags to continue!');
        }
      }
    }
  }, [checkVerificationStatus, isLoggedIn, pathname, router, userData]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userData, fetchData, isReady }}>
      {isReady ? (
        <>
          {children}
          {isLoggedIn && userData && showVerifyModal && (
            <VerifyModal
              storedEmailAddress={userData.email}
              setShowVerificationModal={setShowVerifyModal}
              setFirstStep={() => {
                logout();
                setShowVerifyModal(false);
                router.push('signup');
              }}
            />
          )}
        </>
      ) : (
        <Loading />
      )}
    </AuthContext.Provider>
  );
};
