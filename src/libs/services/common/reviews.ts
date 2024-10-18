import Api from '@services/api';

// Types
import type { Review } from '@entities/review.entity';
import type { AxiosRequestConfig } from 'axios';

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
  ): Promise<{ items: Review[]; total: number; totalPages: number }> => {
    const endpoint: string = '/paginated';
    let queryString: string = `?page=${page}&limit=${limit}&orderBy=${orderBy}&order=${order}`;
    if (searchQuery) {
      const encodedSearchQuery = encodeURIComponent(JSON.stringify(searchQuery));
      queryString += `&searchQuery=${encodedSearchQuery}`;
    }

    const { data } = await this.get(`${endpoint}${queryString}`);
    return data;
  };

  public deleteReview = async (id: number): Promise<{ message: string }> => {
    const config: AxiosRequestConfig = {
      withCredentials: true,
    };
    const { data } = await this.delete(`/${id}`, config);
    return data;
  };
}

export const { getReviewsPaginated, deleteReview } = new ReviewApi();
