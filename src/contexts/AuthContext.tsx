'use client';
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { toast } from 'react-toastify';
import {
  login as loginUser,
  logout as logoutUser,
  getUserData,
  refreshToken,
  autoLogin,
  resendVerificationToken,
  verificationStatus,
  getWaitingTime,
} from 'services/user/auth';
import { VerifyModal } from 'pages/Auth/SignUpVerifyModal';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (
    identifier: string,
    password: string,
    rememberMe: boolean,
    token: string,
  ) => Promise<void>;
  logout: () => void;
  userData: UserData | null;
  userPFP: string | null;
  fetchData: () => void;
}

interface UserData {
  id: string;
  email: string;
  username: string;
  country: string;
  phoneNumber?: string;
  profilePicture?: string;
  tags: { id: number; name: string }[];
  isVerified: boolean;
  isPhoneVerified?: boolean;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: Date;
  wishlist: {
    id: number;
    addedOn: Date;
  }[];
  library: {
    id: number;
    addedOn: Date;
  }[];
  cart: {
    id: number;
    addedOn: Date;
  }[];
  reviews: {
    id: number;
    positive: boolean;
    date: Date;
    content: string;
  }[];
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: async () => {},
  logout: () => {},
  userData: null,
  userPFP: null,
  fetchData: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const userPFP = userData?.profilePicture || null;

  const fetchData = useCallback(async () => {
    if (isLoggedIn) {
      if (sessionStorage.getItem('authorization')) {
        const userData = await getUserData();
        setUserData(userData);
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [fetchData, isLoggedIn]);

  const logout = useCallback(() => {
    logoutUser();
    setIsLoggedIn(false);
    setUserData(null);
    window.location.href = '/';
    sessionStorage.setItem('verificationInProgress', 'false');
    sessionStorage.removeItem('authorization');
    localStorage.removeItem('x-refresh-token');
  }, []);

  const login = async (
    identifier: string,
    password: string,
    rememberMe: boolean,
  ) => {
    try {
      const response = await loginUser(identifier, password, rememberMe);
      const userData = response.data.userData;
      if (response.status === 200) {
        setIsLoggedIn(true);
        setUserData(userData);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUserData(null);
      console.error('Error during login:', error);
    }
  };

  const refreshAuthorization = useCallback(async () => {
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
    async function autoLoginUser() {
      const storedToken = localStorage.getItem('x-refresh-token');
      if (storedToken) {
        try {
          await autoLogin();
          setIsLoggedIn(true);
          fetchData();
          // Schedule token refresh every hour after successful auto-login
          const refreshInterval = setInterval(
            refreshAuthorization,
            60 * 60 * 1000,
          );
          // Clear interval on component unmount
          return () => clearInterval(refreshInterval);
        } catch (error) {
          console.error('Error auto-logging in:', error);
          setIsLoggedIn(false);
          setUserData(null);
          logout();
        }
      }
    }

    autoLoginUser();
  }, [fetchData, logout, refreshAuthorization]);

  const checkVerificationStatus = useCallback(async () => {
    if (sessionStorage.getItem('verificationInProgress') !== 'true') {
      sessionStorage.setItem('verificationInProgress', 'true');
      userData && (await resendVerificationToken());
      setShowVerifyModal(true);
      // Fetch waiting time from the backend
      const waitingTime = await getWaitingTime();
      const intervalCheckVerificationStatus = async () => {
        try {
          // Verify email
          const verificationResult = userData && (await verificationStatus());

          // If verification is successful, close the verification modal
          if (verificationResult) {
            clearInterval(intervalId);
            setShowVerifyModal(false);
            toast.success('Email verified successfully!');
            setTimeout(() => {
              if (window.location.pathname !== '/user/tags') {
                window.location.href = '/user/tags';
              }
            });
          }
        } catch (error) {
          // If verification fails, display an error message
          console.error('Error during form submission:', error);
        }
      };

      // Periodically check verification status and waiting time
      const intervalId = setInterval(intervalCheckVerificationStatus, 5000);

      setTimeout(() => {
        setShowVerifyModal(false);
        toast.error(
          'Email verification took too long. Please try again later.',
        );
        clearInterval(intervalId);
        logout();
      }, waitingTime);
    }
  }, [logout, userData]);

  // Check if selected tags are less than 3
  useEffect(() => {
    function checkVerifyAndTags() {
      setTimeout(() => {
        if (isLoggedIn && userData && !userData.isVerified) {
          checkVerificationStatus();
        } else if (
          isLoggedIn &&
          userData &&
          !(window.location.pathname === '/user/tags')
        ) {
          const tags = userData.tags;
          if (tags.length < 3) {
            window.location.href = '/user/tags';
          }
        }
      }, 2000);
    }

    checkVerifyAndTags();
  }, [checkVerificationStatus, isLoggedIn, userData]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, userData, userPFP, fetchData }}
    >
      {children}
      {isLoggedIn && userData && showVerifyModal && (
        <VerifyModal
          storedEmailAddress={userData.email}
          setShowVerificationModal={setShowVerifyModal}
          setFirstStep={() => {
            logout();
            setShowVerifyModal(false);
            window.location.href = '/join';
          }}
        />
      )}
    </AuthContext.Provider>
  );
};
