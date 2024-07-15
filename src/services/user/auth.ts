import Api from 'services/api';

class Auth extends Api {
  constructor() {
    super('user/auth');
  }

  public signup = async (
    username: string,
    email: string,
    password: string,
    country: string,
  ) => {
    const endpoint = `signup`;
    const data = { username, email, password, country };

    const response = await this.post(endpoint, data);

    return response;
  };

  public login = async (
    identifier: string,
    password: string,
    rememberMe: boolean,
  ) => {
    const endpoint = `login`;
    const data = { identifier, password, rememberMe };

    const response = await this.post(endpoint, data);

    this.setAccessToken(response.headers['authorization']);
    this.setRefreshToken(response.headers['x-refresh-token']);

    return response;
  };

  public autoLogin = async () => {
    const refreshToken = this.getRefreshToken();

    const endpoint = `auto-login`;
    const config = {
      headers: { 'x-refresh-token': `Bearer ${refreshToken}` },
    };

    const response = await this.post(endpoint, null, config);

    this.setAccessToken(response.headers['authorization']);

    return response.data.userData;
  };

  public logout = async () => {
    const refreshToken = this.getRefreshToken();
    const accessToken = this.getAccessToken();

    const endpoint = `logout`;
    const config = {
      headers: {
        'x-refresh-token': `Bearer ${refreshToken}`,
        authorization: `Bearer ${accessToken}`,
      },
    };

    await this.post(endpoint, null, config);
    this.removeAccessToken();
    this.removeRefreshToken();
  };

  public refreshToken = async () => {
    const refreshToken = this.getRefreshToken();

    const endpoint = `refresh-token`;
    const config = { headers: { 'x-refresh-token': `Bearer ${refreshToken}` } };

    const response = await this.post(endpoint, null, config);

    this.setAccessToken(response.headers['authorization']);

    return response.data.userData;
  };

  public getUserData = async () => {
    const accessToken = this.getAccessToken();

    const endpoint = `user-data`;
    const data = {
      headers: { authorization: `Bearer ${accessToken}` },
    };

    const response = await this.get(endpoint, data);

    return response.data.userData;
  };

  public resendVerificationToken = async () => {
    const accessToken = this.getAccessToken();

    const endpoint = `resend-verification-token`;
    const config = { headers: { authorization: `Bearer ${accessToken}` } };

    const response = await this.post(endpoint, null, config);

    return response.data.message;
  };

  public verificationStatus = async () => {
    const accessToken = this.getAccessToken();

    const endpoint = `verification-status`;
    const config = { headers: { authorization: `Bearer ${accessToken}` } };

    const response = await this.get(endpoint, config);

    return response.data.verified;
  };

  public verifyEmail = async (token: string, username: string) => {
    const endpoint = `verify-email`;
    const data = { token, username };

    const response = await this.post(endpoint, data);

    return response.data;
  };

  public updateTokens = async (userId: string) => {
    const refreshToken = this.getRefreshToken();
    const accessToken = this.getAccessToken();

    const endpoint = `update-tokens`;
    const data = { userId };
    const config = {
      headers: {
        'x-refresh-token': `Bearer ${refreshToken}`,
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await this.post(endpoint, data, config);

    this.setAccessToken(response.headers['authorization']);
    this.setRefreshToken(response.headers['x-refresh-token']);

    return response.data.userData;
  };

  public getWaitingTime = async () => {
    const endpoint = `waiting-time`;

    const response = await this.get(endpoint);

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
