import Api from 'services/api';

// Types
import type { AxiosRequestConfig } from 'axios';
import type { Developer } from 'types/company.types';

class DeveloperApi extends Api {
  constructor() {
    super('developer');
  }

  public createDeveloper = async (name: string, website: string): Promise<{ message: string }> => {
    const accessToken: string | null = this.getAccessToken();
    const body = {
      name,
      website,
    };
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    const { data } = await this.post('', body, config);
    return data;
  };

  public getDeveloper = async (id: number): Promise<Developer> => {
    const { data } = await this.get(`/${id}`);
    return data;
  };

  public getDevelopers = async (ids: number[]): Promise<Developer[]> => {
    const { data } = await this.get(`/bulk/${ids.join(',')}`);
    return data;
  };

  public getAllDevelopers = async (): Promise<Developer[]> => {
    const { data } = await this.get('');
    return data;
  };

  public getDevelopersPaginated = async (
    page: number,
    limit: number,
    orderBy: 'id' | 'name',
    order: 'ASC' | 'DESC',
    searchQuery: { [key: string]: string }
  ): Promise<{ items: Developer[]; total: number; totalPages: number }> => {
    const endpoint: string = '/paginated';
    let queryString: string = `?page=${page}&limit=${limit}&orderBy=${orderBy}&order=${order}`;
    if (searchQuery) queryString += `&searchQuery=${JSON.stringify(searchQuery)}`;

    const { data } = await this.get(`${endpoint}${queryString}`);
    return data;
  };

  public updateDeveloper = async (
    id: number,
    name: string,
    website: string
  ): Promise<{ message: string }> => {
    const accessToken: string | null = this.getAccessToken();
    const body = {
      name,
      website,
    };
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    const { data } = await this.put(`/${id}`, body, config);
    return data;
  };

  public deleteDeveloper = async (id: number): Promise<{ message: string }> => {
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

export const {
  createDeveloper,
  getDeveloper,
  getDevelopers,
  getAllDevelopers,
  getDevelopersPaginated,
  updateDeveloper,
  deleteDeveloper,
} = new DeveloperApi();
