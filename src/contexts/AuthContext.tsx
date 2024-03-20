import {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { toast } from 'react-toastify';
import {
  loginUser,
  logoutUser,
  getUserData,
  refreshToken,
  autoLogin,
  resendRegisterToken,
  verificationStatus,
  waitingTimeResponse,
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
  fetchData: () => void;
}

interface UserData {
  _id: string;
  username: string;
  email: string;
  country: string;
  phoneNumber?: string;
  profilePicture?: string;
  tags: string[];
  library?: string[];
  cart?: string[];
  wishlist?: {
    item: string;
    addedOn: Date;
  }[];
  isVerified: boolean;
  isPhoneVerified?: boolean;
  createdAt: Date;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: async () => {},
  logout: () => {},
  userData: null,
  fetchData: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const fetchData = useCallback(async () => {
    if (isLoggedIn) {
      if (localStorage.getItem('refreshToken')) {
        const userData = await getUserData();
        setUserData(userData);
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchData();
  }, [fetchData, isLoggedIn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const logout = useCallback(() => {
    logoutUser();
    setIsLoggedIn(false);
    setUserData(null);
    window.location.href = '/';
    sessionStorage.setItem('verificationInProgress', 'false');
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }, []);

  const login = useCallback(
    async (identifier: string, password: string, rememberMe: boolean) => {
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
    },
    [setUserData],
  );

  const refreshAccessToken = useCallback(async () => {
    try {
      const refreshedUserData = await refreshToken();
      setUserData(prevUserData => ({
        ...prevUserData,
        ...refreshedUserData,
      }));
    } catch (error) {
      console.error('Error refreshing access token:', error);
      toast.error('Failed to refresh access token. Please log in again.');
      logout();
    }
  }, [setUserData, logout]);

  useEffect(() => {
    async function autoLoginUser() {
      const storedToken = localStorage.getItem('refreshToken');
      if (storedToken) {
        try {
          const userData = await autoLogin();
          setIsLoggedIn(true);
          setUserData(userData);
          // Schedule token refresh every hour after successful auto-login
          const refreshInterval = setInterval(
            refreshAccessToken,
            60 * 60 * 1000,
          );
          // Clear interval on component unmount
          return () => clearInterval(refreshInterval);
        } catch (error) {
          console.error('Error auto-logging in:', error);
          setIsLoggedIn(false);
          setUserData(null);
        }
      }
    }

    autoLoginUser();
  }, [refreshAccessToken]);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('accessToken');
    if (storedToken) {
      setIsLoggedIn(true);
      getUserData()
        .then(userData => setUserData(userData))
        .catch(error => {
          console.error('Error fetching user data:', error);
          toast.error('Failed to fetch user data. Please log in again.');
          logout();
        });

      // Schedule token refresh every hour
      const refreshInterval = setInterval(refreshAccessToken, 60 * 60 * 1000);

      // Clear interval on component unmount
      return () => clearInterval(refreshInterval);
    }
  }, [logout, refreshAccessToken]);

  const checkVerificationStatus = useCallback(async () => {
    if (!sessionStorage.getItem('verificationInProgress')) {
      sessionStorage.setItem('verificationInProgress', 'true');
      userData && (await resendRegisterToken(userData.email));
      setShowVerifyModal(true);
      // Fetch waiting time from the backend
      const waitingTime = await waitingTimeResponse();
      const intervalCheckVerificationStatus = async () => {
        try {
          // Verify email
          const verificationResult =
            userData && (await verificationStatus(userData.email));

          // If verification is successful, close the verification modal
          if (verificationResult) {
            clearInterval(intervalId);
            setShowVerifyModal(false);
            toast.success('Email verified successfully!');
            setTimeout(() => {
              window.location.href = '/user/tags';
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
    }

    checkVerifyAndTags();
  }, [checkVerificationStatus, isLoggedIn, userData]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, userData, fetchData }}
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
}
