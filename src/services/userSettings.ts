import axios from "axios";
import { toast } from 'react-toastify';
const env = import.meta.env;

export const changeUserName = async (newName: string) => {
  try {
    const response = await axios.post(
      `${env.VITE_BACKEND_API_URL}/api/changeUserName`,
      { newName },
    );
    return response.data;
  } catch (error) {
    console.error('Error changing user name:', error);
    toast.error('An error occurred. Please try again later.');
    throw error;
  }
}

export const changeUserAvatar = async (avatarFile: File) => {
  try {
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    const response = await axios.post(
      `${env.VITE_BACKEND_API_URL}/api/changeUserAvatar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error changing user avatar:', error);
    toast.error('An error occurred. Please try again later.');
    throw error;
  }
};

export const deleteAccount = async (
  password: string,
  onClose: () => void,
  setErrorMessage: (message: string) => void,
) => {
  try {
    const response = await axios.post(
      `${env.VITE_BACKEND_API_URL}/api/deleteAccount`,
      { password },
    );

    if (response.data.success) {
      toast.success('Account deleted successfully');
      onClose();
    } else {
      toast.error('Incorrect password. Please try again.');
      setErrorMessage(response.data.message);
    }
  } catch (error) {
    console.error('Error deleting account:', error);
    toast.error('An error occurred. Please try again later.');
  }
};

export const deletePhone = async (
  onClose: () => void,
) => {
  try {
    const response = await axios.post(
      `${env.VITE_BACKEND_API_URL}/api/deletePhone`,
    )
    if (response.data.success) {
      toast.success('Phone deleted successfully');
      onClose();
    } else {
      toast.error('An error occurred. Please try again later.');
    }
  } catch (error) {
    console.error('Error deleting phone:', error);
    toast.error('An error occurred. Please try again later.');
  }
}

export const changeEmail = async (
  password: string,
  email: string,
  onClose: () => void,
  setErrorMessage: (message: string) => void,
) => {
  try {
    const response = await axios.post(
      `${env.VITE_BACKEND_API_URL}/api/changeEmail`,
      { password, email },
    );

    if (response.data.success) {
      toast.success('Email changed successfully');
      onClose();
    } else {
      toast.error('Incorrect password. Please try again.');
      setErrorMessage(response.data.message);
      onClose();
    }
  } catch (error) {
    console.error('Error changing email:', error);
    toast.error('An error occurred. Please try again later.');
  }
};

export const changePhone = async (
  password: string,
  phone: string,
  onClose: () => void,
  setErrorMessage: (message: string) => void,
) => {
  try {
    const response = await axios.post(
      `${env.VITE_BACKEND_API_URL}/api/changePhone`,
      { password, phone },
    );

    if (response.data.success) {
      toast.success('Phone number changed successfully');
      onClose();
    } else {
      toast.error('Incorrect password. Please try again.');
      setErrorMessage(response.data.message);
      onClose();
    }
  } catch (error) {
    console.error('Error changing phone number:', error);
    toast.error('An error occurred. Please try again later.');
  }
};

export const changePassword = async (
  password: string,
  newPassword: string,
  onClose: () => void,
  setErrorMessage: (message: string) => void,
) => {
  try {
    const response = await axios.post(
      `${env.VITE_BACKEND_API_URL}/api/changePassword`,
      { password, newPassword },
    );

    if (response.data.success) {
      toast.success('Password changed successfully');
      onClose();
    } else {
      toast.error('Incorrect password. Please try again.');
      setErrorMessage(response.data.message);
      onClose();
    }
  } catch (error) {
    console.error('Error changing password:', error);
    toast.error('An error occurred. Please try again later.');
  }
};