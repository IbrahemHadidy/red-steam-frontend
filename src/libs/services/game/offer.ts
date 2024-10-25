import Api from '@services/api';

// Types
import type { Game } from '@interfaces/game';
import type { AxiosRequestConfig } from 'axios';

class OfferApi extends Api {
  constructor() {
    super('game/offer');
  }

  public createOffer = async (
    gameId: number,
    discountPrice: string,
    offerType: 'SPECIAL PROMOTION' | 'WEEKEND DEAL',
    discountStartDate: Date,
    discountEndDate: Date
  ): Promise<{ message: string }> => {
    const body = {
      gameId,
      discountPrice,
      offerType,
      discountStartDate,
      discountEndDate,
    };
    const config: AxiosRequestConfig = {
      withCredentials: true,
    };
    const { data } = await this.post('', body, config);
    return data;
  };

  public getOffersPaginated = async (
    page: number,
    limit: number,
    orderBy: 'id' | 'username' | 'email' | 'country' | 'isVerified' | 'isAdmin' | 'createdAt',
    order: 'ASC' | 'DESC',
    searchQuery?: { [key: string]: string }
  ): Promise<{ items: Game[]; total: number; totalPages: number }> => {
    const endpoint: string = '/paginated';
    let queryString: string = `?page=${page}&limit=${limit}&orderBy=${orderBy}&order=${order}`;
    if (searchQuery) {
      const encodedSearchQuery = encodeURIComponent(JSON.stringify(searchQuery));
      queryString += `&searchQuery=${encodedSearchQuery}`;
    }

    const { data } = await this.get(`${endpoint}${queryString}`);
    return data;
  };

  public updateOffer = async (
    id: number,
    discount: boolean,
    discountPrice: string,
    offerType: 'SPECIAL PROMOTION' | 'WEEKEND DEAL',
    discountStartDate: Date,
    discountEndDate: Date
  ): Promise<{ message: string }> => {
    const endpoint: string = `/${id}`;
    const config: AxiosRequestConfig = {
      withCredentials: true,
    };

    const body = {
      discount,
      discountPrice,
      offerType,
      discountStartDate,
      discountEndDate,
    };

    const { data } = await this.put(endpoint, body, config);
    return data;
  };

  public deleteOffer = async (id: number): Promise<{ message: string }> => {
    const endpoint: string = `/${id}`;
    const config: AxiosRequestConfig = {
      withCredentials: true,
    };
    const { data } = await this.delete(endpoint, config);
    return data;
  };
}

export const { createOffer, getOffersPaginated, updateOffer, deleteOffer } = new OfferApi();
