'use client';
import Loading from 'app/loading';
import { VerifyModal } from 'components/SignUpVerifyModal/SignUpVerifyModal';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  autoLogin,
  getUserData,
  getWaitingTime,
  login as loginUser,
  logout as logoutUser,
  refreshToken,
  resendVerificationToken,
  verificationStatus,
} from 'services/user/auth';

// Types
import type { JSX } from 'react';
import type { Tag } from 'types/tag.types';
import type { User } from 'types/user.types';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (identifier: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
  userData: User | null;
  userPFP: string | null;
  fetchData: () => void;
  isReady: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: async () => {},
  logout: () => {},
  userData: null,
  userPFP: null,
  fetchData: () => {},
  isReady: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUser] = useState<User | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  const userPFP: string | null = userData?.profilePicture || null;

  const fetchData = useCallback(async (): Promise<void> => {
    if (isLoggedIn) {
      if (sessionStorage.getItem('authorization')) {
        const userData: User = await getUserData();
        setUser(userData);
        setIsReady(true);
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [fetchData, isLoggedIn]);

  const logout = useCallback((): void => {
    setIsLoggedIn(false);
    router.push('/');
    logoutUser();
    setUser(null);
    sessionStorage.setItem('verificationInProgress', 'false');
    sessionStorage.removeItem('authorization');
    localStorage.removeItem('x-refresh-token');
  }, [router]);

  const login = async (
    identifier: string,
    password: string,
    rememberMe: boolean
  ): Promise<void> => {
    try {
      const response: { status: number; data: { userData: User } } = await loginUser(
        identifier,
        password,
        rememberMe
      );
      const userData: User = response.data.userData;
      if (response.status === 200) {
        router.push('/');
        setIsLoggedIn(true);
        setUser(userData);
        setIsReady(true);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
      setIsReady(true);
      console.error('Error during login:', error);
    }
  };

  const refreshAuthorization = useCallback(async (): Promise<void> => {
    try {
      await refreshToken();
      fetchData();
    } catch (error) {
      console.error('Error refreshing access token:', error);
      toast.error('Your session has expired. Please login again.');
      logout();
    }
  }, [fetchData, logout]);

  useEffect(() => {
    let refreshInterval: NodeJS.Timeout;

    const autoLoginUser = async (): Promise<void> => {
      const storedToken: string | null = localStorage.getItem('x-refresh-token');
      if (storedToken) {
        try {
          await autoLogin();
          setIsLoggedIn(true);
          fetchData();
          refreshInterval = setInterval(refreshAuthorization, 60 * 60 * 1000);
        } catch (error) {
          console.error('Error auto-logging in:', error);
          setIsLoggedIn(false);
          setUser(null);
          setIsReady(true);
          logout();
        }
      } else {
        setIsReady(true);
      }
    };

    autoLoginUser();

    // Cleanup function to clear interval
    return () => clearInterval(refreshInterval);
  }, [fetchData, logout, refreshAuthorization]);

  const checkVerificationStatus = useCallback(async (): Promise<void> => {
    if (sessionStorage.getItem('verificationInProgress') !== 'true') {
      sessionStorage.setItem('verificationInProgress', 'true');
      userData && (await resendVerificationToken());
      setShowVerifyModal(true);
      const waitingTime: number = await getWaitingTime();
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
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, userData, userPFP, fetchData, isReady }}
    >
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
