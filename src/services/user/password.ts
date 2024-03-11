import axios from 'axios';
import { toast } from 'react-toastify';

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


export async function changePassword(
  userId: string,
  oldPassword: string,
  newPassword: string,
  onClose: () => void,
  setErrorMessage: (message: string) => void
) {
  const url = `${import.meta.env.VITE_BACKEND_API_URL}/api/user/password/change-password`;
  const data = { userId, oldPassword, newPassword };

  try {
    const response = await axios.post(url, data);
    toast.success(response.data.message);
    onClose();
    return response.data;
  } catch (error) {
    // @ts-expect-error eslint-disable-next-line
    toast.error(error.data.message);
    setErrorMessage((error as Error).message);
    console.error('Error changing password:', error);
  }
}

export async function forgotPassword(email: string) {
  const url = `${import.meta.env.VITE_BACKEND_API_URL}/api/user/password/forgot-password`;
  const data = { email };
  
  try {
    const response = await axios.post(url, data);
    toast.success(response.data.message);
    return response.data.status;
  } catch (error) {
    // @ts-expect-error eslint-disable-next-line
    toast.error(error.data.message);
    console.error('Error resetting password:', error);
  }
}
