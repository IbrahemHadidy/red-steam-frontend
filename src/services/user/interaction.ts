import { toast } from 'react-toastify';
import Api from 'services/api';

// Types
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { Review } from 'types/review.types';
import type { Tag } from 'types/tag.types';
import type { LibraryItem, WishlistItem } from 'types/user.types';

class Interaction extends Api {
  constructor() {
    super('user/interaction');
  }

  public changeTags = async (tags: number[]): Promise<{ message: string }> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/tags`;
    const data = { tags };
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response: AxiosResponse = await this.put(endpoint, data, config);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    return response.data;
  };

  public getTags = async (): Promise<{ tags: Tag[] }> => {
    const endpoint: string = `/tags`;

    const response: AxiosResponse = await this.get(endpoint);

    return response.data;
  };

  public addToLibrary = async (
    itemsIds: number[]
  ): Promise<{ data: { message: string }; status: number }> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/library`;
    const data = { itemsIds };
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response: AxiosResponse = await this.post(endpoint, data, config);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      toast.warn(response.data.message);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    return response;
  };

  public removeFromLibrary = async (
    itemsIds: number[]
  ): Promise<{ data: { message: string }; status: number }> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/library`;
    const config: AxiosRequestConfig = {
      data: { itemsIds },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response: AxiosResponse = await this.delete(endpoint, config);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      toast.warn(response.data.message);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    return response;
  };

  public clearLibrary = async (): Promise<{ data: { message: string }; status: number }> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/library`;
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response: AxiosResponse = await this.delete(endpoint, config);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      toast.warn(response.data.message);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    return response;
  };

  public addToWishlist = async (
    itemsIds: number[]
  ): Promise<{ data: { message: string }; status: number }> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/wishlist`;
    const data = { itemsIds };
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response: AxiosResponse = await this.post(endpoint, data, config);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      toast.warn(response.data.message);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    return response;
  };

  public removeFromWishlist = async (
    itemsIds: number[]
  ): Promise<{ data: { message: string }; status: number }> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/wishlist`;
    const config: AxiosRequestConfig = {
      data: { itemsIds },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response: AxiosResponse = await this.delete(endpoint, config);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      toast.warn(response.data.message);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    return response;
  };

  public clearWishlist = async (): Promise<{ data: { message: string }; status: number }> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/wishlist`;
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response: AxiosResponse = await this.delete(endpoint, config);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      toast.warn(response.data.message);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    return response;
  };

  public addToCart = async (
    itemsIds: number[]
  ): Promise<{ data: { message: string }; status: number }> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/cart`;
    const data = { itemsIds };
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response: AxiosResponse = await this.post(endpoint, data, config);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      toast.warn(response.data.message);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    return response;
  };

  public removeFromCart = async (
    itemsIds: number[]
  ): Promise<{ data: { message: string }; status: number }> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/cart`;
    const config: AxiosRequestConfig = {
      data: { itemsIds },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response: AxiosResponse = await this.delete(endpoint, config);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      toast.warn(response.data.message);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    return response;
  };

  public clearCart = async (): Promise<{ data: { message: string }; status: number }> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/cart`;
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response: AxiosResponse = await this.delete(endpoint, config);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      toast.warn(response.data.message);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    return response;
  };

  public getLibrary = async (): Promise<LibraryItem[]> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/library`;
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response: AxiosResponse = await this.get(endpoint, config);

    return response.data;
  };

  public getWishlist = async (): Promise<WishlistItem[]> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/wishlist`;
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response: AxiosResponse = await this.get(endpoint, config);

    return response.data;
  };

  public getCart = async () => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/cart`;
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response: AxiosResponse = await this.get(endpoint, config);

    return response.data;
  };

  public reviewGame = async (
    gameId: number,
    positive: boolean,
    content: string
  ): Promise<{ message: string }> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/review`;
    const data = { gameId, positive, content };
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response: AxiosResponse = await this.post(endpoint, data, config);

    if (response.status === 201) {
      toast.success(response.data.message);
    }

    return response.data;
  };

  public getReviews = async (): Promise<Review[]> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/reviews`;
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response: AxiosResponse = await this.get(endpoint, config);

    return response.data;
  };
}

export const {
  changeTags,
  getTags,
  addToLibrary,
  removeFromLibrary,
  clearLibrary,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  addToCart,
  removeFromCart,
  clearCart,
  getLibrary,
  getWishlist,
  getCart,
  reviewGame,
  getReviews,
} = new Interaction();
