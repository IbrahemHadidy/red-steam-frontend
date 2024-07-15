/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from 'services/api';
import { toast } from 'react-toastify';

class Management extends Api {
  constructor() {
    super('user/management');
  }

  public checkEmailExists = async (email: string) => {
    const endpoint = `email/${email}`;

    const response = await this.get(endpoint);

    return response.data.exists;
  };

  public checkUsernameExists = async (username: string) => {
    const endpoint = `username/${username}`;

    const response = await this.get(endpoint);

    return response.data.exists;
  };

  public changeUserName = async (newUsername: string, password: string) => {
    const accessToken = this.getAccessToken();

    const endpoint = `username`;
    const data = { newUsername, password };
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await this.patch(endpoint, data, config);

    if (response.data.success) {
      toast.success(response.data.message);
    }

    return response.data;
  };

  public changeEmail = async (
    currentEmail: string,
    password: string,
    newEmail: string,
    onClose: () => void,
    setErrorMessage: (message: string) => void,
  ) => {
    try {
      const accessToken = this.getAccessToken();

      const endpoint = `change-email`;
      const data = { currentEmail, password, newEmail };
      const config = {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await this.patch(endpoint, data, config);

      if (response.data.success) {
        toast.success(response.data.message);
        onClose();
      }
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      onClose();
    }
  };

  public changeCountry = async (newCountry: string) => {
    const accessToken = this.getAccessToken();

    const endpoint = `country`;
    const data = { newCountry };
    const config = {
      headers: { authorization: `Bearer ${accessToken}` },
    };

    const response = await this.patch(endpoint, data, config);

    if (response.data.success) {
      toast.success(response.data.message);
    }

    return response.data;
  };

  public uploadAvatar = async (avatarFile: File) => {
    const accessToken = this.getAccessToken();

    const endpoint = `avatar`;

    const formData = new FormData();
    formData.append('avatar', avatarFile);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await this.patch(endpoint, formData, config);

    if (response.status === 200) {
      toast.success(response.data.message);
    }

    return response;
  };

  public deleteAvatar = async () => {
    const accessToken = this.getAccessToken();

    const endpoint = `avatar`;
    const config = {
      headers: { authorization: `Bearer ${accessToken}` },
    };

    const response = await this.delete(endpoint, config);

    if (response.status === 200) {
      toast.success(response.data.message);
    }

    return response.data;
  };

  public changePassword = async (
    oldPassword: string,
    newPassword: string,
    onClose: () => void,
    setErrorMessage: (message: string) => void,
  ) => {
    const accessToken = this.getAccessToken();

    const endpoint = `password/change`;
    const data = {
      oldPassword,
      newPassword,
    };
    const config = {
      headers: { authorization: `Bearer ${accessToken}` },
    };

    try {
      const response = await this.post(endpoint, data, config);
      toast.success(response.data.message);
      onClose();
      return response.data;
    } catch (error: any) {
      if (error && error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  public forgotPassword = async (email: string) => {
    const endpoint = `password/forgot`;
    const data = { email };

    const response = await this.post(endpoint, data);

    toast.success(response.data.message);

    return response.data.status;
  };

  public resetPassword = async (token: string, newPassword: string) => {
    const endpoint = `password/reset`;
    const data = { token, newPassword };

    const response = await this.post(endpoint, data);
    toast.success(response.data.message, {
      autoClose: 1500,
    });

    if (response.status === 200) {
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
    return response.data;
  };

  public deleteAccount = async (
    password: string,
    setErrorMessage: (message: string) => void,
  ) => {
    const accessToken = this.getAccessToken();

    const endpoint = `account`;
    const config = {
      headers: { authorization: `Bearer ${accessToken}` },
      data: { password },
    };

    try {
      const response = await this.delete(endpoint, config);

      if (response.data.success) {
        toast.success(response.data.message);
        this.removeAccessToken();
        this.removeRefreshToken();
      }

      return response;
    } catch (error: any) {
      if (error && error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      }
    }
  };
}

export const {
  checkEmailExists,
  checkUsernameExists,
  changeUserName,
  changeEmail,
  changeCountry,
  uploadAvatar,
  deleteAvatar,
  changePassword,
  forgotPassword,
  resetPassword,
  deleteAccount,
} = new Management();
