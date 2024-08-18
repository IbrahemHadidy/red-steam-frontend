import type { AxiosRequestConfig } from 'axios';
import Api from 'services/api';
import type { Language } from 'types/language.types';

class LanguageApi extends Api {
  constructor() {
    super('language');
  }

  public createLanguage = async (name: string): Promise<{ message: string }> => {
    const accessToken: string | null = this.getAccessToken();
    const body = {
      name,
    };
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    const { data } = await this.post('', body, config);
    return data;
  };

  public getLanguage = async (id: number): Promise<Language> => {
    const { data } = await this.get(`/${id}`);
    return data;
  };

  public getLanguages = async (ids: number[]): Promise<Language[]> => {
    const { data } = await this.get(`/bulk/${ids.join(',')}`);
    return data;
  };

  public getAllLanguages = async (): Promise<Language[]> => {
    const { data } = await this.get('');
    return data;
  };

  public getLanguagesPaginated = async (
    page: number,
    limit: number,
    orderBy: 'id' | 'name',
    order: 'ASC' | 'DESC',
    searchQuery?: { [key: string]: string }
  ): Promise<{ items: Language[]; total: number; totalPages: number }> => {
    const endpoint: string = '/paginated';
    let queryString: string = `?page=${page}&limit=${limit}&orderBy=${orderBy}&order=${order}`;
    if (searchQuery) queryString += `&searchQuery=${JSON.stringify(searchQuery)}`;

    const { data } = await this.get(`${endpoint}${queryString}`);
    return data;
  };

  public updateLanguage = async (id: number, name: string): Promise<{ message: string }> => {
    const accessToken: string | null = this.getAccessToken();
    const body = {
      name,
    };
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    const { data } = await this.put(`/${id}`, body, config);
    return data;
  };

  public deleteLanguage = async (id: number): Promise<{ message: string }> => {
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
  createLanguage,
  getLanguage,
  getLanguages,
  getAllLanguages,
  getLanguagesPaginated,
  updateLanguage,
  deleteLanguage,
} = new LanguageApi();
