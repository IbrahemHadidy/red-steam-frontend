import Api from '@services/api';

import type { User } from '@entities/user.entity';
import type { AxiosRequestConfig } from 'axios';

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
    if (searchQuery) {
      const encodedSearchQuery = encodeURIComponent(JSON.stringify(searchQuery));
      queryString += `&searchQuery=${encodedSearchQuery}`;
    }

    const { data } = await this.get(`${endpoint}${queryString}`);
    return data;
  };

  public updateUser = async (
    id: string,
    isVerified: boolean,
    isAdmin: boolean
  ): Promise<{ message: string }> => {
    const body = {
      isVerified,
      isAdmin,
    };
    const config: AxiosRequestConfig = {
      withCredentials: true,
    };
    const { data } = await this.put(`/${id}`, body, config);
    return data;
  };

  public deleteUser = async (id: string): Promise<{ message: string }> => {
    const config: AxiosRequestConfig = {
      withCredentials: true,
    };
    const { data } = await this.delete(`/${id}`, config);
    return data;
  };
}

export const { getUsersPaginated, updateUser, deleteUser } = new UserAdmin();
