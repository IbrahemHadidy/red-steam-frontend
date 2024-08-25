import Api from 'services/api';

import type { AxiosRequestConfig } from 'axios';
import type { User } from 'types/user.types';

class UserAdmin extends Api {
  constructor() {
    super('user/admin');
  }

  public getUsersPaginated = async (
    page: number,
    limit: number,
    orderBy: 'id' | 'username' | 'email' | 'country' | 'isVerified' | 'isAdmin' | 'createdAt',
    order: 'ASC' | 'DESC',
    searchQuery?: { [key: string]: string }
  ): Promise<{ items: User[]; total: number; totalPages: number }> => {
    const endpoint: string = '/paginated';
    let queryString: string = `?page=${page}&limit=${limit}&orderBy=${orderBy}&order=${order}`;
    if (searchQuery) queryString += `&searchQuery=${JSON.stringify(searchQuery)}`;

    const { data } = await this.get(`${endpoint}${queryString}`);
    return data;
  };

  public updateUser = async (
    id: string,
    isVerified: boolean,
    isAdmin: boolean
  ): Promise<{ message: string }> => {
    const accessToken: string | null = this.getAccessToken();
    const body = {
      isVerified,
      isAdmin,
    };
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    const { data } = await this.put(`/${id}`, body, config);
    return data;
  };

  public deleteUser = async (id: string): Promise<{ message: string }> => {
    const accessToken: string | null = this.getAccessToken();
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    const { data } = await this.delete(`/${id}`, config);
    return data;
  };
}

export const { getUsersPaginated, updateUser, deleteUser } = new UserAdmin();
