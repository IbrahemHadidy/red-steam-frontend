import Api from 'services/api';

import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { User } from 'types/user.types';

class Auth extends Api {
  constructor() {
    super('user/auth');
  }

  public signup = async (
    username: string,
    email: string,
    password: string,
    country: string
  ): Promise<{ data: { message: string }; status: number }> => {
    const endpoint: string = `/signup`;
    const data = { username, email, password, country };

    const response: AxiosResponse = await this.post(endpoint, data);

    return response;
  };

  public login = async (
    identifier: string,
    password: string,
    rememberMe: boolean
  ): Promise<{
    data: { userData: User; message: string };
    status: number;
  }> => {
    const endpoint: string = `/login`;
    const data = { identifier, password, rememberMe };

    const response: AxiosResponse = await this.post(endpoint, data);

    this.setAccessToken(response.headers['authorization']);
    this.setRefreshToken(response.headers['x-refresh-token']);

    return response;
  };

  public autoLogin = async (): Promise<User> => {
    const refreshToken = this.getRefreshToken();

    const endpoint: string = `/auto-login`;
    const config: AxiosRequestConfig = {
      headers: { 'x-refresh-token': `Bearer ${refreshToken}` },
    };

    const response: AxiosResponse = await this.post(endpoint, null, config);

    this.setAccessToken(response.headers['authorization']);

    return response.data.userData;
  };

  public logout = async (): Promise<void> => {
    const refreshToken = this.getRefreshToken();
    const accessToken = this.getAccessToken();

    const endpoint: string = `/logout`;
    const config: AxiosRequestConfig = {
      headers: {
        'x-refresh-token': `Bearer ${refreshToken}`,
        authorization: `Bearer ${accessToken}`,
      },
    };

    await this.post(endpoint, null, config);
    this.removeAccessToken();
    this.removeRefreshToken();
  };

  public refreshToken = async (): Promise<User> => {
    const refreshToken = this.getRefreshToken();

    const endpoint: string = `/refresh-token`;
    const config: AxiosRequestConfig = { headers: { 'x-refresh-token': `Bearer ${refreshToken}` } };

    const response: AxiosResponse = await this.post(endpoint, null, config);

    this.setAccessToken(response.headers['authorization']);

    return response.data.userData;
  };

  public getUserData = async (): Promise<User> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/user-data`;
    const data = {
      headers: { authorization: `Bearer ${accessToken}` },
    };

    const response: AxiosResponse = await this.get(endpoint, data);

    return response.data.userData;
  };

  public resendVerificationToken = async (): Promise<string> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/resend-verification-token`;
    const config: AxiosRequestConfig = { headers: { authorization: `Bearer ${accessToken}` } };

    const response: AxiosResponse = await this.post(endpoint, null, config);

    return response.data.message;
  };

  public verificationStatus = async (): Promise<boolean> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/verification-status`;
    const config: AxiosRequestConfig = { headers: { authorization: `Bearer ${accessToken}` } };

    const response: AxiosResponse = await this.get(endpoint, config);

    return response.data.verified;
  };

  public verifyEmail = async (token: string, username: string): Promise<{ success: boolean }> => {
    const endpoint: string = `/verify-email`;
    const data = { token, username };

    const response: AxiosResponse = await this.post(endpoint, data);

    return response.data;
  };

  public updateTokens = async (userId: string): Promise<User> => {
    const refreshToken = this.getRefreshToken();
    const accessToken = this.getAccessToken();

    const endpoint: string = `/update-tokens`;
    const data = { userId };
    const config: AxiosRequestConfig = {
      headers: {
        'x-refresh-token': `Bearer ${refreshToken}`,
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response: AxiosResponse = await this.post(endpoint, data, config);

    this.setAccessToken(response.headers['authorization']);
    this.setRefreshToken(response.headers['x-refresh-token']);

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
} = new Auth();
