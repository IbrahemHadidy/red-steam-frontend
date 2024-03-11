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
import { VerifyModal } from 'pages/SignInUp/SignUpVerifyModal';

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
      const userData = await getUserData();
      setUserData(userData);
    }
  }, [isLoggedIn]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData, isLoggedIn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    async function autoLoginUser() {
      if (localStorage.getItem('refreshToken')) {
        try {
          const userData = await autoLogin();
          setIsLoggedIn(true);
          setUserData(userData);
        } catch (error) {
          console.error('Error auto-logging in:', error);
          setIsLoggedIn(false);
          setUserData(null);
        }
      }
    }

    autoLoginUser();
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setIsLoggedIn(false);
    setUserData(null);
    window.location.href = '/';
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }, []);

  const login = useCallback(
    async (identifier: string, password: string, rememberMe: boolean) => {
      try {
        const userData = await loginUser(identifier, password, rememberMe);
        setIsLoggedIn(true);
        setUserData(userData);
      } catch (error) {
        setIsLoggedIn(false);
        setUserData(null);
        console.error('Error during login:', error);
        toast.error('Failed to log in. Please try again.');
      }
    },
    [setIsLoggedIn, setUserData],
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
    userData && (await resendRegisterToken(userData.email));
    setShowVerifyModal(true);
    toast.warning('Please verify your account first.');
    // Fetch waiting time from the backend
    const waitingTime = await waitingTimeResponse();
    const intervalCheckVerificationStatus = async () => {
      try {
        // Verify email
        console.log(userData);
        const verificationResult =
          userData && (await verificationStatus(userData.email));

        // If verification is successful, close the verification modal
        if (verificationResult) {
          clearInterval(intervalId);
          toast.success('Email verification successful!');
          setShowVerifyModal(false);
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
      toast.error('Email verification took too long. Please try again later.');
      clearInterval(intervalId);
      logout();
    }, waitingTime);
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
