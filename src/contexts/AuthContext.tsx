import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import { toast } from 'react-toastify';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  userData: UserData | null;
}

interface UserData {
  userId: number;
  username: string;
  email: string;
  country: string;
  tagsSelected: boolean;
  tags?: string[];
  phoneNumber?: string;
  profilePicture?: string;
  // Add other properties as needed
}

// TODO: add check if the user is had selected the tags if not redirect to the tags selection page (the logic isn't necessarily in this file)

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  userData: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // set to false as default true only for testing
  const [userData, setUserData] = useState<UserData | null>(null);

  const logout = useCallback(() => {
    localStorage.removeItem('userToken');
    // setIsLoggedIn(false); // comment for testing
    setUserData(null);
  }, [setIsLoggedIn]);

  const fetchUserData = useCallback(
    async (token: string) => {
      try {
        const response = await fetch('https://api.example.com/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error, e.g., force logout
        logout();
        // Notify the user about data fetching error
        alert('Error fetching user data. Please try again.');
      }
    },
    [logout],
  );

  const login = useCallback(
    (token: string) => {
      localStorage.setItem('userToken', token);
      setIsLoggedIn(true);
      fetchUserData(token);
    },
    [fetchUserData],
  );

  // TODO: token validation should be in backend
  useEffect(() => {
    const checkTokenValidity = async () => {
      const storedToken = localStorage.getItem('userToken');
      if (storedToken) {
        try {
          const { exp } = decodeToken(storedToken);
          const currentTime = Math.floor(Date.now() / 1000);
          if (exp && exp < currentTime) {
            // Token is expired, perform logout
            logout();
            // Notify the user about session expiration
            toast.warn('Your session has expired. Please log in again.');
          } else {
            // Token is valid, perform login with the token
            login(storedToken);
            toast.success('Login successful!');
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          // Handle token decoding error, e.g., force logout
          logout();
          // Notify the user about invalid token
          toast.error('Invalid token. Please log in again.');
        }
      } else {
        // No token found in local storage, perform logout
        logout();
      }
    };

    checkTokenValidity();
  }, [login, logout]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
}

const decodeToken = (token: string): { exp: number } => {
  const decodedPayload = JSON.parse(atob(token.split('.')[1]));
  return { exp: decodedPayload.exp };
};
