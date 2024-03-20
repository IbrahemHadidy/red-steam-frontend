import axios from 'axios';
import { toast } from 'react-toastify';

const env = import.meta.env;

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      return Promise.reject(error.response);
    }
    return Promise.reject(error);
  },
);

class Auth {
  async loginUser(identifier: string, password: string, rememberMe: boolean) {
    try {
      const response = await axios.post(
        `${env.VITE_BACKEND_API_URL}/api/user/auth/login`,
        {
          identifier,
          password,
          rememberMe,
        },
      );
      sessionStorage.setItem('accessToken', response.data.accessToken);
      if (rememberMe) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      } else {
        sessionStorage.setItem('refreshToken', response.data.refreshToken);
      }
      return response;
    } catch (error) {
      // @ts-expect-error eslint-disable-next-line
      toast.error(error.data.message || 'Internal Server Error');
      console.error('Error logging in:', error);
      throw error;
    }
  }

  async autoLogin() {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      const response = await axios.post(
        `${env.VITE_BACKEND_API_URL}/api/user/auth/auto-login`,
        {
          refreshToken,
        },
      );
      sessionStorage.setItem('accessToken', response.data.accessToken);
      return response.data.userData;
    } catch (error) {
      // @ts-expect-error eslint-disable-next-line
      toast.error(error.data.message || 'Internal Server Error');
      console.error('Error logging in:', error);
      throw error;
    }
  }

  async logoutUser() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      await axios.post(
        `${env.VITE_BACKEND_API_URL}/api/user/auth/logout`,
        null,
        {
          headers: { Authorization: `Bearer ${refreshToken}` },
        },
      );
      sessionStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      // @ts-expect-error eslint-disable-next-line
      toast.error(error.data.message || 'Internal Server Error');
      console.error('Error logging out:', error);
      throw error;
    }
  }

  async registerUser(
    username: string,
    email: string,
    password: string,
    country: string,
  ) {
    try {
      const response = await axios.post(
        `${env.VITE_BACKEND_API_URL}/api/user/auth/register`,
        {
          username,
          email,
          password,
          country,
        },
      );
      return response;
    } catch (error) {
      // @ts-expect-error eslint-disable-next-line
      toast.error(error.data.message || 'Internal Server Error');
      console.error('Error registering:', error);
      throw error;
    }
  }

  async waitingTimeResponse() {
    try {
      const response = await axios.get(
        `${env.VITE_BACKEND_API_URL}/api/user/auth/waiting-time`,
      );
      return response.data.waitingTime;
    } catch (error) {
      // @ts-expect-error eslint-disable-next-line
      toast.error(error.data.message || 'Internal Server Error');
      console.error('Error fetching waiting time:', error);
      throw error;
    }
  }

  async verificationStatus(identifier: string) {
    try {
      const response = await axios.post(
        `${env.VITE_BACKEND_API_URL}/api/user/auth/verify-status`,
        { identifier },
      );
      return response.data.verified;
    } catch (error) {
      // @ts-expect-error eslint-disable-next-line
      toast.error(error.data.message || 'Internal Server Error');
      console.error('Error verifying:', error);
      throw error;
    }
  }

  async resendRegisterToken(email: string) {
    try {
      const response = await axios.post(
        `${env.VITE_BACKEND_API_URL}/api/user/auth/resend-register-token`,
        { email },
      );
      return response.data.message;
    } catch (error) {
      // @ts-expect-error eslint-disable-next-line
      toast.error(error.data.message || 'Internal Server Error');
      console.error('Error resending register token:', error);
      throw error;
    }
  }

  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post(
        `${env.VITE_BACKEND_API_URL}/api/user/auth/refresh-token`,
        { refreshToken },
      );
      sessionStorage.setItem('accessToken', response.data.accessToken);
      return response.data.userData;
    } catch (error) {
      // @ts-expect-error eslint-disable-next-line
      toast.error(error.data.message || 'Internal Server Error');
      console.error('Error refreshing token:', error);
      throw error;
    }
  }

  async checkEmailExists(email: string) {
    try {
      const response = await axios.get(
        `${env.VITE_BACKEND_API_URL}/api/user/auth/check-email/${email}`,
      );
      return response.data.exists;
    } catch (error) {
      // @ts-expect-error eslint-disable-next-line
      toast.error(error.data.message || 'Internal Server Error');
      console.error('Error checking email exists:', error);
    }
  }

  async checkUsernameExists(username: string) {
    try {
      const response = await axios.get(
        `${env.VITE_BACKEND_API_URL}/api/user/auth/check-username/${username}`,
      );
      return response.data.exists;
    } catch (error) {
      console.error('Error checking username exists:', error);
      throw error;
    }
  }

  async changeUserName(newUsername: string, userId: string, password: string) {
    try {
      const response = await axios.post(
        `${env.VITE_BACKEND_API_URL}/api/user/auth/change-username`,
        { newUsername, userId, password },
      );

      if (response.data.success) {
        toast.success(response.data.message);
      }
      return response.data;
    } catch (error) {
      // @ts-expect-error eslint-disable-next-line
      toast.error(error.data.message || 'Internal Server Error');
      console.error('Error changing user name:', error);
      throw error;
    }
  }

  async changeEmail(
    userId: string,
    currentEmail: string,
    password: string,
    newEmail: string,
    onClose: () => void,
    setErrorMessage: (message: string) => void,
  ) {
    try {
      const response = await axios.post(
        `${env.VITE_BACKEND_API_URL}/api/user/auth/change-email`,
        { userId, currentEmail, password, newEmail },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        onClose();
      }
    } catch (error) {
      // @ts-expect-error eslint-disable-next-line
      toast.error(error.data.message || 'Internal Server Error');
      // @ts-expect-error eslint-disable-next-line
      setErrorMessage(response.data.message);
      onClose();
      console.error('Error changing email:', error);
    }
  }

  async changeCountry(userId: string, newCountry: string) {
    try {
      const response = await axios.post(
        `${env.VITE_BACKEND_API_URL}/api/user/auth/change-country`,
        { userId, newCountry },
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
      return response.data;
    } catch (error) {
      // @ts-expect-error eslint-disable-next-line
      toast.error(error.data.message || 'Internal Server Error');
      console.error('Error changing country:', error);
      throw error;
    }
  }

  async deleteAccount(
    userId: string,
    password: string,
    setErrorMessage: (message: string) => void,
  ) {
    try {
      const response = await axios.post(
        `${env.VITE_BACKEND_API_URL}/api/user/auth/delete-account`,
        { userId, password },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        sessionStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }

      return response;
    } catch (error) {
      // @ts-expect-error eslint-disable-next-line
      toast.error(error.data.message || 'Internal Server Error');
      // @ts-expect-error eslint-disable-next-line
      setErrorMessage(response.data.message);
      console.error('Error deleting account:', error);
    }
  }

  async getUserData() {
    try {
      const accessToken = sessionStorage.getItem('accessToken');
      const response = await axios.get(
        `${env.VITE_BACKEND_API_URL}/api/user/auth/user-data`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      // @ts-expect-error eslint-disable-next-line
      if (error.response.message !== 'jwt expired') {
        // @ts-expect-error eslint-disable-next-line
        toast.error(error.data.message || 'Internal Server Error');
      }
      console.error('Error getting user data:', error);
    }
  }
}

export const {
  loginUser,
  autoLogin,
  logoutUser,
  checkEmailExists,
  registerUser,
  waitingTimeResponse,
  verificationStatus,
  resendRegisterToken,
  refreshToken,
  checkUsernameExists,
  changeUserName,
  changeEmail,
  changeCountry,
  deleteAccount,
  getUserData,
} = new Auth();
