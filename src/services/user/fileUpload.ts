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

export const changeUserAvatar = async (userId: string, avatarFile: File) => {
  try {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('avatar', avatarFile);

    const response = await axios.post(
      `${env.VITE_BACKEND_API_URL}/api/user/avatar/upload-avatar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    if (response.status === 200) {
      toast.success(response.data.message);
    }

    return response.data;
  } catch (error) {
    // @ts-expect-error eslint-disable-next-line
    toast.error(error.data.message);
    console.error('Error changing user avatar:', error);
    throw error;
  }
};

export const deleteUserAvatar = async (userId: string) => {
  try {
    const response = await axios.post(
      `${env.VITE_BACKEND_API_URL}/api/user/avatar/delete-avatar`,
      { userId },
    );

    if (response.status === 200) {
      toast.success(response.data.message);
    }

    return response.data;
  } catch (error) {
    // @ts-expect-error eslint-disable-next-line
    toast.error(error.data.message);
    console.error('Error deleting user avatar:', error);
  }
};
