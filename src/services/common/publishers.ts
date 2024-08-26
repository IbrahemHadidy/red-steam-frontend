import type { AxiosRequestConfig } from 'axios';
import Api from 'services/api';
import type { Publisher } from 'types/company.types';

class PublisherApi extends Api {
  constructor() {
    super('publisher');
  }

  public createPublisher = async (name: string, website: string): Promise<{ message: string }> => {
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

  public getPublisher = async (id: number): Promise<Publisher> => {
    const { data } = await this.get(`/${id}`);
    return data;
  };

  public getPublishers = async (ids: number[]): Promise<Publisher[]> => {
    const { data } = await this.get(`/bulk/${ids.join(',')}`);
    return data;
  };

  public getAllPublishers = async (): Promise<Publisher[]> => {
    const { data } = await this.get('');
    return data;
  };

  public getPublishersPaginated = async (
    page: number,
    limit: number,
    orderBy: 'id' | 'name',
    order: 'ASC' | 'DESC',
    searchQuery?: { [key: string]: string }
  ): Promise<{ items: Publisher[]; total: number; totalPages: number }> => {
    const endpoint: string = '/paginated';
    let queryString: string = `?page=${page}&limit=${limit}&orderBy=${orderBy}&order=${order}`;
    if (searchQuery) {
      const encodedSearchQuery = encodeURIComponent(JSON.stringify(searchQuery));
      queryString += `&searchQuery=${encodedSearchQuery}`;
    }

    const { data } = await this.get(`${endpoint}${queryString}`);
    return data;
  };

  public updatePublisher = async (
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

  public deletePublisher = async (id: number): Promise<{ message: string }> => {
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
  createPublisher,
  getPublisher,
  getPublishers,
  getAllPublishers,
  getPublishersPaginated,
  updatePublisher,
  deletePublisher,
} = new PublisherApi();
