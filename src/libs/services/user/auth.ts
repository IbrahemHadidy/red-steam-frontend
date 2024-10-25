import Api from '@services/api';

import type { User } from '@interfaces/user';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

class UserAuth extends Api {
  constructor() {
    super('user/auth');
  }

  public signup = async (
    username: string,
    email: string,
    password: string,
    country: string,
    recaptchaToken: string
  ): Promise<{ data: { message: string }; status: number }> => {
    const endpoint: string = `/signup`;
    const data = { username, email, password, country, recaptchaToken };

    const response: AxiosResponse = await this.post(endpoint, data);

    return response;
  };

  public login = async (
    identifier: string,
    password: string,
    rememberMe: boolean
  ): Promise<{
    data: { userData: User; isSessionLoggedIn: boolean; message: string };
    status: number;
  }> => {
    const endpoint: string = `/login`;
    const data = { identifier, password, rememberMe };
    const config: AxiosRequestConfig = {
      withCredentials: true,
    };

    const response: AxiosResponse = await this.post(endpoint, data, config);

    return response;
  };

  public autoLogin = async (): Promise<User | null> => {
    const endpoint: string = `/auto-login`;
    const config: AxiosRequestConfig = {
      withCredentials: true,
    };

    const response: AxiosResponse = await this.post(endpoint, null, config, false);
    return response.data.userData;
  };

  public logout = async (): Promise<void> => {
    const endpoint: string = `/logout`;
    const config: AxiosRequestConfig = {
      withCredentials: true,
    };

    await this.post(endpoint, null, config);
  };

  public refreshToken = async (): Promise<User> => {
    const endpoint: string = `/refresh-token`;
    const config: AxiosRequestConfig = { withCredentials: true };

    const response: AxiosResponse = await this.post(endpoint, null, config);
    return response.data.userData;
  };

  public getUserData = async (): Promise<User> => {
    const endpoint: string = `/user-data`;
    const data: AxiosRequestConfig = {
      withCredentials: true,
    };

    const response: AxiosResponse = await this.get(endpoint, data);

    return response.data.userData;
  };

  public resendVerificationToken = async (): Promise<string> => {
    const endpoint: string = `/resend-verification-token`;
    const config: AxiosRequestConfig = {
      withCredentials: true,
    };

    const response: AxiosResponse = await this.post(endpoint, null, config);

    return response.data.message;
  };

  public verificationStatus = async (): Promise<boolean> => {
    const endpoint: string = `/verification-status`;
    const config: AxiosRequestConfig = {
      withCredentials: true,
    };

    const response: AxiosResponse = await this.get(endpoint, config);

    return response.data.verified;
  };

  public verifyEmail = async (token: string, username: string): Promise<{ message: string }> => {
    const endpoint: string = `/verify-email`;
    const data = { token, username };

    const response: AxiosResponse = await this.post(endpoint, data);

    return response.data;
  };

  public updateTokens = async (userId: string): Promise<User> => {
    const endpoint: string = `/update-tokens`;
    const data = { userId };
    const config: AxiosRequestConfig = {
      withCredentials: true,
    };

    const response: AxiosResponse = await this.post(endpoint, data, config);

    return response.data.userData;
  };

  public getWaitingTime = async (): Promise<number> => {
    const endpoint: string = `/waiting-time`;

    const response: AxiosResponse = await this.get(endpoint);

    return response.data.waitingTime;
  };
}

export const {
  signup,
  login,
  autoLogin,
  logout,
  refreshToken,
  getUserData,
  resendVerificationToken,
  verificationStatus,
  verifyEmail,
  updateTokens,
  getWaitingTime,
} = new UserAuth();
