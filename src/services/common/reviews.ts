import Api from 'services/api';

// Types
import type { AxiosRequestConfig } from 'axios';
import type { Developer } from 'types/company.types';

class ReviewApi extends Api {
  constructor() {
    super('review');
  }

  public getReviewsPaginated = async (
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

  public deleteReview = async (id: number): Promise<{ message: string }> => {
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

export const { getReviewsPaginated, deleteReview } = new ReviewApi();
