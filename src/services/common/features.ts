import Api from 'services/api';

// Types
import type { AxiosRequestConfig } from 'axios';
import type { Feature } from 'types/feature.types';

class FeatureApi extends Api {
  constructor() {
    super('feature');
  }

  public createFeature = async (name: string, icon: string): Promise<{ message: string }> => {
    const accessToken: string | null = this.getAccessToken();
    const body = {
      name,
      icon,
    };
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    const { data } = await this.post('', body, config);
    return data;
  };

  public getFeature = async (id: number): Promise<Feature> => {
    const { data } = await this.get(`/${id}`);
    return data;
  };

  public getFeatures = async (ids: number[]): Promise<Feature[]> => {
    const { data } = await this.get(`/bulk/${ids.join(',')}`);
    return data;
  };

  public getAllFeatures = async (): Promise<Feature[]> => {
    const { data } = await this.get('');
    return data;
  };

  public getFeaturesPaginated = async (
    page: number,
    limit: number,
    orderBy: 'id' | 'name',
    order: 'ASC' | 'DESC',
    searchQuery?: { [key: string]: string }
  ): Promise<{ items: Feature[]; total: number; totalPages: number }> => {
    const endpoint: string = '/paginated';
    let queryString: string = `?page=${page}&limit=${limit}&orderBy=${orderBy}&order=${order}`;
    if (searchQuery) {
      const encodedSearchQuery = encodeURIComponent(JSON.stringify(searchQuery));
      queryString += `&searchQuery=${encodedSearchQuery}`;
    }

    const { data } = await this.get(`${endpoint}${queryString}`);
    return data;
  };

  public updateFeature = async (
    id: number,
    name: string,
    icon: string
  ): Promise<{ message: string }> => {
    const accessToken: string | null = this.getAccessToken();
    const body = {
      name,
      icon,
    };
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    const { data } = await this.put(`/${id}`, body, config);
    return data;
  };

  public deleteFeature = async (id: number): Promise<{ message: string }> => {
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
  createFeature,
  getFeature,
  getFeatures,
  getAllFeatures,
  getFeaturesPaginated,
  updateFeature,
  deleteFeature,
} = new FeatureApi();
